import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  accent: "bg-accent/10 text-accent border-accent/20",
  muted: "bg-surface text-muted border-border",
  outline: "bg-transparent text-foreground border-border",
} as const;

export type BadgeVariant = keyof typeof variants;

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "accent",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
