import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
  readCms,
  slugify,
  uid,
  updateCms,
  type CmsCaseStudy,
} from "@/lib/cms/store";

function normalizeStudy(
  body: Partial<CmsCaseStudy>,
  existing?: CmsCaseStudy
): CmsCaseStudy {
  const title = (body.title || existing?.title || "").trim();
  const slug =
    (body.slug || existing?.slug || slugify(title) || uid("study")).trim();

  return {
    id: existing?.id || body.id || uid("cs"),
    slug,
    title: title || "Untitled case study",
    client: body.client?.trim() || existing?.client || "",
    industry: body.industry?.trim() || existing?.industry || "Enterprise",
    service: body.service?.trim() || existing?.service || "",
    duration: body.duration?.trim() || existing?.duration || "",
    teamSize: Number(body.teamSize ?? existing?.teamSize ?? 1) || 1,
    image:
      body.image?.trim() ||
      existing?.image ||
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    summary: body.summary?.trim() || existing?.summary || "",
    challenge: body.challenge?.trim() || existing?.challenge || "",
    planning: body.planning?.trim() || existing?.planning || "",
    design: body.design?.trim() || existing?.design || "",
    architecture: body.architecture?.trim() || existing?.architecture || "",
    development: body.development?.trim() || existing?.development || "",
    testing: body.testing?.trim() || existing?.testing || "",
    deployment: body.deployment?.trim() || existing?.deployment || "",
    results: body.results?.trim() || existing?.results || "",
    testimonial: {
      quote: body.testimonial?.quote ?? existing?.testimonial.quote ?? "",
      author: body.testimonial?.author ?? existing?.testimonial.author ?? "",
      role: body.testimonial?.role ?? existing?.testimonial.role ?? "",
      company: body.testimonial?.company ?? existing?.testimonial.company ?? "",
    },
    metrics: Array.isArray(body.metrics)
      ? body.metrics
      : existing?.metrics || [],
    technologies: Array.isArray(body.technologies)
      ? body.technologies
      : existing?.technologies || [],
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
    return NextResponse.json(data.caseStudies);
  } catch (err) {
    console.error("[admin/case-studies GET]", err);
    return NextResponse.json(
      { error: "Failed to load case studies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as Partial<CmsCaseStudy>;
  if (!body.title?.trim() || !body.summary?.trim()) {
    return NextResponse.json(
      { error: "Title and summary are required" },
      { status: 400 }
    );
  }

  const study = normalizeStudy({ ...body, active: body.active !== false });
  await updateCms((current) => ({
    ...current,
    caseStudies: [study, ...current.caseStudies],
  }));

  return NextResponse.json(study, { status: 201 });
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as Partial<CmsCaseStudy>;
  if (!body.id) {
    return NextResponse.json({ error: "Case study id required" }, { status: 400 });
  }

  let updated: CmsCaseStudy | undefined;
  await updateCms((current) => {
    const existing = current.caseStudies.find((s) => s.id === body.id);
    if (!existing) return current;
    updated = normalizeStudy(body, existing);
    return {
      ...current,
      caseStudies: current.caseStudies.map((s) =>
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
    caseStudies: current.caseStudies.filter((s) => s.id !== id),
  }));

  return NextResponse.json({ ok: true });
}
