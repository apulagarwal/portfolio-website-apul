# Phase 2 — Lovable Cloud + content API

## Step 0 — Enable Lovable Cloud
Call `supabase--enable` to provision the backend (Supabase under the hood, presented as Lovable Cloud). This wires up `src/integrations/supabase/client.ts` and the env vars the browser client needs.

## Step 1 — Migration: `site_content` table

Create a single migration that does everything in one transaction:

```sql
create table public.site_content (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamptz default now()
);

-- Data API grants (required — Supabase no longer grants public-schema
-- privileges by default). Public read table, so anon gets SELECT.
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;

alter table public.site_content enable row level security;

create policy "Public read" on public.site_content
  for select using (true);

insert into public.site_content (key, value) values
  ('hero_hook', 'I build systems that work at scale.'),
  ('hero_subhead', 'Defense software TPM turned UW Foster MBA. 15+ years of hardware-software integration, now looking for the next hard problem.'),
  ('about_p1', '<full p1 from CONTENT.md, verbatim>'),
  ('about_p2', '<full p2 from CONTENT.md, verbatim>'),
  ('about_p3', '<full p3 from CONTENT.md, verbatim>'),
  ('photo_url', ''),
  ('theme', 'light');
```

Note: the user's seed for `about_p2` uses em-dashes ("That range — from architecture …"), while the live site (CONTENT.md canonical) uses commas. I will seed the **CONTENT.md commas version** so reload stays pixel-identical. Flag at handoff in case the user wants the em-dash version instead.

No admin writes in Phase 2 — write paths land in Phase 3 with auth.

## Step 2 — `useSiteContent` hook

Create `src/hooks/useSiteContent.ts`. Uses the browser Supabase client + TanStack Query (already installed):

- `FALLBACK` constant — full Phase 1 strings verbatim from `src/routes/index.tsx` (no `"..."` truncation).
- `useQuery({ queryKey: ['site_content'], queryFn, initialData: FALLBACK })` so the first paint uses FALLBACK synchronously — zero layout shift, zero loading flash.
- `queryFn`: `supabase.from('site_content').select('key, value')`, reduce rows to `{ [key]: value }`, then `{ ...FALLBACK, ...rows }` so any missing key falls back per-field.
- On any error (network, RLS, table missing), return `FALLBACK`. Hook never throws.
- Returns `content` only (a flat object). Loading/error states are intentionally hidden — public site never shows a broken state.

Why `useQuery` here instead of the canonical `ensureQueryData` + `useSuspenseQuery` loader pattern: the spec explicitly requires no layout shift and silent fallback on error. `initialData` gives instant render with the hardcoded values; background fetch swaps in fresh DB values when ready. A suspense loader would either block SSR on the fetch or flash a pending state.

## Step 3 — Wire `src/routes/index.tsx`

Inside the `Index` component (top of the tree), call `const { content } = useSiteContent()` once and pass `content` down to `Hero` and `About` as props (small, contained — no global state).

Replacements (only these 5 strings + 1 conditional):
1. Hero subhead `<p>` → `{content.hero_hook}` (the Georgia 2rem line — currently `"I build systems that work at scale."`)
2. Hero descriptive `<p>` → `{content.hero_subhead}`
3. About paragraph 1 → `{content.about_p1}`
4. About paragraph 2 → `{content.about_p2}` (this is the one with the inline UW Foster purple span — that span is in `about_p3`, not p2, so p2 is a plain string swap)
5. About paragraph 3 → renders `{content.about_p3}` — but currently has an inline `<span style={{ color: '#4b2e83' }}>UW Foster School of Business</span>`. To preserve that styling while pulling text from the DB, split: render the string and use a small replacer that wraps the literal substring `"UW Foster School of Business"` in the purple span. Falls back gracefully if the substring is absent.
6. Photo slot: if `content.photo_url` is non-empty → `<img src={content.photo_url} alt="" width={220} height={260} style={{ borderRadius: 8, objectFit: 'cover' }} />`; else keep the existing `#f0eeeb` placeholder div untouched.

`content.theme` is read but not applied yet (Phase 3 will toggle it).

No other changes. No CSS, no fonts, no spacing, no layout — the visual diff against Phase 1 must be zero.

## Step 4 — Verify

- Build passes.
- Browser load: page is pixel-identical to Phase 1 (hardcoded fallback renders immediately, DB values swap in invisibly because they match).
- Edit `hero_hook` in the Supabase dashboard, hard reload → new text appears in the Georgia 2rem line.
- Disable network / drop the table briefly → page still renders Phase 1 copy, no error UI.

## Files touched

- `supabase/migrations/<timestamp>_site_content.sql` — new
- `src/hooks/useSiteContent.ts` — new
- `src/routes/index.tsx` — 5 string swaps + 1 conditional photo render + hook call + 2 component prop additions

No new dependencies. No changes to `__root.tsx`, `styles.css`, or any other file.

## Open flag (non-blocking)

`about_p2` in your seed SQL uses em-dashes ("That range — from architecture discussions to on-site deployment — across programs…"), but the live Phase 1 copy and CONTENT.md use commas. I'll seed the comma version so reload stays pixel-identical. Reply if you want the em-dash version instead.