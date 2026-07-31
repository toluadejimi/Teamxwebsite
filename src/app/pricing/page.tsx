import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTABanner } from "@/components/ui/CTABanner";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Transparent pricing tiers for enterprise software projects — from focused MVPs to mission-critical systems. Request a tailored quote from Team X Technologies.",
  path: "/pricing",
  keywords: ["pricing", "enterprise software cost", "project quote", "Team X Technologies"],
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Transparent Pricing for Every Scale"
        description="Investment ranges for focused MVPs through mission-critical enterprise systems. Every engagement begins with discovery to provide an accurate proposal."
        eyebrow="Pricing"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing" },
        ]}
      />

      <Section
        eyebrow="Engagement tiers"
        title="Choose the right starting point"
        description="These ranges reflect typical project scopes. Final pricing depends on requirements, integrations, compliance needs, and timeline."
        centered
      >
        <PricingTiers />
      </Section>

      <Section
        eyebrow="What's included"
        title="Every tier includes"
        className="border-t border-border bg-surface/50"
        centered
      >
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Dedicated project manager",
            "Agile delivery with demos",
            "Source code ownership",
            "Security best practices",
            "Documentation & training",
            "Post-launch warranty",
            "Knowledge transfer",
            "Transparent reporting",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted"
            >
              <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Need a custom proposal?"
        description="Share your requirements and we'll provide a detailed quote tailored to your organization."
        primaryLabel="Request a quote"
        primaryHref="/request-quote"
        secondaryLabel="Book a demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
