import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step {
  label: string;
  sub: string;
}

interface TocItem {
  fragment: string;
  label: string;
}

/**
 * Orbit. Same page IA as the other case studies: hero, numbered sections, sticky table
 * of contents, next-project footer.
 *
 * No screenshots exist outside Penlink, so every figure here is pure markup and the
 * ones depicting the interface say they are reconstructions. Source material for the
 * copy is `projects/portfolio/ORBIT-DEBRIEF.md`.
 */
@Component({
  selector: 'app-orbit-case-study',
  imports: [RouterLink],
  templateUrl: './orbit-case-study.html',
})
export class OrbitCaseStudy {
  // §04, where a generated component landed
  protected readonly inLibrary: Step = {
    label: 'Published Helios component',
    sub: 'the prototype can only do what the system supports',
  };

  protected readonly outsideLibrary: Step[] = [
    { label: 'Built into the scaffolding folder', sub: 'flagged as outside the library' },
    { label: 'Reviewed against Helios', sub: 'switch components, or a new one exists' },
    { label: 'Returns as a contribution', sub: 'the gap closes in the system' },
  ];

  // §05, mission to shareable link
  protected readonly pipeline: Step[] = [
    { label: 'Create the mission', sub: 'a branch is created with it' },
    { label: 'Push the prototype', sub: 'to the remote branch' },
    { label: 'CI/CD runs', sub: 'on a private server' },
    { label: 'A live link', sub: 'reviewable anywhere, by anyone' },
  ];

  // §08
  protected readonly tradeoffs: { title: string; body: string }[] = [
    {
      title: 'The workflow depended on Helios',
      body: 'Orbit’s prototype quality was limited by the coverage and quality of the system underneath it. That dependence was also useful because gaps became visible.',
    },
    {
      title: 'Structured files were not a permanent database',
      body: 'JSON files proved the workspace model, but broader use required a more durable data layer.',
    },
    {
      title: 'Designer accessibility did not eliminate technical infrastructure',
      body: 'Skills reduced the need to remember commands, but Orbit still depended on repositories, branches, CI/CD and running development environments.',
    },
    {
      title: 'AI assistance still required judgment',
      body: 'Claude Code accelerated implementation. Designers remained responsible for the problem, behavior, accessibility, quality and decision to share the work.',
    },
    {
      title: 'Internal evidence was not customer impact',
      body: 'Orbit supported internal research and collaboration. Its prototypes were not shipped customer products.',
    },
  ];

  protected readonly toc: TocItem[] = [
    { fragment: 'problem', label: '01. A New Problem' },
    { fragment: 'workspace', label: '02. One Workspace' },
    { fragment: 'build', label: '03. Designers Directed' },
    { fragment: 'library', label: '04. Helios First' },
    { fragment: 'sharing', label: '05. Shareable Prototype' },
    { fragment: 'research', label: '06. Research' },
    { fragment: 'adoption', label: '07. Adoption and Ownership' },
    { fragment: 'outcomes', label: '08. Outcomes and Tradeoffs' },
    { fragment: 'next', label: '09. Where It Was Headed' },
  ];
}
