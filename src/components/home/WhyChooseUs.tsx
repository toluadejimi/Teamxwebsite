"use client";

import { Section } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <Section
      id="why-us"
      eyebrow="Why Team X"
      title="The partner enterprises trust when failure isn't an option"
      description="We combine deep domain expertise with engineering excellence — delivering outcomes, not just code."
      className="bg-surface/30"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <FeatureCard
              title={item.title}
              description={item.description}
              iconName={item.icon}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
