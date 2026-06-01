## Phase 3 — `/admin` editor + Work wiring + photo storage

### Auth model

- Supabase Auth with two methods:
  - Google OAuth via Lovable-managed broker (`lovable.auth.signInWithOAuth("google", ...)`). Call `supabase--configure_social_auth` with `providers: ["google"]` so Google is actually enabled. Do NOT disable email.
  - Email/password — you create the `apulagarwal@gmail.com` account from the Cloud → Users dashboard (I can't create auth users from a migration; I'll surface a button to open it).
- Hard email allowlist: `ALLOWED_EMAIL = "apulagarwal@gmail.com"`. After session loads, if `session.user.email !== ALLOWED_EMAIL` → `supabase.auth.signOut()` and render "Access denied." This guards both Google and password sign-ins (so even if a wrong Google account gets through, it's immediately revoked).
- Session lifetime 24h: set in `supabase--configure_auth` (JWT expiry 86400s; refresh token reuse off). Auto-confirm email stays OFF unless you ask otherwise — but since the account is created via the Auth dashboard, it's confirmed there.
- `/admin` is a single route (`src/routes/admin.tsx`), public-file but its component renders the login form when there's no session — never blank, never errors. No layout group needed; the gate lives in the component because the page itself swaps content based on session.

### DB changes (one migration)

```sql
-- Authenticated upsert policy on existing site_content
create policy "Authenticated upsert" on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

grant select, insert, update on public.site_content to authenticated;

-- Storage bucket for the headshot (public read)
insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true)
  on conflict (id) do nothing;

create policy "Public read site-assets" on storage.objects
  for select using (bucket_id = 'site-assets');
create policy "Authenticated write site-assets" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-assets');
create policy "Authenticated update site-assets" on storage.objects
  for update to authenticated using (bucket_id = 'site-assets');
```

Seed (separate insert call, not in the migration):

```sql
insert into public.site_content (key, value) values
  ('work_p1', '<NAISS/KAVACH paragraph from spec>'),
  ('work_p2', '<IPSS paragraph from spec>'),
  ('work_p3', '<early-career paragraph from spec>')
on conflict (key) do nothing;
```

### Hook update (`src/hooks/useSiteContent.ts`)

Add `work_p1`, `work_p2`, `work_p3` to `FALLBACK` using the exact strings currently in `workBlocks[].body` in `src/routes/index.tsx`. Per-field fallback already merges per-key, so missing rows fall back automatically.

### Public site wiring (`src/routes/index.tsx`) — minimal

- `Work` takes `content` prop. The `workBlocks` array's `body` field is replaced inline by `content.work_p1 ?? body[0]`, etc. — keep role / company / period hardcoded, only the prose comes from DB.
- Pass `content` from `Index` into `<Work content={content} />`.
- No visual changes. Photo wiring is already done in Phase 2.

### Admin UI (`src/routes/admin.tsx`)

- Same typography tokens as the public site (Georgia headers, system sans body, white bg, `#4b2e83` accents). Vertical stack, no sidebar. Max-width ~720px, centered.
- States:
  1. **Loading session** — minimal "Loading…" line (avoids login flash on refresh).
  2. **Unauthenticated** — login card: "Sign in with Google" button + "Email" + "Password" + "Sign in" button. Below: "Only `apulagarwal@gmail.com` may sign in."
  3. **Wrong email** — after sign-in, if email !== allowlist, render "Access denied." with a "Sign out" link. Sign out is already triggered.
  4. **Authenticated** — editor.
- Editor sections (one per key, in order):
  - Hero hook (input)
  - Hero subhead (textarea, 3 rows)
  - About p1 / p2 / p3 (textareas)
  - Work block 1 / 2 / 3 description (textareas) — labels include the role + period from `workBlocks` for context
  - Photo (`<img>` preview if `photo_url`, else placeholder box; `<input type="file" accept="image/jpeg,image/png,image/webp">`; client-side check: type ∈ {jpeg,png,webp}, size ≤ 5MB; then `supabase.storage.from('site-assets').upload(\`headshot-${Date.now()}.${ext}\`, file, { upsert: true })`; take `getPublicUrl(...).data.publicUrl`; upsert into `site_content` under `photo_url`. Show inline "Saved.")
  - Theme (`<select>` with single option `light` — disabled-looking, sets `theme=light`).
- **Per-field Save** (your spec preference). Each section has its own Save button + inline "Saved" toast that auto-clears after 2s. Saves use `supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })`. Errors surface inline in red.
- Sign out button in the top-right of the authenticated view.
- After successful auth, `queryClient.invalidateQueries(['site_content'])` so the public site picks up edits when you re-open it.

### Security checklist

- All writes go through the browser Supabase client with the authenticated session; RLS `Authenticated upsert` policy ensures only signed-in users can write. Anonymous visitors keep SELECT only.
- Email allowlist enforced client-side on every session change. Sign-out is immediate on mismatch.
- File upload: client validates type + size before upload; storage policy restricts writes to authenticated; bucket is public-read (needed because the public site loads the image without auth).
- Note: a determined attacker who creates ANY Supabase auth account could in theory hit the upsert policy. Since we control the only allowed account and email signups aren't exposed on the public site, this is acceptable. If you want stricter isolation later, we can move writes behind a `createServerFn` that re-checks the email server-side — flag if you want that now.

### Files

- New: `src/routes/admin.tsx`, `supabase/migrations/<ts>_admin_phase3.sql`
- Edit: `src/hooks/useSiteContent.ts` (add 3 work keys to FALLBACK), `src/routes/index.tsx` (wire `Work` to `content`)
- Configure: `supabase--configure_social_auth({ providers: ["google"] })`, `supabase--configure_auth` to set 24h JWT
- Seed: separate `supabase--insert` call for the 3 work paragraphs

### Open items for you

1. **Create the `apulagarwal@gmail.com` password account in the Cloud → Users dashboard.** I can't create auth users from a migration. I'll add a "View Backend" link in the response after build so you can do it in one click.
2. Confirm you want client-side-only email gating (recommended given the constraints) vs server-side `createServerFn` gating (stricter, slightly more code).
