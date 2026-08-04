import { NextResponse } from "next/server";
import { uid, updateCms, type CmsEnquiry } from "@/lib/cms/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CmsEnquiry>;
    if (
      !body.firstName?.trim() ||
      !body.lastName?.trim() ||
      !body.email?.trim() ||
      !body.subject?.trim() ||
      !body.message?.trim()
    ) {
      return NextResponse.json(
        { error: "First name, last name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const enquiry: CmsEnquiry = {
      id: uid("enq"),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || undefined,
      subject: body.subject.trim(),
      message: body.message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    await updateCms((current) => ({
      ...current,
      enquiries: [enquiry, ...current.enquiries],
    }));

    return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[public/enquiries POST]", err);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
