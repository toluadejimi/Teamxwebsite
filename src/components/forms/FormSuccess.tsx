import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSuccessProps {
  title: string;
  message: string;
  className?: string;
}

export function FormSuccess({ title, message, className }: FormSuccessProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-accent/20 bg-accent/5 px-6 py-12 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
        <CheckCircle2 className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{message}</p>
    </div>
  );
}
