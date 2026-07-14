"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SparkleCluster } from "@/components/ui/Sparkle";
import { fieldInputCls, fieldLabelCls } from "@/components/ui/form";
import { submitPropertyInquiry } from "@/app/actions";

const paragraph =
  "Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.";

const textFields = [
  { key: "first_name", label: "First Name", placeholder: "Enter First Name", type: "text", autoComplete: "given-name", required: true },
  { key: "last_name", label: "Last Name", placeholder: "Enter Last Name", type: "text", autoComplete: "family-name", required: false },
  { key: "email", label: "Email", placeholder: "Enter your Email", type: "email", autoComplete: "email", required: true },
  { key: "phone", label: "Phone", placeholder: "Enter Phone Number", type: "tel", autoComplete: "tel", required: false },
] as const;

const BLANK = { first_name: "", last_name: "", email: "", phone: "", message: "" };

export function PropertyInquiryForm({
  propertyId,
  propertyName,
  title,
}: {
  propertyId: string;
  propertyName: string;
  title: string;
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
    const res = await submitPropertyInquiry({
      property_id: propertyId,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      agreed_to_terms: agreed,
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
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Intro */}
          <div>
            <SparkleCluster className="mb-4" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight text-white sm:text-[40px] 3xl:text-5xl">
              Inquire About {title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
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

            <div>
              <span className={fieldLabelCls}>Selected Property</span>
              <div className={`${fieldInputCls} text-white`}>{propertyName}</div>
            </div>

            <div>
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

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="shrink-0"
                disabled={status === "loading"}
              >
                Send Your Message
              </Button>
            </div>

            {status === "done" && (
              <p className="text-base text-purple-light">
                Thanks — our team will be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-base text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
