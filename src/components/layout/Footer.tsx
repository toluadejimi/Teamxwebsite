"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  certifications,
  footerLinks,
  socialLinksWithLabel as socialLinks,
} from "@/lib/data/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { WorldMap } from "@/components/shared/WorldMap";
import type { CmsOffice } from "@/lib/cms/store";

interface FooterProps {
  className?: string;
}

const linkSections = [
  { title: "Company", links: footerLinks.company },
  { title: "Industries", links: footerLinks.industries },
  { title: "Solutions", links: footerLinks.solutions },
  { title: "Products", links: footerLinks.products },
  { title: "Resources", links: footerLinks.resources },
  { title: "Legal", links: footerLinks.legal },
];

const fallbackOffices: CmsOffice[] = [
  {
    city: "Lagos",
    country: "Nigeria",
    address: "12 Admiralty Way, Lekki Phase 1",
    phone: "+234 1 234 5678",
    email: "lagos@teamxtech.com",
  },
  {
    city: "Abuja",
    country: "Nigeria",
    address: "Plot 42, Central Business District",
    phone: "+234 9 461 2000",
    email: "abuja@teamxtech.com",
  },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [offices, setOffices] = useState<CmsOffice[]>(fallbackOffices);

  useEffect(() => {
    fetch("/api/public/contact")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.offices) && data.offices.length) {
          setOffices(data.offices);
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <footer className={cn("border-t border-border bg-surface", className)}>
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-accent-foreground">
                X
              </div>
              <span className="font-display text-base font-semibold tracking-tight text-foreground">
                Team<span className="text-accent">X</span> Technologies
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Enterprise-grade technology solutions for organizations that demand
              precision, security, and scale — headquartered in Nigeria.
            </p>
            <div className="mt-8">
              <NewsletterForm variant="stacked" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3 xl:grid-cols-6">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                Nigeria Presence
              </h3>
              <p className="mt-2 text-sm text-muted">
                Serving clients from our Lagos and Abuja offices.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {offices.map((office) => (
                  <div
                    key={`${office.city}-${office.address}`}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {office.city}, {office.country}
                    </p>
                    <p className="mt-1 text-xs text-muted">{office.address}</p>
                  </div>
                ))}
              </div>
            </div>
            <WorldMap className="opacity-80" />
          </div>
        </div>

        <div className="border-t border-border py-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              Certifications
            </span>
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {currentYear} Team X Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
