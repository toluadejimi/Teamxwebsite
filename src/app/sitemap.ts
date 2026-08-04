import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { blogPosts } from "@/lib/data/blog";
import { portfolioProjects } from "@/lib/data/portfolio";
import { readCms } from "@/lib/cms/store";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/case-studies",
  "/blog",
  "/careers",
  "/contact",
  "/faqs",
  "/pricing",
  "/partners",
  "/request-quote",
  "/book-demo",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const cms = await readCms();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: getSiteUrl(path),
    lastModified: now,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path === "/services" || path === "/contact" ? 0.9 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = cms.services
    .filter((s) => s.active !== false)
    .map((service) => ({
      url: getSiteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const portfolioEntries: MetadataRoute.Sitemap = portfolioProjects.map(
    (project) => ({
      url: getSiteUrl(`/portfolio/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const caseStudyEntries: MetadataRoute.Sitemap = cms.caseStudies
    .filter((s) => s.active !== false)
    .map((study) => ({
      url: getSiteUrl(`/case-studies/${study.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: getSiteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...portfolioEntries,
    ...caseStudyEntries,
    ...blogEntries,
  ];
}
