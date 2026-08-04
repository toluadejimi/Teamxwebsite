import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
  getCmsStorageInfo,
  readCms,
  slugify,
  uid,
  updateCms,
  type CmsPortfolio,
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

function normalize(
  body: Partial<CmsPortfolio> & {
    technologyText?: string;
    featuresText?: string;
    galleryText?: string;
  },
  existing?: CmsPortfolio
): CmsPortfolio {
  const title = (body.title || existing?.title || "").trim();
  const slug = (
    body.slug ||
    existing?.slug ||
    slugify(title) ||
    uid("project")
  ).trim();

  return {
    id: existing?.id || body.id || uid("pf"),
    slug,
    title: title || "Untitled project",
    description: body.description?.trim() || existing?.description || "",
    image:
      body.image?.trim() ||
      existing?.image ||
      images.portfolio.banking,
    industry: body.industry?.trim() || existing?.industry || "Enterprise",
    technology:
      body.technology ??
      (typeof body.technologyText === "string"
        ? body.technologyText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : undefined) ??
      existing?.technology ??
      [],
    duration: body.duration?.trim() || existing?.duration || "",
    features:
      body.features ?? lines(body.featuresText) ?? existing?.features ?? [],
    gallery:
      body.gallery ?? lines(body.galleryText) ?? existing?.gallery ?? [],
    challenge: body.challenge?.trim() || existing?.challenge || "",
    solution: body.solution?.trim() || existing?.solution || "",
    outcome: body.outcome?.trim() || existing?.outcome || "",
    client: body.client?.trim() || existing?.client || "",
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
    return NextResponse.json({
      items: data.portfolio,
      storage: getCmsStorageInfo(),
    });
  } catch (err) {
    console.error("[admin/portfolio GET]", err);
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.title?.trim() || !body.description?.trim()) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  const project = normalize({ ...body, active: body.active !== false });
  try {
    await updateCms((current) => ({
      ...current,
      portfolio: [project, ...current.portfolio],
    }));
  } catch (err) {
    console.error("[admin/portfolio POST]", err);
    return NextResponse.json(
      {
        error:
          "Failed to save. On Vercel, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
        storage: getCmsStorageInfo(),
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { item: project, storage: getCmsStorageInfo() },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  let updated: CmsPortfolio | undefined;
  try {
    await updateCms((current) => {
      const existing = current.portfolio.find((p) => p.id === body.id);
      if (!existing) return current;
      updated = normalize(body, existing);
      return {
        ...current,
        portfolio: current.portfolio.map((p) =>
          p.id === body.id ? updated! : p
        ),
      };
    });
  } catch (err) {
    console.error("[admin/portfolio PUT]", err);
    return NextResponse.json(
      {
        error:
          "Failed to save. On Vercel, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
        storage: getCmsStorageInfo(),
      },
      { status: 500 }
    );
  }

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: updated, storage: getCmsStorageInfo() });
}

export async function DELETE(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await updateCms((current) => ({
    ...current,
    portfolio: current.portfolio.filter((p) => p.id !== id),
  }));

  return NextResponse.json({ ok: true, storage: getCmsStorageInfo() });
}
