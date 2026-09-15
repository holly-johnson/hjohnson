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

export const unpublishedProjects: Project[] = [
  {
    id: '4',
    num: '04',
    title: 'Theorem',
    discipline: ['Product Design', 'UX Research', 'Front-End Development'],
    description: 'A learning management system rebuilt for the University of Nebraska High School, serving students, teachers, instructional designers, customer service, and administrators.',
    impact: 'Analytics on the legacy application showed almost no traffic on paths stakeholders had called essential, which reset the requirements around the actual work.',
    tag: 'PRODUCT',
    link: '/work/theorem',
    linkLabel: 'Read the case study',
    facts: [{ label: 'ROLE', value: 'Lead Web Designer / Developer' }],
  },
  {
    id: '5',
    num: '05',
    title: 'Nebraska.edu',
    discipline: ['Information Architecture', 'Content Strategy', 'Design Systems in Practice'],
    description: 'The repeatable engagement that turned NUcleus into websites for departments and institutes across the University of Nebraska System.',
    impact: 'Architecture, content maps, and wireframes through to a Sitecore build and client training, so marketing staff ran their own sites afterward.',
    tag: 'PRACTICE',
    link: '/work/nebraska-edu',
    linkLabel: 'Read the case study',
    facts: [{ label: 'ROLE', value: 'Lead Web Designer / Developer' }],
  },
];

