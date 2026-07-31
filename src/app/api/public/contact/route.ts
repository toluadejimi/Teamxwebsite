import { NextResponse } from "next/server";
import { readCms } from "@/lib/cms/store";

export async function GET() {
  const data = await readCms();
  return NextResponse.json(data.contact, {
    headers: { "Cache-Control": "no-store" },
  });
}
