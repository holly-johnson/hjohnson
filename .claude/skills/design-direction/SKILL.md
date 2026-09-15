---
name: design-direction
description: Translate Holly's design feedback into the portfolio's actual tokens, type scale, and layout idioms. Use whenever she gives visual direction ("too heavy", "tighten that", "too loud", "needs hierarchy", "feels generic") or asks for any visual change to the portfolio. Triggers on design feedback, styling changes, spacing, color, type, and layout work in projects/portfolio.
---

# Executing Holly's design direction

She is a senior design systems designer. Feedback is precise and means a specific move,
not a general nudge. Resolve it to the values below rather than improvising.

## Read the tokens first, not this file's numbers

`projects/portfolio/src/styles.css` is the record. The `@theme` block at the top defines
the type scale, the `:root` and `.dark` blocks define color. If this file and that file
ever disagree, the stylesheet wins and this file is stale. Fix it.

## The type scale

One scale across every page. It is defined once in `@theme` and every template uses a
named step. **Never write `text-[Npx]`.** A size written inline is a size the next
step-up silently misses, which is exactly how the scale forked before.

| Step | Size | Role |
|---|---|---|
| `text-label-sm` | 11px | mono label, small: rail terms, diagram captions |
| `text-label` | 12px | mono label: section labels, kickers, figcaptions |
| `text-label-lg` | 13px | mono label, large: contents rail, mono list items |
| `text-sm` | 16px | secondary body, list items |
| `text-dense` | 17px | resume body, a denser document than an article |
| `text-base` | 18px | body |
| `text-lead` | 19px | lead paragraph under a page or section heading |
| `text-lg` | 20px | base `<h3>` fallback; prefer an explicit step |
| `text-xl` | 24px | serif sub-head H3 inside a case-study section |
| `text-hero` | 26px | hero subhead, one line under the page H1 |
| `text-2xl` | 28px | section H2 on About and Resume |
| `text-name` | 32px | home work-row title |
| `text-3xl` | 38px | section H2 in the case studies |
| `text-4xl` | 44px | home flagship name |
| `text-cta` | 48px | home contact heading |
| `text-display` | 68px | page H1 |

The named steps carry **no paired line-height** on purpose, so a step only sets
font-size and the template's own `leading-*` still governs.

Serif headings are weight 400, never bold. The increase is size only.

**A heading with no size class is a bug.** It falls through to the base `h3` rule in
`@layer base` at 20px and every step-up misses it. Give every heading an explicit step.

## Color

Green, cream, near-black. There is **no orange** in the palette. `#B04318`, `#7A2C10`,
and `#D06A3D` are pre-port leftovers: replace them with `text-primary` or
`text-muted-foreground` wherever they turn up.

Color is fully tokenized and dark mode is live. `ThemeService` toggles `.dark` on
`<html>`. Use the Tailwind token utilities (`bg-background`, `text-foreground`,
`border-border`, `text-primary`, `bg-secondary`, `text-fg-soft`), never literal hex.

- Cream `#FAF8F4` / near-black `#141412` light; `#151515` / `#F4F3F1` dark
- Green accent `#2F6B4F` light, `#4E9B72` dark
- Borders `#E0DCD4` light, `#2A2A2A` dark

**Plates.** `bg-plate` and `border-plate-line` are theme-invariant white and cream.
Every wrapper holding a product screenshot uses them, because the captures are light
and a dark panel around them looks broken. The seams between paired plate panels use
`bg-plate-line` too. Anything not holding a raster screenshot (diagrams, token cards,
figure header bars, figcaptions) uses the normal themed tokens and goes dark.

## What the words mean

| She says | Do this | Not this |
|---|---|---|
| "Too heavy" | Drop weight, or one size step | Lighten the color |
| "Tighten that" | Close the gap one step (`gap-4` to `gap-3`) | Shrink padding or type |
| "Too loud" | Demote the accent to a border, or use `text-muted-foreground` | Reduce opacity |
| "Needs hierarchy" | Add a mono uppercase label above it | Enlarge the heading |
| "Feels generic" | Reach for a house idiom: numbered section, figure header, status chip | Add decoration |
| "Too tight" | Open vertical rhythm (`py-3` to `py-4`), not letter-spacing | Add a divider |
| "Busy" | Remove a border or drop to `border-border/50` | Add whitespace everywhere |

## House idioms

- **Mono label**: `font-mono text-label uppercase tracking-[0.14em] text-muted-foreground`,
  usually over a hairline rule. The single most characteristic element on the site.
- **Numbered section**: mono number in `text-primary`, serif H2, then `h-px flex-1 bg-border`.
- **Figure**: `border border-border`, a mono header bar with a label left and a status
  right in `text-primary`, the plate, then a mono `figcaption`.
- **Metadata rail**: `border-l border-border pl-7`, a `<dl>` of mono `<dt>` over
  `text-sm` `<dd>`. The Outcome pair goes last and its value is `text-primary`.
- Headings take `tracking-tight`. `tracking-wider` is for labels only.
- Spacing steps are `gap-2 / gap-3 / gap-4`, padding `px-4 / px-6` and `py-3`. Move one
  step at a time. Radius: none, every surface is square.

## Hard rules

- No gradients, no glass effects, no decorative animation.
- No `text-[Npx]`, no literal hex. Add a named token if a value is genuinely missing.
- Reuse an existing token, component, or class idiom before adding anything new.
- Preserve the established direction. Do not generically "improve" it.
- When a change is meant to apply everywhere, grep for every spelling of the thing
  before reporting. The last type step-up replaced only `text-[Npx]` and missed every
  named utility, so half the site did not move.
- Measure computed values, never class names. `@theme` redefines Tailwind's scale
  (`text-sm` is 16 here, not 14), so reading a class name and assuming the default is
  how sessions reach confident wrong conclusions in both directions.
- Applying a design handoff bundle is its own job: use the `handoff` skill. Short
  version, because it is the mistake that keeps happening: the `.dc.html` prototypes
  are the spec, the README is a partial summary, and you diff the prototypes.
- Verify at desktop and mobile before reporting. Use the `verify` skill.
