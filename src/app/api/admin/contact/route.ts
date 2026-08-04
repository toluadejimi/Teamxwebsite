import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { readCms, updateCms, type CmsContact } from "@/lib/cms/store";

export async function GET() {
  try {
    const ok = await requireAdmin();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await readCms();
    return NextResponse.json(data.contact);
  } catch (err) {
    console.error("[admin/contact GET]", err);
    return NextResponse.json({ error: "Failed to load contact" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as CmsContact;
  if (!body?.email || !body?.phone) {
    return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
  }

  // Keep Nigeria-only offices
  const offices = (body.offices || []).filter(
    (o) => o.country?.toLowerCase() === "nigeria"
  );

  const contact: CmsContact = {
    ...body,
    offices: offices.length
      ? offices
      : [
          {
            city: "Lagos",
            country: "Nigeria",
            address: body.offices?.[0]?.address || "Lagos, Nigeria",
            phone: body.phone,
            email: body.email,
            isHeadquarters: true,
          },
        ],
  };

  await updateCms((data) => ({ ...data, contact }));
  return NextResponse.json(contact);
}
