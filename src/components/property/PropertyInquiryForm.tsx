"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SparkleCluster } from "@/components/ui/Sparkle";
import {
  FakeSelect,
  fieldInputCls,
  fieldLabelCls,
  slug,
} from "@/components/ui/form";

const paragraph =
  "Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.";

const selectedProperty = "Seaside Serenity Villa, Malibu, California";

const textFields = [
  { label: "First Name", placeholder: "Enter First Name", type: "text", autoComplete: "given-name" },
  { label: "Last Name", placeholder: "Enter Last Name", type: "text", autoComplete: "family-name" },
  { label: "Email", placeholder: "Enter your Email", type: "email", autoComplete: "email" },
  { label: "Phone", placeholder: "Enter Phone Number", type: "tel", autoComplete: "tel" },
] as const;

export function PropertyInquiryForm() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Intro */}
          <div>
            <SparkleCluster className="mb-4" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight sm:text-[40px] 3xl:text-5xl">
              Inquire About Seaside Serenity Villa
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
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

            <div>
              <span className={fieldLabelCls}>Selected Property</span>
              <FakeSelect
                label="Selected Property"
                placeholder="Select Property"
                value={selectedProperty}
              />
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
              />
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="shrink-0"
              >
                Send Your Message
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
