"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultLogos = [
  "Meridian Capital",
  "Northwind Systems",
  "Atlas Health",
  "Vertex Labs",
  "Summit Financial",
  "Horizon Education",
  "Pulse Analytics",
  "Catalyst Group",
  "Nova Industries",
  "Apex Ventures",
];

interface LogoCloudProps {
  logos?: string[];
  title?: string;
  className?: string;
}

export function LogoCloud({
  logos = defaultLogos,
  title = "Trusted by industry leaders",
  className,
}: LogoCloudProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div className={cn("overflow-hidden py-8", className)}>
      {title && (
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {title}
        </p>
      )}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max gap-12 md:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicated.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex shrink-0 items-center justify-center px-2"
            >
              <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-muted/60 transition-colors hover:text-muted md:text-xl">
                {logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
