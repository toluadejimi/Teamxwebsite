import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { faqs } from "@/lib/data";

export function FAQSection() {
  const homeFaqs = faqs.slice(0, 6);

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Common questions"
      description="Everything you need to know about working with Team X Technologies — from engagement models to post-launch support."
      className="bg-surface/30"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <FAQAccordion items={homeFaqs} />
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="text-sm text-muted">
            Have a specific question?{" "}
            <Button href="/contact" variant="ghost" size="sm" className="inline-flex h-auto p-0 text-accent">
              Get in touch
            </Button>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
