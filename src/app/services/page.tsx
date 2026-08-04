import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesMegaMenu } from "@/lib/data";
import { readCms } from "@/lib/cms/store";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Team X Technologies' enterprise software services — banking, healthcare, government, education, AI, cloud, and mobile solutions.",
};

export default async function ServicesPage() {
  const cms = await readCms();
  const services = cms.services.filter((s) => s.active !== false);
  const byCategory = new Map<string, typeof services>();
  for (const service of services) {
    const list = byCategory.get(service.category) || [];
    list.push(service);
    byCategory.set(service.category, list);
  }

  const sections = servicesMegaMenu
    .map((category) => ({
      ...category,
      services: byCategory.get(category.slug) || [],
    }))
    .filter((section) => section.services.length > 0);

  // Include any CMS categories not in mega menu
  for (const [slug, list] of byCategory) {
    if (!sections.some((s) => s.slug === slug)) {
      sections.push({
        slug,
        name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `Solutions in ${slug.replace(/-/g, " ")}.`,
        items: [],
        services: list,
      } as (typeof sections)[number]);
    }
  }

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

      {sections.map((category, categoryIndex) => (
        <Section
          key={category.slug}
          id={category.slug}
          eyebrow={category.name}
          title={category.name}
          description={category.description}
          className={categoryIndex % 2 === 1 ? "bg-surface/50" : undefined}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <ServiceCard
                  title={service.title}
                  description={service.shortDescription}
                  image={service.bannerImage}
                  href={`/services/${service.slug}`}
                  badge={service.category.replace(/-/g, " ")}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                href={`/contact`}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                Talk to us about {category.name.toLowerCase()}
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
