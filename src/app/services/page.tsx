import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesMegaMenu } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Team X Technologies' enterprise software services — banking, healthcare, government, education, AI, cloud, and mobile solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Enterprise Software Services"
        description="From core banking to AI chatbots, we deliver mission-critical systems across regulated industries—with the engineering rigor and domain expertise your transformation demands."
        eyebrow="What We Do"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {servicesMegaMenu.map((category, categoryIndex) => (
        <Section
          key={category.slug}
          id={category.slug}
          eyebrow={category.name}
          title={category.name}
          description={category.description}
          className={categoryIndex % 2 === 1 ? "bg-surface/50" : undefined}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.05}>
                <ServiceCard
                  title={item.name}
                  description={item.description ?? ""}
                  iconName={item.icon ?? "Layers"}
                  href={item.href}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                href={`/services?category=${category.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                View all {category.name.toLowerCase()} services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Section>
      ))}

      <CTABanner
        title="Need a custom solution?"
        description="Not sure which service fits your needs? Our consultants will help you identify the right approach for your business objectives."
        primaryLabel="Schedule a Consultation"
        primaryHref="/contact"
        secondaryLabel="Explore Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
