import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { theoremNextProject } from '../../unpublished.content';

interface TocItem {
  fragment: string;
  label: string;
}

interface UserGroup {
  num: string;
  name: string;
  need: string;
}

@Component({
  selector: 'app-theorem-case-study',
  imports: [RouterLink],
  templateUrl: './theorem-case-study.html',
})
export class TheoremCaseStudy {
  /**
   * Theorem is last in the published sequence, so its "Next Project" target depends on
   * whether Nebraska.edu is published. Swapped at build time by `fileReplacements`; see
   * `unpublished.content.ts`.
   */
  protected readonly nextProject = theoremNextProject;

  /** Who the application served. Five groups came out of 2017 discovery; parents were added after phase one. */
  protected readonly userGroups: UserGroup[] = [
    { num: '01', name: 'Students', need: 'Move through a course, track progress and know what comes next.' },
    { num: '02', name: 'Teachers', need: 'Grade work and reach students about notifications and news.' },
    { num: '03', name: 'Customer service', need: 'Answer account and enrollment questions.' },
    { num: '04', name: 'Administrators', need: 'Oversee courses, accounts and records across the school.' },
    { num: '05', name: 'Instructional designers', need: 'Author and publish course content.' },
    { num: '06', name: 'Parents & Guardians', need: 'Stay up to date with their child’s learning.' },
  ];

  /** Rail labels are trimmed to fit the 230px contents column on one line; the headings themselves are longer. */
  protected readonly toc: TocItem[] = [
    { fragment: 'challenge', label: '01. One System, Five Jobs' },
    { fragment: 'discovery', label: '02. Who It Actually Served' },
    { fragment: 'research', label: '03. Testing the Requirements' },
    { fragment: 'analysis', label: '04. Storyboards to Portals' },
    { fragment: 'design', label: '05. Design Met Development' },
    { fragment: 'system', label: '06. What Survived' },
  ];
}
