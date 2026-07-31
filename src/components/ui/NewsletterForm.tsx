"use client";

import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface NewsletterFormProps {
  className?: string;
  title?: string;
  description?: string;
  variant?: "inline" | "stacked";
}

export function NewsletterForm({
  className,
  title = "Stay ahead of the curve",
  description = "Get insights on technology, industry trends, and product updates delivered to your inbox.",
  variant = "stacked",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4",
          className
        )}
      >
        <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-foreground">
          You&apos;re subscribed. Welcome to the Team X community.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {(title || description) && variant === "stacked" && (
        <div className="mb-4">
          {title && (
            <h3 className="font-display text-lg font-semibold text-foreground">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted">{description}</p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn(
          variant === "inline"
            ? "flex flex-col gap-2 sm:flex-row"
            : "space-y-3"
        )}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={status === "loading"}
          className={cn(
            "flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
            variant === "inline" && "sm:min-w-[240px]"
          )}
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(variant === "inline" && "shrink-0")}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-3 text-xs text-muted">
        By subscribing, you agree to our{" "}
        <a href="/legal/privacy" className="text-accent hover:underline">
          Privacy Policy
        </a>
        . Unsubscribe anytime.
      </p>
    </div>
  );
}
