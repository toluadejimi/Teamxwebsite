"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { CmsPortfolio } from "@/lib/cms/store";
import { compressImageFile } from "@/lib/cms/compress-image";

type FormState = {
  title: string;
  client: string;
  industry: string;
  duration: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  features: string;
  technology: string;
  gallery: string;
  active: boolean;
};

const emptyForm = (): FormState => ({
  title: "",
  client: "",
  industry: "Financial Services",
  duration: "",
  image: "",
  description: "",
  challenge: "",
  solution: "",
  outcome: "",
  features: "",
  technology: "",
  gallery: "",
  active: true,
});

function formFromProject(p: CmsPortfolio): FormState {
  return {
    title: p.title,
    client: p.client,
    industry: p.industry,
    duration: p.duration,
    image: p.image,
    description: p.description,
    challenge: p.challenge,
    solution: p.solution,
    outcome: p.outcome,
    features: p.features.join("\n"),
    technology: p.technology.join(", "),
    gallery: p.gallery.join("\n"),
    active: p.active !== false,
  };
}

function formToPayload(form: FormState, existing?: CmsPortfolio): Partial<CmsPortfolio> {
  return {
    ...(existing ? { id: existing.id, slug: existing.slug } : {}),
    title: form.title.trim(),
    client: form.client.trim(),
    industry: form.industry.trim(),
    duration: form.duration.trim(),
    image: form.image.trim(),
    description: form.description.trim(),
    challenge: form.challenge.trim(),
    solution: form.solution.trim(),
    outcome: form.outcome.trim(),
    features: form.features
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    technology: form.technology
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    gallery: form.gallery
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    active: form.active,
  };
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500";
const areaClass = `${inputClass} min-h-[80px]`;

function ProjectFormFields({
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
        <span className="mb-1.5 block text-xs text-slate-400">Client</span>
        <input
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Industry</span>
        <input
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Duration</span>
        <input
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className={inputClass}
        />
      </label>
      <div className="sm:col-span-2 space-y-2">
        <span className="mb-1.5 block text-xs text-slate-400">Cover image</span>
        {form.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.image}
            alt=""
            className="h-32 w-full rounded-lg border border-white/10 object-cover"
          />
        )}
        <input
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://… or upload"
          className={inputClass}
        />
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
      </div>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Description *</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={areaClass}
          required
        />
      </label>
      {(
        [
          ["challenge", "Challenge"],
          ["solution", "Solution"],
          ["outcome", "Outcome"],
          ["features", "Features (one per line)"],
          ["gallery", "Gallery image URLs (one per line)"],
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
          Technologies (comma-separated)
        </span>
        <input
          value={form.technology}
          onChange={(e) => setForm({ ...form, technology: e.target.value })}
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

export default function AdminPortfolioPage() {
  const router = useRouter();
  const [items, setItems] = useState<CmsPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    try {
      const me = await fetch("/api/admin/me", { credentials: "include" });
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const data = await fetch("/api/admin/portfolio", {
        credentials: "include",
      }).then((r) => r.json());
      setItems(Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function uploadImage(file: File, mode: "create" | "edit", project?: CmsPortfolio) {
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
      if (mode === "edit" && project) {
        const next = { ...editForm, image: url };
        setEditForm(next);
        const saveRes = await fetch("/api/admin/portfolio", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formToPayload(next, project)),
        });
        if (!saveRes.ok) {
          const err = await saveRes.json().catch(() => ({}));
          setMessage(err.error || "Uploaded but failed to save");
          return;
        }
        setMessage("Image uploaded and saved");
        await load();
      } else {
        setCreateForm((prev) => ({ ...prev, image: url }));
        setMessage("Image attached — click Create to publish");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function createProject(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/portfolio", {
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
    setMessage("Portfolio project created");
    await load();
  }

  async function saveEdit(e: FormEvent, project: CmsPortfolio) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/portfolio", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToPayload(editForm, project)),
    });
    setBusy(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Failed to save");
      return;
    }
    setEditingId(null);
    setMessage("Portfolio project updated");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setBusy(true);
    await fetch(`/api/admin/portfolio?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    setBusy(false);
    setMessage("Project deleted");
    await load();
  }

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
          <h1 className="text-2xl font-semibold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create and edit portfolio projects shown on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New project
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      {creating && (
        <form
          onSubmit={createProject}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <ProjectFormFields
            form={createForm}
            setForm={setCreateForm}
            uploading={uploading}
            onUpload={(file) => uploadImage(file, "create")}
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
        {items.map((project) => {
          const isOpen = expanded === project.id;
          const isEditing = editingId === project.id;
          return (
            <article
              key={project.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
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
                    <p className="truncate font-medium text-white">{project.title}</p>
                    <p className="truncate text-xs text-slate-500">
                      {project.client} · {project.industry}
                      {!project.active && " · Draft"}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(project.id);
                    setEditForm(formFromProject(project));
                    setExpanded(project.id);
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(project.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-white/10 p-4">
                  {isEditing ? (
                    <form onSubmit={(e) => saveEdit(e, project)}>
                      <ProjectFormFields
                        form={editForm}
                        setForm={setEditForm}
                        uploading={uploading}
                        onUpload={(file) => uploadImage(file, "edit", project)}
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
                    <p className="text-sm text-slate-400">{project.description}</p>
                  )}
                </div>
              )}
            </article>
          );
        })}
        {!items.length && (
          <p className="text-sm text-slate-500">No portfolio projects yet.</p>
        )}
      </div>
    </div>
  );
}
