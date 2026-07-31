import { Section } from "@/components/ui/Section";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  const steps = processSteps.map(({ title, description }) => ({
    title,
    description,
  }));

  return (
    <Section
      id="process"
      eyebrow="How We Work"
      title="A proven path from idea to impact"
      description="Our five-phase methodology combines discovery rigor with agile delivery — keeping stakeholders aligned and risk managed throughout."
      centered
    >
      <ProcessSteps steps={steps} />
    </Section>
  );
}
