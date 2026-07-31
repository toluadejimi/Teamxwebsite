"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import type { CmsContact } from "@/lib/cms/store";

const fallback: CmsContact = {
  companyName: "Team X Technologies Ltd",
  email: "hello@teamxtech.com",
  phone: "+234 1 234 5678",
  whatsapp: "2348012345678",
  supportEmail: "support@teamxtech.com",
  offices: [
    {
      city: "Lagos",
      country: "Nigeria",
      address: "12 Admiralty Way, Lekki Phase 1, Lagos",
      phone: "+234 1 234 5678",
      email: "lagos@teamxtech.com",
      isHeadquarters: true,
    },
  ],
};

export function ContactInfoPanel() {
  const [contact, setContact] = useState<CmsContact>(fallback);

  useEffect(() => {
    fetch("/api/public/contact")
      .then((r) => r.json())
      .then((data) => {
        if (data?.email) setContact(data);
      })
      .catch(() => undefined);
  }, []);

  const whatsapp = contact.whatsapp.replace(/\D/g, "");

  return (
    <>
      <ul className="mt-8 space-y-6">
        <li>
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Mail className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-accent group-hover:underline">{contact.email}</p>
            </div>
          </a>
        </li>
        <li>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Phone className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-accent group-hover:underline">{contact.phone}</p>
            </div>
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <MessageCircle className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">WhatsApp</p>
              <p className="text-sm text-accent group-hover:underline">Chat with us</p>
            </div>
          </a>
        </li>
      </ul>

      <div id="offices" className="mt-10">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Nigeria offices
        </h3>
        <div className="mt-4 grid gap-4">
          {contact.offices.map((office, index) => (
            <Reveal key={`${office.city}-${index}`} delay={index * 0.05}>
              <address className="not-italic rounded-xl border border-border bg-surface p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">
                      {office.city}
                      {office.isHeadquarters ? " · HQ" : ""}
                    </p>
                    <p className="mt-1 text-sm text-muted">{office.address}</p>
                    <p className="mt-1 text-sm text-muted">{office.phone}</p>
                    <p className="text-sm text-accent">{office.email}</p>
                  </div>
                </div>
              </address>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
