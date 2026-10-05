import type { Project } from './project.model';

/**
 * Content for work that is not ready to publish.
 *
 * The production build swaps this file for `unpublished.content.prod.ts` (see
 * `fileReplacements` in angular.json), which exports an empty list and a false flag.
 * A runtime `isDevMode()` check is not enough here: the bundler cannot prove the
 * branch is dead, so the copy below would ship inside the JS even though nothing
 * rendered it. Swapping the file at build time is what actually keeps it out.
 *
 * Pairs with `unpublished.routes.ts`, which gates the routes themselves.
 */
export const showUnpublished = true;

export const unpublishedProjects: Project[] = [];
