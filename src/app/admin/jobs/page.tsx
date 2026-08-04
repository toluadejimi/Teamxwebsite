"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import type { CmsJob } from "@/lib/cms/store";
import { cn } from "@/lib/utils";

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
  "Internship",
] as const;

type JobFormState = {
  title: string;
  department: string;
  location: string;
  type: CmsJob["type"];
  experience: string;
  description: string;
  salary: string;
  responsibilities: string;
  requirements: string;
  niceToHave: string;
};

const emptyForm = (): JobFormState => ({
  title: "",
  department: "",
  location: "Lagos, Nigeria",
  type: "Full-time",
  experience: "",
  description: "",
  salary: "",
  responsibilities: "",
  requirements: "",
  niceToHave: "",
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

function formFromJob(job: CmsJob): JobFormState {
  return {
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    experience: job.experience,
    description: job.description,
    salary: job.salary || "",
    responsibilities: arrayToLines(job.responsibilities),
    requirements: arrayToLines(job.requirements),
    niceToHave: arrayToLines(job.niceToHave),
  };
}

function formToPayload(form: JobFormState, existing?: CmsJob): Partial<CmsJob> {
  return {
    ...(existing ? { id: existing.id, slug: existing.slug, postedDate: existing.postedDate, active: existing.active } : {}),
    title: form.title.trim(),
    department: form.department.trim() || "Engineering",
    location: form.location.trim() || "Lagos, Nigeria",
    type: form.type,
    experience: form.experience.trim() || "Not specified",
    description: form.description.trim(),
    salary: form.salary.trim() || undefined,
    responsibilities: linesToArray(form.responsibilities),
    requirements: linesToArray(form.requirements),
    niceToHave: linesToArray(form.niceToHave),
  };
}

function JobFormFields({
  form,
  setForm,
  idPrefix,
}: {
  form: JobFormState;
  setForm: (f: JobFormState) => void;
  idPrefix: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Title *</span>
        <input
          id={`${idPrefix}-title`}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Department</span>
        <input
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Location</span>
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Type</span>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as CmsJob["type"] })
          }
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs text-slate-400">Experience</span>
        <input
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          placeholder="e.g. 3+ years"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Salary (optional)</span>
        <input
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          placeholder="e.g. Competitive / ₦500k–800k"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">Description *</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">
          Responsibilities (one per line)
        </span>
        <textarea
          value={form.responsibilities}
          onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">
          Requirements (one per line)
        </span>
        <textarea
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs text-slate-400">
          Nice to have (one per line, optional)
        </span>
        <textarea
          value={form.niceToHave}
          onChange={(e) => setForm({ ...form, niceToHave: e.target.value })}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
    </div>
  );
}

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<CmsJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForms, setEditForms] = useState<Record<string, JobFormState>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    const res = await fetch("/api/admin/jobs");
    if (res.ok) {
      setJobs(await res.json());
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/admin/me", { credentials: "include" });
        if (!me.ok) {
          router.replace("/admin/login");
          return;
        }
        await loadJobs();
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, [router, loadJobs]);

  async function toggleActive(job: CmsJob) {
    const updated = { ...job, active: !job.active };
    const res = await fetch("/api/admin/jobs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      const saved = await res.json();
      setJobs((prev) => prev.map((j) => (j.id === saved.id ? saved : j)));
    }
  }

  async function deleteJob(id: string) {
    if (!confirm("Delete this job posting?")) return;
    const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      if (expandedId === id) setExpandedId(null);
      setMessage("Job deleted");
    } else {
      setMessage("Failed to delete job");
    }
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMessage("");
    const res = await fetch("/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToPayload(createForm)),
    });
    setCreating(false);
    if (res.ok) {
      const job = await res.json();
      setJobs((prev) => [job, ...prev]);
      setCreateForm(emptyForm());
      setShowCreate(false);
      setMessage("Job created");
    } else {
      setMessage("Failed to create job");
    }
  }

  function openEdit(job: CmsJob) {
    setExpandedId(job.id);
    setEditForms((prev) => ({ ...prev, [job.id]: formFromJob(job) }));
  }

  async function onSaveEdit(e: FormEvent, job: CmsJob) {
    e.preventDefault();
    const form = editForms[job.id];
    if (!form) return;
    setSavingId(job.id);
    setMessage("");
    const payload = { ...job, ...formToPayload(form, job) } as CmsJob;
    const res = await fetch("/api/admin/jobs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSavingId(null);
    if (res.ok) {
      const saved = await res.json();
      setJobs((prev) => prev.map((j) => (j.id === saved.id ? saved : j)));
      setMessage("Job updated");
    } else {
      setMessage("Failed to update job");
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Loading…</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Job Postings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage careers page listings — create, edit, activate, or remove roles.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          {showCreate ? "Cancel" : "New job"}
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      {showCreate && (
        <form
          onSubmit={onCreate}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <h2 className="mb-4 text-sm font-semibold text-white">Create new job</h2>
          <JobFormFields
            form={createForm}
            setForm={setCreateForm}
            idPrefix="create"
          />
          <button
            type="submit"
            disabled={creating}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {creating ? "Creating…" : "Create job"}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {jobs.length === 0 ? (
          <p className="text-sm text-slate-500">No job postings yet.</p>
        ) : (
          jobs.map((job) => {
            const isExpanded = expandedId === job.id;
            const lastMsg = job.description.slice(0, 80);
            const editForm = editForms[job.id];

            return (
              <article
                key={job.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-white">{job.title}</h3>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                          job.active
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-500/20 text-slate-400"
                        )}
                      >
                        {job.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {job.department} · {job.location} · {job.type}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Posted {job.postedDate}
                      {job.salary ? ` · ${job.salary}` : ""}
                    </p>
                    {!isExpanded && (
                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                        {lastMsg}…
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleActive(job)}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
                    >
                      {job.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        isExpanded
                          ? setExpandedId(null)
                          : openEdit(job)
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
                    >
                      <Pencil className="h-3 w-3" />
                      {isExpanded ? "Close" : "Edit"}
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                      aria-label="Delete job"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && editForm && (
                  <form
                    onSubmit={(e) => onSaveEdit(e, job)}
                    className="border-t border-white/10 p-4"
                  >
                    <JobFormFields
                      form={editForm}
                      setForm={(f) =>
                        setEditForms((prev) => ({ ...prev, [job.id]: f }))
                      }
                      idPrefix={`edit-${job.id}`}
                    />
                    <button
                      type="submit"
                      disabled={savingId === job.id}
                      className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
                    >
                      {savingId === job.id ? "Saving…" : "Save changes"}
                    </button>
                  </form>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
