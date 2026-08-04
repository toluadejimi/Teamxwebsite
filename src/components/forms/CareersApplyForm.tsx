"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClassName, selectClassName, textareaClassName } from "./FormField";
import { FormSuccess } from "./FormSuccess";

type JobOption = { slug: string; title: string };

export function CareersApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState<JobOption[]>([]);

  useEffect(() => {
    fetch("/api/public/jobs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(
            data.map((j: { slug: string; title: string }) => ({
              slug: j.slug,
              title: j.title,
            }))
          );
        }
      })
      .catch(() => undefined);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      position: String(form.get("position") || ""),
      portfolio: String(form.get("portfolio") || ""),
      coverLetter: String(form.get("coverLetter") || ""),
    };

    try {
      const res = await fetch("/api/public/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit application");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Application submitted"
        message="Thank you for your interest in Team X. Our recruiting team will review your application and reach out if there's a match."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="applyName" required>
          <input
            id="applyName"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClassName}
            placeholder="Your full name"
          />
        </FormField>
        <FormField label="Email" htmlFor="applyEmail" required>
          <input
            id="applyEmail"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClassName}
            placeholder="you@email.com"
          />
        </FormField>
      </div>

      <FormField label="Position" htmlFor="position" required>
        <select id="position" name="position" required className={selectClassName} defaultValue="">
          <option value="" disabled>
            Select a role
          </option>
          {jobs.map((job) => (
            <option key={job.slug} value={job.slug}>
              {job.title}
            </option>
          ))}
          <option value="graduate">Graduate Program</option>
          <option value="internship">Internship</option>
          <option value="general">General application</option>
        </select>
      </FormField>

      <FormField label="LinkedIn or portfolio URL" htmlFor="portfolio">
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          className={inputClassName}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </FormField>

      <FormField label="Cover letter" htmlFor="coverLetter" required>
        <textarea
          id="coverLetter"
          name="coverLetter"
          required
          rows={5}
          className={textareaClassName}
          placeholder="Tell us why you'd like to join Team X and what you'd bring to the team..."
        />
      </FormField>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Submitting..." : "Submit application"}
        {!loading && <Send className="h-4 w-4" aria-hidden />}
      </Button>
    </form>
  );
}
