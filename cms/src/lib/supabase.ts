import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** False when env vars are missing — App renders a setup screen instead of crashing. */
export const supabaseConfigured = Boolean(url && key);

// createClient tolerates empty strings; we gate real usage behind `supabaseConfigured`.
export const supabase = createClient<Database>(url ?? "", key ?? "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const IMAGE_BUCKET = "property-images";
