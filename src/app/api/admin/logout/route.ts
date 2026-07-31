import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  PENDING_COOKIE,
  SESSION_COOKIE,
  cookieOptions,
  revokeSession,
} from "@/lib/cms/auth";

export async function POST() {
  const jar = await cookies();
  revokeSession(jar.get(SESSION_COOKIE)?.value);
  revokeSession(jar.get(PENDING_COOKIE)?.value);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
  res.cookies.set(PENDING_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
  return res;
}
