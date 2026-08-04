import { NextResponse } from "next/server";
import { uid, updateCms, type CmsJobApplication } from "@/lib/cms/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CmsJobApplication>;
    if (
      !body.name?.trim() ||
      !body.email?.trim() ||
      !body.position?.trim() ||
      !body.coverLetter?.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, position, and cover letter are required" },
        { status: 400 }
      );
    }

    const application: CmsJobApplication = {
      id: uid("app"),
      name: body.name.trim(),
      email: body.email.trim(),
      position: body.position.trim(),
      portfolio: body.portfolio?.trim() || undefined,
      coverLetter: body.coverLetter.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    await updateCms((current) => ({
      ...current,
      jobApplications: [application, ...current.jobApplications],
    }));

    return NextResponse.json({ ok: true, id: application.id }, { status: 201 });
  } catch (err) {
    console.error("[public/applications POST]", err);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
