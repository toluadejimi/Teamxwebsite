import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { readCms, updateCms, type LeadStatus } from "@/lib/cms/store";

export async function GET() {
  try {
    const ok = await requireAdmin();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await readCms();
    return NextResponse.json({
      enquiries: data.enquiries,
      demoRequests: data.demoRequests,
      quoteRequests: data.quoteRequests,
      jobApplications: data.jobApplications,
    });
  } catch (err) {
    console.error("[admin/leads GET]", err);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}

type LeadKind = "enquiries" | "demoRequests" | "quoteRequests" | "jobApplications";

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    kind?: LeadKind;
    id?: string;
    status?: LeadStatus;
  };

  if (!body.kind || !body.id || !body.status) {
    return NextResponse.json(
      { error: "kind, id, and status are required" },
      { status: 400 }
    );
  }

  const data = await updateCms((current) => {
    const list = current[body.kind!];
    return {
      ...current,
      [body.kind!]: list.map((item) =>
        item.id === body.id ? { ...item, status: body.status! } : item
      ),
    };
  });

  return NextResponse.json({
    enquiries: data.enquiries,
    demoRequests: data.demoRequests,
    quoteRequests: data.quoteRequests,
    jobApplications: data.jobApplications,
  });
}

export async function DELETE(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") as LeadKind | null;
  const id = searchParams.get("id");
  if (!kind || !id) {
    return NextResponse.json({ error: "kind and id required" }, { status: 400 });
  }

  await updateCms((current) => ({
    ...current,
    [kind]: current[kind].filter((item) => item.id !== id),
  }));

  return NextResponse.json({ ok: true });
}
