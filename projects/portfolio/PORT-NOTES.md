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
- DONE — Resume page (`Resume.tsx`), real NotFound, shared `app-icon` (inline lucide)
- DONE — Penlink case study (`PenLinkCaseStudy.tsx`) with 16 real screenshots +
  pure-markup token-architecture diagram
- DONE — Remaining 3 case studies ported from the Make file:
  - `ai-design-case-study` ← `AIDesignCaseStudy.tsx` (no images; two pure-markup
    diagrams: Translation Pipeline + Process Comparison)
  - `analysis-workflow-case-study` ← `AnalysisWorkflowCaseStudy.tsx` (source uses
    "screen 01/02" placeholder figure boxes — reproduced as-is)
  - `nucleus-case-study` ← `NUcleusCaseStudy.tsx` (14 real screenshots copied into
    `public/assets/work/nucleus-*.png`). NOTE: the source's 8 "Fig 2 System Scale"
    image fills are broken in the Make file itself (they render as broken images in
    Figma's own preview and are absent from every project export), so that figure is
    rendered as labeled institution tiles instead of images.
  - Content was extracted from the Make file's Code view (CodeMirror doc), not the
    cross-origin live preview; images came from the project "Download code" export.
  - Contact ← `Contact.tsx` — SKIPPED (orphaned in source: no route, placeholder data)

## Image pipeline (case studies)
Make images live at `file://figma/make/image/<fileKey>/<hash>.png`. Reading each via the
figma MCP resource saves the binary to disk (no base64 in context); copy into
`projects/portfolio/public/assets/work/` and reference as `assets/work/<name>.png`
(resolves via `<base href="/">`). NOTE: the dev server only scans `public/` at startup —
restart `ng serve` after adding new static files.

## Preview pane caveat
The in-app Browser pane renders this app with `window.innerWidth === 0`, which
collapses responsive breakpoints (grid cols → 0px, page height balloons) and blanks
scrolled screenshots. Not a code issue — build is clean, DOM/tokens verified. Real
visual sign-off must happen in a normal browser at a real width.

## Verify
`npx ng serve portfolio --port 4200` → http://localhost:4200. Hero + nav confirmed
pixel-faithful; lower sections DOM-verified (token colors correct). No console errors.
