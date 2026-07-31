"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import type { CmsJob } from "@/lib/cms/store";

export function CareersJobsList() {
  const [jobs, setJobs] = useState<CmsJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/jobs")
      .then((r) => r.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-border bg-surface"
          />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <p className="text-center text-muted">
        No open roles right now. Check back soon or send an open application below.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job, index) => (
        <Reveal key={job.id} delay={index * 0.04}>
          <article className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.1)] md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge>{job.department}</Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {job.title}
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    {job.experience}
                  </span>
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {job.description}
                </p>
                {job.salary && (
                  <p className="mt-2 text-sm font-medium text-accent">{job.salary}</p>
                )}
              </div>
              <Button href={`#apply`} className="shrink-0">
                Apply
              </Button>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
