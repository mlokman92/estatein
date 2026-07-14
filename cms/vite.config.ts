import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Standalone Vite SPA for the EstateIn admin CMS. Deployed separately from the
// Next.js marketing site; talks to the same Supabase project via RLS.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5174 },
});
