import type { Metadata } from "next";
import { portfolioProjects } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { ServiceCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore 18+ enterprise software projects delivered by Team X Technologies across banking, healthcare, government, education, and more.",
};

export default function PortfolioPage() {
  const industries = [...new Set(portfolioProjects.map((p) => p.industry))];

  return (
    <>
      <PageHero
        title="Our Portfolio"
        description="Two hundred fifty-plus enterprise projects across Africa and beyond—each delivering measurable outcomes for organizations where failure isn't an option."
        eyebrow="Our Work"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio" },
        ]}
      />

      <Section eyebrow="Industries" title="Projects by Sector" centered>
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((industry) => (
            <Badge key={industry} variant="muted" className="px-3 py-1">
              {industry}
            </Badge>
          ))}
        </div>
      </Section>

      <Section
        title={`${portfolioProjects.length} Enterprise Projects`}
        description="From core banking modernization to citizen portals and telemedicine networks—explore the depth and breadth of our delivery experience."
        className="bg-surface/50 pt-0"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 6) * 0.05}>
              <ServiceCard
                title={project.title}
                description={project.description}
                image={project.image}
                badge={project.industry}
                href={`/portfolio/${project.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Want results like these?"
        description="Let's discuss how Team X can deliver similar outcomes for your organization."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
        secondaryLabel="Read Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
