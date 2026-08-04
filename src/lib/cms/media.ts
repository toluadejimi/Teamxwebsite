import { images as staticImages } from "@/lib/data/images";

export type ImageCatalogEntry = {
  key: string;
  category: string;
  label: string;
  url: string;
};

const LABEL_OVERRIDES: Record<string, string> = {
  "brand.logo": "Company logo",
  "hero.main": "Hero primary",
  "hero.secondary": "Hero secondary",
  "services.ai": "AI Solutions",
  "services.customSoftware": "Custom software",
  "company.office": "Office",
  "company.team": "Team",
  "careers.culture": "Culture",
};

function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function categoryLabel(cat: string): string {
  if (cat === "caseStudies") return "Case Studies";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

/** Full image catalog derived from static defaults + brand logo */
export function buildDefaultImageCatalog(): ImageCatalogEntry[] {
  const entries: ImageCatalogEntry[] = [
    { key: "brand.logo", category: "Brand", label: "Company logo", url: "" },
  ];

  for (const [category, group] of Object.entries(staticImages)) {
    for (const [sub, url] of Object.entries(group)) {
      const key = `${category}.${sub}`;
      entries.push({
        key,
        category: categoryLabel(category),
        label: LABEL_OVERRIDES[key] || humanize(sub),
        url: url as string,
      });
    }
  }

  return entries;
}

export function unsplashPhotoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/photo-([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

/** Map default Unsplash photo IDs → catalog keys for remapping admin overrides */
export function buildPhotoIdToKey(
  catalog: ImageCatalogEntry[] = buildDefaultImageCatalog()
): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of catalog) {
    const id = unsplashPhotoId(entry.url);
    if (id) map.set(id, entry.key);
  }
  return map;
}

export function catalogToMap(images: ImageCatalogEntry[]): Record<string, string> {
  return Object.fromEntries(
    images.filter((i) => i.url).map((i) => [i.key, i.url])
  );
}

/**
 * Resolve a media URL against CMS overrides.
 * If the URL is a known default (same Unsplash photo), return the admin-updated URL.
 */
export function resolveMediaUrl(
  url: string | undefined | null,
  cmsMap: Record<string, string>,
  photoIdToKey: Map<string, string> = buildPhotoIdToKey()
): string {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("/uploads/")) return url;

  const id = unsplashPhotoId(url);
  if (id) {
    const key = photoIdToKey.get(id);
    if (key && cmsMap[key]) return cmsMap[key];
  }

  if (cmsMap[url]) return cmsMap[url];

  return url;
}
