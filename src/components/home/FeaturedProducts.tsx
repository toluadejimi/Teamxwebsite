import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { getFeaturedPortfolio } from "@/lib/data/portfolio";

export function FeaturedProducts() {
  const products = getFeaturedPortfolio(4);

  return (
    <Section
      id="products"
      eyebrow="Product Offerings"
      title="Platforms that power real operations"
      description="Battle-tested product suites deployed across banking, healthcare, government, and enterprise — built to integrate, scale, and evolve."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={index * 0.1}>
            <Link
              href={`/portfolio/${product.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.15)] lg:flex-row"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-2/5">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge>{product.industry}</Badge>
                  <span className="text-xs text-muted">{product.duration}</span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {product.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted md:text-base">
                  {product.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.technology.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  View product
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-12 text-center">
        <Button href="/portfolio" variant="outline" size="lg">
          Explore Full Portfolio
        </Button>
      </Reveal>
    </Section>
  );
}
