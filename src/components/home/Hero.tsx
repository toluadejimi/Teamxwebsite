"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { StatGrid } from "@/components/ui/StatCounter";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { WorldMap } from "@/components/shared/WorldMap";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Reveal } from "@/components/shared/Reveal";
import { HeroScene } from "@/components/home/HeroScene";

const heroStats = [
  { value: 250, suffix: "+", label: "Projects" },
  { value: 150, suffix: "+", label: "Clients" },
  { value: 25, suffix: "+", label: "Countries" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
];

function FloatingShape({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: [20, 35, 20],
          rotateY: [10, -10, 10],
          y: [0, -16, 0],
        }}
        transition={{
          duration: 8 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-full w-full rounded-xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm"
        style={{ transformStyle: "preserve-3d" }}
      />
    </motion.div>
  );
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const orb1X = useTransform(springX, [-1, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [-1, 1], [-20, 20]);
  const orb2X = useTransform(springX, [-1, 1], [20, -20]);
  const orb2Y = useTransform(springY, [-1, 1], [15, -15]);
  const orb3X = useTransform(springX, [-1, 1], [-15, 15]);
  const orb3Y = useTransform(springY, [-1, 1], [25, -25]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="gradient-mesh absolute inset-0" aria-hidden />
      <div className="grid-pattern absolute inset-0 opacity-60" aria-hidden />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <motion.div style={{ x: orb1X, y: orb1Y }} className="pointer-events-none absolute -left-32 top-1/4 z-0">
        <GradientOrb className="h-[28rem] w-[28rem] opacity-40" />
      </motion.div>
      <motion.div style={{ x: orb2X, y: orb2Y }} className="pointer-events-none absolute -right-24 top-1/3 z-0">
        <GradientOrb className="h-80 w-80 opacity-30" variant="secondary" />
      </motion.div>
      <motion.div style={{ x: orb3X, y: orb3Y }} className="pointer-events-none absolute left-1/2 top-16 z-0 -translate-x-1/2">
        <GradientOrb className="h-64 w-64 opacity-20" />
      </motion.div>

      <FloatingShape
        className="pointer-events-none absolute right-[12%] top-[22%] hidden h-16 w-16 md:block lg:h-20 lg:w-20"
        delay={0}
      />
      <FloatingShape
        className="pointer-events-none absolute left-[8%] top-[38%] hidden h-12 w-12 md:block lg:h-14 lg:w-14"
        delay={0.5}
      />
      <FloatingShape
        className="pointer-events-none absolute bottom-[32%] right-[22%] hidden h-10 w-10 md:block"
        delay={1}
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] opacity-[0.12] lg:block xl:w-[42%]">
        <WorldMap className="h-full scale-110 object-cover" />
      </div>

      <HeroScene className="pointer-events-none absolute inset-y-[15%] right-0 hidden w-[42%] opacity-70 xl:block" />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-16 pt-28 md:pb-20 md:pt-32 lg:pt-36">
        <div className="max-w-4xl">
          <Reveal delay={0}>
            <p className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Team <span className="text-accent">X</span> Technologies
            </p>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge className="px-3 py-1 text-xs">
                Building Digital Solutions That Transform Businesses
              </Badge>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl text-balance">
              <AnimatedText
                as="span"
                text="We Build Enterprise Software That Powers Modern Organizations"
                mode="fade"
                delay={0.2}
                className="text-gradient"
              />
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg lg:text-xl">
              From banking platforms to government portals, healthcare systems,
              education solutions, and enterprise applications, Team X Technologies
              builds secure, scalable, and intelligent digital products that
              transform businesses.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton>
                <Button href="/request-quote" size="lg">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/book-demo" variant="secondary" size="lg">
                  Book Consultation
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/book-demo#demo" variant="outline" size="lg">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Button>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-16 border-t border-border/60 pt-10 md:mt-20">
              <StatGrid stats={heroStats} className="gap-6 md:gap-10" />
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-accent/60 to-transparent" />
          </motion.div>
        </motion.div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
    </section>
  );
}
