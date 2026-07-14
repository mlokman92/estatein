"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fieldInputCls, fieldLabelCls } from "@/components/ui/form";
import { submitContactInquiry } from "@/app/actions";

const DEFAULT_TITLE = "Let's Connect";
const DEFAULT_DESCRIPTION =
  "We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.";

const textFields = [
  { key: "first_name", label: "First Name", placeholder: "Enter First Name", type: "text", autoComplete: "given-name", required: true },
  { key: "last_name", label: "Last Name", placeholder: "Enter Last Name", type: "text", autoComplete: "family-name", required: false },
  { key: "email", label: "Email", placeholder: "Enter your Email", type: "email", autoComplete: "email", required: true },
  { key: "phone", label: "Phone", placeholder: "Enter Phone Number", type: "tel", autoComplete: "tel", required: false },
] as const;

const selectFields = [
  {
    key: "inquiry_type",
    label: "Inquiry Type",
    placeholder: "Select Inquiry Type",
    options: ["General Inquiry", "Buying a Property", "Selling a Property", "Renting", "Investment", "Partnership"],
  },
  {
    key: "how_did_you_hear",
    label: "How Did You Hear About Us?",
    placeholder: "Select",
    options: ["Search Engine", "Social Media", "Friend or Family", "Advertisement", "Other"],
  },
] as const;

const BLANK = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  inquiry_type: "",
  how_did_you_hear: "",
  message: "",
};

export function ContactForm({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: {
  title?: string;
  description?: string;
}) {
  const [form, setForm] = useState(BLANK);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const set = (key: keyof typeof BLANK, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await submitContactInquiry({ ...form, agreed_to_terms: agreed });
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
        <SectionHeading title={title} description={description} />

        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:p-10 3xl:p-12"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          <div className="mt-6">
            <label className={fieldLabelCls} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Enter your Message here.."
              className={`${fieldInputCls} resize-y`}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </div>

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
              Thanks — we&apos;ll be in touch shortly.
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
