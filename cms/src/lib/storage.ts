import { supabase, IMAGE_BUCKET } from "./supabase";
import { storagePathFromUrl } from "./utils";

/** Upload a file to the property-images bucket and return its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `properties/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Best-effort removal of an uploaded image, given its public URL. No-op for
 *  external / site-relative URLs that don't live in our bucket. */
export async function removeImageByUrl(url: string): Promise<void> {
  const path = storagePathFromUrl(url);
  if (!path) return;
  await supabase.storage.from(IMAGE_BUCKET).remove([path]);
}

export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unexpected error";
}
