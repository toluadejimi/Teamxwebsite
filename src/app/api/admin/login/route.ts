import { NextResponse } from "next/server";
import {
  PENDING_COOKIE,
  SESSION_COOKIE,
  clearFailedAttempts,
  cookieOptions,
  isLockedOut,
  isTotpEnabled,
  isTotpRequired,
  issueToken,
  registerFailedAttempt,
  verifyPassword,
} from "@/lib/cms/auth";

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
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  await clearFailedAttempts();

  const totpRequired = await isTotpRequired();

  if (!totpRequired) {
    const { token, maxAge } = issueToken("full");
    const res = NextResponse.json({
      ok: true,
      requires2fa: false,
      setupRequired: false,
    });
    res.cookies.set(SESSION_COOKIE, token, cookieOptions(maxAge));
    res.cookies.set(PENDING_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
    return res;
  }

  const totpEnabled = await isTotpEnabled();
  const { token, maxAge } = issueToken("pending");

  const res = NextResponse.json({
    ok: true,
    requires2fa: true,
    setupRequired: !totpEnabled,
    pendingToken: token,
  });

  res.cookies.set(PENDING_COOKIE, token, cookieOptions(maxAge));
  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });

  return res;
}
