---
name: design-direction
description: Translate Holly's design feedback into the portfolio's actual tokens, type scale, and layout idioms. Use whenever she gives visual direction ("too heavy", "tighten that", "too loud", "needs hierarchy", "feels generic") or asks for any visual change to the portfolio. Triggers on design feedback, styling changes, spacing, color, type, and layout work in projects/portfolio.
---

# Executing Holly's design direction

She is a senior design systems designer. Feedback is precise and means a specific move,
not a general nudge. Resolve it to the values below rather than improvising.

## What the words mean

| She says | Do this | Not this |
|---|---|---|
| "Too heavy" | Drop weight (`font-bold` to `font-medium`) or one size step | Lighten the color |
| "Tighten that" | Close the gap one step (`gap-4` to `gap-3`, `gap-3` to `gap-2`) | Shrink padding or type |
| "Too loud" | Move orange to deep rust `#7A2C10`, or demote it to a border | Reduce opacity |
| "Needs hierarchy" | Add a mono uppercase label above it | Enlarge the heading |
| "Feels generic" | Reach for a house idiom below: numbered section, figure header, status chip |  Add decoration |
| "Too tight" | Open vertical rhythm (`py-3` to `py-4`), not letter-spacing | Add a divider |
| "Busy" | Remove a border or drop to `border-border/50` | Add whitespace everywhere |

## The real values, counted from the codebase

Most-used idioms, in order: `text-muted-foreground`, `text-xs`, `border-border`,
`uppercase`, `tracking-wider`, `text-[#7A2C10]`, `font-bold`, `gap-3`, `bg-card`.

- **Mono label**: `font-mono text-xs uppercase tracking-wider`. Micro variant `text-[10px]`
  or `text-[9px]`. This is the single most characteristic element on the site.
- **Headings**: `tracking-tight`. Never `tracking-wider` on a heading, that is for labels.
- **Spacing**: gaps are `gap-2 / gap-3 / gap-4`, padding `px-4 / px-6` and `py-3`. Move one
  step at a time.
- **Surfaces**: `bg-background`, `bg-card`, `border-border`, softened to `border-border/50`.
- **Orange**: `#B04318` primary, `#D06A3D` lighter accent and chip fills, `#7A2C10` deep
  rust for text. Rust is used most, so default there for type and keep `#B04318` structural.

## Palette reality, do not "fix" this by accident

The documented warm dark (`#171513`, `#F7F6F4`, the oranges) lives as **hardcoded hex in
component templates**, not as tokens. The `:root` custom properties in `styles.css` are a
light shadcn set left over from the Figma Make port, and the `.dark` block is stock shadcn
grey that is **never applied** (no `.dark` class anywhere).

So: `--primary` and `--accent` genuinely are `#B04318`, but most brand color is literal hex.
Match the surrounding file. Do not convert hex to tokens, or tokens to hex, as a drive-by.
If tokenizing the palette is worth doing, it is its own task and Holly's call.

## Hard rules

- No gradients, no glass effects, no decorative animation.
- Reuse an existing token, component, or class idiom before adding anything new.
- Preserve the established direction. Do not generically "improve" it.
- Verify at desktop and mobile before reporting. Use the `verify` skill.
