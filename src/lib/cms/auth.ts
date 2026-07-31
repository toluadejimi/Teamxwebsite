import { createHmac, randomBytes, timingSafeEqual, createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import {
  SESSION_COOKIE,
  createSessionToken,
  getAdminPassword,
  hashToken,
  safeEqual,
} from "./store";

export const PENDING_COOKIE = "teamx_admin_pending";
export const SETUP_COOKIE = "teamx_admin_setup";

const DATA_DIR = path.join(process.cwd(), "data");
const SECURITY_FILE = path.join(DATA_DIR, "security.json");

type SecurityConfig = {
  totpSecret: string | null;
  totpEnabled: boolean;
  failedAttempts: number;
  lockUntil: number | null;
};

type SessionRecord = {
  exp: number;
  kind: "full" | "pending" | "setup";
};

const sessions = new Map<string, SessionRecord>();
const SESSION_TTL = 1000 * 60 * 60 * 12; // 12h full
const PENDING_TTL = 1000 * 60 * 10; // 10m pending 2FA
const MAX_ATTEMPTS = 5;
const LOCK_MS = 1000 * 60 * 15; // 15m lockout

function defaultSecurity(): SecurityConfig {
  return {
    totpSecret: null,
    totpEnabled: false,
    failedAttempts: 0,
    lockUntil: null,
  };
}

async function readSecurity(): Promise<SecurityConfig> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(SECURITY_FILE, "utf8");
    return { ...defaultSecurity(), ...JSON.parse(raw) };
  } catch {
    const data = defaultSecurity();
    await fs.writeFile(SECURITY_FILE, JSON.stringify(data, null, 2), "utf8");
    return data;
  }
}

async function writeSecurity(data: SecurityConfig): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SECURITY_FILE, JSON.stringify(data, null, 2), "utf8");
}

function pruneSessions() {
  const now = Date.now();
  for (const [key, rec] of sessions) {
    if (rec.exp < now) sessions.delete(key);
  }
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true as const,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export function issueToken(
  kind: SessionRecord["kind"]
): { token: string; maxAge: number } {
  pruneSessions();
  const token = createSessionToken();
  const ttl = kind === "full" ? SESSION_TTL : PENDING_TTL;
  sessions.set(hashToken(token), { exp: Date.now() + ttl, kind });
  return { token, maxAge: ttl / 1000 };
}

/** @deprecated use issueToken('full') */
export function issueSession() {
  return issueToken("full");
}

export function revokeSession(token: string | undefined) {
  if (!token) return;
  sessions.delete(hashToken(token));
}

export function verifySessionToken(
  token: string | undefined,
  kind: SessionRecord["kind"] = "full"
): boolean {
  if (!token) return false;
  pruneSessions();
  const rec = sessions.get(hashToken(token));
  if (!rec || rec.exp < Date.now()) {
    if (token) sessions.delete(hashToken(token));
    return false;
  }
  return rec.kind === kind;
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  // Pad to constant-time compare even if lengths differ
  const a = createHash("sha256").update(password).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function isLockedOut(): Promise<{ locked: boolean; retryAfter?: number }> {
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
  const sec = await readSecurity();
  sec.failedAttempts += 1;
  if (sec.failedAttempts >= MAX_ATTEMPTS) {
    sec.lockUntil = Date.now() + LOCK_MS;
    sec.failedAttempts = 0;
  }
  await writeSecurity(sec);
}

export async function clearFailedAttempts(): Promise<void> {
  const sec = await readSecurity();
  sec.failedAttempts = 0;
  sec.lockUntil = null;
  await writeSecurity(sec);
}

export async function isTotpEnabled(): Promise<boolean> {
  const sec = await readSecurity();
  return !!(sec.totpEnabled && sec.totpSecret);
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

  // Store pending secret (not enabled until verified)
  const sec = await readSecurity();
  sec.totpSecret = base32;
  sec.totpEnabled = false;
  await writeSecurity(sec);

  return { secret: base32, uri, qrDataUrl };
}

export async function verifyAndEnableTotp(code: string): Promise<boolean> {
  const sec = await readSecurity();
  if (!sec.totpSecret) return false;
  const totp = getTotp(sec.totpSecret);
  const delta = totp.validate({ token: code.replace(/\s/g, ""), window: 1 });
  if (delta === null) return false;
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
  const token = jar.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token, "full");
}

export async function requirePending(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(PENDING_COOKIE)?.value;
  return verifySessionToken(token, "pending");
}

export { SESSION_COOKIE, cookieOptions };

/** Encrypt-ish obfuscation for displaying recovery hint — not for secrets */
export function fingerprintEnv(): string {
  const key = process.env.ADMIN_PASSWORD || "default";
  return createHmac("sha256", "teamx").update(key).digest("hex").slice(0, 8);
}

export { safeEqual, createSessionToken, hashToken, randomBytes };
