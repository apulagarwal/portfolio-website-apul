## Build /projects/quiver detail page

Mirror the FamilyBoard implementation pattern: create a dedicated component and branch on slug in the route file.

### File changes

**New: `src/components/projects/Quiver.tsx`**
- Container: `max-width: 740px`, centered, padding `2.5rem 2rem 4rem` (matches FamilyBoard).
- Header block:
  - `← Back` link to `/` (0.875rem, #555555, underline on hover).
  - `<h1>` "Quiver — Automated Job Search Pipeline" (Georgia, 2rem, #111, 700). *(Title contains an em-dash but is provided verbatim — keep as-is. No-em-dash rule applies only to prose I write.)*
  - Outcome line (0.9rem italic #555555) with the three-sentence outcome.
  - One link: "↗ Build story on LinkedIn" → LinkedIn activity URL (new tab, 0.875rem #555, underline on hover).
  - `<hr>` 1px solid `#4b2e83`.
- Reuse `SectionLabel` for each section label.
- Section 1 (THE PROBLEM): prose paragraph.
- Stats SVG inline (740×100, responsive via `width="100%" height="auto"`).
- Section 2 (WHAT I BUILT): prose paragraph + architecture SVG (740×280, responsive).
- Section 3 (KEY ENGINEERING DECISIONS): three collapsible items using local React state.
  - Full-width `<button>`, transparent bg, thin bottom rule `#e5e2dc`, `+` / `−` indicator right-aligned via flex.
  - No animation; content mounts/unmounts.
  - Titles: "Phase separation by dependency risk", "Visible Chrome for Jobscan", "React textarea injection".
- "What I learned" SVG inline (740×260, responsive).
- Section 4 (WHAT I LEARNED): prose paragraph (three-things narrative).
- Footer:
  - Tools line (0.85rem #888888): full tool list.
  - 1px `#e5e2dc` rule.
  - One link: "↗ Build story on LinkedIn" (same style as header).

Spacing: 4rem between major sections, 3rem after header `<hr>` before first section label — matches FamilyBoard rhythm. All styling scoped to the component (inline styles + a small scoped `<style>` block for hover states), consistent with the FamilyBoard approach.

All three SVGs pasted verbatim, wrapped with `width="100%" height="auto"` and `style={{ display: 'block' }}` so they scale responsively via viewBox.

**Edit: `src/routes/projects.$slug.tsx`**
- Add import for `Quiver` component.
- Inside `ProjectDetail`, after the existing familyboard branch, add `if (slug === "quiver") return <Quiver />;`.
- Extend `head()` to return quiver-specific title/description when `params.slug === "quiver"`. Suggested:
  - title: "Quiver — Automated Job Search Pipeline · Apul Agarwal"
  - description: "103 TPM/PM jobs scraped in 4.1 minutes on first run. Runs every morning at 7am."
- Keep existing familyboard branch and generic "Coming soon" fallback unchanged.

### Out of scope
- No DB/migration changes — content is hard-coded in the component (matches FamilyBoard approach for content highly specific to one project).
- No styles.css changes.
- No admin UI.
- Other two projects continue to show "Coming soon."

### Mobile
- Container padding already site-standard.
- SVGs responsive via viewBox + 100% width.
- Header/footer link rows use `flex-wrap: wrap` so they wrap on narrow screens.
- Collapsible items full width.
