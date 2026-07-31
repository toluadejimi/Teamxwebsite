"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/images", label: "Images", icon: ImageIcon },
  { href: "/admin/contact", label: "Contact Info", icon: Phone },
  { href: "/admin/jobs", label: "Job Postings", icon: Briefcase },
  { href: "/admin/chat", label: "Live Chat", icon: MessageSquare },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#070b14] text-slate-100 overscroll-none">
      <div className="mx-auto flex h-full max-w-7xl">
        <aside className="hidden h-full w-60 shrink-0 overflow-y-auto border-r border-white/10 p-5 md:block">
          <Link href="/admin" className="mb-8 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold">
              X
            </span>
            <span className="font-semibold tracking-tight">TeamX Admin</span>
          </Link>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                pathname === link.href ||
                (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-blue-600/20 text-blue-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={logout}
            className="mt-8 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <Link
            href="/"
            className="mt-2 block px-3 text-xs text-slate-500 hover:text-blue-300"
          >
            ← View website
          </Link>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 md:px-8">
            <div className="flex gap-2 overflow-x-auto md:hidden">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1 text-xs",
                    pathname === link.href
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-slate-300"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="hidden text-sm text-slate-400 md:block">
              Content & operations console
            </p>
            <button
              type="button"
              onClick={logout}
              className="text-xs text-slate-400 hover:text-white md:hidden"
            >
              Sign out
            </button>
          </header>
          <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
