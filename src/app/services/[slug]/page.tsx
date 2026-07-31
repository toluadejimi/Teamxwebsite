import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Shield } from "lucide-react";
import {
  allServices,
  getRelatedServices,
  getServiceBySlug,
} from "@/lib/data";
import { parseStatValue } from "@/lib/parse-stat";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Section } from "@/components/ui/Section";
import { StatGrid } from "@/components/ui/StatCounter";
import { Badge } from "@/components/ui/Badge";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      images: [{ url: service.bannerImage }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(slug);
  const statItems = service.stats.map((stat) => {
    const parsed = parseStatValue(stat.value);
    return {
      value: parsed.value,
      suffix: parsed.suffix,
      prefix: parsed.prefix,
      decimals: parsed.decimals,
      label: stat.label,
    };
  });

  const processSteps = service.process.map((step) => ({
    title: step.title,
    description: step.description,
  }));

  return (
    <>
      <PageHero
        title={service.title}
        description={service.shortDescription}
        backgroundImage={service.bannerImage}
        eyebrow={service.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <Section className="pt-8 pb-12">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={service.bannerImage}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Impact" title="Proven Results" centered>
        <StatGrid stats={statItems} className="max-w-5xl mx-auto" />
      </Section>

      <Section
        eyebrow="Overview"
        title="About This Service"
        className="bg-surface/50"
      >
        <Reveal>
          <p className="max-w-4xl text-base leading-relaxed text-muted md:text-lg">
            {service.longDescription}
          </p>
        </Reveal>
      </Section>

      <Section eyebrow="The Challenge" title="Problems We Solve">
        <div className="grid gap-4 md:grid-cols-2">
          {service.problems.map((problem, index) => (
            <Reveal key={problem} delay={index * 0.04}>
              <div className="flex gap-3 rounded-xl border border-border bg-surface p-5">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-semibold text-red-500">
                  !
                </span>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {problem}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our Approach"
        title="How We Solve It"
        className="bg-surface/50"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {service.solutions.map((solution, index) => (
            <Reveal key={solution} delay={index * 0.04}>
              <div className="flex gap-3 rounded-xl border border-accent/20 bg-accent/5 p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {solution}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Capabilities" title="Key Features">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, index) => (
            <Reveal key={feature} delay={index * 0.03}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-muted md:text-base">{feature}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Value"
        title="Business Benefits"
        className="bg-surface/50"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((benefit, index) => (
            <Reveal key={benefit} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {benefit}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {service.modules.length > 0 && (
        <Section eyebrow="Platform Modules" title="What's Included">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {service.modules.map((module, index) => (
              <Reveal key={module} delay={index * 0.02}>
                <div className="group rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30 hover:bg-accent/5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
                    <span className="text-sm font-medium text-foreground">
                      {module}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section
        eyebrow="Methodology"
        title="Our Delivery Process"
        centered
        className="bg-surface/50"
      >
        <ProcessSteps steps={processSteps} />
      </Section>

      <Section eyebrow="Technology" title="Security & Tech Stack">
        <Reveal>
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-border bg-surface p-5">
            <Shield className="h-6 w-6 text-accent" />
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Built with security-first architecture, encrypted data at rest and in transit,
              role-based access controls, and compliance-ready audit logging across all deployments.
            </p>
          </div>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((tech, index) => (
            <Reveal key={tech} delay={index * 0.02}>
              <Badge variant="outline" className="px-3 py-1.5 text-sm">
                {tech}
              </Badge>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Engagement"
        title="Pricing Models"
        className="bg-surface/50"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {service.pricingModels.map((model, index) => (
            <Reveal key={model.name} delay={index * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {model.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{model.description}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Frequently Asked Questions">
        <Reveal>
          <FAQAccordion items={service.faqs} className="max-w-3xl" />
        </Reveal>
      </Section>

      {relatedServices.length > 0 && (
        <Section
          eyebrow="Explore More"
          title="Related Services"
          className="bg-surface/50"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related, index) => (
              <Reveal key={related.slug} delay={index * 0.06}>
                <ServiceCard
                  title={related.title}
                  description={related.shortDescription}
                  image={related.bannerImage}
                  href={`/services/${related.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABanner
        title={`Ready to explore ${service.title}?`}
        description="Speak with our specialists to discuss your requirements, timeline, and the best engagement model for your organization."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
