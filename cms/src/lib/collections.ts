import type { Database } from "./database.types";

export type TableName = keyof Database["public"]["Tables"];

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "image"
  | "url"
  | "select"
  | "reference"
  | "json";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  /** Prefilled value when creating a new record. */
  defaultValue?: string;
  /** For type: "select" */
  options?: readonly string[];
  /** For type: "reference" — a FK to another table's id, labelled by labelColumn. */
  reference?: { table: TableName; labelColumn: string };
};

export type CollectionConfig = {
  slug: string; // route segment under /c/
  table: TableName;
  label: string; // singular
  labelPlural: string;
  group: string; // sidebar group
  titleField: string; // primary label in the list
  subtitleField?: string; // fallback / secondary label
  imageFields?: string[]; // cleaned from storage on delete; also shown as thumb
  fields: FieldConfig[];
};

// Every collection carries is_published + sort_order; the engine renders those
// controls automatically, so `fields` lists only the content columns.
export const COLLECTIONS: CollectionConfig[] = [
  // ---- Home ----------------------------------------------------------------
  {
    slug: "testimonials",
    table: "testimonials",
    label: "Testimonial",
    labelPlural: "Testimonials",
    group: "Home",
    titleField: "author_name",
    subtitleField: "title",
    imageFields: ["avatar"],
    fields: [
      { name: "rating", label: "Rating", type: "number", required: true, defaultValue: "5", hint: "1–5 stars" },
      { name: "title", label: "Title", type: "text", hint: "e.g. “Exceptional Service!”" },
      { name: "body", label: "Quote", type: "textarea" },
      { name: "author_name", label: "Author name", type: "text" },
      { name: "author_location", label: "Author location", type: "text" },
      { name: "avatar", label: "Avatar", type: "image" },
    ],
  },
  {
    slug: "faq-items",
    table: "faq_items",
    label: "FAQ",
    labelPlural: "FAQ items",
    group: "Home",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea" },
      { name: "read_more_url", label: "Read more URL", type: "url" },
    ],
  },
  {
    slug: "feature-cards",
    table: "icon_feature_cards",
    label: "Feature card",
    labelPlural: "Feature cards",
    group: "Home",
    titleField: "title",
    fields: [
      {
        name: "location",
        label: "Location",
        type: "select",
        required: true,
        options: ["home_feature_bar", "services_hero"],
        hint: "Where the card renders",
      },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "icon", label: "Icon", type: "text", hint: "lucide icon name, e.g. Store" },
      { name: "link_url", label: "Link URL", type: "url" },
    ],
  },

  // ---- About ---------------------------------------------------------------
  {
    slug: "team-members",
    table: "team_members",
    label: "Team member",
    labelPlural: "Team members",
    group: "About",
    titleField: "name",
    subtitleField: "role",
    imageFields: ["image"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "image", label: "Photo", type: "image" },
      { name: "twitter_url", label: "Twitter/X URL", type: "url" },
      { name: "contact_url", label: "Contact URL", type: "url", hint: "“Say Hello” link (can be mailto:)" },
    ],
  },
  {
    slug: "company-values",
    table: "company_values",
    label: "Value",
    labelPlural: "Company values",
    group: "About",
    titleField: "title",
    fields: [
      { name: "icon", label: "Icon", type: "text", hint: "lucide icon name, e.g. ShieldCheck" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    slug: "achievements",
    table: "achievements",
    label: "Achievement",
    labelPlural: "Achievements",
    group: "About",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    slug: "valued-clients",
    table: "valued_clients",
    label: "Client",
    labelPlural: "Valued clients",
    group: "About",
    titleField: "company",
    subtitleField: "domain",
    fields: [
      { name: "since", label: "Client since (year)", type: "number" },
      { name: "company", label: "Company", type: "text", required: true },
      { name: "domain", label: "Domain", type: "text", hint: "e.g. Commercial Real Estate" },
      { name: "category", label: "Category", type: "text" },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "website_url", label: "Website URL", type: "url" },
    ],
  },
  {
    slug: "experience-steps",
    table: "experience_steps",
    label: "Step",
    labelPlural: "Experience steps",
    group: "About",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },

  // ---- Services ------------------------------------------------------------
  {
    slug: "service-categories",
    table: "service_categories",
    label: "Service category",
    labelPlural: "Service categories",
    group: "Services",
    titleField: "heading",
    fields: [
      { name: "heading", label: "Heading", type: "text", required: true },
      { name: "paragraph", label: "Paragraph", type: "textarea" },
      { name: "featured_heading", label: "Featured card heading", type: "text" },
      { name: "featured_paragraph", label: "Featured card paragraph", type: "textarea" },
      { name: "featured_button_label", label: "Featured button label", type: "text" },
      { name: "featured_button_href", label: "Featured button URL", type: "url" },
    ],
  },
  {
    slug: "service-cards",
    table: "service_cards",
    label: "Service card",
    labelPlural: "Service cards",
    group: "Services",
    titleField: "title",
    fields: [
      {
        name: "parent_type",
        label: "Parent type",
        type: "select",
        required: true,
        options: ["service_category", "investment_block"],
      },
      {
        name: "parent_id",
        label: "Parent category",
        type: "reference",
        reference: { table: "service_categories", labelColumn: "heading" },
        hint: "Only for “service_category” cards; leave empty for investment_block",
      },
      { name: "icon", label: "Icon", type: "text", hint: "lucide icon name" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },

  // ---- Contact -------------------------------------------------------------
  {
    slug: "office-locations",
    table: "office_locations",
    label: "Office",
    labelPlural: "Office locations",
    group: "Contact",
    titleField: "title",
    subtitleField: "label",
    fields: [
      { name: "label", label: "Label", type: "text", hint: "Eyebrow, e.g. “Main Headquarters”" },
      {
        name: "region",
        label: "Region",
        type: "select",
        required: true,
        options: ["regional", "international"],
      },
      { name: "title", label: "Address / title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "button_label", label: "Button label", type: "text" },
      { name: "button_href", label: "Button URL", type: "url", hint: "e.g. a Google Maps link" },
    ],
  },
  {
    slug: "gallery-photos",
    table: "gallery_photos",
    label: "Gallery photo",
    labelPlural: "Gallery photos",
    group: "Contact",
    titleField: "alt",
    subtitleField: "src",
    imageFields: ["src"],
    fields: [
      { name: "src", label: "Image", type: "image", required: true },
      { name: "alt", label: "Alt text", type: "text" },
      { name: "aspect_ratio", label: "Aspect ratio", type: "text", hint: "e.g. 3/2, 3/1, 5/2" },
      { name: "sizes", label: "Responsive sizes", type: "text", hint: "next/image sizes hint" },
    ],
  },
  {
    slug: "contact-cards",
    table: "contact_cards",
    label: "Contact card",
    labelPlural: "Contact cards",
    group: "Contact",
    titleField: "label",
    subtitleField: "kind",
    fields: [
      { name: "kind", label: "Kind", type: "select", required: true, options: ["single", "social"] },
      { name: "icon", label: "Icon", type: "text", hint: "lucide icon name" },
      { name: "label", label: "Label", type: "text" },
      { name: "href", label: "URL", type: "url" },
      {
        name: "links",
        label: "Social links (JSON)",
        type: "json",
        hint: 'For kind=social, e.g. [{"platform":"Instagram","url":"https://…"}]',
      },
    ],
  },

  // ---- Site chrome ---------------------------------------------------------
  {
    slug: "social-links",
    table: "social_links",
    label: "Social link",
    labelPlural: "Social links",
    group: "Site chrome",
    titleField: "platform",
    subtitleField: "url",
    fields: [
      { name: "platform", label: "Platform", type: "text", required: true, hint: "e.g. facebook, x, linkedin" },
      { name: "svg_path", label: "SVG path", type: "textarea", hint: "The inline <path d=…> string (brand icon)" },
      { name: "url", label: "URL", type: "url" },
    ],
  },
  {
    slug: "footer-columns",
    table: "footer_columns",
    label: "Footer column",
    labelPlural: "Footer columns",
    group: "Site chrome",
    titleField: "heading",
    fields: [{ name: "heading", label: "Heading", type: "text", required: true }],
  },
  {
    slug: "footer-links",
    table: "footer_links",
    label: "Footer link",
    labelPlural: "Footer links",
    group: "Site chrome",
    titleField: "label",
    subtitleField: "href",
    fields: [
      {
        name: "column_id",
        label: "Column",
        type: "reference",
        reference: { table: "footer_columns", labelColumn: "heading" },
      },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "href", label: "URL", type: "url" },
    ],
  },
  {
    slug: "filter-options",
    table: "filter_options",
    label: "Filter option",
    labelPlural: "Filter options",
    group: "Site chrome",
    titleField: "label",
    subtitleField: "facet",
    fields: [
      { name: "facet", label: "Facet", type: "text", required: true, hint: "e.g. location, property_type, budget" },
      { name: "value", label: "Value", type: "text", required: true, hint: "Stored value" },
      { name: "label", label: "Label", type: "text", required: true, hint: "Shown to visitors" },
    ],
  },
];

export const COLLECTION_GROUPS = ["Home", "About", "Services", "Contact", "Site chrome"] as const;

export function getCollection(slug: string | undefined): CollectionConfig | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
