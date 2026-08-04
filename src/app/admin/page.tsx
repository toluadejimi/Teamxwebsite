"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  ImageIcon,
  Inbox,
  Layers,
  MessageSquare,
  Phone,
} from "lucide-react";

async function fetchJson(url: string) {
  const res = await fetch(url, { cache: "no-store", credentials: "include" });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    jobs: 0,
    chats: 0,
    unread: 0,
    images: 0,
    caseStudies: 0,
    services: 0,
    leads: 0,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const me = await fetch("/api/admin/me", {
          cache: "no-store",
          credentials: "include",
        });
        if (!me.ok) {
          router.replace("/admin/login");
          return;
        }

        const [jobs, chats, images, caseStudies, services, leads] =
          await Promise.all([
            fetchJson("/api/admin/jobs").catch(() => []),
            fetchJson("/api/admin/chats").catch(() => []),
            fetchJson("/api/admin/images").catch(() => []),
            fetchJson("/api/admin/case-studies").catch(() => []),
            fetchJson("/api/admin/services").catch(() => []),
            fetchJson("/api/admin/leads").catch(() => ({})),
          ]);

        if (cancelled) return;

        const newLeads = (["enquiries", "demoRequests", "quoteRequests", "jobApplications"] as const)
          .reduce((n, key) => {
            const list = leads?.[key];
            if (!Array.isArray(list)) return n;
            return n + list.filter((e: { status?: string }) => e.status === "new").length;
          }, 0);

        setStats({
          jobs: Array.isArray(jobs) ? jobs.length : 0,
          chats: Array.isArray(chats) ? chats.length : 0,
          unread: Array.isArray(chats)
            ? chats.reduce(
                (n: number, c: { unreadAdmin?: number }) =>
                  n + (c.unreadAdmin || 0),
                0
              )
            : 0,
          images: Array.isArray(images) ? images.length : 0,
          caseStudies: Array.isArray(caseStudies) ? caseStudies.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          leads: newLeads,
        });
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load dashboard");
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <p className="mt-3 text-xs tracking-wider text-slate-500 uppercase">
          Loading dashboard
        </p>
      </div>
    );
  }

  const cards = [
    {
      href: "/admin/leads",
      label: "Leads",
      value: stats.leads,
      icon: Inbox,
      hint: "Contact, demos, quotes, applications",
    },
    {
      href: "/admin/images",
      label: "Images & Logo",
      value: stats.images,
      icon: ImageIcon,
      hint: "Logo, banners & media",
    },
    {
      href: "/admin/contact",
      label: "Contact Info",
      value: "NG",
      icon: Phone,
      hint: "Email, phone, Nigeria offices",
    },
    {
      href: "/admin/services",
      label: "Services",
      value: stats.services,
      icon: Layers,
      hint: "Edit offerings & banners",
    },
    {
      href: "/admin/case-studies",
      label: "Case Studies",
      value: stats.caseStudies,
      icon: FileText,
      hint: "Create & edit success stories",
    },
    {
      href: "/admin/jobs",
      label: "Job Postings",
      value: stats.jobs,
      icon: Briefcase,
      hint: "Manage careers page",
    },
    {
      href: "/admin/chat",
      label: "Live Chat",
      value: stats.unread,
      icon: MessageSquare,
      hint: `${stats.chats} conversations`,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Manage website content, careers, and visitor chat.
      </p>
      {error && (
        <p className="mt-3 text-sm text-amber-400">
          Some data could not load ({error}). You can still open the sections below.
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-blue-500/40 hover:bg-white/[0.05]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {card.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">{card.value}</p>
              <p className="mt-1 text-xs text-slate-400">{card.hint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
