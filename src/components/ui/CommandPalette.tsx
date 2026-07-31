"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, Search, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { searchablePages } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  className?: string;
}

export function CommandPalette({ className }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return searchablePages.slice(0, 8);
    const q = query.toLowerCase();
    return searchablePages.filter(
      (page) =>
        page.label.toLowerCase().includes(q) ||
        page.href.toLowerCase().includes(q) ||
        page.description?.toLowerCase().includes(q)
    );
  }, [query]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setQuery("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/30 hover:text-foreground md:flex",
          className
        )}
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-4 flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              role="dialog"
              aria-modal
              aria-label="Search"
              className="fixed inset-x-4 top-[15%] z-[101] mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl md:inset-x-auto"
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-5 w-5 shrink-0 text-muted" />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent py-4 text-base text-foreground outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setOpen(false)}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-muted">
                    No results found for &ldquo;{query}&rdquo;
                  </li>
                ) : (
                  filtered.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-background group"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-accent">
                            {page.label}
                          </p>
                          {page.description && (
                            <p className="mt-0.5 text-xs text-muted line-clamp-1">
                              {page.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))
                )}
              </ul>

              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted">
                <span>Navigate with keyboard</span>
                <kbd className="rounded border border-border px-1.5 py-0.5">ESC</kbd>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export { CommandPalette as SearchModal };
