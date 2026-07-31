import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { partners } from "@/lib/data";

export function PartnersSection() {
  const categories = [...new Set(partners.map((p) => p.category))];

  return (
    <Section
      id="partners"
      eyebrow="Partners & Alliances"
      title="Powered by world-class technology partners"
      description="Certified partnerships with leading cloud providers and technology vendors ensure our solutions are built on proven, enterprise-grade foundations."
      className="bg-surface/30"
    >
      <div className="grid gap-8">
        {categories.map((category, catIndex) => {
          const categoryPartners = partners.filter(
            (p) => p.category === category
          );

          return (
            <Reveal key={category} delay={catIndex * 0.1}>
              <div>
                <Badge variant="muted" className="mb-4">
                  {category}
                </Badge>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryPartners.map((partner) => (
                    <div
                      key={partner.name}
                      className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
                    >
                      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {partner.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {partner.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
