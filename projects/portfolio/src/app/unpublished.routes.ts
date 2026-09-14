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
 *   - `nucleus-case-study.html` drops its Next Project footer link to Theorem
 *
 * To publish one of these, move its block into `app.routes.ts`, add it back to
 * `netlify/edge-functions/route-metadata.ts`, and remove the matching `isDevMode()`
 * gate at the call sites above.
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
    path: 'work/theorem',
    loadComponent: () => import('./components/work/theorem-case-study').then(m => m.TheoremCaseStudy),
    title: 'Theorem · Holly Johnson',
    data: {
      meta: {
        description: 'Rebuilding a decades-old learning management system for the University of Nebraska High School, and the application patterns that became NUcleus for Apps.',
        image: '/assets/social/nucleus.png',
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
        description: 'The repeatable engagement that turned NUcleus into websites: information architecture, content maps, wireframes, Sitecore build, and client training.',
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
        description: 'Notes on design systems, product practice, and a curated shelf of ideas worth passing along.',
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
        description: 'A field note on why the strongest design systems are built through trust, shared language, and continuous collaboration.',
        image: '/assets/social/helios.png',
        noIndex: true,
      },
    },
  },
];
