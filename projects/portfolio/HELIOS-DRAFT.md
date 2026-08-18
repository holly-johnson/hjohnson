# Helios — Case Study Content Draft (prose)

**Status:** BUILT. Live at `src/app/components/work/helios-case-study.{ts,html}`, routed at
`/work/helios` (replaced the interim Penlink render; `/work/penlink` still redirects here).
Compiles clean, renders with all 8 sections + 16 images, no runtime errors. Publishing is
still gated on the verification checklist below (metrics, screenshot scrub, separation
agreement, timeline dates, MCP slot). Follows the approved structure in `HELIOS-OUTLINE.md`
(8 sections, AI work as scoped §07).
**Sources merged:** `work/penlink` (Penlink Design System — spine) + `work/ai-design`
("UX Doesn't Stop at Design" — §07). Enriched with the 2026-08-13 Helios debrief.

**Legend for editorial notes**
- `‹REUSE›` — lifted ~verbatim from an existing live case study (low risk).
- `‹NEW›` — new connective prose written for the merge.
- `⚑ HOLLY` — needs your input/confirmation before publish.
- `⚑ VERIFY` — factual/metric/confidentiality check before publish.

---

## 00 — Hero / Positioning ‹NEW›

**Eyebrow:** `// System Architecture · Product Platform`

**Title:** Helios

**Subtitle (proposed):**
> A shared product foundation for a suite of investigative tools — connecting design
> architecture, a layered token system, reusable Angular components, accessibility,
> and an emerging design-to-code workflow, built to scale across products without
> stopping development to rebuild.

**Alternate, shorter subtitle:**
> The design system and product foundation I built and evolved at Penlink — from a
> shared component library into infrastructure that reaches from design tokens all the
> way into production code.

**Meta card**
| Field | Value |
|---|---|
| Role | **Senior UX Designer** |
| Timeline | 2023 – 2025 ⚑ VERIFY exact span/end |
| Disciplines | Design Systems · Product UX · Design/Engineering · Accessibility |
| Technologies | Figma · Design Tokens · Angular · Claude / MCP |

**Status chip:** `status: deployed` (the system spine shipped; §07 is internally
labeled *experimental*).

> ✔ DECIDED — Role = **Senior UX Designer** (your real title; scope is carried by the
> body copy, not inflated in the label). Note: this differs from the *current live Penlink
> case study, which says "Lead UX Designer"* — when we build, that page's title should be
> reconciled to match, or it will contradict this one.

---

## 01 — Why the system was needed ‹REUSE + light stitch›

*(from Penlink §01 Challenge, enriched with debrief §2/§4)*

When I joined Penlink, the product ecosystem had evolved as a collection of independent
investigative tools — PLX Desktop, GeoTime Enterprise, Tangles, PLX Web, PenLink 360 — with
inconsistent UI patterns and interaction models. The company had also grown through
acquisition, bringing previously separate products and teams under one roof — each with its
own UI conventions, engineering history, and product-specific solutions.

Analysts regularly moved between products to complete investigations. The lack of
consistency increased cognitive load and made workflows harder to learn. Every team was, in
effect, re-solving the same interface problems independently.

At the same time, four designers were supporting over 150 engineers across distributed teams
in a highly competitive environment where development couldn't slow down. A four-person
design group could not hold the line on consistency by manually reviewing every screen.

The challenge was to unify the platform under a shared system **without stopping development
to rebuild each product from scratch** — which meant the system had to *encode* design
decisions into infrastructure that could scale beyond the designers themselves.

**Fig 1. UI Component Audit** — keep the 9 legacy button screenshots (`btn-*.png`) and
existing caption. ‹REUSE›

> ✔ DECIDED — OK to state the internal figures (150+ engineers, 3 products) and to name
> the specific products publicly. Both are now in the prose above.
> ⚑ VERIFY still — these choices raise the confidentiality bar; they're gated behind the
> separation-agreement check (§08) and the screenshot scrub (§04) before anything publishes.

---

## 02 — How it evolved ‹NEW — this is the new connective beat›

*(debrief §1/§4/§5, plus Penlink §03 principles reframed)*

Helios didn't start as "Helios." It grew out of earlier design-system work rooted in the
components of a single product, and I evolved it deliberately rather than throwing that work
away:

> **PLX-specific components → a shared Penlink design system → a multi-platform system → Helios**

The key shift was conceptual. Instead of "this is the design system for *that* product," the
framing became: **these products all consume the same shared foundation.** To make that real,
I organized the system around **platform modes** — desktop, web, and (as a future direction)
mobile — rather than around individual products. Tangles, PLX Web, and future standalone
applications could adopt the same architecture while adapting to their platform, instead of
each launching an independent design-system effort.

Three principles guided the work: ‹REUSE from Penlink §03›
1. **Shared design language** — consistent interaction patterns and visual standards across products.
2. **Scalable development** — reusable components and tokens that reduce duplication and speed feature work.
3. **Future flexibility** — a foundation that supports new platforms and evolving investigative workflows.

> ⚑ HOLLY — worth a timeline visual here (a simple 4-stage evolution strip). Low effort,
> and it's the beat that makes the whole merge read as one continuous story. Want it?

---

## 03 — System foundations & token architecture ‹REUSE ~as-is›

*(Penlink §04 — platform modes + ITCSS token diagram + 200+ tokens)*

To support a growing product ecosystem, I structured the system around platform modes rather
than individual products, so multiple applications could share the same foundation.

At the core is a **layered token architecture** that separates base values, semantic meaning,
and component-level usage — so design decisions scale across themes, platforms, and future
products without breaking consistency:

> **Primitive → Semantic → Component → UI**
> (e.g. `blue.600` → `bg.selected` → `button.primary.bg.normal`)

**Fig 2. Token Architecture** — keep the existing pure-markup ITCSS diagram and caption. ‹REUSE›

**200+ tokens** supporting theming, platform modes, and consistent component behavior, across
color, spacing, typography, and elevation. Figma variables carry the same hierarchy, so the
token structure is shared between design and code rather than re-declared on each side.

> ⚑ VERIFY — "200+ tokens" (outline §3).

---

## 04 — Components & patterns ‹REUSE + strengthen›

*(Penlink §05 — 50+ components, 20+ patterns, Fig 3, Fig 4 — strengthened with debrief §10/§11)*

I developed a library of reusable components and shared patterns for the interaction models
that recur across investigative workflows — data visualization, filtering, notifications, and
geographic workflows.

- **50+ components**
- **20+ shared patterns**

**Fig 3. Form Inputs** (`input-utilities.png`) and **Fig 4. Shared Patterns** (timebar,
filter panel, category-intensity, table, toast, map) — keep as-is. ‹REUSE›
> ⚑ VERIFY — Fig 4 includes **map** and **timebar** screenshots. HARD GATE: confirm every
> reused screenshot shows sample/synthetic data — no real locations, communications, target
> names, or case IDs (outline §5). Crop/swap to mock data where needed.

**Strengthening beat — components weren't just visual assets** ‹NEW, from debrief §10›
The system increasingly encoded *behavior and contracts*, not just appearance: shared
input-field shells, shared popup and navigation foundations, shared page headers, normalized
prop contracts, component contract guards, readiness checks, and staged, non-breaking
migrations. This is where the work crossed from design into front-end engineering.

**Accessibility as infrastructure** ‹NEW, from debrief §11›
Accessibility lived in the components themselves rather than being retrofitted screen by
screen — focus management, ARIA behavior, guaranteed IDs, live regions, modal focus trapping,
internationalization, RTL support, and CSS logical properties (built on Angular/CDK
foundations). Handling this at the shared-component level has multiplicative impact: fixing a
foundation improves every product that consumes it.

> ⚑ HOLLY — the accessibility + "behavioral contracts" material is some of the strongest
> evidence you crossed design↔engineering, and it's *not* in the current live case study.
> Confirm you're comfortable stating this list as delivered work (vs. in-progress).

---

## 05 — Governance & adoption ‹NEW — mostly new writing›

*(debrief §7 adoption model, §19 Orbit, §20 governance, §23 measuring adoption)*

A design system only matters if products actually adopt it — and large enterprise products
can't stop and rebuild. So Helios was built for **incremental adoption**:

> **Helios shared package (npm) → product-controlled UI wrapper layer → product application → feature screens**

The wrapper layer lets each product map its own APIs, absorb breaking changes, and migrate
gradually — so a Helios upgrade never forces an immediate rewrite everywhere. The same
architecture supports standalone applications, not just the existing products. **Three
products were adopting the system.**

Around adoption I ran the governance that keeps a shared system trustworthy: **auditing**
components for consistency, **versioning** releases with safeguards against breaking API
changes, and a **contribution, review, and documentation model** so other people could add to
the system without eroding it.

To operate Helios as infrastructure — not just ship components — I built **Orbit**, a set of
operational tooling around the system: a component-lifecycle/readiness view, a
cross-repository scanner that surfaces existing UI that could migrate onto Helios, and a
publish pipeline that guards releases against breaking changes.

The next maturity goal was to **measure real migration** — tracking adoption inside one or two
consuming applications — rather than counting components. A system succeeds because products
use it and development improves, not because the library is large.

> ✔ DECIDED — All four were real/shipped, so they're stated as delivered work, and Orbit is
> named. I've deliberately calibrated the wording (e.g. "auditing components," "a publish
> pipeline") to describe concrete practices rather than a fully mature governance *program* —
> that keeps every claim defensible if a former colleague reads it. Adoption-measurement stays
> framed as the next-stage goal (you didn't mark it as shipped).
> ⚑ NOTE — Orbit is the single strongest claim here (a live tool > a concept). If any Orbit
> piece was more prototype than production, tell me and I'll soften just that one.

---

## 06 — Design → engineering collaboration ‹MERGE Penlink §06 + AI §04›

*(the bridge beat that sets up §07 — debrief §13/§27)*

For the system to hold, design decisions had to translate cleanly into code — so I worked
directly with engineering to align system structure with implementation. In practice I
increasingly occupied the space *between* design and front-end engineering: not just handing
off screens, but shaping the components those teams would consume.

That vantage point exposed the next bottleneck. The traditional workflow carries an enormous
amount of translation — a designer defines an interface, an engineer interprets and rebuilds
it, design reviews, differences surface, engineering revises. But if Helios *already* defined
the components, tokens, states, and contracts, why were people re-translating those same
decisions by hand?

A recurring lesson sits underneath this: a design system can't sustainably live entirely
inside UX. It depends on real partnership across design, front-end engineering, and product
teams — implementation, testing, versioning, releases, framework compatibility, migration,
and accessibility. That question — *can the system reduce the translation itself?* — is what
led to the exploration in the next section.

---

## 07 — Exploratory design-to-code work (AI / MCP) ‹REUSE AI §03–05, keep experimental›

*(AI case study Approach + Bridge + Key Insights; MCP named per decision; debrief §14–16)*

**Framing (keep explicit):** this is an *experimental proof of concept* — not a fully
autonomous, productionized, org-wide pipeline, and not "AI replacing engineers." Its point is
narrower and more interesting: **structured system architecture is what made machine-assisted
translation viable.**

I explored structuring the design system as a **source of structured data** — organizing
components, states, and tokens to reflect how they're built and consumed in code, not just how
they're presented in design — so that implementation tooling could consume the system more
directly.

**Fig. 01 — Translation Pipeline** ‹REUSE›
> Figma Component → Token Consumption → State Resolution → Structured Data → Angular Component

**Fig. 02 — Process Comparison** ‹REUSE›
> Traditional (6 steps, sequential): Design in Figma → Handoff → Implementation → UX Review → Iterate → Feature ready
> AI-assisted (3 steps, continuous): Design in Figma → Iterate through Claude → Feature ready

**Why it worked — structure, not magic** (Key Insights) ‹REUSE›
- **Structured systems enable automation.** Translation was most reliable when the system was
  well structured: clear naming, defined states, consistent token usage. Simpler component
  architecture produced cleaner, more maintainable output. When the system instead has
  arbitrary layers and unrelated components, tooling has to guess.
- **Speed changes the feedback loop.** The main value was iteration speed — generate, test,
  refine in rapid succession, compressing the loop between design and implementation.
- **Alignment comes from execution.** Generating components directly in code surfaced edge
  cases earlier and kept the design system and production UI aligned.

> ✔ DECIDED — Keep §07 conceptual for now, fill in specifics later. The section is written at
> an honest conceptual level (Claude/MCP named, the pipeline and insights intact) with a slot
> held open below. Before publish, drop in: which MCP servers/tools you used, what they read
> from Figma (variables? component props? states?), and how output reached Angular.
>
> `[ SLOT — MCP mechanics: servers/tools · what they read from Figma · how output reached Angular ]`

---

## 08 — Outcomes, constraints, lessons, next steps ‹MERGE + moderate new›

*(AI §05/§06 + debrief §17/§20/§21/§23)*

**Outcomes** ‹REUSE Penlink §02 framing›
The system established a shared foundation across the platform — teams could solve an
interaction problem once and reuse it across products, which let a small design group support
a fast-growing ecosystem without recreating common UI. It reduced duplication, improved
consistency, and kept teams shipping.

**What it reinforced** ‹REUSE AI §06 reflection›
> Front-end implementation is part of the user experience — not a separate phase.

When system architecture, design, and development are aligned, teams move faster and with more
clarity. The strongest version of this story isn't "I built a design system" — it's that I
designed *and helped engineer* a shared product foundation that reached from design
architecture into production code.

**Constraints & open problems (honest, not-yet-resolved)** ‹NEW, from debrief §17/§21›
- **Source of truth was unresolved.** Figma vs. code vs. tokens as the canonical source, and
  how Figma components map reliably to coded components (e.g. Code Connect), was an open
  architectural question — one I understood as a governance problem, not just a tooling gap.
- **Single-person dependency.** Too much of the system's knowledge and ownership sat with me
  — spanning design, component engineering, accessibility, publishing, documentation, and
  adoption. I flagged this as a real risk to the company and was actively trying to solve it.

**Next steps (planned/intended — not executed before I left)** ‹NEW, from debrief §20/§22/§23›
- Establish clearer contribution, ownership, and documentation models so the system isn't
  bottlenecked on one person.
- Build the engineering partnership the system needs — shared release responsibility,
  implementation/testing support, and mentoring another engineer into the system.
- Resolve the Figma ↔ code source-of-truth model.
- Measure real adoption/migration inside one or two consuming products.

> ✔ DECIDED — You're comfortable naming the single-person dependency candidly, so it stays
> (drafted as the constructive version — "the system needed partnership and governance, here's
> what I'd build next," not a grievance). The debrief's sharper organizational material
> (meeting exclusion, authority mismatch, layoff framing) is intentionally kept *out* of the
> public copy.
> ⚑ HARD GATE (unchanged) — before this goes public, check the separation agreement for any
> confidentiality / non-disparagement clause touching proprietary work product. This gate
> matters more now that you're naming Penlink, the specific products, the figures, and Orbit.

---

## Decisions — RESOLVED (2026-08-13)
- ✔ Role = **Senior UX Designer** (§00) — reconcile the live Penlink page to match at build time.
- ✔ Governance §05 — all four items (package+wrapper, auditing & versioning, contribution/
  review + docs, Orbit) stated as real/shipped, with calibrated wording. Orbit named.
- ✔ MCP §07 — kept conceptual now; specifics slot held open.
- ✔ Naming — OK to state the internal figures, name the specific products, name Orbit, and
  name the single-person dependency candidly.

## Pre-publish checklist (still open — gates before anything goes live)
- [ ] ⚑ VERIFY metrics: 200+ tokens · 50+ components · 20+ patterns · 4 designers · 150+ engineers · 3 products
- [ ] ⚑ Screenshot scrub (HARD GATE): all reused figures show sample/synthetic data — esp. map + timebar
- [ ] ⚑ Separation-agreement check (HARD GATE) — now higher stakes: names Penlink, products, figures, Orbit
- [ ] ⚑ Confirm exact timeline span/end date (§00)
- [ ] ⚑ Fill the MCP mechanics slot (§07) when ready
- [ ] ⚑ Sanity-check Orbit "shipped tool" claim (§05 note)

## Remaining before a final, publishable draft
The four blocking *decisions* are resolved. What's left is **verification, not authoring**:
metrics, screenshot scrub, separation-agreement check, timeline dates, and the (optional-now)
MCP specifics. None of these block writing the final prose or building the component — they
block *publishing*.

*Next build steps: finalize prose → build the Angular `helios` case-study component (reusing
the existing case-study layout + real assets) → reconcile the live Penlink page's title →
then the standalone homepage `helios-diagram` concept.*
