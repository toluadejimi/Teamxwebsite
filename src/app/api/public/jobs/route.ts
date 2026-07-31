import { NextResponse } from "next/server";
import { readCms } from "@/lib/cms/store";

export async function GET() {
  const data = await readCms();
  const jobs = data.jobs.filter((j) => j.active);
  return NextResponse.json(jobs, {
    headers: { "Cache-Control": "no-store" },
  });
}
