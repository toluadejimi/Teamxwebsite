import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getPortfolioBySlug, portfolioProjects } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={project.title}
        description={project.description}
        backgroundImage={project.image}
        eyebrow={project.industry}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.client },
        ]}
      />

      <Section className="pt-8">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Badge>{project.industry}</Badge>
            <Badge variant="muted">{project.duration}</Badge>
            <Badge variant="outline">Client: {project.client}</Badge>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Gallery" title="Project Highlights" className="bg-surface/50 pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {project.gallery.map((image, index) => (
            <Reveal key={image} delay={index * 0.06}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="The Challenge" title="Business Challenge">
        <Reveal>
          <p className="max-w-4xl text-base leading-relaxed text-muted md:text-lg">
            {project.challenge}
          </p>
        </Reveal>
      </Section>

      <Section eyebrow="Our Solution" title="How We Delivered" className="bg-surface/50">
        <Reveal>
          <p className="max-w-4xl text-base leading-relaxed text-muted md:text-lg">
            {project.solution}
          </p>
        </Reveal>
      </Section>

      <Section eyebrow="Results" title="Measurable Outcomes">
        <Reveal>
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 md:p-10">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {project.outcome}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Technology" title="Tech Stack" className="bg-surface/50">
        <div className="flex flex-wrap gap-2">
          {project.technology.map((tech, index) => (
            <Reveal key={tech} delay={index * 0.03}>
              <Badge variant="outline" className="px-3 py-1.5 text-sm">
                {tech}
              </Badge>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Features" title="Key Capabilities Delivered">
        <div className="grid gap-3 sm:grid-cols-2">
          {project.features.map((feature, index) => (
            <Reveal key={feature} delay={index * 0.04}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-muted md:text-base">{feature}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Build something similar?"
        description={`Interested in a ${project.industry.toLowerCase()} solution like ${project.client}'s? Let's explore what's possible for your organization.`}
        primaryLabel="Discuss Your Project"
        primaryHref="/contact"
        secondaryLabel="View All Projects"
        secondaryHref="/portfolio"
      />
    </>
  );
}
