In `src/components/projects/ThisSite.tsx`, make two changes:

1. **Insert a new section** after the `What I built` / architecture diagram block and before the `Key design decisions` collapsibles:
   - Section label: `WHY PHASES` (using `<SectionLabel>`)
   - Prose paragraph with the exact text provided about Lovable credits, phase gates, and game-engine instinct
   - The exact SVG diagram provided (phased build: Spec First → Static Site → Supabase Backend → Admin Panel + Deploy), embedded as an inline `<svg>` with `viewBox="0 0 740 320"`, `width="100%"`, `height="auto"`, using the same inline style pattern as existing SVGs on the page

2. **Rename the existing section label** from `Key design decisions` to `Key Engineering Decisions` to match the user's original brief and the stated final section order.

No other files change. The new section uses the same styling tokens as the rest of the page (prose style, `sectionStyle` margin, SVG block display).