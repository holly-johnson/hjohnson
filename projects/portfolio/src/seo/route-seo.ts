/**
 * Bridges `site-metadata.json` to the shape Angular's router wants.
 *
 * Routes still declare their own `loadComponent` — that is code, and it belongs
 * in the route table. Everything a crawler reads comes from the shared file, so
 * the title in the browser tab, the title in a Slack unfurl, and the title the
 * edge function writes into the HTML cannot drift apart.
 */
import { pageFor } from './site-metadata';

/** Read back off the route by `App` on every navigation. */
export interface RouteMeta {
  description: string;
  image: string;
  /** Set on routes that exist but should stay out of search results. */
  noIndex?: boolean;
}

export interface RouteSeo {
  title: string;
  data: { meta: RouteMeta };
}

/**
 * The router inputs for a published page.
 *
 * Throws when the path has no entry, which surfaces the mistake the moment the
 * route table is loaded — in a test or on the first dev-server boot — rather
 * than as a page that quietly ships with the wrong description.
 */
export function seoFor(path: string): RouteSeo {
  const page = pageFor(path);
  if (!page) {
    throw new Error(`No metadata for "${path}". Add it to seo/site-metadata.json.`);
  }
  return { title: page.title, data: { meta: { description: page.description, image: page.image } } };
}
