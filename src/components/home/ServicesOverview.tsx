"use client";

import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { getFeaturedServices } from "@/lib/data/services";

const serviceIconNames: Record<string, string> = {
  "core-banking-application": "Landmark",
  "hospital-management": "HeartPulse",
  "government-portal": "Building",
  "ai-chatbots": "Bot",
  "cloud-migration": "Cloud",
  "custom-software-development": "Code2",
};

export function ServicesOverview() {
  const services = getFeaturedServices(6);

  return (
    <Section
      id="services"
      eyebrow="What We Do"
      title="Enterprise solutions built for scale"
      description="End-to-end software engineering across financial services, healthcare, government, and beyond — from discovery to deployment and ongoing evolution."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.08}>
            <ServiceCard
              title={service.title}
              description={service.shortDescription}
              image={service.bannerImage}
              href={`/services/${service.slug}`}
              iconName={serviceIconNames[service.slug] ?? "Layers"}
              badge={service.category.replace(/-/g, " ")}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4} className="mt-12 text-center">
        <Button href="/services" variant="outline" size="lg">
          View All Services
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
