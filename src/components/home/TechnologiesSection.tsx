"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/shared/Reveal";
import {
  getTechnologyCategories,
  getTechnologiesByCategory,
} from "@/lib/data";

export function TechnologiesSection() {
  const categories = getTechnologyCategories();

  return (
    <Section
      id="technologies"
      eyebrow="Technology Stack"
      title="Built on modern, battle-tested foundations"
      description="From cloud-native backends to cross-platform mobile and AI/ML — we choose the right tools for reliability, performance, and long-term maintainability."
      className="bg-surface/30"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, catIndex) => {
          const techs = getTechnologiesByCategory(category);

          return (
            <Reveal key={category} delay={catIndex * 0.08}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, techIndex) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: catIndex * 0.05 + techIndex * 0.03,
                        duration: 0.4,
                      }}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
