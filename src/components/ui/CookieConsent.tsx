"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const STORAGE_KEY = "teamx-cookie-consent";

interface CookieConsentProps {
  className?: string;
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept(type: "all" | "essential") {
    localStorage.setItem(STORAGE_KEY, type);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="dialog"
          aria-label="Cookie consent"
          className={cn(
            "fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-5 shadow-2xl md:inset-x-6 md:p-6",
            className
          )}
        >
          <div className="flex gap-4">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent sm:flex">
              <Cookie className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-semibold text-foreground">
                  We value your privacy
                </h2>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => accept("essential")}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We use cookies to enhance your experience, analyze site traffic, and
                personalize content. Read our{" "}
                <Link href="/legal/cookies" className="text-accent hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => accept("all")}>
                  Accept All
                </Button>
                <Button size="sm" variant="outline" onClick={() => accept("essential")}>
                  Essential Only
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
