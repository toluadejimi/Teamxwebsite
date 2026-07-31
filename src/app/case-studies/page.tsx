import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth case studies from Team X Technologies — digital transformation stories with measurable outcomes across banking, government, healthcare, and more.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        title="Case Studies"
        description="Real transformation stories with documented outcomes—from legacy modernization to AI-powered customer care and omnichannel retail."
        eyebrow="Client Success"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies" },
        ]}
      />

      <Section
        eyebrow="Deep Dives"
        title="Documented Transformations"
        description="Each case study walks through the full engagement lifecycle—challenge, planning, architecture, delivery, and measurable results."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.06}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/30">
                <ServiceCard
                  title={study.title}
                  description={study.summary}
                  image={study.image}
                  href={`/case-studies/${study.slug}`}
                  badge={study.industry}
                />
                <div className="border-t border-border px-6 pb-6 md:px-7 md:pb-7">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="muted">{study.client}</Badge>
                    <Badge variant="outline">{study.duration}</Badge>
                    <Badge variant="outline">{study.teamSize} team members</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {study.metrics.slice(0, 3).map((metric) => (
                      <div key={metric.label} className="text-center sm:text-left">
                        <p className="font-display text-lg font-semibold text-accent">
                          {metric.value}
                        </p>
                        <p className="text-xs text-muted">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    Read full case study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Ready to write your success story?"
        description="Join the enterprises that trust Team X to deliver transformation with measurable outcomes."
        primaryLabel="Start a Project"
        primaryHref="/contact"
        secondaryLabel="View Portfolio"
        secondaryHref="/portfolio"
      />
    </>
  );
}
