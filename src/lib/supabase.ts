import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Public, read-only Supabase client for the marketing site. Uses the anon key
// and no cookies, so pages stay statically prerenderable / ISR-friendly. RLS
// exposes only published content to anon; form submissions use anon insert.
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
