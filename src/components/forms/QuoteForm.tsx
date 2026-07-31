"use client";

import { useState, type FormEvent } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClassName, selectClassName, textareaClassName } from "./FormField";
import { FormSuccess } from "./FormSuccess";

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Quote request received"
        message="Our solutions team is reviewing your requirements. Expect a tailored proposal within 2–3 business days."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="fullName" required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className={inputClassName}
            placeholder="Your full name"
          />
        </FormField>
        <FormField label="Company" htmlFor="company" required>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={inputClassName}
            placeholder="Organization name"
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Work email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClassName}
            placeholder="you@company.com"
          />
        </FormField>
        <FormField label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClassName}
            placeholder="+234 800 000 0000"
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Project type" htmlFor="projectType" required>
          <select id="projectType" name="projectType" required className={selectClassName} defaultValue="">
            <option value="" disabled>
              Select project type
            </option>
            <option value="custom-software">Custom software development</option>
            <option value="core-banking">Core banking / FinTech</option>
            <option value="healthcare">Healthcare systems</option>
            <option value="government">Government / e-governance</option>
            <option value="mobile">Mobile application</option>
            <option value="ai">AI / automation</option>
            <option value="cloud">Cloud migration</option>
            <option value="other">Other</option>
          </select>
        </FormField>
        <FormField label="Estimated budget" htmlFor="budget" required>
          <select id="budget" name="budget" required className={selectClassName} defaultValue="">
            <option value="" disabled>
              Select budget range
            </option>
            <option value="25-75k">$25,000 – $75,000</option>
            <option value="75-300k">$75,000 – $300,000</option>
            <option value="300k-1m">$300,000 – $1M</option>
            <option value="1m+">$1M+</option>
            <option value="undecided">Not yet determined</option>
          </select>
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Desired timeline" htmlFor="timeline" required>
          <select id="timeline" name="timeline" required className={selectClassName} defaultValue="">
            <option value="" disabled>
              Select timeline
            </option>
            <option value="asap">As soon as possible</option>
            <option value="1-3">1–3 months</option>
            <option value="3-6">3–6 months</option>
            <option value="6-12">6–12 months</option>
            <option value="12+">12+ months</option>
          </select>
        </FormField>
        <FormField label="Team size needed" htmlFor="teamSize">
          <select id="teamSize" name="teamSize" className={selectClassName} defaultValue="">
            <option value="">Optional</option>
            <option value="1-3">1–3 specialists</option>
            <option value="4-8">4–8 person squad</option>
            <option value="8+">8+ dedicated team</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </FormField>
      </div>

      <FormField
        label="Project description"
        htmlFor="description"
        required
        hint="Include goals, existing systems, compliance requirements, and success criteria."
      >
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          className={textareaClassName}
          placeholder="Describe your project requirements, challenges, and expected outcomes..."
        />
      </FormField>

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Submitting..." : "Request quote"}
        {!loading && <FileText className="h-4 w-4" aria-hidden />}
      </Button>
    </form>
  );
}
