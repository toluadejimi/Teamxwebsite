import type { Metadata } from "next";
import {
  getTechnologyCategories,
  getTechnologiesByCategory,
  partners,
  technologies,
} from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "Team X Technologies tech stack — languages, frontend, mobile, backend, databases, cloud, DevOps, integration, and AI/ML capabilities.",
};

const categoryDescriptions: Record<string, string> = {
  Languages: "Polyglot engineering teams fluent in modern languages for every layer of the stack.",
  Frontend: "Responsive, accessible interfaces built with component-driven architectures.",
  Mobile: "Native and cross-platform mobile apps engineered for performance and engagement.",
  Backend: "Scalable server-side systems with API-first design and microservices patterns.",
  Databases: "Relational and document stores optimized for transactional and analytical workloads.",
  Cloud: "Multi-cloud expertise across AWS, Azure, and Google Cloud Platform.",
  DevOps: "Infrastructure as code, container orchestration, and automated delivery pipelines.",
  Integration: "Event-driven architectures connecting enterprise systems at scale.",
  "AI/ML": "Production machine learning pipelines, LLM applications, and intelligent automation.",
};

export default function TechnologiesPage() {
  const categories = getTechnologyCategories();

  return (
    <>
      <PageHero
        title="Technology Stack"
        description="We select technologies based on your requirements—not our preferences—combining proven enterprise stacks with cutting-edge capabilities where they add value."
        eyebrow="Engineering"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technologies" },
        ]}
      />

      <Section eyebrow="Overview" title={`${technologies.length} Technologies Across ${categories.length} Categories`} centered>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="muted" className="px-3 py-1">
              {category}
            </Badge>
          ))}
        </div>
      </Section>

      {categories.map((category, categoryIndex) => {
        const techs = getTechnologiesByCategory(category);
        return (
          <Section
            key={category}
            id={category.toLowerCase().replace(/\//g, "-")}
            eyebrow={category}
            title={category}
            description={categoryDescriptions[category]}
            className={categoryIndex % 2 === 1 ? "bg-surface/50" : undefined}
          >
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {techs.map((tech, index) => (
                <Reveal key={tech.name} delay={index * 0.03}>
                  <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30 hover:bg-accent/5">
                    <p className="font-medium text-foreground">{tech.name}</p>
                    <p className="mt-1 text-xs text-muted">{tech.category}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      <Section
        eyebrow="Partnerships"
        title="Certified Technology Partners"
        description="Our partnerships with leading cloud and technology vendors ensure access to the latest capabilities, support, and best practices."
        className="bg-surface/50"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                <Badge variant="muted">{partner.category}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {partner.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Need the right tech stack for your project?"
        description="Our architects will recommend technologies aligned with your scalability, security, and team capabilities."
        primaryLabel="Talk to an Architect"
        primaryHref="/contact"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
