import type { Project } from './project.model';

/**
 * Production stand-in for `unpublished.content.ts`, swapped in by `fileReplacements`
 * in angular.json. Empty by design: unfinished copy never reaches the bundle, and
 * every `showUnpublished` branch folds away as a build-time constant.
 */
export const showUnpublished = false;

export const unpublishedProjects: Project[] = [];
