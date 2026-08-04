import { NextResponse } from "next/server";
import { uid, updateCms, type CmsDemoRequest } from "@/lib/cms/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CmsDemoRequest>;
    if (
      !body.fullName?.trim() ||
      !body.email?.trim() ||
      !body.company?.trim() ||
      !body.topic?.trim() ||
      !body.preferredDate?.trim() ||
      !body.preferredTime?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Full name, email, company, topic, preferred date and time are required",
        },
        { status: 400 }
      );
    }

    const demo: CmsDemoRequest = {
      id: uid("demo"),
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      company: body.company.trim(),
      jobTitle: body.jobTitle?.trim() || undefined,
      topic: body.topic.trim(),
      preferredDate: body.preferredDate.trim(),
      preferredTime: body.preferredTime.trim(),
      notes: body.notes?.trim() || undefined,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    await updateCms((current) => ({
      ...current,
      demoRequests: [demo, ...current.demoRequests],
    }));

    return NextResponse.json({ ok: true, id: demo.id }, { status: 201 });
  } catch (err) {
    console.error("[public/demos POST]", err);
    return NextResponse.json({ error: "Failed to book demo" }, { status: 500 });
  }
}
