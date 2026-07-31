import { NextResponse } from "next/server";
import {
  PENDING_COOKIE,
  SESSION_COOKIE,
  clearFailedAttempts,
  cookieOptions,
  isLockedOut,
  isTotpEnabled,
  issueToken,
  registerFailedAttempt,
  revokeSession,
  verifyPassword,
} from "@/lib/cms/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const lock = await isLockedOut();
  if (lock.locked) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Try again in ${lock.retryAfter}s.`,
        locked: true,
        retryAfter: lock.retryAfter,
      },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!body?.password || !verifyPassword(body.password)) {
    await registerFailedAttempt();
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await clearFailedAttempts();

  // Clear any prior session
  const jar = await cookies();
  revokeSession(jar.get(SESSION_COOKIE)?.value);
  revokeSession(jar.get(PENDING_COOKIE)?.value);

  const totpEnabled = await isTotpEnabled();
  const { token, maxAge } = issueToken("pending");

  const res = NextResponse.json({
    ok: true,
    requires2fa: true,
    setupRequired: !totpEnabled,
  });

  res.cookies.set(PENDING_COOKIE, token, cookieOptions(maxAge));
  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });

  return res;
}
