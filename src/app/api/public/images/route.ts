import { NextResponse } from "next/server";
import { readCms } from "@/lib/cms/store";

export async function GET() {
  const data = await readCms();
  const map = Object.fromEntries(data.images.map((i) => [i.key, i.url]));
  return NextResponse.json(
    { images: data.images, map },
    { headers: { "Cache-Control": "no-store" } }
  );
}
