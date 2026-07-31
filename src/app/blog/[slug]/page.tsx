import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { createPageMetadata } from "@/lib/seo";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.tags,
  });
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-10 mb-4 font-display text-2xl font-semibold tracking-tight text-foreground first:mt-0"
        >
          {trimmed.replace(/^## /, "")}
        </h2>
      );
    }

    return (
      <p key={index} className="mb-4 text-base leading-relaxed text-muted last:mb-0">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogPosts(slug, 3);

  return (
    <>
      <PageHero
        title={post.title}
        description={post.excerpt}
        backgroundImage={post.image}
        eyebrow={post.category}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{post.author.name}</p>
              <p className="text-xs">{post.author.role}</p>
            </div>
          </div>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-accent" aria-hidden />
            {post.readTime}
          </span>
        </div>
      </PageHero>

      <Section className="border-b border-border">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <article className="prose-custom">{renderContent(post.content)}</article>
        </div>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="Related" title="Continue reading" className="bg-surface/50">
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/30"
                >
                  <Badge variant="muted" className="mb-3">
                    {item.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{item.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-border py-12">
        <div className="flex justify-center">
          <Button href="/blog" variant="outline">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to blog
          </Button>
        </div>
      </Section>

      <CTABanner
        primaryLabel="Book a demo"
        primaryHref="/book-demo"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  );
}
