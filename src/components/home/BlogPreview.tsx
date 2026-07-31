import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { getFeaturedBlogPosts } from "@/lib/data/blog";

export function BlogPreview() {
  const posts = getFeaturedBlogPosts(3);

  return (
    <Section
      id="blog"
      eyebrow="Insights"
      title="From the engineering floor"
      description="Technical deep-dives, architecture patterns, and industry perspectives from the Team X engineering and leadership team."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.1}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <Badge className="mb-3 w-fit">{post.category}</Badge>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>{post.author.name}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-12 text-center">
        <Button href="/blog" variant="outline" size="lg">
          View All Articles
        </Button>
      </Reveal>
    </Section>
  );
}
