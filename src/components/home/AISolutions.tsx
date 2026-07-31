import Image from "next/image";
import { ArrowRight, Bot, Brain, Sparkles, Workflow } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { images } from "@/lib/data/images";

const aiCapabilities = [
  {
    icon: Bot,
    title: "Intelligent Chatbots",
    description: "24/7 customer support and internal helpdesk automation with domain-aware responses.",
  },
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "ML models for fraud detection, demand forecasting, and operational optimization.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "RPA and AI-driven workflows that eliminate manual bottlenecks at scale.",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    description: "Document processing, content generation, and knowledge retrieval systems.",
  },
];

export function AISolutions() {
  return (
    <Section id="ai-solutions" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <Badge className="mb-4">AI & Machine Learning</Badge>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              AI solutions that deliver{" "}
              <span className="text-accent">real business value</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Our dedicated AI practice combines LangChain, TensorFlow, and
              enterprise-grade MLOps to build intelligent systems — from
              conversational agents to predictive models — integrated seamlessly
              into your existing platforms.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {aiCapabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {cap.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {cap.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button href="/services/ai-chatbots" size="lg">
                Explore AI Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} direction="left">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image
                src={images.services.ai}
                alt="AI and machine learning solutions"
                width={640}
                height={480}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border/60 bg-surface/90 p-4 backdrop-blur-sm">
                <p className="font-display text-sm font-semibold text-foreground">
                  AI Practice Established 2022
                </p>
                <p className="mt-1 text-xs text-muted">
                  30+ AI projects delivered across banking, healthcare, and government
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
