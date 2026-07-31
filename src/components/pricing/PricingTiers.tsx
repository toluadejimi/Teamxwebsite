"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { pricingTiers } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PricingTiers() {
  const [highlighted, setHighlighted] = useState<string>("Professional");

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {pricingTiers.map((tier) => (
          <button
            key={tier.name}
            type="button"
            onClick={() => setHighlighted(tier.name)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              highlighted === tier.name
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-surface text-muted hover:border-accent/30 hover:text-foreground"
            )}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => {
          const isHighlighted = highlighted === tier.name;
          const isPopular = tier.name === "Professional";

          return (
            <Reveal key={tier.name} delay={index * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300",
                  isHighlighted
                    ? "scale-[1.02] border-accent bg-surface shadow-[0_20px_60px_-20px_rgba(37,99,235,0.2)] lg:scale-105"
                    : "border-border bg-surface/80 hover:border-accent/20"
                )}
                onMouseEnter={() => setHighlighted(tier.name)}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Sparkles className="mr-1 h-3 w-3" aria-hidden />
                    Most popular
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{tier.description}</p>
                  <p className="mt-4 font-display text-3xl font-semibold text-accent">
                    {tier.priceRange}
                  </p>
                </div>

                <div className="mb-6 rounded-xl bg-background/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Ideal for
                  </p>
                  <p className="mt-1 text-sm text-foreground">{tier.idealFor}</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/request-quote"
                  variant={isHighlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  Get started
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
