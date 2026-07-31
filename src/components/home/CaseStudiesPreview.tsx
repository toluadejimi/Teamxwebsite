import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { getFeaturedCaseStudies } from "@/lib/data/case-studies";

export function CaseStudiesPreview() {
  const caseStudies = getFeaturedCaseStudies(3);

  return (
    <Section
      id="case-studies"
      eyebrow="Case Studies"
      title="Outcomes that speak for themselves"
      description="Real transformations for banks, governments, and healthcare networks — with measurable impact documented every step of the way."
      className="bg-surface/30"
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <Reveal key={study.slug} delay={index * 0.1}>
            <Link
              href={`/case-studies/${study.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge>{study.industry}</Badge>
                  <Badge variant="muted">{study.duration}</Badge>
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {study.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {study.summary}
                </p>

                {study.metrics[0] && (
                  <div className="mt-5 rounded-xl border border-border bg-background p-4">
                    <p className="font-display text-2xl font-semibold text-accent">
                      {study.metrics[0].value}
                    </p>
                    <p className="text-xs text-muted">{study.metrics[0].label}</p>
                  </div>
                )}

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-12 text-center">
        <Button href="/case-studies" variant="outline" size="lg">
          View All Case Studies
        </Button>
      </Reveal>
    </Section>
  );
}
