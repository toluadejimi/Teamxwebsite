"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

export interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-accent/50 via-border to-transparent md:left-1/2 md:block md:-translate-x-1/2"
        aria-hidden
      />

      <ol className="space-y-12 md:space-y-0">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <Reveal key={step.title} delay={index * 0.1}>
              <li className="relative md:grid md:grid-cols-2 md:gap-12 md:py-10">
                <div
                  className={cn(
                    "md:col-start-1",
                    !isEven && "md:col-start-2 md:row-start-1"
                  )}
                >
                  <div className="flex items-start gap-4 md:gap-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-surface font-display text-sm font-semibold text-accent shadow-[0_0_20px_rgba(37,99,235,0.15)] md:absolute md:left-1/2 md:-translate-x-1/2"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.div>

                    <div
                      className={cn(
                        "flex-1 md:max-w-md",
                        isEven ? "md:mr-auto md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                      )}
                    >
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
