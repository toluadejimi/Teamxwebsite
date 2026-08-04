import { NextResponse } from "next/server";
import {
  PENDING_COOKIE,
  SESSION_COOKIE,
  beginTotpSetup,
  cookieOptions,
  isLockedOut,
  isTotpEnabled,
  issueToken,
  registerFailedAttempt,
  requirePending,
  verifyAndEnableTotp,
  verifyTotpCode,
  clearFailedAttempts,
} from "@/lib/cms/auth";

/** GET — QR setup when 2FA not enabled yet */
export async function GET(request: Request) {
  const pendingHeader = request.headers.get("x-pending-token");
  const pending = await requirePending(pendingHeader);
  if (!pending) {
    return NextResponse.json({ error: "Session expired. Sign in again." }, { status: 401 });
  }

  const enabled = await isTotpEnabled();
  if (enabled) {
    return NextResponse.json({ setupRequired: false });
  }

  const setup = await beginTotpSetup();
  return NextResponse.json({
    setupRequired: true,
    qrDataUrl: setup.qrDataUrl,
    secret: setup.secret,
  });
}

/** POST — verify TOTP (setup or login) */
export async function POST(request: Request) {
  const lock = await isLockedOut();
  if (lock.locked) {
    return NextResponse.json(
      { error: `Locked. Retry in ${lock.retryAfter}s.`, locked: true },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    code?: string;
    pendingToken?: string;
    setupSecret?: string;
  } | null;

  const pending = await requirePending(body?.pendingToken);
  if (!pending) {
    return NextResponse.json(
      { error: "Session expired. Sign in again." },
      { status: 401 }
    );
  }

  const code = body?.code?.trim() || "";
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter the 6-digit code" }, { status: 400 });
  }

  const enabled = await isTotpEnabled();
  let ok = false;

  if (!enabled) {
    ok = await verifyAndEnableTotp(code, body?.setupSecret);
  } else {
    ok = await verifyTotpCode(code);
  }

  if (!ok) {
    await registerFailedAttempt();
    return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
  }

  await clearFailedAttempts();

  const { token, maxAge } = issueToken("full");
  const res = NextResponse.json({ ok: true, authenticated: true });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions(maxAge));
  res.cookies.set(PENDING_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
  return res;
}
