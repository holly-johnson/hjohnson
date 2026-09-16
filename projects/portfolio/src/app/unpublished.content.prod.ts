import type { Project } from './project.model';

/**
 * Production stand-in for `unpublished.content.ts`, swapped in by `fileReplacements`
 * in angular.json. Empty by design: unfinished copy never reaches the bundle, and
 * every `showUnpublished` branch folds away as a build-time constant.
 */
export const showUnpublished = false;

/** Nebraska.edu is not published, so Theorem wraps the reader back to the flagship. */
export const theoremNextProject = { link: '/work/helios', label: 'Helios' };

export const unpublishedProjects: Project[] = [];
