# Three Visual Edits — No Other Changes

## Change 1 — Hero badge pill
In `src/routes/index.tsx`, inside the Hero component, add a new `<span>` element between the subhead `<p>` and the inline links `<p>`. The element is exactly the UW Foster MBA '26 badge pill provided by the user, with inline styles.

## Change 2 — Purple left border on UW Foster education block
In `src/routes/index.tsx`, inside the Education component, wrap only the first `<article>` (UW Foster entry) in a `<div>` with:
- `border-left: 3px solid #4b2e83`
- `padding-left: 1rem`
- `margin-bottom: 1.5rem`

The second `<article>` (HNB Garhwal) remains unwrapped and untouched.

## Change 3 — UW Foster name in purple
In `src/routes/index.tsx`:
- In the About section, find the text "UW Foster School of Business" (line ~186) and wrap it in a `<span>` with `font-weight: 600` and `color: #4b2e83`.
- In the Education section, the "UW Foster School of Business" text (line ~308) is already styled with `font-weight: 600` and `color: var(--purple)` (#4b2e83), so no change is needed there.

No other CSS, layout, spacing, colors, fonts, or copy will be modified.