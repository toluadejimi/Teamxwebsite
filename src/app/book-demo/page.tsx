import { CalendarDays, Clock, Video } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/shared/Reveal";
import { DemoBookingForm } from "@/components/forms/DemoBookingForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Book a Demo",
  description:
    "Schedule a personalized demo with Team X Technologies. Explore enterprise software solutions for banking, healthcare, government, and more.",
  path: "/book-demo",
  keywords: ["demo", "consultation", "schedule", "Team X Technologies"],
});

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        title="Book a Personalized Demo"
        description="See how Team X delivers enterprise software that drives measurable outcomes. Choose a time that works for you."
        eyebrow="Schedule"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Book a Demo" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                What to expect
              </h2>
              <ul className="space-y-5">
                {[
                  {
                    icon: Video,
                    title: "30-minute video call",
                    desc: "Meet with a solutions architect to discuss your needs.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Tailored walkthrough",
                    desc: "Relevant case studies and capabilities for your industry.",
                  },
                  {
                    icon: Clock,
                    title: "No pressure",
                    desc: "Honest guidance on fit, timeline, and investment — no hard sell.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <DemoBookingForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
