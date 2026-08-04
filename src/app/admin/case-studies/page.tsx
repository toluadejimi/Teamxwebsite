"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { CmsCaseStudy } from "@/lib/cms/store";
import { cn } from "@/lib/utils";

type FormState = {
  title: string;
  client: string;
  industry: string;
  service: string;
  duration: string;
  teamSize: string;
  image: string;
  summary: string;
  challenge: string;
  planning: string;
  design: string;
  architecture: string;
  development: string;
  testing: string;
  deployment: string;
  results: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: string;
  technologies: string;
  active: boolean;
};

const emptyForm = (): FormState => ({
  title: "",
  client: "",
  industry: "Financial Services",
  service: "",
  duration: "",
  teamSize: "10",
  image: "",
  summary: "",
  challenge: "",
  planning: "",
  design: "",
  architecture: "",
  development: "",
  testing: "",
  deployment: "",
  results: "",
  quote: "",
  author: "",
  role: "",
  company: "",
  metrics: "",
  technologies: "",
  active: true,
});

function formFromStudy(s: CmsCaseStudy): FormState {
  return {
    title: s.title,
    client: s.client,
    industry: s.industry,
    service: s.service,
    duration: s.duration,
    teamSize: String(s.teamSize),
    image: s.image,
    summary: s.summary,
    challenge: s.challenge,
    planning: s.planning,
    design: s.design,
    architecture: s.architecture,
    development: s.development,
    testing: s.testing,
    deployment: s.deployment,
    results: s.results,
    quote: s.testimonial.quote,
    author: s.testimonial.author,
    role: s.testimonial.role,
    company: s.testimonial.company,
    metrics: s.metrics
      .map((m) =>
        m.description
          ? `${m.label}|${m.value}|${m.description}`
          : `${m.label}|${m.value}`
      )
      .join("\n"),
    technologies: s.technologies.join(", "),
    active: s.active !== false,
  };
}

function parseMetrics(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label = "", value = "", description] = line.split("|").map((p) => p.trim());
      return { label, value, ...(description ? { description } : {}) };
    })
    .filter((m) => m.label && m.value);
}

function formToPayload(form: FormState, existing?: CmsCaseStudy): Partial<CmsCaseStudy> {
  return {
    ...(existing ? { id: existing.id, slug: existing.slug } : {}),
    title: form.title.trim(),
    client: form.client.trim(),
    industry: form.industry.trim(),
    service: form.service.trim(),
    duration: form.duration.trim(),
    teamSize: Number(form.teamSize) || 1,
    image: form.image.trim(),
    summary: form.summary.trim(),
    challenge: form.challenge.trim(),
    planning: form.planning.trim(),
    design: form.design.trim(),
    architecture: form.architecture.trim(),
    development: form.development.trim(),
    testing: form.testing.trim(),
    deployment: form.deployment.trim(),
    results: form.results.trim(),
    testimonial: {
      quote: form.quote.trim(),
      author: form.author.trim(),
      role: form.role.trim(),
      company: form.company.trim(),
    },
    metrics: parseMetrics(form.metrics),
    technologies: form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    active: form.active,
  };
}

function Field({
  label,
  children,
  span,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <label className={cn("block", span && "sm:col-span-2")}>
      <span className="mb-1.5 block text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500";
const areaClass = `${inputClass} min-h-[88px]`;

function StudyFormFields({
  form,
  setForm,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Title *" span>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
          required
        />
      </Field>
      <Field label="Client">
        <input
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Industry">
        <input
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Service">
        <input
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Duration">
        <input
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          placeholder="e.g. 18 months"
          className={inputClass}
        />
      </Field>
      <Field label="Team size">
        <input
          type="number"
          min={1}
          value={form.teamSize}
          onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Cover image URL" span>
        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://…"
          className={inputClass}
        />
      </Field>
      <Field label="Summary *" span>
        <textarea
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className={areaClass}
          required
        />
      </Field>
      {(
        [
          ["challenge", "Challenge"],
          ["planning", "Planning"],
          ["design", "Design"],
          ["architecture", "Architecture"],
          ["development", "Development"],
          ["testing", "Testing"],
          ["deployment", "Deployment"],
          ["results", "Results"],
        ] as const
      ).map(([key, label]) => (
        <Field key={key} label={label} span>
          <textarea
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={areaClass}
          />
        </Field>
      ))}
      <Field label="Testimonial quote" span>
        <textarea
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className={areaClass}
        />
      </Field>
      <Field label="Author">
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Role">
        <input
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Company" span>
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Metrics (one per line: Label|Value|Description)" span>
        <textarea
          value={form.metrics}
          onChange={(e) => setForm({ ...form, metrics: e.target.value })}
          placeholder={"Processing Time|94%|End-of-day batch\nUsers|800K"}
          className={areaClass}
        />
      </Field>
      <Field label="Technologies (comma-separated)" span>
        <input
          value={form.technologies}
          onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          className={inputClass}
        />
      </Field>
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

export default function AdminCaseStudiesPage() {
  const router = useRouter();
  const [studies, setStudies] = useState<CmsCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const me = await fetch("/api/admin/me", { credentials: "include" });
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const data = await fetch("/api/admin/case-studies", {
        credentials: "include",
      }).then((r) => r.json());
      setStudies(Array.isArray(data) ? data : []);
    } catch {
      setStudies([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function createStudy(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/case-studies", {
      method: "POST",
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
    setMessage("Case study created");
    await load();
  }

  async function saveEdit(e: FormEvent, study: CmsCaseStudy) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/case-studies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToPayload(editForm, study)),
    });
    setBusy(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Failed to save");
      return;
    }
    setEditingId(null);
    setMessage("Case study updated");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this case study?")) return;
    setBusy(true);
    await fetch(`/api/admin/case-studies?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setBusy(false);
    setMessage("Case study deleted");
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
          <h1 className="text-2xl font-semibold text-white">Case Studies</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create and edit client success stories shown on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New case study
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      {creating && (
        <form
          onSubmit={createStudy}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            New case study
          </h2>
          <StudyFormFields form={createForm} setForm={setCreateForm} />
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
        {studies.map((study) => {
          const isOpen = expanded === study.id;
          const isEditing = editingId === study.id;
          return (
            <article
              key={study.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() =>
                    setExpanded(isOpen ? null : study.id)
                  }
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {study.title}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {study.client} · {study.industry}
                      {!study.active && " · Draft"}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(study.id);
                    setEditForm(formFromStudy(study));
                    setExpanded(study.id);
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(study.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-white/10 p-4">
                  {isEditing ? (
                    <form onSubmit={(e) => saveEdit(e, study)}>
                      <StudyFormFields form={editForm} setForm={setEditForm} />
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
                      {study.summary}
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
        {!studies.length && (
          <p className="text-sm text-slate-500">No case studies yet.</p>
        )}
      </div>
    </div>
  );
}
