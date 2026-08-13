# Helios — Case Study Content Draft (prose, pre-build)

**Status:** Content draft for review. No app code changed. Follows the approved
structure in `HELIOS-OUTLINE.md` (8 sections, AI work as scoped §07).
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
| Role | ⚑ HOLLY — see note below |
| Timeline | 2023 – 2025 ⚑ VERIFY exact span/end |
| Disciplines | Design Systems · Product UX · Design/Engineering · Accessibility |
| Technologies | Figma · Design Tokens · Angular · Claude / MCP |

**Status chip:** `status: deployed` (the system spine shipped; §07 is internally
labeled *experimental*).

> ⚑ HOLLY — **Role/title.** The debrief is explicit that "Senior UX Designer" doesn't
> capture the scope (you crossed into component engineering, accessibility ownership,
> publishing, adoption). But the *live Penlink case study currently says "Lead UX
> Designer"* — I want to flag that discrepancy rather than silently pick one. Options:
> (a) your real title "Senior UX Designer" with the scope told through the body;
> (b) a scope-accurate label like "Senior UX Designer — Design Systems & UX Engineering";
> (c) keep "Lead UX Designer" if that was in fact your title. Your call — this is the
> one spot most likely to read as overstated to a hiring manager who checks.

---

## 01 — Why the system was needed ‹REUSE + light stitch›

*(from Penlink §01 Challenge, enriched with debrief §2/§4)*

When I joined Penlink, the product ecosystem had evolved as a collection of independent
investigative tools with inconsistent UI patterns and interaction models. The company had
also grown through acquisition, bringing previously separate products and teams under one
roof — each with its own UI conventions, engineering history, and product-specific solutions.

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

> ⚑ VERIFY — "150+ engineers / 3 products" are internal org figures. Confirm you're
> comfortable stating them publicly next to the Penlink name (outline §5).
> ⚑ HOLLY — Do we name specific products (PLX Desktop, GeoTime, Tangles, PLX Web,
> PenLink 360) or keep the generic "investigative products"? Naming them is more concrete
> but raises the confidentiality bar. My default: keep generic in prose.

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

To operate the system as infrastructure — not just ship components — I was building out
operational tooling (internally, *Orbit*): a component-lifecycle/readiness view, a
cross-repository scanner to find existing UI that could migrate onto Helios, and release/
publishing support that guards against breaking API changes.

The maturity goal was to **measure real migration** — tracking adoption inside one or two
consuming applications — rather than counting components. A system succeeds because products
use it and development improves, not because the library is large.

> ⚑ HOLLY — **Biggest honesty flag in the whole draft.** The debrief frames governance and
> Orbit as things you were *establishing / building toward*, and adoption-measurement as a
> *next-stage goal*. The old outline note said §05 describes "real practices you ran." I need
> you to split this cleanly: which of the below was **actually running** vs. **planned/
> in-progress** when you left?
> - contribution / review model
> - component auditing & versioning
> - the npm package + wrapper adoption model (this one reads as real/shipped)
> - Orbit tooling (lifecycle view, adoption scanner, publish pipeline)
> - adoption measurement in a real app
> I'll frame each exactly as you mark it. Overstating governance is the easiest way for this
> section to ring false, so I'd rather under-claim.

> ⚑ HOLLY — Do you want **Orbit named** in the public case study, or described generically
> as "operational tooling"? (Orbit has its own memory now; it's a separate sub-project.)

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

> ⚑ HOLLY — **§07 MCP specifics still needed.** The decision is to name MCP explicitly, but I
> only have the concept, not the mechanics. To write this section truthfully I need: which
> MCP servers/tools you used, what they read from Figma (variables? component props? states?),
> and how output landed in Angular. Until then I've kept it at the honest conceptual level and
> named Claude/MCP without over-specifying.

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

> ⚑ HOLLY — **Tone + legal gate on constraints.** The debrief's organizational material
> (being excluded from meetings, the ownership/authority mismatch, the layoff framing) is real
> and important context, but a public portfolio should tell the *constructive* version —
> "the system needed engineering partnership and governance, and here's what I'd build next" —
> not a grievance. I've drafted it that way. Two gates before this goes public:
> (1) check the separation agreement for any confidentiality / non-disparagement clause
> touching proprietary work product; (2) confirm you're comfortable naming the single-person-
> dependency candidly — it's honest and reads as maturity, but it's your call.

---

## Pre-publish checklist (carried from outline §3 & §5)

- [ ] ⚑ VERIFY metrics: 200+ tokens · 50+ components · 20+ patterns · 4 designers · 150+ engineers · 3 products
- [ ] ⚑ Screenshot scrub (HARD GATE): all reused figures show sample/synthetic data — esp. map + timebar
- [ ] ⚑ Role/title decision (§00)
- [ ] ⚑ Governance real-vs-planned split (§05)
- [ ] ⚑ MCP mechanics (§07)
- [ ] ⚑ Separation-agreement check before naming Penlink + showing its UI (§08)
- [ ] ⚑ Decide: name specific products & name "Orbit," or keep generic

## Open questions that block a final, publishable draft
1. Role/title (§00).
2. Governance: what actually ran vs. what was planned (§05).
3. MCP mechanics (§07).
4. Comfort level on the two internal figures and on the single-person-dependency candor.

*Once these land: finalize prose → build the Angular `helios` case-study component (reusing
the existing case-study layout + real assets) → then the standalone homepage `helios-diagram`
concept.*
