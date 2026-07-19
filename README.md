# Apul Agarwal — Personal Portfolio

Personal website and portfolio for Apul Agarwal: Technical Program Manager, UW Foster MBA 2026, based in Seattle, WA. Showcases professional background, work history, and engineering project case studies (FamilyBoard, Quiver, and more).

Live: https://apulagarwal.info

## Tech stack

- **Framework**: TanStack Start v1 (React 19 + Vite 7, file-based routing, SSR)
- **Styling**: Tailwind CSS v4 + inline styles using a small UW-inspired design system (see `DESIGN.md`)
- **Backend**: Supabase (Postgres with RLS, auth, storage)
- **Data fetching**: `@tanstack/react-query` + Supabase JS client
- **Deployment target**: GitHub Pages (static SPA, built by GitHub Actions)

## Project structure

```
src/
  routes/                 File-based routes (TanStack Router)
    __root.tsx            Root layout / HTML shell
    index.tsx             Homepage
    projects.$slug.tsx    Project detail pages (dynamic)
    admin.tsx             Admin / content management
  components/
    site/                 Site-wide presentation components
    projects/             One component per project case study
    ui/                   shadcn/ui primitives
  hooks/                  Data hooks (useProjects, useSiteContent, ...)
  integrations/supabase/  Auto-generated Supabase client + types (do not edit)
  lib/                    Utilities and server functions
  styles.css              Design tokens + global styles
supabase/
  migrations/             SQL migrations (applied via Lovable Cloud)
  config.toml             Supabase project config (auto-managed)
```

See `src/routes/README.md` for routing conventions and `DESIGN.md` for visual rules.

## Local development

Requires Bun (or Node 20+) and a Lovable Cloud project (env is auto-provisioned by Lovable).

```bash
bun install
bun run dev          # http://localhost:8080
bun run build        # production build
bun run lint
bun run format
```

Environment variables (provided automatically by Lovable Cloud, do not edit `.env` by hand):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Content model

Most site content is stored in Postgres and rendered from `useSiteContent` / `useProjects`. Highly bespoke project case studies (e.g. FamilyBoard, Quiver) are authored as React components under `src/components/projects/` and branched on `slug` in `src/routes/projects.$slug.tsx`.

## Database changes

Never edit existing files in `supabase/migrations/`. Create a new timestamped migration via Lovable Cloud. RLS is enabled on all public tables — every new table needs explicit `GRANT`s and policies.

## Deployment

Every push to `main` is built and deployed automatically by the GitHub Actions workflow in `.github/workflows/pages.yml` (Bun install, Vite build, static output from `dist/client` published to GitHub Pages).

- Production: https://apulagarwal.info (Namecheap DNS, apex A records to GitHub Pages)

## License

Content (copy, images, project case studies) © Apul Agarwal — all rights reserved. Code is provided as-is for reference; no license granted for reuse without permission.