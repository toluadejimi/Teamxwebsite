import { LogoCloud } from "@/components/ui/LogoCloud";
import { testimonials, partners } from "@/lib/data";

const enterpriseLogos = [
  ...testimonials.map((t) => t.company),
  ...partners.slice(0, 4).map((p) => p.name),
];

export function TrustedCompanies() {
  return (
    <section className="border-y border-border/60 bg-surface/30">
      <LogoCloud
        logos={enterpriseLogos}
        title="Trusted by leading enterprises"
      />
    </section>
  );
}
