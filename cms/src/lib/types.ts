import type { Database } from "./database.types";

type Tables = Database["public"]["Tables"];

export type Property = Tables["properties"]["Row"];
export type PropertyInsert = Tables["properties"]["Insert"];
export type PropertyUpdate = Tables["properties"]["Update"];

export type GalleryImage = Tables["property_gallery_images"]["Row"];
export type GalleryImageInsert = Tables["property_gallery_images"]["Insert"];

export type PricingCategory = Tables["pricing_categories"]["Row"];
export type PricingCategoryInsert = Tables["pricing_categories"]["Insert"];

/** Shape of each object inside pricing_categories.items (stored as jsonb). */
export type PricingItem = {
  label: string;
  value: string;
  note?: string;
};

/** Common property_type values seen in the design; free text is still allowed. */
export const PROPERTY_TYPES = [
  "Villa",
  "Apartment",
  "Cottage",
  "Townhouse",
  "Penthouse",
  "House",
  "Studio",
] as const;
