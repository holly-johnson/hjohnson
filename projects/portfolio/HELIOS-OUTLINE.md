# Helios — Merged Case Study Outline (for approval)

**Status:** DRAFT outline, not yet built. Nothing in the app changed.
**Purpose:** Reconcile the two existing case studies into one flagship "Helios" story before writing any code.

**Sources being merged:**
- **A — Penlink Design System** (`work/penlink`, status: deployed) → *primary foundation*
- **B — UX Doesn't Stop at Design** (`work/ai-design`, status: experimental) → *the exploratory AI/design-to-code section*

Both currently live and routed. This outline maps their real content into your 8 target beats, flags gaps, and lists everything that must be verified before publication.

---

## 1. Proposed section structure

Numbered, editorial, TOC-driven — same pattern both source studies already use.

| # | Helios section | Your beat | Fed by | New writing needed? |
|---|----------------|-----------|--------|---------------------|
| 00 | **Hero / positioning** | — | New (merged) | Yes — new title, subtitle, meta |
| 01 | **Why the system was needed** | Why needed | A-01 Challenge (+ B-01 gap framing) | Light stitch |
| 02 | **How it evolved** | Evolution | A-03 Approach (3 principles) | Moderate — add a timeline/evolution beat |
| 03 | **System foundations & token architecture** | Foundations/tokens | A-04 (platform modes, ITCSS token diagram, 200+ tokens) | Reuse ~as-is |
| 04 | **Components & patterns** | Component/pattern dev | A-05 (50+ components, 20+ patterns, Fig 3 inputs, Fig 4 patterns) | Reuse ~as-is |
| 05 | **Governance & adoption** | Governance/adoption | A-02 Impact metrics (4/150+/3) | **Mostly new — see Gap #1** |
| 06 | **Design → engineering collaboration** | Design-eng collab | A-06 bridge + B-04 bridge | Merge two into one |
| 07 | **Exploratory AI / design-to-code work** | The AI/MCP work | B-02, B-03 (Translation Pipeline), B-04 (Process Comparison), B-05 Insights | Reuse, keep experimental framing |
| 08 | **Outcomes, constraints, lessons, next steps** | Outcomes/lessons | B-05 Insights + B-06 Reflection + A-02 outcomes | Moderate — add constraints + next steps |

**Recommendation:** one long merged case study with the AI work as **section 07** (a prominent but clearly-scoped chapter), *not* a co-equal half. Rationale: the Penlink system is the credibility spine; the AI work is the forward-looking differentiator. Framing it as "where this system is heading" is stronger — and safer — than presenting it as an equal, finished pillar.

---

## 2. Asset & figure inventory (what's reusable today)

**From A (Penlink) — all real, already in `public/assets/work/`:**
- Fig 1. UI Component Audit — 9 legacy button PNGs (`btn-*.png`) → keep in §01
- Fig 2. Token Architecture — pure-markup ITCSS diagram (primitive → semantic → component) → keep in §03
- Fig 3. Form Inputs — `input-utilities.png` → keep in §04
- Fig 4. Shared Patterns — `pattern-timebar / filter-panel / category-intensity / table / toast / map .png` → keep in §04

**From B (AI) — pure markup, no images:**
- Fig 01. Translation Pipeline — Figma Component → Token Consumption → State Resolution → Structured Data → Angular Component → §07
- Fig 02. Process Comparison — Traditional (6 steps, sequential) vs AI-Assisted (3 steps, continuous) → §07

**New:** the flagship **Helios technical diagram** for the homepage card (per plan: build standalone HTML first → approve → port to `helios-diagram` component). This is separate from the two Fig diagrams above and still to be designed.

---

## 3. Metrics — MUST verify before publication

Every one of these already appears verbatim in the **Penlink** source, so the merge inherits them. Nothing here is invented, but you asked to confirm each before publishing:

| Metric | Currently stated as | Appears in |
|--------|--------------------|-----------|
| Tokens | **200+** | penlink §04 |
| Components | **50+** | penlink §05 |
| Patterns | **20+** | penlink §05 |
| Designers | **4** | penlink §02 |
| Engineers | **150+** | penlink §02 |
| Products | **3** | penlink §02 |

Homepage metrics are currently different (`15+ years / 9+ brands / 20+ platforms / 2 systems`) — those are career-level, not Helios-level, and stay on the homepage unless you want to swap them.

---

## 4. Gaps — RESOLVED (content still needed from Holly)

**Gap #1 — Governance & adoption (§05). RESOLVED: real content exists.** Holly ran real governance + auditing practices. §05 will describe them honestly. *Need from Holly:* the actual practices — contribution/review model, how components were audited, versioning, how teams onboarded/adopted.

**Gap #2 — "MCP". RESOLVED: describe MCP explicitly.** Holly used MCP substantially and considers it required for best outcomes. §07 will name MCP directly (not the vaguer "AI-assisted tooling"). *Need from Holly:* what the MCP setup actually did — which servers/tools, what it read from Figma, how it produced Angular output.

**Gap #3 — Constraints & next steps (§08). RESOLVED: exists, framed honestly.** Holly has real constraints and next steps but did **not** execute them before the layoff. §08 will frame next steps as *planned/intended*, not done — which is honest and reads fine. *Need from Holly:* the actual constraints and the planned next steps.

---

## 5. Confidentiality — DECIDED + pre-publish checklist

- **Naming: DECIDED.** Helios is the real design-system name; Penlink (the employer) may be named. Text-level naming is low risk.
- **Pre-publish gate — screenshot scrub (HARD GATE).** Penlink builds investigative/law-enforcement tooling. Reused figures include a **map** and **timebar** pattern. Before publish, confirm every reused screenshot shows sample/synthetic data — no real locations, communications, target names, or case IDs. Crop or swap to mock data where needed.
- **Internal figures.** "150+ engineers / 3 products" are internal org details. Keep approximate; gut-check comfort stating them publicly next to the employer name.
- **Separation terms.** Quick check of the separation agreement for any confidentiality / non-disparagement clause touching proprietary work product before the public portfolio names Penlink + shows its UI.
- **AI framing.** Even with MCP named explicitly, keep the honest scope: real, in-use exploration — not a fully adopted, org-wide production pipeline.

---

## 6. Routing & homepage knock-on (not part of this outline, tracked for next steps)

- New route `work/helios`. Decide whether `work/penlink` and `work/ai-design` become redirects to it or are removed.
- Homepage Selected Work goes 4 → 3 (Helios, Investigative Analysis Workflow, NUcleus); "UX Doesn't Stop at Design" retires as a standalone card; renumber remaining. (Tracked separately in the homepage plan.)

---

## 7. Decisions — RESOLVED

1. **Structure:** ✅ 8 sections, AI as scoped §07. *(pending final nod, treating as approved)*
2. **Naming:** ✅ Helios = real system name; Penlink nameable.
3. **MCP:** ✅ name MCP explicitly in §07.
4. **Governance (§05):** ✅ real governance + auditing to describe.
5. **Constraints/next steps (§08):** ✅ real, framed as planned-not-executed (pre-layoff).

## 8. Raw material still needed to write the content draft

The two source studies cover §01–04, §06, and most of §07. These three need Holly's input because they aren't in either source:

- **§05 Governance & auditing:** the actual contribution/review model, how components were audited, versioning, adoption/onboarding.
- **§07 MCP specifics:** what the MCP setup did — servers/tools, what it read from Figma, how it produced Angular output.
- **§08 Constraints + next steps:** the real limits hit, and what was planned next (framed as intended, not done).

Once these land, next build step = section-by-section **content draft** of Helios (still no code), then the standalone homepage diagram concept.
