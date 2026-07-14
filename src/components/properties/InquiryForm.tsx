"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fieldInputCls, fieldLabelCls } from "@/components/ui/form";
import { submitGeneralInquiry } from "@/app/actions";

const textFields = [
  { key: "first_name", label: "First Name", placeholder: "Enter First Name", type: "text", autoComplete: "given-name", required: true },
  { key: "last_name", label: "Last Name", placeholder: "Enter Last Name", type: "text", autoComplete: "family-name", required: false },
  { key: "email", label: "Email", placeholder: "Enter your Email", type: "email", autoComplete: "email", required: true },
  { key: "phone", label: "Phone", placeholder: "Enter Phone Number", type: "tel", autoComplete: "tel", required: false },
] as const;

const selectFields = [
  {
    key: "preferred_location",
    label: "Preferred Location",
    placeholder: "Select Location",
    options: ["No Preference", "New York", "Los Angeles", "Miami", "Chicago", "San Francisco"],
  },
  {
    key: "property_type",
    label: "Property Type",
    placeholder: "Select Property Type",
    options: ["Villa", "Apartment", "Cottage", "Townhouse", "Penthouse", "House", "Studio"],
  },
  {
    key: "bathrooms",
    label: "No. of Bathrooms",
    placeholder: "Select no. of Bathrooms",
    options: ["1", "2", "3", "4", "5+"],
  },
  {
    key: "bedrooms",
    label: "No. of Bedrooms",
    placeholder: "Select no. of Bedrooms",
    options: ["1", "2", "3", "4", "5+"],
  },
] as const;

const budgetOptions = [
  "Under $250k",
  "$250k – $500k",
  "$500k – $1M",
  "$1M – $2M",
  "$2M+",
];

const BLANK = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  preferred_location: "",
  property_type: "",
  bathrooms: "",
  bedrooms: "",
  budget: "",
  contact_number: "",
  contact_email: "",
  message: "",
};

export function InquiryForm() {
  const [form, setForm] = useState(BLANK);
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const set = (key: keyof typeof BLANK, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await submitGeneralInquiry({
      ...form,
      preferred_contact_method: method,
      agree_to_terms: agreed,
    });
    if (res.ok) {
      setStatus("done");
      setForm(BLANK);
      setAgreed(false);
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Let's Make it Happen"
          description="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
        />

        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:p-10 3xl:p-12"
        >
          {/* Row 1 — contact text fields */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {textFields.map((field) => (
              <div key={field.key}>
                <label className={fieldLabelCls} htmlFor={field.key}>
                  {field.label}
                </label>
                <input
                  id={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  className={fieldInputCls}
                  required={field.required}
                  value={form[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Row 2 — preference selects */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {selectFields.map((field) => (
              <div key={field.key}>
                <label className={fieldLabelCls} htmlFor={field.key}>
                  {field.label}
                </label>
                <select
                  id={field.key}
                  className={`${fieldInputCls} appearance-none`}
                  value={form[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Row 3 — budget + preferred contact method */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <label className={fieldLabelCls} htmlFor="budget">
                Budget
              </label>
              <select
                id="budget"
                className={`${fieldInputCls} appearance-none`}
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                <option value="" disabled>
                  Select Budget
                </option>
                {budgetOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className={fieldLabelCls}>Preferred Contact Method</span>
              <div
                role="radiogroup"
                aria-label="Preferred Contact Method"
                className="grid gap-4 xl:grid-cols-2"
              >
                <div className="flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3.5">
                  <Phone className="size-5 shrink-0 text-white" aria-hidden="true" />
                  <input
                    type="tel"
                    aria-label="Enter your number"
                    placeholder="Enter Your Number"
                    className="min-w-0 flex-1 bg-transparent text-base text-white placeholder-muted outline-none"
                    value={form.contact_number}
                    onChange={(e) => set("contact_number", e.target.value)}
                  />
                  <input
                    type="radio"
                    name="contact-method"
                    checked={method === "phone"}
                    onChange={() => setMethod("phone")}
                    aria-label="Contact by phone"
                    className="size-4 shrink-0 accent-purple"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3.5">
                  <Mail className="size-5 shrink-0 text-white" aria-hidden="true" />
                  <input
                    type="email"
                    aria-label="Enter your email"
                    placeholder="Enter Your Email"
                    className="min-w-0 flex-1 bg-transparent text-base text-white placeholder-muted outline-none"
                    value={form.contact_email}
                    onChange={(e) => set("contact_email", e.target.value)}
                  />
                  <input
                    type="radio"
                    name="contact-method"
                    checked={method === "email"}
                    onChange={() => setMethod("email")}
                    aria-label="Contact by email"
                    className="size-4 shrink-0 accent-purple"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4 — message */}
          <div className="mt-6">
            <label className={fieldLabelCls} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Enter your Message here.."
              className={`${fieldInputCls} resize-y`}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </div>

          {/* Footer — consent + submit */}
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-base text-muted">
              <input
                type="checkbox"
                className="size-5 shrink-0 accent-purple"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <span>
                I agree with{" "}
                <a href="#" className="text-white underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-white underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            <Button variant="primary" size="md" type="submit" className="shrink-0" disabled={status === "loading"}>
              Send Your Message
            </Button>
          </div>

          {status === "done" && (
            <p className="mt-4 text-base text-purple-light">
              Thanks — our team will be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-base text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </Container>
    </section>
  );
}
