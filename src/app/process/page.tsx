import type { Metadata } from "next";
import { processSteps } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Team X Technologies' proven delivery process — Discover, Design, Develop, Deploy, and Evolve — ensuring successful enterprise software projects.",
};

const processPrinciples = [
  {
    title: "Transparent Communication",
    description:
      "Bi-weekly demos, shared backlogs, and direct access to engineering leads keep stakeholders informed and aligned throughout delivery.",
  },
  {
    title: "Quality Built In",
    description:
      "Code reviews, automated testing, security scanning, and performance validation are standard—not optional—across every sprint.",
  },
  {
    title: "Incremental Value",
    description:
      "We deliver working software in two-week cycles, enabling early feedback and reducing the risk of big-bang releases.",
  },
  {
    title: "Knowledge Transfer",
    description:
      "Documentation, training, and paired working sessions ensure your team can operate and evolve the solution post-launch.",
  },
];

export default function ProcessPage() {
  const steps = processSteps.map((step) => ({
    title: step.title,
    description: step.description,
  }));

  return (
    <>
      <PageHero
        title="Our Delivery Process"
        description="A proven methodology refined over 200+ enterprise projects—balancing agility with the rigor required for mission-critical systems."
        eyebrow="How We Work"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Process" },
        ]}
      />

      <Section
        eyebrow="Five Phases"
        title="From Discovery to Evolution"
        description="Every engagement follows our structured yet flexible process, adapted to your industry requirements and organizational context."
        centered
      >
        <ProcessSteps steps={steps} />
      </Section>

      <Section
        eyebrow="Phase Details"
        title="What Happens at Each Stage"
        className="bg-surface/50"
      >
        <div className="space-y-8">
          {processSteps.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <Reveal key={step.step} delay={index * 0.06}>
                <div className="grid gap-6 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[auto_1fr] md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-display text-lg font-semibold text-accent">
                      {String(step.step).padStart(2, "0")}
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent md:hidden">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Principles" title="How We Ensure Success">
        <div className="grid gap-6 sm:grid-cols-2">
          {processPrinciples.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Ready to start your project?"
        description="Our process adapts to your timeline, budget, and risk tolerance—let's define the right approach together."
        primaryLabel="Get Started"
        primaryHref="/contact"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
