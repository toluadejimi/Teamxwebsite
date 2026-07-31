import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { createPageMetadata } from "@/lib/seo";
import { blogPosts, getBlogCategories } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Insights on enterprise software, core banking, AI, cloud migration, healthcare IT, and digital transformation from Team X Technologies.",
  path: "/blog",
  keywords: ["blog", "enterprise software", "digital transformation", "FinTech", "Team X"],
});

export default function BlogPage() {
  const categories = getBlogCategories();
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        title="Insights & Engineering Perspectives"
        description="Deep dives on enterprise architecture, regulated industries, and the technology shaping Africa's digital future."
        eyebrow="Blog"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      {featured && (
        <Section className="border-b border-border pb-12 pt-0 md:pb-16">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <Badge className="mb-4 w-fit">Featured</Badge>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {featured.category}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                  <span>{featured.author.name}</span>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </Section>
      )}

      <Section eyebrow="Topics" title="Browse by category">
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="px-3 py-1">
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.12)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Badge variant="muted" className="mb-3 w-fit">
                    {post.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Want to discuss these topics?"
        description="Our experts are ready to help you apply these insights to your organization's challenges."
        primaryLabel="Book a demo"
        primaryHref="/book-demo"
        secondaryLabel="Request a quote"
        secondaryHref="/request-quote"
      />
    </>
  );
}
