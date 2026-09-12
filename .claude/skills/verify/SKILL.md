---
name: verify
description: Run the portfolio locally and check a visual change at real widths before showing it to Holly. Use whenever a change touches templates, styles, tokens, or layout, and whenever asked to run, serve, preview, or screenshot the site. Triggers on "run the site", "does this look right", "check mobile", "preview", "screenshot".
---

# Verify a portfolio change

Never hand Holly a visual deliverable unseen, and never ask her to check it herself.

## Start it

`preview_start` with `{name: "portfolio"}` (port 4200). Use `cultivate` for that app.
Never run `ng serve` through Bash.

## The viewport trap, read this first

The Browser pane reports `window.innerWidth === 0` until `resize_window` sets a real
size. Until then every breakpoint collapses and the layout you see is a lie. Screenshots
have also come back blank on this machine, and headless Chrome under ~500px crops instead
of reflowing.

So: **set a viewport before looking at anything, and measure the DOM rather than trusting
the picture.**

## The loop

1. `resize_window` to desktop, then `read_page` for structure and `javascript_tool` for
   computed styles and real element widths.
2. `resize_window` to mobile (375px), reload, measure again. Both widths, every time.
3. `read_console_messages` and `preview_logs` for errors.
4. Fix in the source files, never in the browser, then re-measure.

## Before saying it works

- Measured at both widths, not eyeballed
- No horizontal overflow: compare `scrollWidth` to `clientWidth` on `body`
- Console clean
- `npm run test:unit` if logic changed

Then screenshot as evidence, and say what you measured rather than "looks good".

## Do not

- Push, open a PR, or deploy. A push here publishes the live site.
- Create a branch. Work on whatever is checked out.
- Introduce gradients, glass effects, or decorative animation.
- Add a token or component when one already exists in `src/styles.css`.
