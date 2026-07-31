import type { Metadata } from "next";
import { company } from "@/lib/data";

const BASE_URL = company.website;

export interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: company.name,
      title,
      description,
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

export function getSiteUrl(path = ""): string {
  return `${BASE_URL}${path}`;
}
