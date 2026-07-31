import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClassName =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50";

export const selectClassName =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

export const textareaClassName =
  "w-full min-h-[120px] resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";
