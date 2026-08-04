"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClassName, selectClassName, textareaClassName } from "./FormField";
import { FormSuccess } from "./FormSuccess";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/public/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Message sent successfully"
        message="Thank you for reaching out. Our team will respond within one business day."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="First name" htmlFor="firstName" required>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClassName}
            placeholder="Ada"
          />
        </FormField>
        <FormField label="Last name" htmlFor="lastName" required>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClassName}
            placeholder="Okonkwo"
          />
        </FormField>
      </div>

      <FormField label="Email address" htmlFor="email" required>
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

      <FormField label="Phone number" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClassName}
          placeholder="+234 800 000 0000"
        />
      </FormField>

      <FormField label="Subject" htmlFor="subject" required>
        <select id="subject" name="subject" required className={selectClassName} defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          <option value="general">General inquiry</option>
          <option value="sales">Sales & partnerships</option>
          <option value="support">Technical support</option>
          <option value="careers">Careers</option>
          <option value="media">Media & press</option>
        </select>
      </FormField>

      <FormField label="Message" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={textareaClassName}
          placeholder="Tell us how we can help..."
        />
      </FormField>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Sending..." : "Send message"}
        {!loading && <Send className="h-4 w-4" aria-hidden />}
      </Button>
    </form>
  );
}
