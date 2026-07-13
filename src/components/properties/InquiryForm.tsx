"use client";

import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FakeSelect,
  fieldInputCls,
  fieldLabelCls,
  slug,
} from "@/components/ui/form";

const textFields = [
  { label: "First Name", placeholder: "Enter First Name", type: "text", autoComplete: "given-name" },
  { label: "Last Name", placeholder: "Enter Last Name", type: "text", autoComplete: "family-name" },
  { label: "Email", placeholder: "Enter your Email", type: "email", autoComplete: "email" },
  { label: "Phone", placeholder: "Enter Phone Number", type: "tel", autoComplete: "tel" },
] as const;

const selectFields = [
  { label: "Preferred Location", placeholder: "Select Location" },
  { label: "Property Type", placeholder: "Select Property Type" },
  { label: "No. of Bathrooms", placeholder: "Select no. of Bathrooms" },
  { label: "No. of Bedrooms", placeholder: "Select no. of Bedrooms" },
] as const;

export function InquiryForm() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title="Let's Make it Happen"
          description="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:p-10 3xl:p-12"
        >
          {/* Row 1 — contact text fields */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {textFields.map((field) => (
              <div key={field.label}>
                <label className={fieldLabelCls} htmlFor={slug(field.label)}>
                  {field.label}
                </label>
                <input
                  id={slug(field.label)}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  className={fieldInputCls}
                />
              </div>
            ))}
          </div>

          {/* Row 2 — preference selects */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {selectFields.map((field) => (
              <div key={field.label}>
                <span className={fieldLabelCls}>{field.label}</span>
                <FakeSelect label={field.label} placeholder={field.placeholder} />
              </div>
            ))}
          </div>

          {/* Row 3 — budget + preferred contact method */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <span className={fieldLabelCls}>Budget</span>
              <FakeSelect label="Budget" placeholder="Select Budget" />
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
                  />
                  <input
                    type="radio"
                    name="contact-method"
                    defaultChecked
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
                  />
                  <input
                    type="radio"
                    name="contact-method"
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
            />
          </div>

          {/* Footer — consent + submit */}
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-base text-muted">
              <input
                type="checkbox"
                className="size-5 shrink-0 accent-purple"
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
            <Button variant="primary" size="md" type="submit" className="shrink-0">
              Send Your Message
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
