import Link from "next/link";
import {
  Globe,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { Reveal } from "@/components/shared/Reveal";
import { CareersApplyForm } from "@/components/forms/CareersApplyForm";
import { CareersJobsList } from "@/components/careers/CareersJobsList";
import { getIcon } from "@/lib/icons";
import { createPageMetadata } from "@/lib/seo";
import {
  careersPageContent,
  companyBenefits,
  culturePoints,
  hiringProcess,
} from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Careers",
  description:
    "Join Team X Technologies in Nigeria. Explore open roles, benefits, culture, and our hiring process.",
  path: "/careers",
  keywords: ["careers", "jobs", "engineering jobs", "Lagos", "Team X Technologies"],
});

export default function CareersPage() {
  const { hero, whyJoin } = careersPageContent;

  return (
    <>
      <PageHero
        title={hero.title}
        description={hero.subtitle}
        backgroundImage={hero.image}
        eyebrow="Careers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#open-roles" size="lg">
            View open roles
          </Button>
          <Button href="#apply" variant="outline" size="lg">
            Apply now
          </Button>
        </div>
      </PageHero>

      <Section
        eyebrow="Why join us"
        title={whyJoin.title}
        description={whyJoin.description}
        className="border-b border-border bg-surface/50"
      />

      <Section eyebrow="Our culture" title="How we work together" centered>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {culturePoints.map((point, index) => {
            const Icon = getIcon(point.icon);
            return (
              <Reveal key={point.title} delay={index * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.12)]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Benefits"
        title="What we offer"
        description="Competitive packages designed for engineers and creatives building enterprise software in Nigeria."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companyBenefits.map((benefit, index) => {
            const Icon = getIcon(benefit.icon);
            return (
              <Reveal key={benefit.title} delay={index * 0.04}>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <Icon className="mb-3 h-5 w-5 text-accent" aria-hidden />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{benefit.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        id="open-roles"
        eyebrow="Open positions"
        title="Current opportunities"
        description="Roles are managed from the Team X admin console and updated in real time."
      >
        <CareersJobsList />
      </Section>

      <Section
        eyebrow="Remote work"
        title="Work from Nigeria — or remotely"
        description="Team X is Nigeria-based with remote-friendly roles. Hub offices in Lagos and Abuja."
        className="border-y border-border bg-surface/50"
        centered
      >
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
          {[
            { icon: Globe, label: "Remote-friendly", desc: "Flexible hours across Nigeria" },
            { icon: Users, label: "Local teams", desc: "Collaborate with engineers nationwide" },
            { icon: MapPin, label: "Hub offices", desc: "Lagos & Abuja" },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display font-semibold text-foreground">{item.label}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Early careers"
        title="Graduate & internship programs"
        description="Launch your career with structured mentorship, real project experience, and a path to full-time roles."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-8">
              <GraduationCap className="mb-4 h-8 w-8 text-accent" aria-hidden />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Graduate Engineering Program
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                A 12-month program for new graduates. Rotate across product squads, ship production code, and grow under senior mentorship in Lagos.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface p-8">
              <Users className="mb-4 h-8 w-8 text-accent" aria-hidden />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Internship Program
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                Paid internships for students and recent grads. Work on real client systems with coaching from Team X engineers.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="Hiring process"
        title="How we hire"
        description="A transparent process designed to evaluate skill and culture fit."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hiringProcess.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <span className="font-mono text-xs text-accent">
                  Step {step.step} · {step.duration}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="apply" eyebrow="Apply" title="Send your application" centered>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 md:p-10">
          <CareersApplyForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Prefer email? Write to{" "}
          <Link href="mailto:careers@teamxtech.com" className="text-accent hover:underline">
            careers@teamxtech.com
          </Link>
        </p>
      </Section>

      <CTABanner
        primaryHref="#apply"
        primaryLabel="Apply now"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
