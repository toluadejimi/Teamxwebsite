import { NextResponse } from "next/server";
import { uid, updateCms, type CmsQuoteRequest } from "@/lib/cms/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CmsQuoteRequest>;
    if (
      !body.fullName?.trim() ||
      !body.company?.trim() ||
      !body.email?.trim() ||
      !body.projectType?.trim() ||
      !body.budget?.trim() ||
      !body.timeline?.trim() ||
      !body.description?.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill all required quote fields" },
        { status: 400 }
      );
    }

    const quote: CmsQuoteRequest = {
      id: uid("quote"),
      fullName: body.fullName.trim(),
      company: body.company.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || undefined,
      projectType: body.projectType.trim(),
      budget: body.budget.trim(),
      timeline: body.timeline.trim(),
      teamSize: body.teamSize?.trim() || undefined,
      description: body.description.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    await updateCms((current) => ({
      ...current,
      quoteRequests: [quote, ...current.quoteRequests],
    }));

    return NextResponse.json({ ok: true, id: quote.id }, { status: 201 });
  } catch (err) {
    console.error("[public/quotes POST]", err);
    return NextResponse.json({ error: "Failed to submit quote" }, { status: 500 });
  }
}
