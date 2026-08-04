"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MIN_SPLASH_MS = 1200;
const MIN_NAV_MS = 650;

type NavigationLoaderContextValue = {
  startNavigation: (href: string) => void;
  isNavigating: boolean;
};

const NavigationLoaderContext = createContext<NavigationLoaderContextValue | null>(
  null
);

export function useNavigationLoader() {
  const ctx = useContext(NavigationLoaderContext);
  if (!ctx) {
    throw new Error("useNavigationLoader must be used within PageLoaderProvider");
  }
  return ctx;
}

function ProgressPercent({ value }: { value: ReturnType<typeof useSpring> }) {
  const [label, setLabel] = useState("0%");
  useMotionValueEvent(value, "change", (v) => {
    setLabel(`${Math.round(v)}%`);
  });
  return <span>{label}</span>;
}

function LoaderOverlay({
  progressWidth,
  springProgress,
  label = "LOADING",
  fadeIn = true,
}: {
  progressWidth: ReturnType<typeof useTransform<number, string>>;
  springProgress: ReturnType<typeof useSpring>;
  label?: string;
  fadeIn?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden",
        "bg-[#05070a] text-foreground"
      )}
      initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(37,99,235,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(59,130,246,0.12), transparent)",
        }}
      />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-56 w-56 rounded-full border border-accent/20 sm:h-72 sm:w-72"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--glow)]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-72 w-72 rounded-full border border-white/5 sm:h-96 sm:w-96"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute bottom-8 right-10 h-1.5 w-1.5 rounded-full bg-accent/60" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -inset-4 rounded-2xl bg-accent/25 blur-xl"
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-accent font-display text-2xl font-bold text-accent-foreground shadow-[0_0_40px_rgba(37,99,235,0.45)] sm:h-20 sm:w-20 sm:text-3xl">
            X
          </div>
        </motion.div>

        <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Team<span className="text-accent">X</span> Technologies
        </p>
        <p className="mt-2 max-w-xs text-center text-xs tracking-[0.18em] text-slate-400 uppercase sm:text-[0.7rem]">
          Engineering digital excellence
        </p>

        <div className="mt-10 w-48 sm:w-56">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-blue-400"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-wider text-slate-500">
            <span>{label}</span>
            <ProgressPercent value={springProgress} />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
    </motion.div>
  );
}

function isInternalNavLink(anchor: HTMLAnchorElement, currentPath: string) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("data-no-loader") !== null) return false;

  const hrefAttr = anchor.getAttribute("href");
  if (!hrefAttr || hrefAttr.startsWith("mailto:") || hrefAttr.startsWith("tel:") || hrefAttr.startsWith("javascript:")) {
    return false;
  }

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.origin);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;

  // In-page anchors only
  if (url.pathname === currentPath && url.hash && url.search === window.location.search) {
    return false;
  }

  return (
    url.pathname !== currentPath ||
    url.search !== window.location.search
  );
}

export function PageLoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname?.startsWith("/admin");

  const [splashVisible, setSplashVisible] = useState(!isAdmin);
  const [splashDone, setSplashDone] = useState(!!isAdmin);
  const [navVisible, setNavVisible] = useState(false);
  const [routeBar, setRouteBar] = useState(false);

  const navStartedAt = useRef(0);
  const pendingHref = useRef<string | null>(null);
  const prevPath = useRef<string | null>(null);

  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { stiffness: 90, damping: 22 });
  const progressWidth = useTransform(springProgress, (v) => `${v}%`);

  const finishSplash = useCallback(() => {
    progress.set(100);
    window.setTimeout(() => {
      setSplashVisible(false);
      window.setTimeout(() => setSplashDone(true), 500);
    }, 220);
  }, [progress]);

  // Initial splash — always dismiss; never hang on tunnel/slow assets
  useEffect(() => {
    if (isAdmin) return;

    const start = performance.now();
    let raf = 0;
    let finished = false;
    let settleTimer = 0;

    const tick = (now: number) => {
      if (finished) return;
      const elapsed = now - start;
      const t = Math.min(elapsed / MIN_SPLASH_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      progress.set(Math.min(eased * 92, 92));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ready = () => {
      if (finished) return;
      const wait = Math.max(0, MIN_SPLASH_MS - (performance.now() - start));
      settleTimer = window.setTimeout(() => {
        if (finished) return;
        finished = true;
        cancelAnimationFrame(raf);
        finishSplash();
      }, wait);
    };

    // Don't wait forever for window "load" (fonts/3D/images can hang on tunnels)
    if (document.readyState === "complete" || document.readyState === "interactive") {
      ready();
    } else {
      window.addEventListener("DOMContentLoaded", ready, { once: true });
      window.addEventListener("load", ready, { once: true });
    }

    const failsafe = window.setTimeout(ready, 1800);
    const hardKill = window.setTimeout(() => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      finishSplash();
    }, 2800);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.clearTimeout(hardKill);
      window.clearTimeout(settleTimer);
      window.removeEventListener("DOMContentLoaded", ready);
      window.removeEventListener("load", ready);
    };
  }, [finishSplash, isAdmin, progress]);

  const hideNavigationLoader = useCallback(() => {
    const elapsed = performance.now() - navStartedAt.current;
    const wait = Math.max(0, MIN_NAV_MS - elapsed);
    window.setTimeout(() => {
      progress.set(100);
      window.setTimeout(() => {
        setNavVisible(false);
        pendingHref.current = null;
        progress.set(0);
      }, 220);
    }, wait);
  }, [progress]);

  const startNavigation = useCallback(
    (href: string) => {
      if (!splashDone || navVisible) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }

      const next = `${url.pathname}${url.search}${url.hash}`;
      if (url.pathname === pathname && !url.search) {
        if (url.hash) {
          const el = document.querySelector(url.hash);
          el?.scrollIntoView({ behavior: "smooth" });
          return;
        }
        return;
      }

      pendingHref.current = next;
      navStartedAt.current = performance.now();
      progress.set(0);
      setNavVisible(true);
      setRouteBar(false);

      // Animate progress while routing
      progress.set(15);
      window.setTimeout(() => progress.set(45), 120);
      window.setTimeout(() => progress.set(72), 320);

      router.push(`${url.pathname}${url.search}${url.hash}`);

      // Failsafe — never leave loader stuck
      window.setTimeout(() => {
        if (pendingHref.current === next) {
          hideNavigationLoader();
        }
      }, 4000);
    },
    [hideNavigationLoader, navVisible, pathname, progress, router, splashDone]
  );

  // Intercept link / button-as-link clicks site-wide
  useEffect(() => {
    if (!splashDone || isAdmin) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (!isInternalNavLink(anchor, pathname)) return;

      event.preventDefault();
      startNavigation(anchor.href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, splashDone, startNavigation, isAdmin]);

  // When route completes, dismiss nav loader
  useEffect(() => {
    if (!splashDone) {
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    if (navVisible || pendingHref.current) {
      hideNavigationLoader();
      return;
    }

    // Fallback thin bar for programmatic navigations
    setRouteBar(true);
    progress.set(20);
    const t1 = window.setTimeout(() => progress.set(70), 100);
    const t2 = window.setTimeout(() => {
      progress.set(100);
      window.setTimeout(() => {
        setRouteBar(false);
        progress.set(0);
      }, 250);
    }, 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [hideNavigationLoader, navVisible, pathname, progress, splashDone]);

  useEffect(() => {
    if (!splashVisible && !navVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [splashVisible, navVisible]);

  const ctx = useMemo(
    () => ({ startNavigation, isNavigating: navVisible }),
    [startNavigation, navVisible]
  );

  const showOverlay = splashVisible || navVisible;

  return (
    <NavigationLoaderContext.Provider value={ctx}>
      {children}

      <AnimatePresence>
        {splashDone && routeBar && !navVisible && (
          <motion.div
            key="route-bar"
            className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="progressbar"
            aria-label="Page loading"
          >
            <motion.div
              className="h-full origin-left bg-accent shadow-[0_0_12px_var(--glow)]"
              style={{ width: progressWidth }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay && (
          <LoaderOverlay
            key={splashVisible ? "splash" : "nav"}
            progressWidth={progressWidth}
            springProgress={springProgress}
            label={splashVisible ? "LOADING" : "LOADING PAGE"}
            fadeIn={!splashVisible}
          />
        )}
      </AnimatePresence>
    </NavigationLoaderContext.Provider>
  );
}

/** @deprecated use PageLoaderProvider — kept as alias */
export const PageLoader = PageLoaderProvider;
