import type { Metadata } from "next";
import { industries } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { FeatureCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Team X Technologies serves financial services, healthcare, government, education, hospitality, retail, logistics, and manufacturing with domain-specific software solutions.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industries We Serve"
        description="Deep domain expertise in regulated, mission-critical sectors where reliability, compliance, and measurable outcomes are non-negotiable."
        eyebrow="Sector Expertise"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
      />

      <Section
        eyebrow="Vertical Solutions"
        title="Specialized for Your Sector"
        description="Every industry has unique workflows, regulations, and stakeholder expectations. We bring proven platforms and tailored engineering to meet those demands."
        centered
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} delay={index * 0.05}>
              <FeatureCard
                title={industry.name}
                description={industry.description}
                iconName={industry.icon}
                href={`/industries/${industry.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        className="bg-surface/50"
        eyebrow="Cross-Industry Capabilities"
        title="Common Threads Across Sectors"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Regulatory Compliance",
              description:
                "Pre-built frameworks for banking regulations, healthcare data standards, government accessibility requirements, and industry-specific audit trails.",
            },
            {
              title: "Integration Expertise",
              description:
                "API-first architectures connecting legacy mainframes, ERP systems, payment switches, and third-party SaaS platforms seamlessly.",
            },
            {
              title: "Change Management",
              description:
                "Structured rollout, training, and hypercare support ensuring adoption—not just deployment—across diverse user populations.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Transforming your industry?"
        description="Tell us about your sector challenges and we'll share relevant case studies and solution approaches from similar engagements."
        primaryLabel="Discuss Your Project"
        primaryHref="/contact"
        secondaryLabel="View Portfolio"
        secondaryHref="/portfolio"
      />
    </>
  );
}
