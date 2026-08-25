import { Routes } from '@angular/router';

/**
 * Field Notes: drafts, not published work.
 *
 * These routes are only reachable in development. The production build swaps this
 * file for `field-notes.routes.prod.ts` (see `fileReplacements` in angular.json),
 * which exports nothing, so the journal's dynamic imports never make it into the
 * bundle and no draft text is uploaded to the CDN. Gating the router alone was not
 * enough: the lazy chunks still shipped as static files anyone could fetch.
 */
export const fieldNotesRoutes: Routes = [
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
