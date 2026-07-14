const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

const STORAGE_MARKER = "/storage/v1/object/public/property-images/";

/** Turn a title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Resolve an image src for previewing inside the CMS.
 * - Absolute http(s)/data URLs pass through.
 * - Site-relative paths (/images/..) resolve against VITE_SITE_URL if set,
 *   otherwise return null so the caller can show a placeholder.
 */
export function resolveImg(src: string | null | undefined): string | null {
  if (!src) return null;
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
  if (src.startsWith("/")) return SITE_URL ? SITE_URL + src : null;
  return src;
}

/** True when the src points at an object in our Supabase storage bucket. */
export function isStorageUrl(src: string): boolean {
  return src.includes(STORAGE_MARKER);
}

/** Extract the in-bucket object path from a public storage URL. */
export function storagePathFromUrl(src: string): string | null {
  const i = src.indexOf(STORAGE_MARKER);
  if (i === -1) return null;
  return decodeURIComponent(src.slice(i + STORAGE_MARKER.length));
}

export function formatPrice(price: number | null, currency: string): string {
  if (price == null) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price.toLocaleString()}`;
  }
}

/** Coerce a form string to a number or null (empty -> null). */
export function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}
