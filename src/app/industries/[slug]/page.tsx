import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  getIndustryBySlug,
  getServicesByCategory,
  getPortfolioByIndustry,
  industries,
} from "@/lib/data";
import { readCms } from "@/lib/cms/store";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

const industryServiceMap: Record<string, string> = {
  "financial-services": "financial-solutions",
  healthcare: "healthcare",
  government: "government",
  education: "education",
  hospitality: "hospitality",
  retail: "retail",
  logistics: "logistics",
  manufacturing: "enterprise-software",
};

const industryInsights: Record<string, { challenges: string[]; outcomes: string[] }> = {
  "financial-services": {
    challenges: [
      "Legacy core systems blocking digital channel innovation",
      "Regulatory reporting complexity across multiple jurisdictions",
      "Financial inclusion gaps in underserved communities",
    ],
    outcomes: [
      "Real-time transaction processing at scale",
      "Automated compliance and audit-ready reporting",
      "Agency banking networks reaching rural markets",
    ],
  },
  healthcare: {
    challenges: [
      "Fragmented patient records across facilities",
      "Revenue leakage from manual billing processes",
      "Clinical workflow inefficiencies impacting care quality",
    ],
    outcomes: [
      "Unified electronic health records with HL7/FHIR interoperability",
      "Automated revenue cycle management",
      "Telemedicine enabling remote specialist access",
    ],
  },
  government: {
    challenges: [
      "Citizen service bottlenecks and long queue times",
      "Paper-based processes prone to loss and delays",
      "Siloed agency systems preventing data sharing",
    ],
    outcomes: [
      "Self-service portals reducing processing times by 70%",
      "Digital payment adoption increasing revenue collection",
      "Transparent service level reporting for accountability",
    ],
  },
  education: {
    challenges: [
      "Disconnected systems for admissions, academics, and finance",
      "Manual enrollment processes creating bottlenecks",
      "Limited visibility into student performance trends",
    ],
    outcomes: [
      "Unified portals serving entire student lifecycle",
      "Automated admissions and registration workflows",
      "Data-driven early intervention for at-risk students",
    ],
  },
  hospitality: {
    challenges: [
      "Overbookings and inventory sync issues across channels",
      "Revenue leakage from inconsistent rate management",
      "Guest experience gaps from operational inefficiencies",
    ],
    outcomes: [
      "Centralized PMS with channel manager integration",
      "Dynamic pricing maximizing RevPAR",
      "Mobile-first guest experiences from booking to checkout",
    ],
  },
  retail: {
    challenges: [
      "Disconnected online and in-store inventory systems",
      "No unified customer view for personalization",
      "Low loyalty program engagement",
    ],
    outcomes: [
      "Omnichannel commerce with real-time inventory sync",
      "Unified customer profiles driving personalized offers",
      "Loyalty programs integrated across all touchpoints",
    ],
  },
  logistics: {
    challenges: [
      "Limited fleet visibility causing delivery delays",
      "Inefficient routing increasing fuel costs",
      "Unplanned vehicle breakdowns disrupting operations",
    ],
    outcomes: [
      "Real-time GPS tracking across entire fleet",
      "AI-powered route optimization reducing costs",
      "Predictive maintenance preventing failures",
    ],
  },
  manufacturing: {
    challenges: [
      "Spreadsheet-based planning causing material waste",
      "No real-time WIP visibility across factories",
      "Lengthy month-end financial close cycles",
    ],
    outcomes: [
      "Integrated ERP with production planning engines",
      "Barcode-based WIP tracking for accuracy",
      "Automated financial consolidation across entities",
    ],
  },
};

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.name} Solutions`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const Icon = getIcon(industry.icon);
  const categorySlug = industryServiceMap[slug] ?? "enterprise-software";
  const relatedServices = getServicesByCategory(categorySlug).slice(0, 6);
  const portfolioItems = getPortfolioByIndustry(industry.name).slice(0, 3);
  const cms = await readCms();
  const relatedCaseStudies = cms.caseStudies
    .filter((study) => study.active !== false && study.industry === industry.name)
    .slice(0, 2);
  const insights = industryInsights[slug];

  return (
    <>
      <PageHero
        title={`${industry.name} Solutions`}
        description={industry.description}
        eyebrow="Industry Expertise"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
      </PageHero>

      {insights && (
        <Section eyebrow="Sector Landscape" title="Challenges We Address">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Common Challenges
                </h3>
                <ul className="mt-4 space-y-3">
                  {insights.challenges.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Outcomes We Deliver
                </h3>
                <ul className="mt-4 space-y-3">
                  {insights.outcomes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      <Section
        eyebrow="Our Services"
        title={`${industry.name} Software Solutions`}
        description="Purpose-built platforms and custom development tailored to the workflows, regulations, and stakeholders in your sector."
        className="bg-surface/50"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <ServiceCard
                title={service.title}
                description={service.shortDescription}
                image={service.bannerImage}
                href={`/services/${service.slug}`}
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href={`/services?category=${categorySlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              View all {industry.name.toLowerCase()} services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>

      {portfolioItems.length > 0 && (
        <Section eyebrow="Our Work" title="Featured Projects">
          <div className="grid gap-6 md:grid-cols-3">
            {portfolioItems.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ServiceCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  badge={project.client}
                  href={`/portfolio/${project.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {relatedCaseStudies.length > 0 && (
        <Section
          eyebrow="Deep Dives"
          title="Related Case Studies"
          className="bg-surface/50"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {relatedCaseStudies.map((study, index) => (
              <Reveal key={study.slug} delay={index * 0.08}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30 md:p-8"
                >
                  <Badge variant="muted">{study.duration}</Badge>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-3">
                    {study.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read case study <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABanner
        title={`Accelerate your ${industry.name.toLowerCase()} transformation`}
        description="Partner with engineers who understand your industry's complexity and deliver solutions that meet regulatory and operational demands."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="Our Process"
        secondaryHref="/process"
      />
    </>
  );
}
