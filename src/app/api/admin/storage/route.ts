import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getCmsStorageInfo } from "@/lib/cms/store";

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getCmsStorageInfo());
}
