import { createHmac, timingSafeEqual, createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import { SESSION_COOKIE, getAdminPassword } from "./store";

export const PENDING_COOKIE = "teamx_admin_pending";

type SecurityConfig = {
  totpSecret: string | null;
  totpEnabled: boolean;
  failedAttempts: number;
  lockUntil: number | null;
};

type SessionKind = "full" | "pending";

const SESSION_TTL = 60 * 60 * 12;
const PENDING_TTL = 60 * 15;
const MAX_ATTEMPTS = 8;
const LOCK_MS = 1000 * 60 * 15;

function signingKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "TeamX@Admin2024-session"
  );
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(input: string): string {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(
    input.replace(/-/g, "+").replace(/_/g, "/") + pad,
    "base64"
  ).toString("utf8");
}

function signPayload(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

export function issueToken(kind: SessionKind): { token: string; maxAge: number } {
  const maxAge = kind === "full" ? SESSION_TTL : PENDING_TTL;
  const exp = Math.floor(Date.now() / 1000) + maxAge;
  const payload = b64url(JSON.stringify({ kind, exp, n: Math.random().toString(36).slice(2) }));
  const token = `${payload}.${signPayload(payload)}`;
  return { token, maxAge };
}

export function issueSession() {
  return issueToken("full");
}

export function revokeSession(_token?: string) {
  /* stateless */
}

export function verifySessionToken(
  token: string | undefined,
  kind: SessionKind = "full"
): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = signPayload(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const data = JSON.parse(fromB64url(payload)) as { kind: SessionKind; exp: number };
    if (data.kind !== kind) return false;
    if (data.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  const a = createHash("sha256").update(password).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

function defaultSecurity(): SecurityConfig {
  return {
    totpSecret: null,
    totpEnabled: false,
    failedAttempts: 0,
    lockUntil: null,
  };
}

async function canUseFs(): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const probe = path.join(DATA_DIR, ".write-probe");
    await fs.writeFile(probe, "ok", "utf8");
    await fs.unlink(probe).catch(() => undefined);
    return true;
  } catch {
    return false;
  }
}

const DATA_DIR = path.join(process.cwd(), "data");
const SECURITY_FILE = path.join(DATA_DIR, "security.json");

async function readSecurity(): Promise<SecurityConfig> {
  const envSecret = process.env.ADMIN_TOTP_SECRET?.trim() || null;
  if (envSecret) {
    return { ...defaultSecurity(), totpSecret: envSecret, totpEnabled: true };
  }

  if (!(await canUseFs())) return defaultSecurity();

  try {
    const raw = await fs.readFile(SECURITY_FILE, "utf8");
    return { ...defaultSecurity(), ...JSON.parse(raw) };
  } catch {
    const data = defaultSecurity();
    try {
      await fs.writeFile(SECURITY_FILE, JSON.stringify(data, null, 2), "utf8");
    } catch {
      /* ignore */
    }
    return data;
  }
}

async function writeSecurity(data: SecurityConfig): Promise<void> {
  if (!(await canUseFs())) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SECURITY_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {
    /* ignore */
  }
}

export async function isLockedOut(): Promise<{ locked: boolean; retryAfter?: number }> {
  if (!(await canUseFs())) return { locked: false };
  const sec = await readSecurity();
  if (sec.lockUntil && sec.lockUntil > Date.now()) {
    return { locked: true, retryAfter: Math.ceil((sec.lockUntil - Date.now()) / 1000) };
  }
  if (sec.lockUntil && sec.lockUntil <= Date.now()) {
    sec.lockUntil = null;
    sec.failedAttempts = 0;
    await writeSecurity(sec);
  }
  return { locked: false };
}

export async function registerFailedAttempt(): Promise<void> {
  if (!(await canUseFs())) return;
  const sec = await readSecurity();
  sec.failedAttempts += 1;
  if (sec.failedAttempts >= MAX_ATTEMPTS) {
    sec.lockUntil = Date.now() + LOCK_MS;
    sec.failedAttempts = 0;
  }
  await writeSecurity(sec);
}

export async function clearFailedAttempts(): Promise<void> {
  if (!(await canUseFs())) return;
  const sec = await readSecurity();
  sec.failedAttempts = 0;
  sec.lockUntil = null;
  await writeSecurity(sec);
}

export async function isTotpEnabled(): Promise<boolean> {
  if (process.env.ADMIN_TOTP_SECRET?.trim()) return true;
  const sec = await readSecurity();
  return !!(sec.totpEnabled && sec.totpSecret);
}

/**
 * 2FA only when a secret already exists (env or file).
 * On Vercel without ADMIN_TOTP_SECRET → password-only (no broken 2FA).
 * Locally with writable FS and no secret yet → offer one-time setup.
 */
export async function isTotpRequired(): Promise<boolean> {
  if (await isTotpEnabled()) return true;
  return canUseFs();
}

function getTotp(secret: string) {
  return new OTPAuth.TOTP({
    issuer: "TeamX Admin",
    label: "admin@teamxtech",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
}

export async function beginTotpSetup(): Promise<{
  secret: string;
  uri: string;
  qrDataUrl: string;
}> {
  const secret = new OTPAuth.Secret({ size: 20 });
  const base32 = secret.base32;
  const totp = getTotp(base32);
  const uri = totp.toString();
  const qrDataUrl = await QRCode.toDataURL(uri, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 220,
    color: { dark: "#0b1220", light: "#ffffff" },
  });

  const sec = await readSecurity();
  sec.totpSecret = base32;
  sec.totpEnabled = false;
  await writeSecurity(sec);

  return { secret: base32, uri, qrDataUrl };
}

export async function verifyAndEnableTotp(
  code: string,
  setupSecret?: string
): Promise<boolean> {
  const sec = await readSecurity();
  const secret = setupSecret || sec.totpSecret;
  if (!secret) return false;
  const totp = getTotp(secret);
  const delta = totp.validate({ token: code.replace(/\s/g, ""), window: 1 });
  if (delta === null) return false;
  sec.totpSecret = secret;
  sec.totpEnabled = true;
  await writeSecurity(sec);
  return true;
}

export async function verifyTotpCode(code: string): Promise<boolean> {
  const sec = await readSecurity();
  if (!sec.totpEnabled || !sec.totpSecret) return false;
  const totp = getTotp(sec.totpSecret);
  const delta = totp.validate({ token: code.replace(/\s/g, ""), window: 1 });
  return delta !== null;
}

export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value, "full");
}

export async function requirePending(bodyToken?: string | null): Promise<boolean> {
  if (bodyToken && verifySessionToken(bodyToken, "pending")) return true;
  const jar = await cookies();
  return verifySessionToken(jar.get(PENDING_COOKIE)?.value, "pending");
}

export { SESSION_COOKIE };
