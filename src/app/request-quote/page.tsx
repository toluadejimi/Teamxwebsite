import { FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/shared/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Request a Quote",
  description:
    "Request a tailored project quote from Team X Technologies. Share your requirements, budget, and timeline for enterprise software development.",
  path: "/request-quote",
  keywords: ["quote", "proposal", "enterprise software", "project estimate"],
});

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        title="Request a Project Quote"
        description="Tell us about your project and we'll provide a detailed proposal with scope, timeline, and investment estimate."
        eyebrow="Get a quote"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request a Quote" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="sticky top-28 space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                What happens next?
              </h2>
              <ol className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Review",
                    desc: "Our solutions team reviews your requirements within 1 business day.",
                  },
                  {
                    step: "2",
                    title: "Discovery call",
                    desc: "A 30-minute call to clarify scope, constraints, and success criteria.",
                  },
                  {
                    step: "3",
                    title: "Proposal",
                    desc: "Detailed quote with scope, timeline, team composition, and investment.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-semibold text-accent">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="rounded-xl border border-border bg-surface p-5">
                <FileText className="mb-2 h-5 w-5 text-accent" aria-hidden />
                <p className="text-sm text-muted">
                  All proposals include NDA protection. Your information is kept confidential.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
