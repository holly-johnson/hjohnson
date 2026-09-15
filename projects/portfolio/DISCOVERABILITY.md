# Being findable

Written while the site had no `robots.txt`, no sitemap, and no structured data —
so search engines had no reliable way to find any page but the home page, and no
way to tell this Holly Johnson from any other. That part is fixed; this document
is about the rest, and about the thing the fixes do not solve.

## The uncomfortable part first

**Recruiters are not going to find this site by searching.**

Design recruiters source candidates inside LinkedIn Recruiter, a different
product from the LinkedIn everyone else uses. They filter by title, skills,
location, and seniority, and they work through the result list. Almost nobody
opens Google and types "product designer portfolio."

So the portfolio is not the front door. It is what gets opened *after* someone
has already found her — from a LinkedIn result, a résumé, or a referral — and it
decides whether that person writes to her. Both jobs matter. They are not the
same job, and only one of them is SEO.

| Where they find her | What decides it |
| --- | --- |
| LinkedIn Recruiter search | The LinkedIn profile's title, skills, and headline |
| A name search after seeing her résumé | This site winning the search for "Holly Johnson" |
| An AI assistant asked to find design-systems people | Whether her pages can be read without JavaScript |
| A link shared in Slack or a DM | The social card and title |

The work in this branch addresses rows two through four. Row one is the highest
volume by a wide margin and none of it lives in this repository.

## Row one: what recruiters type

LinkedIn does not publish how it ranks results, but the filters are visible in
the product and the fields they read are not a secret. In rough order of weight:

1. **Current and past job titles.** The most-used filter, and the one that
   quietly decides everything else.
2. **The Skills section.** Recruiters filter on it directly.
3. **Headline.**
4. **Full text of the About section and each role's description.**
5. **Location, seniority, years of experience, and the open-to-work flag.**

A design-systems search usually looks something like:

```
("Product Designer" OR "Senior Product Designer" OR "UX Designer")
  AND ("design system" OR "design systems" OR "component library")
  AND (Figma)
```

and the design-engineering version, which is a much smaller candidate pool:

```
("Design Engineer" OR "UX Engineer" OR "Design Technologist")
  AND (Figma) AND (React OR Angular OR TypeScript)
```

### The mismatch worth fixing

The résumé title is **Senior UX Designer**. The site brands her as **Product
Designer & Design Systems Lead**.

Recruiters filter on the title field. If LinkedIn says "Senior UX Designer," she
appears in *UX Designer* searches and is filtered out of *Product Designer*
searches — which in most markets right now are the more numerous and better paid
of the two. The same work, described in a vocabulary the filter does not match.

This is not an argument for claiming a title she has not held. It is an argument
for putting the market's words next to her employer's words, in the field the
filter reads. LinkedIn's title field takes a parenthetical:

> Senior UX Designer (Product Design · Design Systems)

Three searches now match one true sentence.

### The rarest keyword is the one to lead with

"Product designer" is a large, crowded pool. **Design systems work backed by
shipped production code is not** — building the Figma token architecture *and*
the published Angular library is an unusual combination, and it is the thing on
the résumé that is hardest to find elsewhere.

"Design Engineer" and "UX Engineer" are worth carrying explicitly for the same
reason. The résumé already describes the work: tokens in Figma variables and
SCSS, a published Angular component library, WCAG focus management, ARIA, RTL
and i18n at the component level. Nothing in the titles says it, so none of those
searches reach her.

### Skills, concretely

LinkedIn allows 50 and recruiters filter on them. From the résumé, in priority
order:

Design Systems · Design Tokens · Figma · Component Libraries · Angular ·
Design Engineering · Accessibility (WCAG) · TypeScript · SCSS · UX Research ·
Prototyping · Information Architecture · Design System Governance ·
Enterprise / B2B SaaS · Front-End Development

Pin the first three. Those are the ones shown first and weighted most.

### Two free ones

- **The recruiter-only "open to work" flag** (the private one, not the green
  photo frame). Recruiters can filter to show only candidates who have set it.
  Not setting it removes her from those searches entirely. `availability.ts`
  currently says the search is open.
- **Recency.** Recently active profiles surface higher. The unpublished
  `field-notes` posts are the cheapest way to be active on purpose rather than
  by accident.

### The one source of real data

LinkedIn's **Search appearances** panel reports which search terms surfaced her
profile and which companies those searchers came from. That is ground truth
about what recruiters in her market are actually typing, specific to her, and it
is free. Everything above is reasoning about how the platform works; that panel
is evidence. Check it before acting on any of this.

## Rows two through four: what this branch changed

- **`robots.txt` and `sitemap.xml`** now exist and are generated from
  `src/seo/site-metadata.json`, so they cannot drift from the routes.
- **JSON-LD structured data** on every page. The load-bearing line is `sameAs`,
  pointing at the LinkedIn profile: it is the claim that this site and that
  profile are one person. There are a lot of Holly Johnsons, and without that
  claim a name search returns several unrelated people and no clear winner.
- **Unknown URLs are now `noindex`.** Previously every 404 was served the home
  page's title and description, so the site competed against itself on its own
  name with pages that render nothing.
- **Metadata has one home.** It used to be spelled out in the route table and
  again in the edge function; adding a page meant remembering both. Now both
  read the same file, and `consistency.spec.ts` fails the build if they diverge.

### Set up before any of this can be measured

1. **Google Search Console** — verify the domain, submit
   `https://hollyjohnson.design/sitemap.xml`, then use *Request indexing* on each
   page. A new site is not crawled promptly on its own. This is the step that
   turns everything above from correct into visible, and it takes ten minutes.
2. **Bing Webmaster Tools** — same sitemap. Bing matters more than its traffic
   share suggests, because it is what several AI assistants search through.
3. Then check Search Console's *Queries* report against the LinkedIn search
   appearances above. Where they disagree, believe LinkedIn.

## The known gap: nothing here is readable without JavaScript

This is a single-page app. The served HTML is an empty `<app-root>`, and every
word of every case study is written by Angular after the bundle boots. The edge
function fills in the title, description, card, and structured data, so a link
unfurls correctly and a crawler learns what the page *is* — but the actual
content is invisible to anything that does not run JavaScript.

That covers Google, which renders. It does not cover Bing, LinkedIn's unfurler,
or most AI assistant crawlers. Given that "ask an assistant to find me a design
systems person who writes code" is a real sourcing path now, this is the most
valuable thing left to fix.

**The fix is prerendering** — the same Angular app, with each route's HTML
generated at build time. Output stays static, Netlify config is unchanged. It
was not done in this branch because it is not a config flag:

- `@angular/ssr` requires `@angular/router` 21.2.23, and the lockfile pins the
  Angular packages at 21.2.18. Adding it bumps the whole framework set.
- `navigation.ts` calls `window.scrollY` from a router subscription
  (`updateScrolled`), which runs during prerendering, where there is no `window`.
  It needs the `isPlatformBrowser` guard `theme.service.ts` already has.

Both are small. Together they are a framework upgrade on a live site, which
deserves its own branch and a pass through `/verify` at real widths, not a
footnote in this one.

## One thing on the page itself

The home page `<h1>` is:

> I work on the seam between design and engineering.

It is the best sentence on the site and it contains neither her name nor
anything anyone searches for. The `<h1>` is among the strongest signals a page
sends about what it is about.

This is a real trade and it is hers to make, so nothing was changed. If it is
worth trading a little, the cheapest version keeps the line exactly as it is and
gives the section a name above it — the way the case studies already label
themselves — so the page states who she is without the headline having to:

```
HOLLY JOHNSON · PRODUCT DESIGNER & DESIGN SYSTEMS
I work on the seam between design and engineering.
```

The eyebrow directly above it currently reads "Well, hello. I'm Holly." — same
slot, and it is already doing a weaker version of this job.
