"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

type Step = "password" | "setup" | "verify";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onPasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Incorrect password.");
      return;
    }

    // Password-only (e.g. Vercel without 2FA secret configured)
    if (!data.requires2fa) {
      router.push("/admin");
      router.refresh();
      return;
    }

    if (data.setupRequired) {
      const setup = await fetch("/api/admin/2fa");
      const setupData = await setup.json();
      if (!setup.ok) {
        setError(setupData.error || "Could not start 2FA setup.");
        return;
      }
      setQrDataUrl(setupData.qrDataUrl || "");
      setSecret(setupData.secret || "");
      setStep("setup");
      return;
    }

    setStep("verify");
  }

  async function onTotpSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid code.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b14] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c1220] p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
            {step === "password" ? "X" : <ShieldCheck className="h-5 w-5" />}
          </span>
          <div>
            <h1 className="text-lg font-semibold text-white">
              {step === "password" && "Admin Login"}
              {step === "setup" && "Set up 2FA"}
              {step === "verify" && "Authenticator code"}
            </h1>
            <p className="text-xs text-slate-400">
              {step === "password" && "Password required"}
              {step === "setup" && "Google Authenticator / Authy"}
              {step === "verify" && "Enter the 6-digit code"}
            </p>
          </div>
        </div>

        {step === "password" && (
          <form onSubmit={onPasswordSubmit}>
            <label className="mb-2 block text-xs font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none ring-blue-500 focus:ring-2"
              placeholder="Admin password"
              autoComplete="current-password"
              autoFocus
              required
            />
            {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Checking…" : "Continue"}
            </button>
          </form>
        )}

        {step === "setup" && (
          <form onSubmit={onTotpSubmit} className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-400">
              Scan this QR code with{" "}
              <strong className="text-slate-200">Google Authenticator</strong>, Authy,
              or 1Password. Then enter the 6-digit code to finish setup.
            </p>
            {qrDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="2FA QR code"
                className="mx-auto rounded-xl border border-white/10 bg-white p-2"
                width={180}
                height={180}
                draggable={false}
              />
            )}
            {secret && (
              <p className="break-all rounded-lg bg-black/40 p-2 font-mono text-[10px] text-slate-400">
                Manual key: {secret}
              </p>
            )}
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-center font-mono text-lg tracking-[0.4em] text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="000000"
              autoFocus
              required
              autoComplete="one-time-code"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Enable 2FA & sign in"}
            </button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={onTotpSubmit}>
            <p className="mb-4 text-sm text-slate-400">
              Open your authenticator app and enter the current code for TeamX Admin.
            </p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mb-4 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-center font-mono text-lg tracking-[0.4em] text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="000000"
              autoFocus
              required
              autoComplete="one-time-code"
            />
            {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify & enter admin"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("password");
                setCode("");
                setError("");
              }}
              className="mt-3 w-full text-xs text-slate-500 hover:text-slate-300"
            >
              ← Back to password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
