"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  CmsDemoRequest,
  CmsEnquiry,
  CmsJobApplication,
  CmsQuoteRequest,
  LeadStatus,
} from "@/lib/cms/store";

type Tab = "enquiries" | "demos" | "quotes" | "applications";

type LeadsPayload = {
  enquiries: CmsEnquiry[];
  demoRequests: CmsDemoRequest[];
  quoteRequests: CmsQuoteRequest[];
  jobApplications: CmsJobApplication[];
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("enquiries");
  const [data, setData] = useState<LeadsPayload>({
    enquiries: [],
    demoRequests: [],
    quoteRequests: [],
    jobApplications: [],
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const me = await fetch("/api/admin/me", { credentials: "include" });
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const json = await fetch("/api/admin/leads", {
        credentials: "include",
        cache: "no-store",
      }).then((r) => r.json());
      setData({
        enquiries: Array.isArray(json.enquiries) ? json.enquiries : [],
        demoRequests: Array.isArray(json.demoRequests) ? json.demoRequests : [],
        quoteRequests: Array.isArray(json.quoteRequests) ? json.quoteRequests : [],
        jobApplications: Array.isArray(json.jobApplications)
          ? json.jobApplications
          : [],
      });
    } catch {
      setMessage("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(
    kind: "enquiries" | "demoRequests" | "quoteRequests" | "jobApplications",
    id: string,
    status: LeadStatus
  ) {
    const res = await fetch("/api/admin/leads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id, status }),
    });
    if (res.ok) {
      const json = await res.json();
      setData(json);
      setMessage("Status updated");
    }
  }

  async function remove(
    kind: "enquiries" | "demoRequests" | "quoteRequests" | "jobApplications",
    id: string
  ) {
    if (!confirm("Delete this lead?")) return;
    await fetch(
      `/api/admin/leads?kind=${encodeURIComponent(kind)}&id=${encodeURIComponent(id)}`,
      { method: "DELETE" }
    );
    setMessage("Lead deleted");
    await load();
  }

  const counts = useMemo(
    () => ({
      enquiries: data.enquiries.filter((e) => e.status === "new").length,
      demos: data.demoRequests.filter((e) => e.status === "new").length,
      quotes: data.quoteRequests.filter((e) => e.status === "new").length,
      applications: data.jobApplications.filter((e) => e.status === "new").length,
    }),
    [data]
  );

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "enquiries", label: "Contact", count: counts.enquiries },
    { id: "demos", label: "Book demo", count: counts.demos },
    { id: "quotes", label: "Quotes", count: counts.quotes },
    { id: "applications", label: "Applications", count: counts.applications },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold text-white">Leads & Enquiries</h1>
      <p className="mt-1 text-sm text-slate-400">
        Messages from the contact form, demo bookings, quote requests, and job applications.
      </p>
      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm",
              tab === t.id
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            )}
          >
            {t.label}
            {t.count > 0 && (
              <span className="ml-2 rounded-full bg-white/20 px-1.5 text-xs">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {tab === "enquiries" &&
          data.enquiries.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {item.firstName} {item.lastName}
                    {item.status === "new" && (
                      <span className="ml-2 text-xs text-blue-300">NEW</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.email}
                    {item.phone ? ` · ${item.phone}` : ""} · {item.subject} ·{" "}
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <LeadActions
                  status={item.status}
                  onStatus={(s) => setStatus("enquiries", item.id, s)}
                  onDelete={() => remove("enquiries", item.id)}
                />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                {item.message}
              </p>
            </article>
          ))}

        {tab === "demos" &&
          data.demoRequests.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {item.fullName}
                    {item.status === "new" && (
                      <span className="ml-2 text-xs text-blue-300">NEW</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.email} · {item.company}
                    {item.jobTitle ? ` · ${item.jobTitle}` : ""} · {item.topic}
                  </p>
                  <p className="mt-1 text-xs text-blue-300">
                    Preferred: {item.preferredDate} at {item.preferredTime} WAT
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <LeadActions
                  status={item.status}
                  onStatus={(s) => setStatus("demoRequests", item.id, s)}
                  onDelete={() => remove("demoRequests", item.id)}
                />
              </div>
              {item.notes && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                  {item.notes}
                </p>
              )}
            </article>
          ))}

        {tab === "quotes" &&
          data.quoteRequests.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {item.fullName}
                    {item.status === "new" && (
                      <span className="ml-2 text-xs text-blue-300">NEW</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.email} · {item.company} · {item.projectType} · budget{" "}
                    {item.budget} · {item.timeline}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <LeadActions
                  status={item.status}
                  onStatus={(s) => setStatus("quoteRequests", item.id, s)}
                  onDelete={() => remove("quoteRequests", item.id)}
                />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                {item.description}
              </p>
            </article>
          ))}

        {tab === "applications" &&
          data.jobApplications.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {item.name}
                    {item.status === "new" && (
                      <span className="ml-2 text-xs text-blue-300">NEW</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.email} · position: {item.position}
                    {item.portfolio ? ` · ${item.portfolio}` : ""}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <LeadActions
                  status={item.status}
                  onStatus={(s) => setStatus("jobApplications", item.id, s)}
                  onDelete={() => remove("jobApplications", item.id)}
                />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                {item.coverLetter}
              </p>
            </article>
          ))}

        {((tab === "enquiries" && !data.enquiries.length) ||
          (tab === "demos" && !data.demoRequests.length) ||
          (tab === "quotes" && !data.quoteRequests.length) ||
          (tab === "applications" && !data.jobApplications.length)) && (
          <p className="text-sm text-slate-500">No submissions yet.</p>
        )}
      </div>
    </div>
  );
}

function LeadActions({
  status,
  onStatus,
  onDelete,
}: {
  status: LeadStatus;
  onStatus: (s: LeadStatus) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={status}
        onChange={(e) => onStatus(e.target.value as LeadStatus)}
        className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs text-white"
      >
        <option value="new">New</option>
        <option value="read">Read</option>
        <option value="archived">Archived</option>
      </select>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
