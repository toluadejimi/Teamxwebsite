"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import type { CmsContact, CmsOffice } from "@/lib/cms/store";

const fallbackHq: CmsOffice = {
  city: "Lagos",
  country: "Nigeria",
  address: "12 Admiralty Way, Lekki Phase 1, Lagos",
  phone: "+234 1 234 5678",
  email: "lagos@teamxtech.com",
  isHeadquarters: true,
};

function pickHq(contact: CmsContact | null): CmsOffice {
  const offices = contact?.offices?.length ? contact.offices : [fallbackHq];
  return offices.find((o) => o.isHeadquarters) || offices[0] || fallbackHq;
}

export function ContactMapSection() {
  const [hq, setHq] = useState<CmsOffice>(fallbackHq);

  useEffect(() => {
    fetch("/api/public/contact")
      .then((r) => r.json())
      .then((data: CmsContact) => {
        if (data?.offices?.length) setHq(pickHq(data));
      })
      .catch(() => undefined);
  }, []);

  const mapsQuery = encodeURIComponent(
    `${hq.address}, ${hq.city}, ${hq.country}`
  );
  const title = hq.isHeadquarters
    ? `${hq.city} Headquarters`
    : `${hq.city} Office`;

  return (
    <Section
      className="border-t border-border bg-surface/50"
      eyebrow="Map"
      title={`Find us in ${hq.city}`}
    >
      <Reveal>
        <div
          className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/5 via-surface to-background"
          role="img"
          aria-label={`Map showing Team X office in ${hq.city}, ${hq.country}`}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="relative px-6 text-center">
            <MapPin className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden />
            <p className="font-display text-lg font-semibold text-foreground">
              {title}
            </p>
            <p className="mt-1 text-sm text-muted">{hq.address}</p>
            <Link
              href={`https://maps.google.com/?q=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Open in Google Maps
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
