import { NextResponse } from "next/server";
import { readCms } from "@/lib/cms/store";

export async function GET() {
  const data = await readCms();
  const studies = data.caseStudies.filter((s) => s.active !== false);
  return NextResponse.json(studies, {
    headers: { "Cache-Control": "no-store" },
  });
}
