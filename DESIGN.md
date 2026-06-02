# Design System

The site's visual identity is intentionally restrained: editorial, calm, UW-inflected. These rules apply across every route and component. Deviations should be deliberate and rare.

## Principles

1. **Calm over clever.** Whitespace and typography do the work. No animation, no shadow drama, no dark mode toggle.
2. **Editorial hierarchy.** Serif headers establish authority. Sans body keeps reading easy.
3. **Constraint = consistency.** Every project case study uses the same container width, type scale, link style, and footer rhythm.

## Palette (UW-inspired)

| Token        | Value      | Use                                       |
|--------------|-----------|--------------------------------------------|
| Background   | `#ffffff` | Page background. Always white. Never dark. |
| Text         | `#111111` | Headings and primary text                  |
| Body         | `#333333` | Long-form prose                            |
| Muted        | `#555555` | Secondary text, links                      |
| Subtle       | `#888888` | Captions, tool lists, labels               |
| Hairline     | `#e5e2dc` | 1px rules, dividers                        |
| UW Purple    | `#4b2e83` | Section rules, primary accent              |
| UW Gold      | `#b7a57a` | Sparing accent                             |

No other accent colors. No gradients. No glassmorphism.

## Typography

- **Headers**: Georgia, serif. Weights 600/700.
- **Body & UI**: System sans (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...`).
- **Scale (project pages)**: H1 2rem · H2 0.75rem uppercase letterspaced label · body 1rem / line-height 1.75 · captions 0.85–0.9rem.
- No em-dashes anywhere in prose. Use colons or periods.

## Layout

- Site container: `max-width: 900px`, centered, `padding: 0 2rem`.
- Project detail container: `max-width: 740px`, centered, `padding: 2.5rem 2rem 4rem`.
- Section rhythm: `4rem` between major sections; `3rem` after the header `<hr>`.
- Mobile: single column. Same horizontal padding. Link rows use `flex-wrap: wrap`.

## Components

- **Links**: `0.875rem`, color `#555555`, no decoration. Underline on hover only (`0.15s` color transition allowed).
- **Section labels**: `SectionLabel` — uppercase, letterspaced, `#888888`.
- **Rules**: `1px solid #e5e2dc` for hairlines; `1px solid #4b2e83` for the header rule under the page title.
- **No cards with shadows.** Use rules and whitespace.
- **Collapsibles** (project pages): full-width button, transparent background, `+`/`−` indicator, thin bottom rule. No expand animation.
- **SVGs**: inline, responsive (`width="100%" height="auto"`, `viewBox` set, `display: block`).

## Motion

- Allowed: CSS color transitions on hover (max `0.15s`).
- Not allowed: page transitions, scroll-driven effects, fade-ins, parallax, Framer Motion entrance animations on this portfolio's own chrome.

## Accessibility

- Color contrast must pass WCAG AA (the palette above is checked).
- Every interactive element reachable by keyboard.
- `aria-expanded` on collapsibles, `aria-label` on icon-only controls.
- Respect `prefers-reduced-motion` (the site has no motion anyway).

## Authoring rules for project case studies

1. New project? Create `src/components/projects/<Name>.tsx` mirroring the FamilyBoard/Quiver structure (header block → sections → footer).
2. Branch in `src/routes/projects.$slug.tsx` with slug-specific `head()` metadata (unique `title`, `description`, `og:*`).
3. Reuse `SectionLabel`. Inline-style everything else with the tokens above.
4. Tools line in footer: `0.85rem`, `#888888`, dot-separated (` · `).
5. Two link styles only: header-style outbound links (`↗ ...`) and the back link (`← Back`).