import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

const phases = [
  { key: "challenge", label: "Challenge", title: "The Challenge" },
  { key: "planning", label: "Planning", title: "Discovery & Planning" },
  { key: "design", label: "Design", title: "UX & Design" },
  { key: "architecture", label: "Architecture", title: "Technical Architecture" },
  { key: "development", label: "Development", title: "Agile Development" },
  { key: "testing", label: "Testing", title: "Quality Assurance" },
  { key: "deployment", label: "Deployment", title: "Rollout & Deployment" },
  { key: "results", label: "Results", title: "Outcomes & Impact" },
] as const;

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      images: [{ url: study.image }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={study.title}
        description={study.summary}
        backgroundImage={study.image}
        eyebrow={study.industry}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.client },
        ]}
      />

      <Section className="pt-8">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Badge>{study.industry}</Badge>
            <Badge variant="muted">{study.service}</Badge>
            <Badge variant="outline">{study.duration}</Badge>
            <Badge variant="outline">{study.teamSize} team members</Badge>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Key Metrics" title="Results at a Glance" centered className="bg-surface/50">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {study.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6 text-center">
                <p className="font-display text-3xl font-semibold text-accent md:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{metric.label}</p>
                {metric.description && (
                  <p className="mt-1 text-xs text-muted">{metric.description}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {phases.map((phase, phaseIndex) => (
        <Section
          key={phase.key}
          eyebrow={phase.label}
          title={phase.title}
          className={phaseIndex % 2 === 1 ? "bg-surface/50" : undefined}
        >
          <Reveal>
            <p className="max-w-4xl text-base leading-relaxed text-muted md:text-lg">
              {study[phase.key]}
            </p>
          </Reveal>
        </Section>
      ))}

      <Section eyebrow="Testimonial" title="Client Perspective" className="bg-surface/50">
        <Reveal>
          <blockquote className="relative rounded-2xl border border-border bg-surface p-8 md:p-12">
            <Quote className="absolute left-6 top-6 h-8 w-8 text-accent/30 md:left-8 md:top-8" />
            <p className="relative text-base leading-relaxed text-muted md:text-lg lg:text-xl">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <footer className="relative mt-6 border-t border-border pt-6">
              <p className="font-display font-semibold text-foreground">
                {study.testimonial.author}
              </p>
              <p className="text-sm text-muted">
                {study.testimonial.role}, {study.testimonial.company}
              </p>
            </footer>
          </blockquote>
        </Reveal>
      </Section>

      <Section eyebrow="Technology" title="Technologies Used">
        <div className="flex flex-wrap gap-2">
          {study.technologies.map((tech, index) => (
            <Reveal key={tech} delay={index * 0.03}>
              <Badge variant="outline" className="px-3 py-1.5 text-sm">
                {tech}
              </Badge>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </Section>

      <CTABanner
        title="Achieve similar results"
        description={`Let's explore how Team X can deliver transformation outcomes for your ${study.industry.toLowerCase()} organization.`}
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="More Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
