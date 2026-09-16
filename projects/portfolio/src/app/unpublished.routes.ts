import { Routes } from '@angular/router';

/**
 * Work that is not ready to publish.
 *
 * These routes are only reachable in development. The production build swaps this
 * file for `unpublished.routes.prod.ts` (see `fileReplacements` in angular.json),
 * which exports an empty array, so the dynamic imports below never make it into the
 * bundle and nothing unfinished is uploaded to the CDN. Gating the router alone was
 * not enough: the lazy chunks still shipped as static files anyone could fetch.
 *
 * Anything listed here must also be hidden from whatever links to it, or production
 * gets a dead link to a page that no longer exists. Those call sites gate on
 * `isDevMode()` and reference this comment:
 *   - `navigation.ts` drops the About link
 *   - `home.ts` drops the unpublished projects from Selected Work
 *
 * These routes carry their own metadata rather than calling `seoFor()`, because
 * they are deliberately absent from `seo/site-metadata.json` — that file is the
 * list of published pages, and it is what the sitemap is generated from. An
 * unfinished page does not belong in a sitemap.
 *
 * To publish one of these: add its entry to `seo/site-metadata.json`, move its
 * block into `app.routes.ts` replacing the inline metadata with `seoFor('/path')`,
 * and remove the matching `isDevMode()` gate at the call sites above. The edge
 * function needs no change — it reads the same file. `seo/consistency.spec.ts`
 * fails if any of those get out of step.
 */
export const unpublishedRoutes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./components/about/about').then(m => m.About),
    title: 'About · Holly Johnson',
    data: {
      meta: {
        description: 'About Holly Johnson, product designer and design systems lead.',
        image: '/assets/social/home.png',
        noIndex: true,
      },
    },
  },
  {
    path: 'work/nebraska-edu',
    loadComponent: () => import('./components/work/nebraska-edu-case-study').then(m => m.NebraskaEduCaseStudy),
    title: 'Nebraska.edu · Holly Johnson',
    data: {
      meta: {
        description: 'The repeatable engagement that turned NUcleus into websites: information architecture, content maps, wireframes, Sitecore build and client training.',
        image: '/assets/social/nucleus.png',
        noIndex: true,
      },
    },
  },
  {
    path: 'field-notes',
    loadComponent: () => import('./components/journal/journal').then(m => m.Journal),
    title: 'Field Notes · Holly Johnson',
    data: {
      meta: {
        description: 'Notes on design systems, product practice and a curated shelf of ideas worth passing along.',
        image: '/assets/social/home.png',
        noIndex: true,
      },
    },
  },
  {
    path: 'field-notes/design-systems-are-relationships',
    loadComponent: () => import('./components/journal/design-systems-are-relationships').then(m => m.DesignSystemsAreRelationships),
    title: 'Design systems are relationship work · Holly Johnson',
    data: {
      meta: {
        description: 'A field note on why the strongest design systems are built through trust, shared language and continuous collaboration.',
        image: '/assets/social/helios.png',
        noIndex: true,
      },
    },
  },
];
