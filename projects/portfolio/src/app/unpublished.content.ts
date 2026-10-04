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

/**
 * Where Theorem's "Next Project" points. Theorem is last in the published sequence, so
 * Nebraska.edu only follows it while that case study is unpublished. Defined here rather
 * than with an `@if` in the template because a template branch still ships the unpublished
 * name inside the compiled output; only the file swap keeps it out.
 */
export const theoremNextProject = { link: '/work/nebraska-edu', label: 'Nebraska.edu' };

export const unpublishedProjects: Project[] = [
  {
    id: 'nebraska-edu',
    title: 'Nebraska.edu',
    category: 'Practice',
    outcome: 'A repeatable engagement that turned NUcleus into sites marketing staff ran themselves.',
    capabilities: ['Information architecture', 'Content strategy', 'Sitecore'],
    link: '/work/nebraska-edu',
    visual: {
      kind: 'image',
      src: 'assets/work/home/nebraska-edu-card.webp',
      width: 1536,
      height: 895,
      fit: 'framed',
    },
  },
];
