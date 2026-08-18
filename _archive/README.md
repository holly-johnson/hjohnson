# _archive

Parked code kept for possible reuse. **Nothing here is wired into the app** —
this folder lives outside `src/`, so the Angular build never compiles it. Safe
to delete later; kept for now so nothing is lost when the portfolio direction
shifts.

Archived on 2026-08-18, after the "Rework portfolio around Helios" commit
(`c005188`) consolidated the site around the Helios case study.

## work/
- **ai-design-case-study.{ts,html}** — the standalone "UX Doesn't Stop at Design"
  case study. Its content was merged into Helios as §07; `/work/ai-design` now
  redirects to `/work/helios`.
- **penlink-case-study.{ts,html}** — the retired Penlink case study, which had
  served as the interim Helios page. Restored here from commit `c005188^` (it was
  deleted in `c005188`). `/work/penlink` now redirects to `/work/helios`.

## diagrams/
Homepage-card diagrams no longer imported by `home.ts`. The reworked homepage
is text-forward and uses no card diagrams. Kept in case they return.
- **helios-diagram.{ts,html}** — the Design → Helios → Product flow that used to
  sit in the flagship card; removed 2026-08-18 in favor of a text-forward flagship.
- **analysis-diagram.{ts,html}**
- **nucleus-diagram.{ts,html}**
- **penlink-diagram.{ts,html}**
- **ai-diagram.{ts,html}**

## Restoring something
Move the files back under `projects/portfolio/src/app/components/...`, re-add the
`import` + `imports: [...]` entry (and, for a case study, its route in
`app.routes.ts`), then rebuild.
