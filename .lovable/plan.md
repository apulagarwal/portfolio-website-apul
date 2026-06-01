## Projects section + detail route scaffold

### 1. Database migration
Create `public.projects`:
- `id uuid pk default gen_random_uuid()`
- `slug text unique not null`
- `"order" int not null default 0`
- `title text not null`
- `outcome text not null`
- `body text`, `tools text`, `live_url text`, `linkedin_url text`
- `visible boolean not null default true`
- `created_at`, `updated_at timestamptz default now()`

Grants: `SELECT` to `anon` + `authenticated`; full to `service_role`.
RLS enabled. Policies:
- Public read: `SELECT` using `true`
- Admin upsert: `ALL` to `authenticated` where `auth.jwt()->>'email' = 'apulagarwal@gmail.com'` (matches existing site_content policy)

### 2. Seed data
Insert the 4 rows (familyboard, resume-tailoring, quiver, this-site) with provided titles/outcomes, `visible=true`, and `order` 1–4. Other optional fields left null.

### 3. Main page changes (`src/routes/index.tsx`)
- Add `Projects` link to nav (between Work and Contact).
- New `<Projects />` section, rendered between `<Work />` and `<Education />`, with `id="projects"`.
- Fetch via direct `supabase.from('projects').select(...).eq('visible', true).order('order')` inside the component (mirrors `useSiteContent` pattern — public read, no auth needed). Lightweight `useEffect` + `useState` or a small hook `useProjects`. I'll add `src/hooks/useProjects.ts` for parity with `useSiteContent`.
- Visual structure copies `Work`:
  - `SectionLabel`: "Projects"
  - `sectionStyle` (border-top #4b2e83, 64px padding)
  - Stack with `gap: 1.75rem`
  - Each item: title (`1rem`, bold, `var(--text)`), outcome (`0.9rem`, `var(--muted)`, `WebkitLineClamp: 2`), then `<Link to="/projects/$slug" params={{slug}}>Read more →</Link>` styled `0.875rem`, `var(--muted)`, underline on hover (small CSS class `project-readmore`).

### 4. Detail route scaffold
New file `src/routes/projects.$slug.tsx`:
- `createFileRoute("/projects/$slug")`
- Component reads `Route.useParams()`, looks up the row from Supabase by slug to display the real title; falls back to the slug if not found.
- Body: `<h1>{title}</h1>` + "Coming soon." paragraph.
- `← Back` link to `/` at top, using container + section styling consistent with the site.
- Includes `head()` with title + description and `errorComponent` / `notFoundComponent` per project conventions.

### 5. Out of scope (per request)
No admin UI for projects this session.

### Files touched
- New migration (table + grants + RLS + policies)
- Data insert (4 seed rows)
- `src/hooks/useProjects.ts` (new)
- `src/routes/index.tsx` (nav + Projects section)
- `src/routes/projects.$slug.tsx` (new)
- `src/integrations/supabase/types.ts` regenerates automatically after migration
