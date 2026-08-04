"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsContact, CmsOffice } from "@/lib/cms/store";

const emptyOffice = (): CmsOffice => ({
  city: "",
  country: "Nigeria",
  address: "",
  phone: "",
  email: "",
  isHeadquarters: false,
});

export default function AdminContactPage() {
  const router = useRouter();
  const [contact, setContact] = useState<CmsContact | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/admin/me", { credentials: "include" });
        if (!me.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await fetch("/api/admin/contact", {
          credentials: "include",
        }).then((r) => r.json());
        if (data?.email) setContact(data);
        else {
          setContact({
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
          });
        }
      } catch {
        setContact({
          companyName: "Team X Technologies Ltd",
          email: "hello@teamxtech.com",
          phone: "+234 1 234 5678",
          whatsapp: "2348012345678",
          supportEmail: "support@teamxtech.com",
          offices: [],
        });
      }
    })();
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!contact) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    setSaving(false);
    if (res.ok) {
      setContact(await res.json());
      setMessage("Contact information saved");
    } else {
      setMessage("Failed to save");
    }
  }

  if (!contact) {
    return <p className="text-sm text-slate-400">Loading…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Contact Information</h1>
      <p className="mt-1 text-sm text-slate-400">
        Update phone, email, WhatsApp, and Nigeria office locations shown on the website.
      </p>
      {message && <p className="mt-3 text-sm text-blue-300">{message}</p>}

      <form onSubmit={onSubmit} className="mt-8 max-w-3xl space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["companyName", "Company name"],
              ["email", "Primary email"],
              ["supportEmail", "Support email"],
              ["phone", "Phone"],
              ["whatsapp", "WhatsApp (digits, e.g. 23480…)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block sm:col-span-1">
              <span className="mb-1.5 block text-xs text-slate-400">{label}</span>
              <input
                value={contact[key]}
                onChange={(e) =>
                  setContact({ ...contact, [key]: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                required={key === "email" || key === "phone"}
              />
            </label>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Offices (Nigeria only)
            </h2>
            <button
              type="button"
              onClick={() =>
                setContact({
                  ...contact,
                  offices: [...contact.offices, emptyOffice()],
                })
              }
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
            >
              Add office
            </button>
          </div>
          <div className="space-y-4">
            {contact.offices.map((office, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["city", "City"],
                      ["address", "Address"],
                      ["phone", "Phone"],
                      ["email", "Email"],
                    ] as const
                  ).map(([field, label]) => (
                    <label key={field} className="block">
                      <span className="mb-1 block text-[11px] text-slate-500">
                        {label}
                      </span>
                      <input
                        value={office[field]}
                        onChange={(e) => {
                          const offices = [...contact.offices];
                          offices[index] = {
                            ...offices[index],
                            [field]: e.target.value,
                            country: "Nigeria",
                          };
                          setContact({ ...contact, offices });
                        }}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={!!office.isHeadquarters}
                      onChange={(e) => {
                        const offices = contact.offices.map((o, i) => ({
                          ...o,
                          isHeadquarters: i === index ? e.target.checked : false,
                          country: "Nigeria",
                        }));
                        setContact({ ...contact, offices });
                      }}
                    />
                    Headquarters
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContact({
                        ...contact,
                        offices: contact.offices.filter((_, i) => i !== index),
                      })
                    }
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save contact info"}
        </button>
      </form>
    </div>
  );
}
