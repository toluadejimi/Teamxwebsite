import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Team X Technologies in Nigeria. Email hello@teamxtech.com or visit our Lagos and Abuja offices.",
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
              Reach us through any channel below. We typically respond within one business day.
              Contact details are managed from the admin console.
            </p>

            <ContactInfoPanel />

            <div id="schedule" className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
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

      <Section className="border-t border-border bg-surface/50" eyebrow="Map" title="Find us in Lagos">
        <Reveal>
          <div
            className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/5 via-surface to-background"
            role="img"
            aria-label="Map placeholder showing Team X headquarters in Lagos, Nigeria"
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            </div>
            <div className="relative text-center">
              <MapPin className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden />
              <p className="font-display text-lg font-semibold text-foreground">
                Lagos Headquarters
              </p>
              <p className="mt-1 text-sm text-muted">Lekki Phase 1, Lagos, Nigeria</p>
              <Link
                href="https://maps.google.com/?q=Lekki+Phase+1+Lagos+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-accent hover:underline"
              >
                Open in Google Maps
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
