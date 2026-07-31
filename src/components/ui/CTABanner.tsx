import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Button } from "./Button";
import { GradientOrb } from "@/components/shared/GradientOrb";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTABanner({
  title = "Ready to transform your business?",
  description = "Partner with Team X Technologies to build scalable, secure, and future-ready digital solutions tailored to your industry.",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
  secondaryLabel = "View Case Studies",
  secondaryHref = "/case-studies",
  className,
}: CTABannerProps) {
  return (
    <section className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      <GradientOrb className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 opacity-30" />
      <GradientOrb className="absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 opacity-20" variant="secondary" />

      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_60%)]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg text-balance">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primaryHref} size="lg">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={secondaryHref} variant="outline" size="lg">
                {secondaryLabel}
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted">
              No commitment required.{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Talk to an expert
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
