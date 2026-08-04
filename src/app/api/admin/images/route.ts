import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { readCms, updateCms, type CmsImageEntry } from "@/lib/cms/store";
import {
  buildDefaultImageCatalog,
  unsplashPhotoId,
} from "@/lib/cms/media";

export async function GET() {
  try {
    const ok = await requireAdmin();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await readCms();
    return NextResponse.json(data.images);
  } catch (err) {
    console.error("[admin/images GET]", err);
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    images?: CmsImageEntry[];
    key?: string;
    url?: string;
  };

  if (Array.isArray(body.images)) {
    const data = await updateCms((current) => ({
      ...current,
      images: body.images!,
    }));
    return NextResponse.json(data.images);
  }

  if (body.key && typeof body.url === "string") {
    const defaults = buildDefaultImageCatalog();
    const def = defaults.find((d) => d.key === body.key);
    const defaultPhotoId = def ? unsplashPhotoId(def.url) : null;

    const data = await updateCms((current) => {
      const images = current.images.map((img) =>
        img.key === body.key ? { ...img, url: body.url! } : img
      );

      // Keep service / case-study media in sync when a catalog slot changes
      const services = current.services.map((service) => {
        const photoId = unsplashPhotoId(service.bannerImage);
        if (defaultPhotoId && photoId === defaultPhotoId) {
          return { ...service, bannerImage: body.url! };
        }
        return service;
      });

      const caseStudies = current.caseStudies.map((study) => {
        const photoId = unsplashPhotoId(study.image);
        if (defaultPhotoId && photoId === defaultPhotoId) {
          return { ...study, image: body.url! };
        }
        return study;
      });

      return { ...current, images, services, caseStudies };
    });

    return NextResponse.json(data.images);
  }

  return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
}
