# Portfolio — Figma Make → Angular port

Porting the **HJohnson-Design** Figma Make site (React + Vite + Tailwind v4 +
shadcn/ui) into this Angular app with 1:1 visual fidelity.

Source Figma Make file: `fIp92WTgzbxcxRSqM9mIRU` (HJohnson-Design).

## Stack decisions
- **Tailwind v4** drives layout/spacing/color utilities, same as the source. Set up
  via `@tailwindcss/postcss` (`.postcssrc.json` at the workspace root) and
  `@import "tailwindcss"` in `src/styles.css`.
- **Tokens** ported verbatim from the Make `theme.css` into `src/styles.css`
  (`:root`, `.dark`, `@theme inline`, `@layer base`). Utilities like `bg-background`,
  `text-foreground`, `bg-primary`, `border-border` resolve from these.
- **Fonts:** Inter (body/headings) + JetBrains Mono (`font-mono`), Google Fonts.
  Note: the source `colors-typography.scss` declared Roboto, but the live theme uses
  **Inter** — Inter wins (matches what actually renders in the Make preview).
- **Icons:** inlined as SVG (the handful used: menu/close/arrow/terminal/mail/linkedin
  + the hero's figma/vscode/sync glyphs). No icon dependency added.
- **Routing:** mirrors the Make `routes.ts`. `withInMemoryScrolling` replaces the
  source's manual `scrollTo(0,0)` / `scrollIntoView('#work')`.

## Status by phase
**Phase 1 — DONE (this commit)**
- `styles.css` — Tailwind + full token theme + base typography
- `App` shell (`Navigation` + `<router-outlet>`) ← Make `Root.tsx`
- `Navigation` — fixed nav, scroll-driven dark→light flip over hero, mobile drawer,
  active-link states ← `Navigation.tsx`
- `Home` — hero (incl. the Figma/VS Code split graphic), My Approach (6 cards),
  Selected Work (4 project cards) ← `Home.tsx`
- `Stub` — placeholder for the not-yet-ported routes

**Phase 2 — IN PROGRESS**
- DONE — Home fully ported to match source:
  - Real Selected Work card body (0N index, impact with orange rule, discipline + role tags)
  - The four per-project diagrams as components under `home/diagrams/`
    (`penlink`, `nucleus`, `ai`, `analysis`) — wired via `@switch(project.id)`
  - Metrics section (15+ / 9+ / 20+ / 2) and dark CTA
- TODO:
  - Resume page ← `Resume.tsx`
  - The four case-study pages ← `components/work/*CaseStudy.tsx`
  - Contact ← `Contact.tsx`
  - Footer (the Make source has none wired into `Root`; confirm design intent)
  - Case-study screenshot assets (222 PNGs in the Make file) → `src/assets/`

## Preview pane caveat
The in-app Browser pane renders this app with `window.innerWidth === 0`, which
collapses responsive breakpoints (grid cols → 0px, page height balloons) and blanks
scrolled screenshots. Not a code issue — build is clean, DOM/tokens verified. Real
visual sign-off must happen in a normal browser at a real width.

## Verify
`npx ng serve portfolio --port 4200` → http://localhost:4200. Hero + nav confirmed
pixel-faithful; lower sections DOM-verified (token colors correct). No console errors.
