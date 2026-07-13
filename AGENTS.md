# AGENTS.md

Shared guidance for AI agents (Claude Code, Cursor, Copilot, …) working in this repository. `CLAUDE.md` imports this file via `@AGENTS.md`, so keep all project instructions here — don't duplicate them into `CLAUDE.md`.

## Project

**EstateIn** — a real estate company web application.

- **Framework:** Next.js 16 (App Router) + React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Backend / database / auth:** Supabase (project id `bogapwrqbgtqahegrwxy`)
- **Frontend hosting:** Netlify
- **Git remote:** `origin` → `github.com/mlokman92/estatein`

## Commands

- `npm run dev` — start the local dev server (http://localhost:3000)
- `npm run build` — production build (this is what Netlify runs)
- `npm run start` — serve the production build locally
- `npm run lint` — run ESLint (`eslint-config-next`)

No test runner is configured yet; add one and document how to run a single test here when you do.

## Architecture

- **App Router** lives under `src/app/` — `layout.tsx` (root layout, loads the **Urbanist** font via `next/font`), `page.tsx` (home), `globals.css` (Tailwind entry point). Add new routes as folders under `src/app/`.
- **Design system / styling:** Tailwind CSS v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`). There is **no `tailwind.config.js`** — tokens are declared in `src/app/globals.css` under `@theme`. Use those semantic utilities instead of raw hex: `bg-bg` (#141414), `bg-surface` (#1a1a1a), `bg-elevated` (#262626), `border-line`/`border-line-strong`, `text-purple` (#703bf7), `text-purple-light`, `text-muted` (#999) / `text-muted-2`, `rounded-btn`/`rounded-card`, plus utilities `bg-grid`, `glow-purple`, `animate-spin-slow`. Merge class names with the `cn()` helper at `src/lib/cn.ts` (`clsx` + `tailwind-merge`).
- **Responsive scale — don't over-size on laptops:** The Figma frames are a fixed **1920px** canvas (with 1440 Laptop + 390 Mobile variants). Do **not** transplant Figma's absolute px type/spacing at the `lg` (≥1024) breakpoint — that renders oversized on a standard ~1366px laptop. The `lg` scale is tuned to the **1440 Laptop** proportions; a custom **`3xl` breakpoint** (`--breakpoint-3xl: 120rem` = 1920px, declared in `globals.css` `@theme`) restores the full desktop scale only on very large monitors (e.g. `lg:text-5xl 3xl:text-6xl`). When tuning type/spacing, **verify at ~1366px**, not just 1440/1920. Figma governs content/structure/placement; type & spacing ride the responsive scale.
- **Components:** shared primitives in `src/components/ui/` (`Button`, `Container`, `SectionHeading`, `SliderControls`, `Tag`, `Sparkle`, `Logo`, plus `form.tsx` — `FakeSelect`/`fieldInputCls`/`fieldLabelCls`/`slug` for the dark form controls) — reuse these rather than re-implementing. **Site chrome** shared across every page lives in `src/components/layout/` (`Header`, `Footer`, `CTA`). Page sections live in per-page folders: `src/components/home/` (`Hero`, `FeatureBar`, `FeaturedProperties`, `Testimonials`, `FAQ`), `about/`, `properties/`, `services/`, `contact/`. Each route is `src/app/<route>/page.tsx` composing `<Header/>` → sections → `<CTA/>` → `<Footer/>`. Routes: `/` (home), `/about`, `/properties`, `/services`, `/contact`. Downloaded design imagery is in `public/images/`.
- **Icons:** `lucide-react` — note this project is on **lucide v1**, which **removed all brand icons** (Facebook/LinkedIn/Twitter/YouTube/etc.); use inline SVG paths for social/brand marks (see `Footer.tsx`).
- **Design source:** components are built to match the Figma "Real Estate Business Website UI Template — Dark Theme" (see MCP servers below). ESLint is strict (`next/typescript`) and `next build` fails on lint — no unused vars, no `any`, escape raw quotes/apostrophes in JSX.
- **Config:** `next.config.ts` (pins `turbopack.root` to this dir so the parent-folder lockfile doesn't hijack the workspace root), `tsconfig.json`, `eslint.config.mjs` — all TypeScript/flat-config style.

## Supabase

- Project id: `bogapwrqbgtqahegrwxy`. **The Supabase client is not installed yet** — `@supabase/supabase-js` is not in `package.json`. Before doing data work, run `npm install @supabase/supabase-js @supabase/ssr` (the `@supabase/ssr` package provides the App Router server/client helpers), then create the client(s) under `src/lib/`.
- The client uses the project URL and anon/publishable key from env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), kept in `.env.local` locally and in Netlify's environment settings for deploys — never commit them.
- Prefer Supabase migrations for schema changes so they're reproducible, and enforce access with Row Level Security. The Supabase MCP server (below) can apply migrations and read schema/logs directly.

## MCP servers

Two MCP servers are configured for this project in `.mcp.json` (project scope, committed to the repo). Both are **HTTP servers using OAuth**, so `.mcp.json` stores only URLs — no secrets — and is safe to commit. On first use each teammate must **approve** the server (prompted on `claude` startup, or via `/mcp`) and authenticate with their own account.

- **supabase** — `https://mcp.supabase.com/mcp?project_ref=bogapwrqbgtqahegrwxy`, scoped to the EstateIn Supabase project. Use it to inspect schema, run SQL, apply migrations, read logs/advisors, and generate TypeScript types. Before schema changes run `list_tables`; when debugging start with `get_logs` / `get_advisors`; use `get_project_url` / `get_publishable_keys` to help wire client-side config.
- **figma** — `https://mcp.figma.com/mcp`, for **design-to-code**. The EstateIn UI follows the **"Real Estate Business Website UI Template — Dark Theme"** file. Everything below is the established workflow — follow it so sessions stay consistent.
  - **File key & access:** use **this account's own duplicate, `NGyMOekiioekW9HAwO8XSH`**. The original Community file `KGYph7jv3uusd05VO05MnJ` is read-only and returns a permission error over MCP. If you hit *"you don't have edit access"*, the authenticated Figma account must **duplicate the Community template into its own drafts** ("Open in Figma" / Get a copy), then use that new file key here. Node IDs are preserved across a duplicate, so the IDs below stay valid.
  - **Prefer code over screenshots.** Use **`get_design_context`** on a specific node for its layout/structure/styles/tokens (the source of truth); use `get_screenshot` only as a visual reference. **Never fetch the whole canvas `45:2`** (~46000×8600px) — `get_metadata` on it returns ~2MB (auto-saved to a file; parse depth‑1 children with node/jq only if you must). Jump straight to a node below.
  - **Node map** (stable across the duplicate). Desktop pages: Home `46:304`, About `89:5151`, Properties `97:7288`, Property Details `102:8754`, Services `104:10350`, Contact `104:12305`. Responsive variants: Home Laptop (1440) `139:6238`, Home Mobile (390) `139:7812`. **Homepage sections → components:** Header `60:3125`, Hero `121:1773`, FeatureBar `121:1890`, FeaturedProperties `87:1301`, Testimonials `75:599`, FAQ `75:952`, CTA `181:2`, Footer `89:3943`.
  - **Save images locally.** `download_assets` returns an export render + up to 20 source images as **short-lived URLs** — `curl` them promptly into `public/images/`. Convert PNG→JPG with **`sharp`** (already installed) to fix mislabeled extensions and shrink files; avatars are center-cropped to square. The 7 homepage photos are already saved: `hero-building`, `property-1..3` (villa / city / sunset), `avatar-1..3` (Wade / Emelie / John).
  - **Fidelity ≠ transplanting px.** Figma governs **content, structure, placement, and color/tokens** — but its frames are a fixed **1920px** canvas, so **do not copy absolute px type/spacing into the `lg` breakpoint** (see *Responsive scale* under Architecture). Calibrate `lg` to the **1440 Laptop** frame, and always **verify the rendered output at ~1366px** (run `npm run build`, then screenshot with `msedge --headless --screenshot --window-size=1366,…`; kill stale servers by port when reusing one). Keep tasteful custom inventions (e.g. the Hero rotating "Discover Your Dream Property" badge) rather than forcing 1:1 Figma parity.
  - Authenticated as `bestsellerever2025@gmail.com`, **Full** seat (Figma Education) → **200 reads/day**; batch related nodes rather than re-fetching.

## Deployment

- Netlify builds and hosts the frontend. The build command is the Next.js `build` script; environment variables (including the Supabase keys) must be set in the Netlify project settings, not committed to the repo.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
