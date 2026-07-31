import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
  readCms,
  slugify,
  uid,
  updateCms,
  type CmsJob,
} from "@/lib/cms/store";

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await readCms();
  return NextResponse.json(data.jobs);
}

export async function POST(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as Partial<CmsJob>;
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Title and description required" }, { status: 400 });
  }

  const job: CmsJob = {
    id: uid("job"),
    slug: body.slug || slugify(body.title),
    title: body.title,
    department: body.department || "Engineering",
    location: body.location || "Lagos, Nigeria",
    type: body.type || "Full-time",
    experience: body.experience || "Not specified",
    description: body.description,
    responsibilities: body.responsibilities || [],
    requirements: body.requirements || [],
    niceToHave: body.niceToHave || [],
    salary: body.salary,
    postedDate: body.postedDate || new Date().toISOString().slice(0, 10),
    active: body.active !== false,
  };

  const data = await updateCms((current) => ({
    ...current,
    jobs: [job, ...current.jobs],
  }));

  return NextResponse.json(job, { status: 201 });
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as CmsJob;
  if (!body.id) {
    return NextResponse.json({ error: "Job id required" }, { status: 400 });
  }

  const data = await updateCms((current) => ({
    ...current,
    jobs: current.jobs.map((j) => (j.id === body.id ? { ...j, ...body } : j)),
  }));

  const updated = data.jobs.find((j) => j.id === body.id);
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
    jobs: current.jobs.filter((j) => j.id !== id),
  }));

  return NextResponse.json({ ok: true });
}
