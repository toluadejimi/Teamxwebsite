import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  aboutContent,
  awards,
  company,
  leadership,
  mission,
  partners,
  stats,
  timeline,
  values,
  vision,
  whyChooseUs,
} from "@/lib/data";
import { readCms } from "@/lib/cms/store";
import { getIcon } from "@/lib/icons";
import { parseStatValue } from "@/lib/parse-stat";
import { Reveal } from "@/components/shared/Reveal";
import { WorldMap } from "@/components/shared/WorldMap";
import { CTABanner } from "@/components/ui/CTABanner";
import { FeatureCard } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { StatGrid } from "@/components/ui/StatCounter";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "    Learn about Team X Technologies — our mission, leadership, values, and presence across Nigeria delivering enterprise software since 2013.",
};

const cultureHighlights = [
  {
    title: "Engineering-First Mindset",
    description:
      "We invest in craftsmanship, code quality, and continuous learning. Engineers lead architecture decisions and mentor junior talent through structured growth paths.",
  },
  {
    title: "Client-Embedded Teams",
    description:
      "Our squads work alongside your stakeholders—not in isolation. Weekly demos, transparent backlogs, and shared Slack channels keep everyone aligned on outcomes.",
  },
  {
    title: "Diverse & Inclusive",
    description:
      "With teams across Lagos and Abuja, we bring deep local expertise to enterprise challenges. Diversity of thought drives better solutions for complex problems.",
  },
  {
    title: "Impact Over Output",
    description:
      "We measure success by business outcomes—reduced processing times, increased revenue, improved patient care—not lines of code shipped.",
  },
];

const officeMapDots = [
  { x: 310, y: 210, label: "Lagos", size: 5 },
  { x: 318, y: 195, label: "Abuja", size: 4 },
];

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const cms = await readCms();
  const companyOffices = cms.contact.offices;
  const statItems = stats.map((stat) => {
    const parsed = parseStatValue(stat.value);
    return {
      value: parsed.value,
      suffix: `${parsed.suffix}${stat.suffix ?? ""}`,
      prefix: parsed.prefix,
      decimals: parsed.decimals,
      label: stat.label,
    };
  });

  return (
    <>
      <PageHero
        title={aboutContent.hero.title}
        description={aboutContent.hero.subtitle}
        backgroundImage={aboutContent.hero.image}
        eyebrow="About Team X"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <Section eyebrow="By the Numbers" title="A Decade of Enterprise Delivery" centered>
        <StatGrid stats={statItems} className="max-w-5xl mx-auto" />
      </Section>

      <Section
        eyebrow="Our Story"
        title={aboutContent.story.title}
        className="bg-surface/50"
      >
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {aboutContent.story.content.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src={aboutContent.hero.image}
                alt="Team X Technologies team collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Purpose" title="Mission & Vision">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-surface p-8 md:p-10">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {mission.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {mission.statement}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-10">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {vision.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {vision.statement}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="What We Stand For"
        title="Our Core Values"
        centered
        className="bg-surface/50"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = getIcon(value.icon);
            return (
              <Reveal key={value.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="leadership" eyebrow="Leadership" title="Meet Our Executive Team">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((leader, index) => (
            <Reveal key={leader.name} delay={index * 0.08}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{leader.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-4">
                    {leader.bio}
                  </p>
                  {leader.linkedin && (
                    <Link
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-accent hover:underline"
                    >
                      LinkedIn →
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our Journey"
        title="Company Timeline"
        centered
        className="bg-surface/50"
      >
        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block"
            aria-hidden
          />
          <ol className="space-y-10">
            {timeline.map((event, index) => (
              <Reveal key={event.year} delay={index * 0.06}>
                <li className="relative md:grid md:grid-cols-2 md:gap-8">
                  <div
                    className={`md:text-right ${index % 2 === 1 ? "md:col-start-2 md:row-start-1" : ""}`}
                  >
                    <Badge className="mb-2">{event.year}</Badge>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                      {event.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Recognition" title="Awards & Accolades">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <Reveal key={award.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
                <Badge variant="muted">{award.year}</Badge>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {award.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {award.organization}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {award.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Life at Team X"
        title="Our Culture"
        description="We build software that matters—and we build it in an environment where people thrive, learn, and grow together."
        centered
        className="bg-surface/50"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {cultureHighlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8 text-left">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="The Team X Difference" title="Why Choose Us">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
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
        id="global-presence"
        eyebrow="Global Reach"
        title="Our Offices Worldwide"
        description={`Headquartered in Lagos since ${company.founded}, Team X serves clients across Africa, Europe, and beyond with on-site and remote delivery capabilities.`}
        className="bg-surface/50"
      >
        <Reveal>
          <WorldMap dots={officeMapDots} className="mb-12 max-w-4xl mx-auto opacity-80" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {companyOffices.map((office, index) => (
            <Reveal key={office.city} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-8">
                {office.isHeadquarters && (
                  <Badge className="mb-3">Headquarters</Badge>
                )}
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {office.city}, {office.country}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {office.address}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                      {office.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`mailto:${office.email}`} className="hover:text-accent">
                      {office.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="partners" eyebrow="Ecosystem" title="Technology Partners">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6">
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
        title="Ready to partner with Team X?"
        description="Let's discuss how our engineering expertise and domain knowledge can accelerate your digital transformation."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Our Work"
        secondaryHref="/portfolio"
      />
    </>
  );
}
