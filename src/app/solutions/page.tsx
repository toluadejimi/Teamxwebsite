import type { Metadata } from "next";
import Link from "next/link";
import { processSteps, servicesMegaMenu, whyChooseUs } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { FeatureCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Digital Transformation Solutions",
  description:
    "End-to-end digital transformation solutions from Team X Technologies — strategy, modern platforms, cloud migration, AI, and mobile experiences.",
};

const transformationPillars: {
  title: string;
  description: string;
  iconName: string;
  href: string;
}[] = [
  {
    title: "Platform Modernization",
    description:
      "Replace legacy systems with cloud-native architectures that scale elastically, integrate seamlessly, and reduce total cost of ownership.",
    iconName: "RefreshCw",
    href: "/services/legacy-modernization",
  },
  {
    title: "Cloud Transformation",
    description:
      "Migrate workloads to AWS, Azure, or GCP with proven methodologies minimizing disruption while unlocking elastic scalability.",
    iconName: "Cloud",
    href: "/services/cloud-migration",
  },
  {
    title: "Intelligent Automation",
    description:
      "Deploy AI chatbots, predictive analytics, and process automation that reduce costs while improving customer and employee experiences.",
    iconName: "Cpu",
    href: "/services/ai-chatbots",
  },
  {
    title: "Mobile-First Experiences",
    description:
      "Build native and cross-platform applications that meet users where they are—with offline capability and enterprise security.",
    iconName: "Smartphone",
    href: "/services/flutter-development",
  },
  {
    title: "Enterprise Integration",
    description:
      "Connect siloed systems through API-first architectures, enabling unified data views and real-time business intelligence.",
    iconName: "Layers",
    href: "/services/custom-software-development",
  },
  {
    title: "Security & Compliance",
    description:
      "Embed zero-trust security, encryption, and regulatory compliance into every layer of your digital infrastructure.",
    iconName: "Shield",
    href: "/services/cloud-security",
  },
];

export default function SolutionsPage() {
  const deliverySteps = processSteps.map((step) => ({
    title: step.title,
    description: step.description,
  }));

  return (
    <>
      <PageHero
        title="Digital Transformation Solutions"
        description="We partner with enterprises to reimagine operations, modernize platforms, and deliver measurable outcomes—not just technology projects."
        eyebrow="Solutions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions" },
        ]}
      />

      <Section
        eyebrow="Transformation Pillars"
        title="How We Drive Change"
        description="Our solutions span the full digital transformation lifecycle—from strategy through deployment and continuous evolution."
        centered
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transformationPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05}>
              <FeatureCard
                title={pillar.title}
                description={pillar.description}
                iconName={pillar.iconName}
                href={pillar.href}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Service Categories"
        title="Solutions by Domain"
        description="Explore our comprehensive service portfolio organized by business domain and technology capability."
        className="bg-surface/50"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {servicesMegaMenu.slice(0, 6).map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.06}>
              <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{category.description}</p>
                <ul className="mt-4 space-y-2">
                  {category.items.slice(0, 4).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${category.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  View all →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why Team X" title="Your Transformation Partner">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.slice(0, 3).map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <FeatureCard
                title={item.title}
                description={item.description}
                iconName={item.icon}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our Approach"
        title="Transformation Delivery Process"
        centered
        className="bg-surface/50"
      >
        <ProcessSteps steps={deliverySteps} />
      </Section>

      <CTABanner
        title="Start your transformation journey"
        description="Whether you're modernizing legacy systems or building new digital capabilities, we'll help you define the roadmap and execute with confidence."
        primaryLabel="Book a Strategy Session"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
