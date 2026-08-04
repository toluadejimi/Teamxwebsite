import { NextResponse } from "next/server";
import { readCms } from "@/lib/cms/store";

export async function GET() {
  const data = await readCms();
  const items = data.portfolio.filter((p) => p.active !== false);
  return NextResponse.json(items, {
    headers: { "Cache-Control": "no-store" },
  });
}
