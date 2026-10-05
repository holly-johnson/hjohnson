/**
 * The job-search status, in one place. Both the homepage hero and the About
 * page's contact block read from here, so ending the search is a single edit:
 * set `open` to false and the line disappears from both.
 *
 * `line` is the short form the homepage hero shows as quiet status beside its
 * actions, so it carries no terminal punctuation. `aboutLine` is the longer form
 * the About page's Get in touch section carries, where there is room to name the
 * kind of work.
 */
export const availability = {
  open: true,
  line: 'Available for senior product design and design systems leadership roles',
  aboutLine:
    'I’m interviewing now for senior roles across product design, design systems and design engineering. The work I keep coming back to is in government, education, public safety and other organizations built to serve a community.',
} as const;
