import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  centered?: boolean;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export function Section({
  children,
  eyebrow,
  title,
  description,
  centered = false,
  className,
  id,
  containerClassName,
}: SectionProps) {
  const hasHeader = eyebrow || title || description;

  return (
    <section id={id} className={cn("py-16 md:py-24 lg:py-28", className)}>
      <Container className={containerClassName}>
        {hasHeader && (
          <header
            className={cn(
              "mb-12 md:mb-16 max-w-3xl",
              centered && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed text-muted md:text-lg text-balance",
                  centered && "mx-auto"
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
