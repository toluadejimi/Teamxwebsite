"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsImageEntry } from "@/lib/cms/store";

export default function AdminImagesPage() {
  const router = useRouter();
  const [images, setImages] = useState<CmsImageEntry[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/admin/me", { credentials: "include" });
        if (!me.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await fetch("/api/admin/images", {
          credentials: "include",
        }).then((r) => r.json());
        setImages(Array.isArray(data) ? data : []);
      } catch {
        setImages([]);
      }
    })();
  }, [router]);

  async function saveUrl(key: string, url: string) {
    setSaving(key);
    setMessage("");
    const res = await fetch("/api/admin/images", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, url }),
    });
    setSaving(null);
    if (res.ok) {
      setMessage("Image updated");
      const data = await res.json();
      setImages(data);
    } else {
      setMessage("Failed to save");
    }
  }

  async function upload(key: string, file: File) {
    setSaving(key);
    const form = new FormData();
    form.append("file", file);
    const up = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!up.ok) {
      setSaving(null);
      const err = await up.json().catch(() => ({}));
      setMessage(err.error || "Upload failed");
      return;
    }
    const { url } = await up.json();
    await saveUrl(key, url);
  }

  const categories = [...new Set(images.map((i) => i.category))];

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-semibold text-white">Images & Logo</h1>
      <p className="mt-1 text-sm text-slate-400">
        Update the company logo and site images. On Vercel, logo uploads under 400KB
        are stored in CMS; larger files need an image URL.
      </p>
      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      <div className="mt-8 space-y-10">
        {(["Brand", ...categories.filter((c) => c !== "Brand")] as string[]).map(
          (category) => {
            const items = images.filter((i) => i.category === category);
            if (!items.length) return null;
            return (
          <section key={category}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              {category}
              {category === "Brand" ? " — appears in navbar & footer" : ""}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((img) => (
                  <article
                    key={img.key}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <div
                      className={
                        img.key === "brand.logo"
                          ? "relative flex aspect-video items-center justify-center overflow-hidden bg-black/40 p-8"
                          : "relative aspect-video overflow-hidden bg-black/40"
                      }
                    >
                      {img.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.url}
                          alt={img.label}
                          className={
                            img.key === "brand.logo"
                              ? "pointer-events-none max-h-24 max-w-full select-none object-contain"
                              : "pointer-events-none h-full w-full select-none object-cover"
                          }
                          draggable={false}
                        />
                      ) : (
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
                          X
                        </span>
                      )}
                    </div>
                    <div className="space-y-3 p-4">
                      <div>
                        <p className="text-sm font-medium text-white">{img.label}</p>
                        <p className="text-xs text-slate-500">{img.key}</p>
                      </div>
                      <input
                        defaultValue={img.url}
                        key={`${img.key}-${img.url.slice(0, 40)}`}
                        onBlur={(e) => {
                          if (e.target.value !== img.url) {
                            saveUrl(img.key, e.target.value);
                          }
                        }}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://… or upload a file"
                      />
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500">
                          {saving === img.key ? "Saving…" : "Upload"}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) upload(img.key, file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Paste URL + blur to save, or upload
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
            );
          }
        )}
      </div>
    </div>
  );
}
