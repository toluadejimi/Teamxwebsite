"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/shared/Reveal";
import { getIcon } from "@/lib/icons";
import { industries } from "@/lib/data";

export function IndustriesSection() {
  return (
    <Section
      id="industries"
      eyebrow="Industries"
      title="Deep expertise where it matters most"
      description="Regulated, mission-critical sectors demand more than code — they require domain knowledge, compliance rigor, and proven delivery at scale."
      className="bg-surface/30"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry, index) => {
          const Icon = getIcon(industry.icon);

          return (
            <Reveal key={industry.slug} delay={index * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.12)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {industry.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {industry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Explore
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
