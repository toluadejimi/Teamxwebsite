"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navbarNav as mainNav } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { BrandLogo } from "@/components/shared/BrandLogo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openMega() {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }

  function closeMega() {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  }

  const servicesItem = mainNav.find((item) => item.megaMenu);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between md:h-[4.5rem]"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link href="/" className="group">
              <BrandLogo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {mainNav.map((item) => {
                if (item.megaMenu) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                    >
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        className={cn(
                          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          megaOpen
                            ? "text-accent"
                            : "text-muted hover:text-foreground"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            megaOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-accent"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <CommandPalette />
              <ThemeToggle />
              <MagneticButton>
                <Button href="/contact" variant="ghost" size="sm">
                  Contact
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/contact?type=quote" size="sm">
                  Request Quote
                </Button>
              </MagneticButton>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && servicesItem?.megaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute inset-x-0 top-full hidden border-b border-border bg-background/95 backdrop-blur-xl lg:block"
            >
              <Container className="py-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 xl:grid-cols-3">
                  {servicesItem.megaMenu.map((column) => (
                    <div key={column.title}>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                        {column.title}
                      </h3>
                      <ul className="space-y-1">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
                            >
                              <span className="flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-accent">
                                {link.label}
                                <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                              </span>
                              {link.description && (
                                <span className="mt-0.5 text-xs text-muted line-clamp-1">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Need a custom solution?
                    </p>
                    <p className="text-xs text-muted">
                      Our experts can architect the right approach for your organization.
                    </p>
                  </div>
                  <Button href="/contact?type=quote" size="sm">
                    Get Started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-border bg-background lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="font-display text-base font-semibold">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <CommandPalette className="mb-4 flex w-full" />

                <ul className="space-y-1">
                  {mainNav.map((item) => {
                    if (item.megaMenu) {
                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            aria-expanded={mobileServicesOpen}
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground"
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-muted transition-transform",
                                mobileServicesOpen && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-3"
                              >
                                {item.megaMenu.map((col) => (
                                  <div key={col.title} className="py-2">
                                    <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                                      {col.title}
                                    </p>
                                    {col.links.map((link) => (
                                      <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-accent"
                                      >
                                        {link.label}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href!}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            pathname === item.href
                              ? "text-accent"
                              : "text-foreground hover:text-accent"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 space-y-2 border-t border-border pt-6">
                  <Button href="/contact" variant="outline" className="w-full">
                    Contact
                  </Button>
                  <Button href="/contact?type=quote" className="w-full">
                    Request Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
