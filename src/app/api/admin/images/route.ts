import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { readCms, updateCms, type CmsImageEntry } from "@/lib/cms/store";

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await readCms();
  return NextResponse.json(data.images);
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { images?: CmsImageEntry[]; key?: string; url?: string };

  if (Array.isArray(body.images)) {
    await updateCms((data) => ({ ...data, images: body.images! }));
    return NextResponse.json(body.images);
  }

  if (body.key && body.url) {
    const data = await updateCms((current) => ({
      ...current,
      images: current.images.map((img) =>
        img.key === body.key ? { ...img, url: body.url! } : img
      ),
    }));
    return NextResponse.json(data.images);
  }

  return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
}
