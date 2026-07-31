import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getServiceBySlug } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Team X Technologies product offerings — Core Banking, Hospital Management, Government Portal, Educational Portal, Hotel PMS, and Agency Banking platforms.",
};

const productSlugs = [
  {
    slug: "core-banking-application",
    tagline: "Mission-critical banking infrastructure for modern financial institutions.",
  },
  {
    slug: "educational-portal",
    tagline: "Unified digital campus connecting students, faculty, and administrators.",
  },
  {
    slug: "hospital-management",
    tagline: "Comprehensive clinical and administrative system for healthcare networks.",
  },
  {
    slug: "hotel-management",
    tagline: "Integrated property management for hotels and hospitality groups.",
  },
  {
    slug: "government-portal",
    tagline: "Citizen-centric digital government for licenses, permits, and services.",
  },
  {
    slug: "agency-banking",
    tagline: "Agent network platform extending financial services to underserved communities.",
  },
] as const;

export default function ProductsPage() {
  const products = productSlugs
    .map(({ slug, tagline }) => {
      const service = getServiceBySlug(slug);
      return service ? { ...service, tagline } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <>
      <PageHero
        title="Enterprise Product Suite"
        description="Production-ready platforms engineered for regulated industries—deployable as turnkey solutions or customized to your exact requirements."
        eyebrow="Products"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <Section
        eyebrow="Flagship Platforms"
        title="Ready-to-Deploy Solutions"
        description="Each product combines deep domain expertise with modern architecture, proven across dozens of enterprise deployments."
        centered
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.06}>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <ServiceCard
                  title={product.title}
                  description={product.tagline}
                  image={product.bannerImage}
                  href={`/services/${product.slug}`}
                  badge="Enterprise Product"
                />
                <div className="border-t border-border p-6 md:p-8">
                  <p className="text-sm leading-relaxed text-muted">
                    {product.shortDescription}
                  </p>
                  {product.modules.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.modules.slice(0, 4).map((mod) => (
                        <Badge key={mod} variant="muted" className="text-xs">
                          {mod.split("(")[0].trim().slice(0, 30)}
                          {mod.length > 30 ? "…" : ""}
                        </Badge>
                      ))}
                      {product.modules.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.modules.length - 4} modules
                        </Badge>
                      )}
                    </div>
                  )}
                  <ul className="mt-4 space-y-2">
                    {product.benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        className="bg-surface/50"
        eyebrow="Deployment Options"
        title="Flexible Implementation Models"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Turnkey Deployment",
              description:
                "Standard configuration with accelerated timeline for organizations needing proven functionality with minimal customization.",
            },
            {
              title: "Configured Implementation",
              description:
                "Tailored workflows, branding, and integrations aligned to your operational requirements while leveraging the core platform.",
            },
            {
              title: "Enterprise Customization",
              description:
                "Full customization including additional modules, complex integrations, and multi-entity deployments for large organizations.",
            },
          ].map((option, index) => (
            <Reveal key={option.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {option.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {option.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Interested in a product demo?"
        description="See our platforms in action with a personalized walkthrough tailored to your industry and use cases."
        primaryLabel="Request a Demo"
        primaryHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}
