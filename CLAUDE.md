# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**EstateIn** — a real estate company web application.

- **Framework:** Next.js
- **Backend / database / auth:** Supabase (project id `bogapwrqbgtqahegrwxy`)
- **Frontend hosting:** Netlify
- **Git remote:** `origin` → `github.com/mlokman92/ms-app.git`

## Current state

> **The application has not been scaffolded yet.** As of this file's creation the repository contains only this `CLAUDE.md` — there is no `package.json`, source tree, or dependencies. The remote `main` branch is an empty initial commit.

The first task is to scaffold the Next.js app (e.g. `npx create-next-app@latest`) and wire up the Supabase client. Once that exists, update the sections below with the real commands and architecture, and remove this notice.

## Commands (expected once scaffolded)

These follow standard Next.js conventions and will be defined in `package.json` after scaffolding — verify them against the real `scripts` block before relying on them:

- `npm run dev` — start the local dev server
- `npm run build` — production build (this is what Netlify runs)
- `npm run start` — serve the production build locally
- `npm run lint` — run ESLint

No test runner is configured yet; add one and document how to run a single test here when you do.

## Supabase

- Project id: `bogapwrqbgtqahegrwxy`.
- The frontend talks to Supabase via the JS client using the project URL and anon key, supplied as environment variables (e.g. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). These live in `.env.local` locally and in Netlify's environment settings for deploys — never commit them.
- When adding tables, prefer managing schema via Supabase migrations so changes are reproducible, and enforce access with Row Level Security policies.

## MCP servers

Two MCP servers are configured for this project in `.mcp.json` (project scope, committed to the repo). Both are **HTTP servers using OAuth**, so `.mcp.json` stores only URLs — no secrets — and is safe to commit. On first use each teammate must **approve** the server (prompted on `claude` startup, or via `/mcp`) and authenticate with their own account.

- **supabase** — `https://mcp.supabase.com/mcp?project_ref=bogapwrqbgtqahegrwxy`, scoped to the EstateIn Supabase project. Use it to inspect schema, run SQL, apply migrations, read logs/advisors, and generate TypeScript types. Before schema changes run `list_tables`; when debugging start with `get_logs` / `get_advisors`; use `get_project_url` / `get_publishable_keys` to help wire client-side config.
- **figma** — `https://mcp.figma.com/mcp`, used for design-to-code. The EstateIn UI follows the **"Real Estate Business Website UI Template — Dark Theme"** file (file key `KGYph7jv3uusd05VO05MnJ`). Pull designs **page by page** with `get_design_context` / `get_screenshot` / `get_metadata`; the full-page canvas node (`45:2`, ~46000×8600px, holds all ~7 page designs) is too large to fetch in one call. The authenticated seat is **View** tier — reading designs into code works; writing back into Figma may be limited.

## Deployment

- Netlify builds and hosts the frontend. The build command is the Next.js `build` script; environment variables (including the Supabase keys) must be set in the Netlify project settings, not committed to the repo.
