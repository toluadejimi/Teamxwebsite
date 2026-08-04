import { NextResponse } from "next/server";
import { readCms } from "@/lib/cms/store";

export async function GET() {
  const data = await readCms();
  const services = data.services.filter((s) => s.active !== false);
  return NextResponse.json(services, {
    headers: { "Cache-Control": "no-store" },
  });
}
