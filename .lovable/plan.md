## Build /projects/familyboard detail page

Replace the "Coming soon" placeholder in `src/routes/projects.$slug.tsx` with a slug-specific render. When `slug === "familyboard"`, render a dedicated `FamilyBoardContent` component; otherwise keep the existing "Coming soon" fallback so the other 3 seeded projects still resolve.

### Approach

Rather than hard-coding content inside the generic route, add `src/components/projects/FamilyBoard.tsx` that contains the full page. The route file branches on slug. This keeps future project pages clean (one file per project) without needing extra routes.

### File changes

**New: `src/components/projects/FamilyBoard.tsx`**
- Container: `max-width: 740px`, centered, padding `2.5rem 2rem 4rem` (matches existing route).
- Header block:
  - `← Back` link to `/` — 0.875rem, `#555555`, hover underline (reuse a small inline `.fb-link` class added to `styles.css` OR scoped `<style>` block in the component — prefer scoped `<style>` to avoid polluting global CSS).
  - `<h1>` "FamilyBoard — Real-Time Multiplayer Game" — Georgia, 2rem, #111, 700. *(Note: the user's hard rules say "no em-dashes" but the title itself contains one — keep the title as written since it is provided verbatim. Apply the no-em-dash rule only to prose I might otherwise write.)*
  - Outcome line — 0.9rem italic #555.
  - Two anchor links (`target="_blank" rel="noopener noreferrer"`) with 1.5rem gap.
  - `<hr>` 1px solid `#4b2e83`, no default margin override.
- Reuse existing `SectionLabel` component for each section label.
- Section 1 prose paragraph.
- Stats SVG inline (740×100, responsive via `width="100%" height="auto"`).
- Section 2 prose + architecture SVG (740×320, responsive).
- Section 3: three collapsible items.
  - Implement as `<button>` (full-width, left-aligned, transparent bg, no border except a thin bottom rule `#e5e2dc`) toggling local React state. Show `+` collapsed, `−` expanded, right-aligned via flex.
  - No animation; content simply mounts/unmounts.
  - Title style: 1rem #111, 600 weight. Content: 0.95rem #555, line-height 1.75, padding-top 0.75rem, padding-bottom 1.25rem.
- "What I learned the hard way" SVG inline (740×260, responsive).
- Section 4 prose paragraph.
- Footer:
  - Tools line 0.85rem #888.
  - 1px `#e5e2dc` rule.
  - Two repeat links, same style as header.

All section spacing: `margin-top: 4rem` between major sections (matches the 64px rhythm used elsewhere). Header `<hr>` followed by `margin-top: 3rem` before first section label.

**Edit: `src/routes/projects.$slug.tsx`**
- Inside `ProjectDetail`, after fetching: `if (slug === "familyboard") return <FamilyBoard />;`
- Keep existing `← Back`, title, "Coming soon" branch for other slugs unchanged.
- Update `head()` to set title/description specifically when slug is familyboard. Since `head()` in this route is static, switch to a dynamic head by using `head: ({ params }) => ({...})` with a familyboard-specific title and description; fall back to generic for others.

**No DB / migration / styles.css changes** — all styling is inline / scoped to the component to keep the change contained.

### SVGs
All three SVGs are pasted verbatim from the request, wrapped with `width="100%" height="auto"` and `style={{ display: 'block' }}` so they scale down on mobile (viewBox preserves aspect ratio).

### Mobile
- Container already uses `padding: "2.5rem 2rem 4rem"` matching site rules.
- SVGs are responsive (viewBox + 100% width).
- Header link row uses `flex-wrap: wrap` so the two links wrap on narrow screens.
- Collapsible items full width.

### Out of scope
- No admin UI for editing this page.
- No content for the other 3 projects — they keep showing "Coming soon."
- No new DB columns; this content is intentionally hard-coded in the React component (per the user's spec, which is highly specific to FamilyBoard).
