"use server";

import { supabase } from "@/lib/supabase";

export type ActionResult = { ok: boolean; error: string | null };

/** Newsletter footer signup. */
export async function subscribeNewsletter(email: string): Promise<ActionResult> {
  const value = email.trim();
  if (!value) return { ok: false, error: "Email is required." };
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: value });
  return { ok: !error, error: error?.message ?? null };
}

/** Contact page form. */
export async function submitContactInquiry(
  input: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    inquiry_type: string;
    how_did_you_hear: string;
    message: string;
    agreed_to_terms: boolean;
  },
): Promise<ActionResult> {
  const { error } = await supabase.from("contact_inquiries").insert(input);
  return { ok: !error, error: error?.message ?? null };
}

/** Per-property inquiry form on a property detail page. */
export async function submitPropertyInquiry(
  input: {
    property_id: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
    agreed_to_terms: boolean;
  },
): Promise<ActionResult> {
  const { error } = await supabase.from("property_inquiries").insert(input);
  return { ok: !error, error: error?.message ?? null };
}

/** General inquiry form on the properties page. */
export async function submitGeneralInquiry(
  input: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    preferred_location: string;
    property_type: string;
    bathrooms: string;
    bedrooms: string;
    budget: string;
    preferred_contact_method: string;
    contact_number: string;
    contact_email: string;
    message: string;
    agree_to_terms: boolean;
  },
): Promise<ActionResult> {
  const { error } = await supabase.from("general_inquiries").insert(input);
  return { ok: !error, error: error?.message ?? null };
}
