import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { createPageMetadata } from "@/lib/seo";
import { faqs } from "@/lib/data";
import type { FAQ } from "@/lib/data";

const additionalFaqs: FAQ[] = [
  {
    question: "How do I request a project quote?",
    answer:
      "Visit our Request a Quote page to share your project requirements, budget range, and timeline. Our solutions team will respond with a tailored proposal within 2–3 business days. You can also book a demo to discuss your needs in detail.",
  },
  {
    question: "Do you offer fixed-price or time-and-materials engagements?",
    answer:
      "Both. Fixed-scope projects work well when requirements are well-defined. Time-and-materials or dedicated squad models suit evolving enterprise programs. We recommend the appropriate model during discovery based on your goals and risk tolerance.",
  },
  {
    question: "What security certifications does Team X hold?",
    answer:
      "Team X maintains ISO 27001 certification and SOC 2 Type II compliance. We follow secure development lifecycle practices including code reviews, penetration testing, and vulnerability scanning on every enterprise engagement.",
  },
  {
    question: "Can Team X work with our existing development team?",
    answer:
      "Yes. We frequently augment client teams with specialized engineers, architects, and QA professionals. We integrate with your tools, processes, and ceremonies while bringing domain expertise and engineering standards.",
  },
  {
    question: "What is your payment structure?",
    answer:
      "Payment terms vary by engagement model. Fixed projects typically use milestone-based invoicing tied to deliverables. Dedicated teams bill monthly. We discuss terms transparently during proposal and contract negotiation.",
  },
  {
    question: "How do I schedule a consultation or demo?",
    answer:
      "Use our Book a Demo page to select a preferred date and time, or contact us directly at hello@teamxtech.com. We offer consultations via video call with options for on-site meetings at our Lagos or Abuja offices.",
  },
];

const allFaqs = [...faqs, ...additionalFaqs];

export const metadata = createPageMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions about Team X Technologies — project engagement, timelines, support, pricing, security, and how we work with enterprise clients.",
  path: "/faqs",
  keywords: ["FAQ", "questions", "enterprise software", "Team X Technologies"],
});

export default function FAQsPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Everything you need to know about working with Team X — from engagement models and timelines to support and security."
        eyebrow="FAQs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
      />

      <Section
        eyebrow={`${allFaqs.length} questions`}
        title="Common questions"
        description="Can't find what you're looking for? Our team is happy to help."
      >
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={allFaqs} allowMultiple />
        </div>
      </Section>

      <CTABanner
        title="Still have questions?"
        description="Speak with our team about your specific requirements. No obligation, just honest guidance."
        primaryLabel="Contact us"
        primaryHref="/contact"
        secondaryLabel="Request a quote"
        secondaryHref="/request-quote"
      />
    </>
  );
}
