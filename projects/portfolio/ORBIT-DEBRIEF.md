# Orbit debrief

Raw interview capture. Holly's words, lightly tidied. Not publishable copy.
Started 2026-09-22.

## 01 Origin

The mandate came down that UX needed to figure out how to use AI in its workflow.
Holly was tasked with it. She pulled in Joel [genericize on publish] rather than
working it alone.

The two had a standing weekly collaboration meeting, meant for staying in sync and
building a real design partnership, not a status check. One of those meetings turned
to prototyping with Claude. They were walking the process step by step looking for the
missing piece.

The turn: what if Claude could help kick off a feature, help gather requirements and
act as a partner on the feature?

That raised the practical questions immediately. How would it work? Where would the
information live? How would it be shared? The answer they landed on was an app to
track these features. Then the scope opened up: it started to look like a fit for many
of the holes in their process, not just one.

### Open / to confirm
- Date of that conversation.
- Who issued the "UX needs to figure out AI" mandate, and how it was worded.
- Joel's exact contribution vs Holly's.
- How far it got.

## 02 Contribution

Holly designed it, built it, defined the model and specified the save structure. She was
specific about how things saved, so state behaved like a database. (She hedged on the
word "schema." She described writing one. Nobody else defined the structure.)

She ran a weekly interview with Joel about what else could help, then took it wider:
PMs, developers, QA, technical writing and training. Everyone she showed it to could
name the piece that would help them.

Joel's line, his words, attribute if used: "AI isn't replacing roles, it's connecting
them." Orbit was a service project. The work was connecting people.

## 03 The holes

Holly's list, the process problems Orbit was aimed at:

1. Designers started a feature with zero requirements.
2. No single place to see everything about a feature.
3. Training and technical writers had no advance notice of what was coming.
4. Even once they knew, there was no history around a feature, so they could not see
   what had happened or why.
5. Handoff specs were all over the place.
6. Designers were not following agreed styles, so engineering had to work out how to
   read every feature's requirements and specs differently.

This is a feature-lifecycle problem: how a feature gets decided, recorded and passed
along. Distinct from the Helios problem, which is what gets built.

### Framing guardrail (2026-09-22)
A ChatGPT-written runway was floated that opened Orbit on duplicated UI work,
implementation drift and "no shared way to turn product decisions into consistent,
reusable UI," and positioned Orbit as the runway INTO Helios. Rejected. That is the
Helios problem and the Helios case study already opens with it. Holly confirmed: keep
the lifecycle framing above.

Timing correction from Holly: Orbit and Helios were concurrent, not sequential. Orbit
came out of the prototyping work while she was building Helios. Helios was hers alone.
Orbit was worked with Joel and Laura [genericize both on publish].

## 04 What each group said

**PMs.** Already doing this, alone. One PM [Max, genericize] was prototyping on his own
local machine with no way to share it with anyone. Orbit made the same instinct
shareable.

**Developers.** Super excited. A working prototype plus feature specs that read the same
way every time was a direct improvement to their own process.

**QA.** Very excited. They test with little context about the feature. Orbit gave them a
fuller understanding of everything that needed testing.

**Training and technical writing.** The biggest one. Training found out about features
at release, then scrambled to hunt down all the screens after the fact. Orbit let them
open the prototype and start building training before release, with live screenshots
added once it shipped. It also carried the context that matters most for training: the
intent behind the feature, and the user problem being solved.

## 05 How it worked

**Missions.** A new feature started a new Mission. The mission was the container that
held everything: feature specs, questions, answers, concerns, notes, research,
prototypes and the live links for those prototypes. It collected everything into context
for that mission.

**Kickoff interview.** Holly and Joel wrote the questions they would normally ask a PM in
a kickoff meeting. A designer or a PM could answer, separately or together. Approximate
wording, not exact:
- What are the users' main goals and pain points?
- What does success look like?
- What specific user problem does this feature solve, and what evidence do we have that
  it exists?
- What is the current workflow, if any?
- Constraints? MVP?
(Holly may have images of the real set, or can ask Joel.)

**What came back.** Answering the questions created the mission, an interface holding all
the notes plus an AI overview. From there a click asked Claude for a few starting ideas
based on the information collected. Designers used this constantly to get moving on
features that arrived with little information, so PMs had something concrete to react to
and feedback came fast.

**Branch and live link.** A private server was set up. Creating a mission created a
branch in DevOps. Pushing the prototype to the remote branch ran CI/CD and produced a
live link. That made global review possible: share a link, and collaborators could add
information back to the mission.

**The Helios constraint.** Claude pulled from the published Helios package. If it built
something outside the library to achieve what the designer wanted, it built it in a
scaffolding folder, which flagged it as outside the library. Holly could then see it and
decide: the designer should switch to an existing component, or there is a new component
here. Gaps reported themselves.

**Layout.** Best used inside Claude's browser, which let the team use the chat without
paying to embed it. Tradeoff: AI was limited when the site was opened outside Claude.
Her setup, left to right: Claude chat, mission listing, then the detail panel when a
listing opened, so the mission itself took half the screen and chat plus the list held
the other half. The detail page carried the kickoff answers, other notes, prototypes and
research. That section was the one actively being expanded.

**Storage.** A fake database: a folder per mission, holding JSON files that stored the
information. Holly was deliberate about how things saved so state behaved like a
database. Right as she was leaving, Christian [Natis] recognized they were going to need
a real database. Read that as the POC succeeding: it ran far enough to prove what was
actually needed.

## 06 Reach and status

Internal tool. The whole design team used it: 4 designers plus Laura the manager
[genericize], 5 people, Holly one of the 4. Two heavy users, one medium, one low. Real
people ran real features through it.

It did not stop. What it needed next was more designers taking features all the way
through, to train and improve the system.

**Public claim needs fixing.** The Orbit stub and Helios §06 both say "we started
building it, it did not ship," and the memory guardrail forbids user or adoption claims.
That undersells an internal tool the whole design team used on real features. Rewrite
both to match this.

## 07 What was hard

**Designers did not want to be that close to code.** The normal preference is to work with
good developers and stay in their lane. That changed when they saw how fast Orbit could
produce a prototype that sat close to the live product.

**Orbit's ceiling was Helios's coverage.** Early prototypes did not look right, because
Helios did not yet have all the components. As Holly built more components and more of
the infrastructure, Orbit started to work. The AI workflow could only be as good as the
system underneath it.

**Entry cost was too high.** The onboarding interview was cut down substantially. The
goal was for people to get in and interact, not fill out a long form before seeing what
happened next.

## 08 Where it was headed

More features through Orbit. The reasoning: an AI partner plus a working prototype at
handoff means engineering has more answers up front and fewer rounds of review before
release. Training and technical writers get ahead instead of catching up. Throughput and
transparency out of the same change. Connecting jobs.

## 09 What Holly wants the page to say

- **DesignOps.** Building tooling for product and design teams that raises both
  efficiency and quality of work.
- **Collaboration.** With 4 designers and a manager, Orbit was another collaborator:
  somewhere to flush out bad ideas and surface things nobody had thought of.
- **A homebase.** Links lived in DevOps, in Aha and in Figma, with no single place to
  find everything. Orbit held the links and the information together, and could create
  and review specs and other handoff material.

## 10 Ownership and evidence

**Ownership: hers.** Holly led. Joel helped brainstorm. Users besides her: Laura the
manager, Roni Shelley, Dani [genericize all on publish].

**Evidence: none in hand.** Laura has not sent screenshots. Plan is a reconstruction
Holly draws herself, labeled as a reconstruction. Better than real screenshots anyway:
no NDA gate, and it fits the site's existing markup-diagram visual language. Diagrams
worth building: the three-pane mission layout, the scaffolding gap loop, and the
branch-to-live-link pipeline.

### Still open
- Dates: when the Joel conversation happened, and the span of the work.
- The ROLE descriptor line for the page (contribution, not title).
- Exact kickoff questions, if images or Joel turn up.

## 11 Page fields

- **Title:** Orbit
- **Timeline chip:** Late 2025 – Aug 2026 (concurrent with Helios, ran right up to her
  departure)
- **ROLE:** DesignOps · AI Tooling · Prototyping
- **Ownership:** Holly led. Joel co-brainstormed the idea.

### Why those three ROLE words
Grounded in the Into Design Systems board, 117 postings that ask for AI skills, read
2026-09-28. The recurring vocabulary is "AI tooling," "AI-assisted workflows,"
"AI-enabled acceleration workflows," "AI-native," "prototyping tools and infrastructure"
and "designing in code." DesignOps is a live title, not just a concept: Mistral is hiring
a Product Operations Manager (DesignOps) and Marriott a FLEX Director of Design
Operations, Design Systems.

Two postings describe Orbit almost exactly, in their own words:
- **Rippling:** AI tooling so designers and product teams can create advanced prototypes
  and production-ready code that use the design system code and best practices.
- **Clipboard Health:** create AI tooling to help the organization prototype and build
  with the system.

"Collaboration" was considered and cut from the ROLE line. Every posting claims
collaboration, so it signals nothing, and it is what the page argues anyway.

## 12 Still open
- Exact kickoff questions, if Laura sends images or Joel confirms.
- Reconstruction diagrams: three-pane mission layout, scaffolding gap loop,
  branch-to-live-link pipeline.
- Two live pages carry the now-inaccurate "it did not ship" claim and need rewriting:
  the Orbit stub and Helios §06.
