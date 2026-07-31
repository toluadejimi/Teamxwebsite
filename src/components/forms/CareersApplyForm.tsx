"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClassName, selectClassName, textareaClassName } from "./FormField";
import { FormSuccess } from "./FormSuccess";
import { jobListings } from "@/lib/data";

export function CareersApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
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
          {jobListings.map((job) => (
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

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Submitting..." : "Submit application"}
        {!loading && <Send className="h-4 w-4" aria-hidden />}
      </Button>
    </form>
  );
}
