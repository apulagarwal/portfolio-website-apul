# apulagarwal.info — Phased Plan

Confirmed: I've read DESIGN.md, CONTENT.md, and DEFINE.prompt.md in full. Where the two specs disagreed, CONTENT.md wins (your call).

## Phase breakdown

**Phase 1 — Public site, static (this approval)**
Build the entire public site with real copy from CONTENT.md, exact tokens from DESIGN.md. No backend, no admin, no animations.

**Phase 2 — Lovable Cloud + content API**
Enable Lovable Cloud (Supabase under the hood). Move editable fields (hero hook, subhead, about paragraphs, photo URL, theme) into a `site_content` table with a single row. Public site reads on load with the Phase 1 copy as hardcoded fallback if the fetch fails.

**Phase 3 — Admin panel + auth at `/admin`**
Google SSO restricted to `apulagarwal@gmail.com` + email/password fallback (single allow-listed account). Edit bio/tagline, upload headshot to Supabase Storage, toggle theme. RLS so only that user can write. 401 on unauthenticated `/admin` access. Changes reflect on next public page load.

**Phase 4 — Publish + custom domain**
Publish via Lovable, attach `apulagarwal.info` as custom domain, verify OG tags, Lighthouse ≥ 90, mobile (375px), and admin auth end-to-end on the live URL.

---

## Phase 1 — what gets built

### Routes
- `/` — single page, all sections stacked: Hero, About, Work, Education, Contact, Footer
- `__root.tsx` — sets sitewide meta (title, description, OG, canonical, `robots: index,follow`)

### Sections (in order)
1. **Header** — `Apul Agarwal` (Georgia) left, nav `About · Work · Contact` right (hidden < 600px). Not sticky.
2. **Hero** — two-column (220×260 photo slot left, 8px radius, `#f0eeeb` placeholder box with `<!-- PHOTO SLOT -->`; stacks above text on mobile). Right column: name in gold `#b7a57a`, hook in Georgia 2rem, two-line subhead, then inline links separated by `·`: **Email** (mailto), **LinkedIn**, **Request Resume** (mailto). No PDF link.
3. **About** — 3 paragraphs verbatim.
4. **Work** — 3 timeline blocks (no cards, no bullets). Role bold, company in purple `#4b2e83` weight 600, period in muted, then prose.
5. **Education** — 2 entries, same timeline pattern.
6. **Contact** — "Let's talk." heading, 2-sentence body, email CTA styled as link with 2px gold underline; hover color → purple.
7. **Footer** — `Apul Agarwal · Seattle, WA · linkedin.com/in/apulagarwal`.
8. **Projects** — commented-out block placed between Work and Education, with TODO note. Does not render.

### Design tokens (locked, applied via `src/styles.css`)
- Colors: bg `#ffffff`, text `#111111`, muted `#555555`, subtle `#888888`, gold `#b7a57a`, purple `#4b2e83`, divider `#e5e2dc`.
- Fonts: Georgia stack for headlines/name/section titles; system sans for body/nav. No external font loads.
- Layout: 900px max-width, `0 2rem` padding (`0 1.25rem` < 480px), 64px section vertical padding (48px on mobile).
- Section separators: `border-top: 1px solid #4b2e83` at the start of each section.
- Allowed motion only: `transition: color 0.15s` on hovers, `scroll-behavior: smooth`. No keyframes, no observers, no transforms.

### SEO / meta
- Title: `Apul Agarwal`
- Description, OG title/description/url, canonical `https://apulagarwal.info`, `og:image: /photo.jpg` (placeholder path; we add a real file in a later phase).
- Single `<h1>` (the name), semantic `<section>` per block, `<nav>` for header.

### Hard guarantees
- All copy lifted verbatim from CONTENT.md.
- Lint pass before handoff: no em-dashes, none of the banned words (delve, showcase, robust, seamless, innovative, passionate, results-driven, proven track record, strategic thinker, dynamic).
- Gold used in exactly two places: the name in the hero, and the 2px underline on the email CTA. Nothing else.
- Purple used only for section top borders and Work company names.
- No dark backgrounds anywhere.
- Mobile-responsive at 375px; touch targets ≥ 44px.
- Lighthouse targets met (no heavy assets, no JS-driven animations, system fonts).

### Files touched in Phase 1
- `src/routes/__root.tsx` — sitewide meta only
- `src/routes/index.tsx` — full page
- `src/components/site/Header.tsx`, `Hero.tsx`, `About.tsx`, `Work.tsx`, `Education.tsx`, `Contact.tsx`, `Footer.tsx`, `SectionLabel.tsx`
- `src/styles.css` — replace template tokens with the DESIGN.md palette + reset

Nothing else changes. No new dependencies.

---

Approve and I'll build Phase 1. After it lands, I'll wait for your sign-off before starting Phase 2.