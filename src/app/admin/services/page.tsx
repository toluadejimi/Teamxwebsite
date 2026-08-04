"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { CmsService } from "@/lib/cms/store";
import { compressImageFile } from "@/lib/cms/compress-image";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "financial-solutions",
  "enterprise-software",
  "education",
  "healthcare",
  "hospitality",
  "government",
  "retail",
  "logistics",
  "ai-solutions",
  "mobile-applications",
  "cloud",
];

type FormState = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  bannerImage: string;
  problems: string;
  solutions: string;
  features: string;
  benefits: string;
  modules: string;
  techStack: string;
  active: boolean;
};

const emptyForm = (): FormState => ({
  title: "",
  slug: "",
  category: "enterprise-software",
  shortDescription: "",
  longDescription: "",
  bannerImage: "",
  problems: "",
  solutions: "",
  features: "",
  benefits: "",
  modules: "",
  techStack: "",
  active: true,
});

function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToLines(arr: string[]): string {
  return arr.join("\n");
}

function formFromService(s: CmsService): FormState {
  return {
    title: s.title,
    slug: s.slug,
    category: s.category,
    shortDescription: s.shortDescription,
    longDescription: s.longDescription,
    bannerImage: s.bannerImage,
    problems: arrayToLines(s.problems),
    solutions: arrayToLines(s.solutions),
    features: arrayToLines(s.features),
    benefits: arrayToLines(s.benefits),
    modules: arrayToLines(s.modules),
    techStack: s.techStack.join(", "),
    active: s.active !== false,
  };
}

function formToPayload(form: FormState, existing?: CmsService): Partial<CmsService> {
  return {
    ...(existing ? { id: existing.id } : {}),
    title: form.title.trim(),
    slug: form.slug.trim() || undefined,
    category: form.category,
    shortDescription: form.shortDescription.trim(),
    longDescription: form.longDescription.trim(),
    bannerImage: form.bannerImage.trim(),
    problems: linesToArray(form.problems),
    solutions: linesToArray(form.solutions),
    features: linesToArray(form.features),
    benefits: linesToArray(form.benefits),
    modules: linesToArray(form.modules),
    techStack: form.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    active: form.active,
  };
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500";
const areaClass = `${inputClass} min-h-[80px]`;

function ServiceFormFields({
  form,
  setForm,
  onUpload,
  uploading,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Title *</span>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
          required
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Slug</span>
        <input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="auto from title"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Category</span>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Short description *</span>
        <textarea
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className={areaClass}
          required
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Long description</span>
        <textarea
          value={form.longDescription}
          onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          className={`${inputClass} min-h-[120px]`}
        />
      </label>
      <div className="sm:col-span-2 space-y-2">
        <span className="mb-1.5 block text-xs text-slate-400">Banner image</span>
        {form.bannerImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.bannerImage}
            alt=""
            className="h-32 w-full rounded-lg border border-white/10 object-cover"
          />
        )}
        <input
          value={form.bannerImage.startsWith("data:") ? "" : form.bannerImage}
          onChange={(e) => setForm({ ...form, bannerImage: e.target.value })}
          placeholder={
            form.bannerImage.startsWith("data:")
              ? "Uploaded image ready — click Save if not auto-saved"
              : "https://… or upload a file"
          }
          className={inputClass}
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500">
            {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);
                e.target.value = "";
              }}
            />
          </label>
          <span className="text-[11px] text-slate-500">
            Images are compressed automatically. On edit, upload saves to the site right away.
          </span>
        </div>
      </div>
      {(
        [
          ["problems", "Problems (one per line)"],
          ["solutions", "Solutions (one per line)"],
          ["features", "Features (one per line)"],
          ["benefits", "Benefits (one per line)"],
          ["modules", "Modules (one per line)"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs text-slate-400">{label}</span>
          <textarea
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={areaClass}
          />
        </label>
      ))}
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">
          Tech stack (comma-separated)
        </span>
        <input
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className={inputClass}
        />
      </label>
      <label className="flex items-center gap-2 sm:col-span-2">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
          className="rounded border-white/20"
        />
        <span className="text-sm text-slate-300">Published on website</span>
      </label>
    </div>
  );
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<CmsService[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    try {
      const me = await fetch("/api/admin/me", { credentials: "include" });
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const data = await fetch("/api/admin/services", {
        credentials: "include",
      }).then((r) => r.json());
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function uploadBanner(file: File, mode: "create" | "edit", service?: CmsService) {
    setUploading(true);
    setMessage("");
    try {
      const compressed = await compressImageFile(file);
      const body = new FormData();
      body.append("file", compressed);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(err.error || "Upload failed");
        return;
      }
      const { url } = (await res.json()) as { url: string };
      if (!url) {
        setMessage("Upload returned no image URL");
        return;
      }

      if (mode === "edit" && service) {
        const nextForm = { ...editForm, bannerImage: url };
        setEditForm(nextForm);
        const saveRes = await fetch("/api/admin/services", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formToPayload(nextForm, service)),
        });
        if (!saveRes.ok) {
          const err = await saveRes.json().catch(() => ({}));
          setMessage(err.error || "Image uploaded but failed to save service");
          return;
        }
        setMessage("Banner uploaded and saved — check the live service page");
        await load();
      } else {
        setCreateForm((prev) => ({ ...prev, bannerImage: url }));
        setMessage("Image attached — click Create to publish the service");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function createService(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/services", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToPayload(createForm)),
    });
    setBusy(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Failed to create");
      return;
    }
    setCreateForm(emptyForm());
    setCreating(false);
    setMessage("Service created");
    await load();
  }

  async function saveEdit(e: FormEvent, service: CmsService) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/services", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToPayload(editForm, service)),
    });
    setBusy(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Failed to save");
      return;
    }
    setEditingId(null);
    setMessage("Service updated");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    setBusy(true);
    await fetch(`/api/admin/services?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    setBusy(false);
    setMessage("Service deleted");
    await load();
  }

  const filtered = services.filter((s) => {
    const q = filter.toLowerCase();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Services</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create and edit services, including banner images shown on the site.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New service
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by title, slug, or category…"
        className={cn(inputClass, "mt-6")}
      />

      {creating && (
        <form
          onSubmit={createService}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            New service
          </h2>
          <ServiceFormFields
            form={createForm}
            setForm={setCreateForm}
            uploading={uploading}
            onUpload={(file) => uploadBanner(file, "create")}
          />
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {busy ? "Saving…" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {filtered.map((service) => {
          const isOpen = expanded === service.id;
          const isEditing = editingId === service.id;
          return (
            <article
              key={service.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : service.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  {service.bannerImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={service.bannerImage}
                      alt=""
                      className="h-12 w-16 shrink-0 rounded-md object-cover"
                    />
                  ) : null}
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{service.title}</p>
                    <p className="truncate text-xs text-slate-500">
                      {service.category}
                      {!service.active && " · Draft"}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(service.id);
                    setEditForm(formFromService(service));
                    setExpanded(service.id);
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(service.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-white/10 p-4">
                  {isEditing ? (
                    <form onSubmit={(e) => saveEdit(e, service)}>
                      <ServiceFormFields
                        form={editForm}
                        setForm={setEditForm}
                        uploading={uploading}
                        onUpload={(file) =>
                          uploadBanner(file, "edit", service)
                        }
                      />
                      <div className="mt-4 flex gap-3">
                        <button
                          type="submit"
                          disabled={busy}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                        >
                          {busy ? "Saving…" : "Save changes"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-sm leading-relaxed text-slate-400">
                      {service.shortDescription}
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
        {!filtered.length && (
          <p className="text-sm text-slate-500">No services match.</p>
        )}
      </div>
    </div>
  );
}
