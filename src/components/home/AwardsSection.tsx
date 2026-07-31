import { Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/shared/Reveal";
import { awards } from "@/lib/data";

export function AwardsSection() {
  return (
    <Section
      id="awards"
      eyebrow="Recognition"
      title="Award-winning delivery"
      description="Industry recognition for engineering excellence, innovation, and measurable client outcomes across Africa and beyond."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((award, index) => (
          <Reveal key={`${award.title}-${award.year}`} delay={index * 0.08}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.1)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Award className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="font-display text-2xl font-semibold text-accent/60">
                  {award.year}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {award.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-muted">
                {award.organization}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {award.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
