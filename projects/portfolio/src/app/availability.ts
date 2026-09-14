/**
 * The job-search status, in one place. Both the homepage hero and the About
 * page's contact block read from here, so ending the search is a single edit:
 * set `open` to false and the line disappears from both.
 */
export const availability = {
  open: true,
  line: 'Currently interviewing for senior roles.',
} as const;
