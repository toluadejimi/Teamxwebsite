import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-24">
      <GradientOrb className="absolute -left-40 top-1/4 h-96 w-96 opacity-20" />
      <GradientOrb
        className="absolute -right-40 bottom-1/4 h-80 w-80 opacity-15"
        variant="secondary"
      />

      <Container className="relative text-center">
        <p className="font-display text-8xl font-bold tracking-tighter text-accent/20 md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back on track.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" aria-hidden />
            Back to home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact support
          </Button>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm md:p-8">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
            <Search className="h-4 w-4 text-accent" aria-hidden />
            Popular destinations
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Services", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "FAQs", href: "/faqs" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Go back
        </Link>
      </Container>
    </div>
  );
}
