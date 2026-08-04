import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
  readCms,
  slugify,
  uid,
  updateCms,
  type CmsService,
} from "@/lib/cms/store";
import { images } from "@/lib/data/images";

function lines(text: unknown): string[] {
  if (Array.isArray(text)) return text.map(String).filter(Boolean);
  if (typeof text !== "string") return [];
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeService(
  body: Partial<CmsService> & {
    problemsText?: string;
    solutionsText?: string;
    featuresText?: string;
    benefitsText?: string;
    modulesText?: string;
    techStackText?: string;
  },
  existing?: CmsService
): CmsService {
  const title = (body.title || existing?.title || "").trim();
  const slug = (
    body.slug ||
    existing?.slug ||
    slugify(title) ||
    uid("service")
  ).trim();

  return {
    id: existing?.id || body.id || uid("svc"),
    slug,
    title: title || "Untitled service",
    category: body.category?.trim() || existing?.category || "enterprise-software",
    shortDescription:
      body.shortDescription?.trim() || existing?.shortDescription || "",
    longDescription:
      body.longDescription?.trim() || existing?.longDescription || "",
    bannerImage:
      body.bannerImage?.trim() ||
      existing?.bannerImage ||
      images.services.default,
    problems: body.problems ?? lines(body.problemsText) ?? existing?.problems ?? [],
    solutions:
      body.solutions ?? lines(body.solutionsText) ?? existing?.solutions ?? [],
    features:
      body.features ?? lines(body.featuresText) ?? existing?.features ?? [],
    benefits:
      body.benefits ?? lines(body.benefitsText) ?? existing?.benefits ?? [],
    modules: body.modules ?? lines(body.modulesText) ?? existing?.modules ?? [],
    process: body.process ?? existing?.process ?? [],
    faqs: body.faqs ?? existing?.faqs ?? [],
    relatedServices: body.relatedServices ?? existing?.relatedServices ?? [],
    stats: body.stats ?? existing?.stats ?? [],
    techStack:
      body.techStack ??
      (typeof body.techStackText === "string"
        ? body.techStackText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : undefined) ??
      existing?.techStack ??
      [],
    pricingModels: body.pricingModels ?? existing?.pricingModels ?? [],
    active:
      body.active !== undefined
        ? body.active !== false
        : existing?.active !== false,
  };
}

export async function GET() {
  try {
    const ok = await requireAdmin();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await readCms();
    return NextResponse.json(data.services);
  } catch (err) {
    console.error("[admin/services GET]", err);
    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.title?.trim() || !body.shortDescription?.trim()) {
    return NextResponse.json(
      { error: "Title and short description are required" },
      { status: 400 }
    );
  }

  const service = normalizeService({ ...body, active: body.active !== false });
  await updateCms((current) => ({
    ...current,
    services: [service, ...current.services],
  }));

  return NextResponse.json(service, { status: 201 });
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "Service id required" }, { status: 400 });
  }

  let updated: CmsService | undefined;
  await updateCms((current) => {
    const existing = current.services.find((s) => s.id === body.id);
    if (!existing) return current;
    updated = normalizeService(body, existing);
    return {
      ...current,
      services: current.services.map((s) =>
        s.id === body.id ? updated! : s
      ),
    };
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await updateCms((current) => ({
    ...current,
    services: current.services.filter((s) => s.id !== id),
  }));

  return NextResponse.json({ ok: true });
}
