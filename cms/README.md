# Estatein CMS

A standalone admin CMS for the EstateIn website, built with **Vite + React + TypeScript + Tailwind v4** and backed by the same **Supabase** project as the site (`bogapwrqbgtqahegrwxy`). It is deployed **separately** from the Next.js marketing site.

The site itself is unchanged by this app — the CMS reads/writes Supabase tables, and wiring the public Next.js site to render from those tables is the follow-up step (see [Connecting the site](#connecting-the-public-site)).

## Quick start

```bash
cd cms
npm install
cp .env.example .env.local   # values are already filled in .env.example
npm run dev                  # http://localhost:5174
```

Then create your admin account (see [Authentication](#authentication)).

### Environment variables

| Var | Required | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | yes | `https://bogapwrqbgtqahegrwxy.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | yes | Publishable/anon key. Safe to ship in the client bundle — RLS protects the data. |
| `VITE_SITE_URL` | no | Deployed URL of the public site (e.g. `https://estatein.netlify.app`). Only used to preview images whose `src` is a site-relative path like `/images/pd-1.jpg`. |

## Authentication

Login uses **Supabase Auth (email/password)**. There is **no public sign-up** — create the account, then allowlist it:

1. **Create the user** — Supabase Dashboard → Authentication → Users → *Add user* (set email + password, mark email confirmed). Also recommended: Authentication → Providers → Email → turn **off** "Allow new users to sign up".
2. **Allowlist the user** — writes are gated by an `admins` table via RLS (`is_admin()`), so a signed-in user who isn't listed can log in but gets a "not authorized" screen. Add them once in the SQL editor:

   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users
   where email = 'you@example.com';
   ```

   (The not-authorized screen in the app shows this exact snippet pre-filled with your email.)

## What you can manage

Everything on the site that was previously hardcoded is now CMS-editable. The nav is grouped:

- **Listings → Properties** — the core listing, with a bespoke editor covering all fields plus **gallery images** (upload to Supabase Storage) and **pricing categories/line items**. Slug-routed and publishable.
- **Home** — Testimonials, FAQ items, Feature cards.
- **About** — Team members, Company values, Achievements, Valued clients, Experience steps.
- **Services** — Service categories, Service cards (polymorphic: category cards + investment-block cards).
- **Contact** — Office locations, Gallery photos, Contact cards.
- **Site chrome** — Social links, Footer columns, Footer links, Filter options (for search facets & form selects).
- **Page copy** — `site_content` key/value blocks (heroes, section headings, CTA, banner, footer) edited as JSON.
- **Submissions** — read-only inboxes for Contact / Property / General inquiries and Newsletter subscribers, with a status workflow (new → in progress → closed) and delete.

Every collection has a **Published** toggle and a **Sort order**. Icons are stored as **lucide icon name strings** (e.g. `ShieldCheck`) and mapped back to components when the site renders them. The UI uses a **light theme**; colors are Tailwind v4 tokens declared in `src/index.css` (`bg`, `surface`, `fg`, `muted`, `purple`, …), so restyling is a one-file change.

## Architecture

```
src/
  lib/
    supabase.ts          Supabase client (+ configured flag, bucket name)
    database.types.ts    Generated Supabase types (regenerate after schema changes)
    types.ts             Property/pricing type helpers + PROPERTY_TYPES
    collections.ts       ← config that drives the generic engine (add a collection here)
    forms.ts             Submission-inbox config
    db.ts                Untyped dynamic-table accessor for the engine
    storage.ts           Image upload/remove helpers
    utils.ts             slugify, resolveImg, price/number helpers
  auth/AuthProvider.tsx  Session + admin check (queries the admins table)
  components/
    Layout.tsx           Sidebar nav + admin gate
    ProtectedRoute.tsx   Requires a session
    ImageField.tsx       Upload-or-paste image control
    ui.tsx               Button/Field/Input/Select/Toggle/Card/Spinner
  pages/
    Login.tsx
    PropertiesList.tsx / PropertyEditor.tsx    (bespoke — nested gallery + pricing)
    CollectionList.tsx / CollectionEditor.tsx  (generic — driven by collections.ts)
    SubmissionsInbox.tsx                        (generic — driven by forms.ts)
    SiteContentList.tsx / SiteContentEditor.tsx (JSON page-copy editor)
```

**Adding a new collection** is usually just a new entry in `src/lib/collections.ts` (table, fields, group) — the list and editor render themselves. Supported field types: `text`, `textarea`, `number`, `boolean`, `image`, `url`, `select` (enum), `reference` (FK dropdown), `json`.

## Database

All schema was applied to Supabase via migrations. Tables:

- **Content:** `properties`, `property_gallery_images`, `pricing_categories`, `testimonials`, `faq_items`, `team_members`, `company_values`, `achievements`, `valued_clients`, `experience_steps`, `service_categories`, `service_cards`, `icon_feature_cards`, `office_locations`, `gallery_photos`, `social_links`, `footer_columns`, `footer_links`, `contact_cards`, `filter_options`, `site_content`.
- **Submissions:** `contact_inquiries`, `property_inquiries`, `general_inquiries`, `newsletter_subscribers`.
- **Auth:** `admins` + `is_admin()`.

**RLS:** public (anon) can `select` published content and `insert` form submissions; only allowlisted admins can write content or read/triage/delete submissions. **Storage:** the public `property-images` bucket serves images by URL; only admins can upload/delete.

Regenerate `database.types.ts` after any schema change (Supabase MCP `generate_typescript_types`, or `supabase gen types typescript`).

## Build & deploy

```bash
npm run build     # tsc --noEmit && vite build  →  dist/
npm run preview   # serve the production build locally
```

Deploy `cms/` as its own project (Netlify/Vercel/any static host):

- **Build command:** `npm run build` · **Publish dir:** `dist` · **Base dir:** `cms`
- Set the `VITE_*` env vars in the host's dashboard.
- SPA routing: `public/_redirects` (`/* /index.html 200`) is included for Netlify. On Vercel, add a rewrite of all routes to `/index.html`.
- **Lock it down:** it's an admin tool — consider host-level access protection (password/SSO) in addition to Supabase Auth. `index.html` already sends `noindex`.

This folder is excluded from the Next.js app's `tsconfig`/ESLint and has no `workspaces` link, so it never affects the site's build.

## Connecting the public site

The seed data mirrors the current site content, so the Next.js app can be switched to read from Supabase table-by-table. When you do:

- Install `@supabase/supabase-js` in the **root** project and create a server client (see the site's `AGENTS.md`).
- Images uploaded through the CMS are **absolute Supabase Storage URLs**; add that host to `next.config.ts` `images.remotePatterns`. Seed rows still use the existing `/images/...` local paths, which keep working as-is.
- Map stored icon-name strings back to `lucide-react` components at render time.
