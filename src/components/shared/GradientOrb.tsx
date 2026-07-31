"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  variant?: "primary" | "secondary";
  animate?: boolean;
}

export function GradientOrb({
  className,
  variant = "primary",
  animate = true,
}: GradientOrbProps) {
  const colors =
    variant === "primary"
      ? "from-accent/30 via-accent/10 to-transparent"
      : "from-accent/20 via-transparent to-accent/5";

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none rounded-full bg-gradient-radial blur-3xl",
        `bg-gradient-to-br ${colors}`,
        className
      )}
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
    />
  );
}

interface GradientOrbGroupProps {
  className?: string;
}

export function GradientOrbGroup({ className }: GradientOrbGroupProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <GradientOrb className="absolute -left-20 top-20 h-72 w-72" />
      <GradientOrb className="absolute -right-20 bottom-20 h-96 w-96" variant="secondary" />
      <GradientOrb className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-20" />
    </div>
  );
}
