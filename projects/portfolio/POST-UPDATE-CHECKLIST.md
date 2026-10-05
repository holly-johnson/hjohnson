# Post-Update Checklist

Visual follow-ups to come back for once the current update ships. Created 2026-10-04.

## Orbit

- [ ] Replace or supplement the Orbit image with a view showing the organized feature context and the live prototype together.
  - Homepage card: `public/assets/work/home/orbit-card.webp` and `orbit-card-dark.webp` (`src/app/components/home/home.ts`).
  - Case study figures are markup, not images (`src/app/components/work/orbit-case-study.html`). The closest existing figure is the mission view at line 116.
  - The figure caption says no Orbit screenshots left Penlink. A new view is a redraw, and the caption has to stay honest about that.
  - Show what is confirmed: a mission holding the feature's whole context, and a prototype built from published Helios components behind a live link.
  - Keep Orbit separate from Helios. Helios appears as the source library, never as the subject.

## Investigative Workflow

- [ ] Strengthen the Investigative Workflow image with a clearly simplified artifact. Pick one focus: cross-product overlap, gaps or the PLX and Tangles integration direction.
  - Homepage card: `public/assets/work/home/workflow-card.webp` (`src/app/components/home/home.ts`).
  - Case study figure: Fig 1 in `src/app/components/work/analysis-workflow-case-study.html` (line 181). The new artifact could sit beside it in Defining Product Direction.
  - Label it as simplified so it reads as a model, not a product screen.
  - The research was team research. Credit it to the team, never as research she ran or led.
  - The Tangles web direction is hers. Integration direction beyond that needs confirming before it is drawn.
  - No customer names. Disney and LPD never appear.

## Before shipping either one

- [ ] Light and dark versions match (Orbit already has both).
- [ ] Verify desktop and mobile by measuring the DOM, not by screenshot.
- [ ] Alt text and captions follow the voice rules: no em dashes, no serial comma, one idea per sentence.
- [ ] If a homepage card changes, bump the social card `?v=` key when the OG image changes too.
