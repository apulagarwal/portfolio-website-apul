# Contributing

This is a personal portfolio, but the codebase follows a few hard rules so future edits stay consistent.

## Before you change anything

1. Read `DESIGN.md`. Visual changes must conform — no new colors, no animations, no dark backgrounds.
2. Read `src/routes/README.md` for routing conventions (file-based, flat dot-separated).
3. Never edit auto-generated files:
   - `src/routeTree.gen.ts`
   - `src/integrations/supabase/*` (client, types, middleware, attacher)
   - `.env`
   - `supabase/config.toml` (project-level settings)

## Workflow

```bash
bun install
bun run dev
bun run lint
bun run format
```

The dev server runs at http://localhost:8080. Lovable applies builds/typechecks automatically — do not run `bun run build` manually unless reproducing a CI issue.

## Code style

- TypeScript strict mode. No `any` unless unavoidable.
- Prefer small, focused components. One project case study per file under `src/components/projects/`.
- Inline styles are acceptable on bespoke project pages (matches the established FamilyBoard/Quiver pattern). For shared chrome, use design tokens from `src/styles.css`.
- No em-dashes in prose. Use colons or periods.

## Adding a project case study

1. Create `src/components/projects/<Name>.tsx` modeled on `FamilyBoard.tsx` / `Quiver.tsx`.
2. Add a branch in `src/routes/projects.$slug.tsx`:
   ```ts
   if (slug === "<slug>") return <YourProject />;
   ```
3. Extend `head()` in the same file with slug-specific `title`, `description`, and `og:*` metadata.
4. Make sure the project row exists in the `projects` table (via the admin route or a migration) so it surfaces on the homepage.

## Database changes

- Never edit files in `supabase/migrations/`. Create a new timestamped migration.
- Every new public-schema table needs `GRANT`s for `authenticated` (and `anon` only if a policy allows it), `ENABLE ROW LEVEL SECURITY`, and explicit policies.
- Store user roles in a separate `user_roles` table — never on `profiles`. Check roles via a `SECURITY DEFINER` function.

## Server-side logic

Use TanStack `createServerFn` for app-internal server logic. Do not add Supabase Edge Functions for new features. See the `src/lib/api/` examples and TanStack Start docs.

## Commit hygiene

- One logical change per commit.
- Don't commit secrets. The `.env` file is managed by Lovable Cloud.
- Don't commit `node_modules`, build output, or generated route trees (already in `.gitignore`).