/**
 * The job-search status, in one place. Both the homepage hero and the About
 * page's contact block read from here, so ending the search is a single edit:
 * set `open` to false and the line disappears from both.
 *
 * `line` is the short form the homepage hero uses as a link. `aboutLine` is the
 * longer form the About page's Get in touch section carries, where there is room
 * to name the kind of work.
 */
export const availability = {
  open: true,
  line: 'Currently interviewing for senior roles.',
  aboutLine:
    'I’m currently interviewing for senior roles across product design, design systems and design engineering, especially where complex technology intersects with public service, education or meaningful real-world problems.',
} as const;
