"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { PageLoaderProvider } from "@/components/ui/PageLoader";

interface ProvidersProps {
  children: ReactNode;
}

function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Smooth scroll causes rubber-banding / "scroll up" on admin image grids
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isAdmin]);

  return children;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LenisProvider>
        <PageLoaderProvider>{children}</PageLoaderProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
