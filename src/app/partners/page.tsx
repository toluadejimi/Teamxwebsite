import { Cloud, Cpu } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { createPageMetadata } from "@/lib/seo";
import { partners } from "@/lib/data";

const categoryIcons: Record<string, typeof Cloud> = {
  Cloud,
  Technology: Cpu,
};

export const metadata = createPageMetadata({
  title: "Partners",
  description:
    "Team X Technologies partners with AWS, Microsoft Azure, Google Cloud, Oracle, Flutter, and MongoDB to deliver enterprise-grade solutions.",
  path: "/partners",
  keywords: ["partners", "AWS", "Azure", "Google Cloud", "Team X Technologies"],
});

export default function PartnersPage() {
  const categories = [...new Set(partners.map((p) => p.category))];

  return (
    <>
      <PageHero
        title="Technology & Cloud Partners"
        description="We collaborate with leading technology providers to architect, deploy, and optimize enterprise solutions at scale."
        eyebrow="Partners"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners" },
        ]}
      />

      {categories.map((category, catIndex) => {
        const categoryPartners = partners.filter((p) => p.category === category);
        const Icon = categoryIcons[category] ?? Cloud;

        return (
          <Section
            key={category}
            eyebrow={category}
            title={`${category} partners`}
            className={catIndex % 2 === 1 ? "bg-surface/50" : undefined}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm text-muted">
                Certified partnerships enabling secure, scalable deployments
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryPartners.map((partner, index) => (
                <Reveal key={partner.name} delay={index * 0.05}>
                  <article className="h-full rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.1)]">
                    <Badge variant="outline" className="mb-4">
                      {partner.category}
                    </Badge>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {partner.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {partner.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      <Section
        eyebrow="Certifications"
        title="Industry recognition"
        description="Our certifications and partner status reflect our commitment to engineering excellence and client outcomes."
        className="border-t border-border bg-surface/50"
        centered
      >
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "AWS Advanced Consulting Partner",
            "Microsoft Gold Partner",
            "ISO 27001 Certified",
            "SOC 2 Type II",
          ].map((cert) => (
            <Badge key={cert} className="px-4 py-2 text-sm">
              {cert}
            </Badge>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Partner with Team X"
        description="Leverage our certified expertise to accelerate your cloud and digital transformation initiatives."
        primaryLabel="Become a partner"
        primaryHref="/contact"
        secondaryLabel="View services"
        secondaryHref="/services"
      />
    </>
  );
}
