import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  eyebrow?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  backgroundImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  eyebrow,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border pt-28 pb-16 md:pt-36 md:pb-24",
        className
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover opacity-20 dark:opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </>
      )}

      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 text-muted/50" aria-hidden />
                    )}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-accent"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-foreground" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}

        <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg lg:text-xl text-balance">
            {description}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
