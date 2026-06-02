## Build `/projects/resume-tailoring` detail page

Same pattern as the existing FamilyBoard and Quiver case study pages.

### Files

1. **Create `src/components/projects/ResumeTailoring.tsx`**
   - 740px centered container, white bg, Georgia headers, system sans body — matches DESIGN.md
   - Header: `← Back` link to `/`, title "AI Resume Tailoring System", italic outcome line, single LinkedIn link, `#4b2e83` 1px rule
   - Section 1 "THE PROBLEM" + prose
   - Stats Strip inline SVG (40+ / ~25m / 3 / 2hr→25m)
   - Section 2 "WHAT I BUILT" + prose + Persistent Context Architecture SVG
   - Section 3 "KEY ENGINEERING DECISIONS" — 3 collapsible items (default collapsed), local `useState` Collapsible component (same as Quiver)
   - "What changed when I built a system" comparison SVG
   - Section 4 "WHAT I LEARNED" + prose
   - Footer: Tools line, 1px `#e5e2dc` rule, LinkedIn link
   - All inline styles + scoped `<style>` block for hover transitions (0.15s color only)
   - No em-dashes, no dark bg, no shadows, no animations beyond hover

2. **Update `src/routes/projects.$slug.tsx`**
   - Add `if (slug === "resume-tailoring") return <ResumeTailoring />;` branch
   - Extend `head()` with slug-specific title + description for `resume-tailoring`

### Notes
- LinkedIn URL: `https://www.linkedin.com/feed/update/urn:li:activity:7454061504393293824/`, `target="_blank"`, `rel="noopener noreferrer"`
- SVGs pasted verbatim from the brief, wrapped responsively (`width: 100%; height: auto`)
- Reuse the same Collapsible pattern already in `Quiver.tsx` for consistency
