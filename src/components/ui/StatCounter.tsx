"use client";

import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2.5,
  decimals = 0,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("text-center md:text-left", className)}
    >
      <div className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {prefix}
        {isInView ? (
          <CountUp
            end={value}
            duration={duration}
            decimals={decimals}
            separator=","
            useEasing
          />
        ) : (
          "0"
        )}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted md:text-base">{label}</p>
    </motion.div>
  );
}

interface StatGridProps {
  stats: StatCounterProps[];
  className?: string;
}

export function StatGrid({ stats, className }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12",
        className
      )}
    >
      {stats.map((stat) => (
        <StatCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
}
