import { Calendar } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Team X Technologies in Nigeria. Reach our Lagos and Abuja offices for sales, support, and partnerships.",
  path: "/contact",
  keywords: ["contact", "Lagos", "Abuja", "Nigeria", "Team X Technologies"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Build Something Great"
        description="Whether you're exploring a new project or need support on an existing engagement, our Nigeria team is ready to help."
        eyebrow="Contact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <Section className="border-b border-border">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Get in touch
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              Reach us through any channel below. We typically respond within one
              business day. Contact details are managed from the admin console.
            </p>

            <ContactInfoPanel />

            <div
              id="schedule"
              className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6"
            >
              <Calendar className="mb-3 h-6 w-6 text-accent" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Schedule a call
              </h3>
              <p className="mt-2 text-sm text-muted">
                Book a 30-minute consultation with our solutions team.
              </p>
              <Button href="/book-demo" className="mt-4">
                Book a demo
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <ContactMapSection />
    </>
  );
}
