---
name: handoff
description: Apply a design handoff bundle to the portfolio without missing changes. Use whenever Holly points at a design_handoff folder, a .dc.html prototype, or a design bundle and asks to apply, port, update, or "make these updates". Triggers on handoff folders, .dc.html files, design bundles, and any "did you get all the changes" follow-up.
---

# Applying a design handoff bundle

## The prototypes are the spec. The README is not.

A bundle ships `*.dc.html` prototypes plus a `README.md`. **The README is a partial
summary written by hand, and it omits things.** A real example: bundle 4 restyled the
entire home hero — a new mono eyebrow, section padding 80/96 to 126/150, stack gap 28
to 12, a repositioned availability link — and the README documented **none** of it. The
bundle's own README even says so: where the files and the prose disagree, the file wins.

Read the README for intent and for anything not visible in a prototype (routing,
publication gates, asset deletions). Take every visual and copy decision from the
prototype.

## Never diff READMEs to decide what is new

When a bundle supersedes an earlier one (`... 3` then `... 4`), the tempting shortcut is
to diff the two READMEs and apply only what appears. That shortcut is what caused the
miss above. Diff the **prototypes**.

## The procedure

Run both directions. Neither alone is sufficient: step 1 misses anything an *earlier*
bundle introduced that was never applied, and step 2 misses pure layout changes.

### 1. Bundle vs bundle — what the new bundle changed

```bash
python3 .claude/skills/handoff/extract.py "<bundle v3>" /tmp/hv3
python3 .claude/skills/handoff/extract.py "<bundle v4>" /tmp/hv4
diff -rq /tmp/hv3 /tmp/hv4          # which prototypes moved, and what is new
diff /tmp/hv3/home.txt /tmp/hv4/home.txt        # copy changes
diff /tmp/hv3/home.tags.html /tmp/hv4/home.tags.html   # structure and style changes
```

`extract.py` writes, per prototype, a `.txt` of visible text and a `.tags.html` of markup
at one tag per line. Both are diffable; the raw prototypes are not.

### 2. Prototype vs the running app — what is still not applied

Start the app (`verify` skill), then pull each route's rendered text and compare it with
the matching `.txt`. Lines present in the prototype and absent from the app are
candidates. Expect false positives where a sentence is split by an inline `<a>`; confirm
each candidate with a `grep` against the repo before believing it.

`extract.py` already maps prototype names to routes: Home→`/`, About→`/about`,
Resume→`/resume`, Helios→`/work/helios`, InvestigativeWorkflow→`/work/analysis-workflow`,
NUcleus→`/work/nucleus`, Orbit→`/work/orbit`, Theorem→`/work/theorem`,
NebraskaEdu→`/work/nebraska-edu`.

### 3. Structure, not just copy

A text diff cannot see padding, gap, order, or flex direction. For every prototype the
diff in step 1 flagged, read its `.tags.html` hero and section wrappers directly and
compare the actual numbers against the repo template.

## The prototypes contradict each other. Date them.

A bundle accumulates: `Helios.dc.html` was drawn for v1, `Theorem.dc.html` for v4. The
older files **predate the type step-up**, so the repo is deliberately ahead of them and
their smaller sizes are not misses. Work out which prototypes are current (the ones the
bundle-vs-bundle diff shows as new or changed) and take the scale from those only.

Where two current prototypes still disagree, do not guess and do not split the
difference. Apply the majority, raise the contradiction with Holly, and record her ruling
here. Resolved as of bundle 4:

| Element | Newer files | Older files | Repo |
|---|---|---|---|
| nav wordmark | 18px (Theorem, NebraskaEdu) | 19px (Home, Helios, Orbit) | 18px, Holly's call |
| prev/next name | 22px | 24px | 22px |
| prev/next label | 13px | 12px | 13px |
| page eyebrow, figcaption | 13px | 12px | 13px |
| rail term, stat caption | 12px | 11px | 12px rail, 11px stat caption |

The nav wordmark is shared chrome, so it could not be both. Holly chose 18. It has its own
`--text-wordmark` token rather than borrowing `text-base`, so a future body step does not
drag the wordmark with it.

The stat caption under a hero number stayed 11px because both prototypes that have one
say 11, and 12 overflows its grid column.

## A size step can break layout. Re-measure, do not assume.

Stepping mono up one notch broke four things that no text diff would catch: a token name
wrapped mid-word in the Helios diagram, two figure headers overflowed at 375px, and a
NUcleus grid cell clipped its label. After any scale change, check `scrollWidth` against
`clientWidth` on every page at both widths and fix what the step broke.

## Measure computed values, never class names

`@theme` in `styles.css` **redefines Tailwind's default scale** — `text-sm` is 16px here,
not 14; `text-base` is 18, not 16; `text-xl` is 24. Reading a class name and assuming the
Tailwind default produces confident, wrong conclusions in both directions. Check
`getComputedStyle` in the browser before reporting that something is or is not applied.

Same trap in reverse: an inline `text-[Npx]` bypasses the scale entirely. See the
`design-direction` skill for the full scale and the rule against arbitrary sizes.

## Check every spelling before calling a change applied

A change meant to apply everywhere has to be grepped for in every form it takes. A past
pass stepped the type scale by replacing `text-[Npx]` only, so every named utility was
skipped and half the site did not move, and it was reported as done.

## The design is the source of truth, the repo is not

Everything in the bundle lands in the repo. The only thing that does not is what must
stay unpublished (see below). Do not treat a difference as "the repo's existing choice"
and leave it: if the prototype says something else, the prototype wins.

Copy comes across as written, with one exception: **fix obvious errors rather than
shipping them.** A prototype is a design artifact, not a proofread document. Bundle 4's
home eyebrow read "Well, Holly. I'm Holly.", plainly a slip for "Well, hello. I'm
Holly." — correct it and say in the summary what you changed and why.

That licence covers typos, broken punctuation, and wrong labels. It does **not** cover
facts. Never invent or adjust a metric, date, client, outcome, or project detail; those
carry NDA and credibility risk. If a number in a prototype looks wrong, raise it.

## What does not come across: the publication gate

Unpublished routes live in `unpublished.routes.ts` and their Selected Work entries in
`unpublished.content.ts`, both swapped for empty modules in the production build. A
prototype existing in the bundle is **not** permission to publish its route.

Anything held back must also be hidden from whatever links to it, or production ships a
dead link. Confirm with a production build: an unpublished route emits no chunk.

## Before reporting

- Both diff directions run, and every candidate confirmed or dismissed by grep
- Structure checked against `.tags.html` for each changed prototype, not just copy
- Computed sizes measured in the browser at desktop and mobile
- Production build run: unpublished routes must emit no chunk
- Nothing pushed, no branch created, no deploy. A push publishes the live site.
