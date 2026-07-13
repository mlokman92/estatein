"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FakeSelect,
  fieldInputCls,
  fieldLabelCls,
  slug,
} from "@/components/ui/form";

type Field =
  | {
      label: string;
      placeholder: string;
      kind: "text";
      type: string;
      autoComplete?: string;
    }
  | { label: string; placeholder: string; kind: "select" };

const fields: Field[] = [
  { label: "First Name", placeholder: "Enter First Name", kind: "text", type: "text", autoComplete: "given-name" },
  { label: "Last Name", placeholder: "Enter Last Name", kind: "text", type: "text", autoComplete: "family-name" },
  { label: "Email", placeholder: "Enter your Email", kind: "text", type: "email", autoComplete: "email" },
  { label: "Phone", placeholder: "Enter Phone Number", kind: "text", type: "tel", autoComplete: "tel" },
  { label: "Inquiry Type", placeholder: "Select Inquiry Type", kind: "select" },
  { label: "How Did You Hear About Us?", placeholder: "Select", kind: "select" },
];

const paragraph =
  "We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.";

export function ContactForm() {
  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading title="Let's Connect" description={paragraph} />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:p-10 3xl:p-12"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map((field) => (
              <div key={field.label}>
                {field.kind === "text" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <span className={fieldLabelCls}>{field.label}</span>
                    <FakeSelect
                      label={field.label}
                      placeholder={field.placeholder}
                    />
                  </>
                )}
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
            />
          </div>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-base text-muted">
              <input type="checkbox" className="size-5 shrink-0 accent-purple" />
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
      </Container>
    </section>
  );
}
