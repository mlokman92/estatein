import type { TableName } from "./collections";

export type SubmissionField = { name: string; label: string };

export type SubmissionConfig = {
  slug: string;
  table: TableName;
  label: string;
  labelPlural: string;
  hasStatus: boolean;
  /** Columns combined into the row's primary label. */
  primaryFields: string[];
  /** Fields shown in the detail body, in order. */
  fields: SubmissionField[];
};

export const SUBMISSION_STATUSES = ["new", "in_progress", "closed"] as const;

export const SUBMISSIONS: SubmissionConfig[] = [
  {
    slug: "contact",
    table: "contact_inquiries",
    label: "Contact inquiry",
    labelPlural: "Contact inquiries",
    hasStatus: true,
    primaryFields: ["first_name", "last_name"],
    fields: [
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "inquiry_type", label: "Inquiry type" },
      { name: "how_did_you_hear", label: "How did you hear" },
      { name: "message", label: "Message" },
      { name: "agreed_to_terms", label: "Agreed to terms" },
    ],
  },
  {
    slug: "property",
    table: "property_inquiries",
    label: "Property inquiry",
    labelPlural: "Property inquiries",
    hasStatus: true,
    primaryFields: ["first_name", "last_name"],
    fields: [
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "property_id", label: "Property" },
      { name: "message", label: "Message" },
      { name: "agreed_to_terms", label: "Agreed to terms" },
    ],
  },
  {
    slug: "general",
    table: "general_inquiries",
    label: "General inquiry",
    labelPlural: "General inquiries",
    hasStatus: true,
    primaryFields: ["first_name", "last_name"],
    fields: [
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "preferred_location", label: "Preferred location" },
      { name: "property_type", label: "Property type" },
      { name: "bedrooms", label: "Bedrooms" },
      { name: "bathrooms", label: "Bathrooms" },
      { name: "budget", label: "Budget" },
      { name: "preferred_contact_method", label: "Preferred contact" },
      { name: "contact_number", label: "Contact number" },
      { name: "contact_email", label: "Contact email" },
      { name: "message", label: "Message" },
      { name: "agree_to_terms", label: "Agreed to terms" },
    ],
  },
  {
    slug: "newsletter",
    table: "newsletter_subscribers",
    label: "Subscriber",
    labelPlural: "Newsletter subscribers",
    hasStatus: false,
    primaryFields: ["email"],
    fields: [{ name: "email", label: "Email" }],
  },
];

export function getSubmission(slug: string | undefined): SubmissionConfig | undefined {
  return SUBMISSIONS.find((s) => s.slug === slug);
}
