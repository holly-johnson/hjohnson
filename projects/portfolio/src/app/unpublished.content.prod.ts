import type { Project } from './project.model';

/**
 * Production stand-in for `unpublished.content.ts`, swapped in by `fileReplacements`
 * in angular.json. Empty by design: unfinished copy never reaches the bundle, and
 * every `showUnpublished` branch folds away as a build-time constant.
 */
export const showUnpublished = false;

/** Nebraska.edu is not published, so NUcleus and Theorem link straight to each other. */
export const nucleusNextProject = { link: '/work/theorem', label: 'Theorem' };
export const theoremPreviousProject = { link: '/work/nucleus', label: 'NUcleus' };

export const unpublishedProjects: Project[] = [];
