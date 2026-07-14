import { cache } from "react";
import { supabase } from "./supabase";
import type { Database } from "./database.types";

type Tables = Database["public"]["Tables"];

export type Property = Tables["properties"]["Row"];
export type GalleryImage = Tables["property_gallery_images"]["Row"];
export type PricingCategory = Tables["pricing_categories"]["Row"];
export type Testimonial = Tables["testimonials"]["Row"];
export type FaqItem = Tables["faq_items"]["Row"];
export type FeatureCard = Tables["icon_feature_cards"]["Row"];
export type TeamMember = Tables["team_members"]["Row"];
export type CompanyValue = Tables["company_values"]["Row"];
export type Achievement = Tables["achievements"]["Row"];
export type ValuedClient = Tables["valued_clients"]["Row"];
export type ExperienceStep = Tables["experience_steps"]["Row"];
export type ServiceCategory = Tables["service_categories"]["Row"];
export type ServiceCard = Tables["service_cards"]["Row"];
export type OfficeLocation = Tables["office_locations"]["Row"];
export type GalleryPhoto = Tables["gallery_photos"]["Row"];
export type SocialLink = Tables["social_links"]["Row"];
export type FooterColumn = Tables["footer_columns"]["Row"];
export type FooterLink = Tables["footer_links"]["Row"];
export type ContactCard = Tables["contact_cards"]["Row"];

/** Shape of pricing_categories.items (jsonb array). */
export type PricingItem = { label: string; value: string; note?: string };

// ---- Properties ------------------------------------------------------------

export const getProperties = cache(async (): Promise<Property[]> => {
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return data ?? [];
});

export const getPropertySlugs = cache(async (): Promise<string[]> => {
  const { data } = await supabase
    .from("properties")
    .select("slug")
    .eq("is_published", true);
  return (data ?? []).map((r) => r.slug);
});

export type PropertyDetail = {
  property: Property;
  gallery: GalleryImage[];
  pricing: PricingCategory[];
};

export const getPropertyBySlug = cache(
  async (slug: string): Promise<PropertyDetail | null> => {
    const { data: property } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!property) return null;
    const [{ data: gallery }, { data: pricing }] = await Promise.all([
      supabase
        .from("property_gallery_images")
        .select("*")
        .eq("property_id", property.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("pricing_categories")
        .select("*")
        .eq("property_id", property.id)
        .order("sort_order", { ascending: true }),
    ]);
    return { property, gallery: gallery ?? [], pricing: pricing ?? [] };
  },
);

// ---- Simple published collections -----------------------------------------

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getFaqItems = cache(async (): Promise<FaqItem[]> => {
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getFeatureCards = cache(
  async (location: string): Promise<FeatureCard[]> => {
    const { data } = await supabase
      .from("icon_feature_cards")
      .select("*")
      .eq("is_published", true)
      .eq("location", location)
      .order("sort_order", { ascending: true });
    return data ?? [];
  },
);

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getCompanyValues = cache(async (): Promise<CompanyValue[]> => {
  const { data } = await supabase
    .from("company_values")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getAchievements = cache(async (): Promise<Achievement[]> => {
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getValuedClients = cache(async (): Promise<ValuedClient[]> => {
  const { data } = await supabase
    .from("valued_clients")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getExperienceSteps = cache(async (): Promise<ExperienceStep[]> => {
  const { data } = await supabase
    .from("experience_steps")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getOfficeLocations = cache(async (): Promise<OfficeLocation[]> => {
  const { data } = await supabase
    .from("office_locations")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getGalleryPhotos = cache(async (): Promise<GalleryPhoto[]> => {
  const { data } = await supabase
    .from("gallery_photos")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getContactCards = cache(async (): Promise<ContactCard[]> => {
  const { data } = await supabase
    .from("contact_cards")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

// ---- Composed collections --------------------------------------------------

export type ServiceCategoryWithCards = ServiceCategory & { cards: ServiceCard[] };

export const getServiceCategoriesWithCards = cache(
  async (): Promise<ServiceCategoryWithCards[]> => {
    const [{ data: cats }, { data: cards }] = await Promise.all([
      supabase
        .from("service_categories")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("service_cards")
        .select("*")
        .eq("is_published", true)
        .eq("parent_type", "service_category")
        .order("sort_order", { ascending: true }),
    ]);
    const all = cards ?? [];
    return (cats ?? []).map((c) => ({
      ...c,
      cards: all.filter((card) => card.parent_id === c.id),
    }));
  },
);

export const getInvestmentCards = cache(async (): Promise<ServiceCard[]> => {
  const { data } = await supabase
    .from("service_cards")
    .select("*")
    .eq("is_published", true)
    .eq("parent_type", "investment_block")
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export type FooterColumnWithLinks = FooterColumn & { links: FooterLink[] };

export const getFooterColumns = cache(
  async (): Promise<FooterColumnWithLinks[]> => {
    const [{ data: cols }, { data: links }] = await Promise.all([
      supabase
        .from("footer_columns")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("footer_links")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
    ]);
    const all = links ?? [];
    return (cols ?? []).map((c) => ({
      ...c,
      links: all.filter((l) => l.column_id === c.id),
    }));
  },
);

// ---- Editable page copy (site_content) ------------------------------------

const siteContentRaw = cache(async (key: string) => {
  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return data?.value ?? null;
});

export async function getSiteContent<T>(key: string): Promise<T | null> {
  const raw = await siteContentRaw(key);
  return raw == null ? null : (raw as unknown as T);
}
