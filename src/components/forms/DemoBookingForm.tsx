"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClassName, selectClassName, textareaClassName } from "./FormField";
import { FormSuccess } from "./FormSuccess";

export function DemoBookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      jobTitle: String(form.get("jobTitle") || ""),
      topic: String(form.get("topic") || ""),
      preferredDate: String(form.get("preferredDate") || ""),
      preferredTime: String(form.get("preferredTime") || ""),
      notes: String(form.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/public/demos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to book demo");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book demo");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Demo request confirmed"
        message={`We've received your booking${selectedDate ? ` for ${selectedDate}` : ""}${selectedTime ? ` at ${selectedTime}` : ""}. Our team will confirm and send a calendar invite.`}
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
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
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
        <FormField label="Job title" htmlFor="jobTitle">
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            autoComplete="organization-title"
            className={inputClassName}
            placeholder="Your role"
          />
        </FormField>
      </div>

      <FormField label="Demo topic" htmlFor="topic" required>
        <select id="topic" name="topic" required className={selectClassName} defaultValue="">
          <option value="" disabled>
            What would you like to explore?
          </option>
          <option value="enterprise">Enterprise software overview</option>
          <option value="banking">Core banking & FinTech</option>
          <option value="healthcare">Healthcare solutions</option>
          <option value="government">Government digital services</option>
          <option value="ai">AI & intelligent automation</option>
          <option value="mobile">Mobile development</option>
          <option value="custom">Custom project discussion</option>
        </select>
      </FormField>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
          Preferred date & time
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Preferred date" htmlFor="preferredDate" required>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              required
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={inputClassName}
            />
          </FormField>
          <FormField label="Preferred time (WAT)" htmlFor="preferredTime" required>
            <select
              id="preferredTime"
              name="preferredTime"
              required
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className={selectClassName}
            >
              <option value="" disabled>
                Select a time slot
              </option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </FormField>
        </div>
        <p className="mt-4 text-xs text-muted">
          All times shown in West Africa Time (WAT). We&apos;ll confirm availability and send a
          calendar invite.
        </p>
      </div>

      <FormField label="Additional notes" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={textareaClassName}
          placeholder="Share context about your organization or specific questions..."
        />
      </FormField>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Booking..." : "Book demo"}
        {!loading && <CalendarDays className="h-4 w-4" aria-hidden />}
      </Button>
    </form>
  );
}
