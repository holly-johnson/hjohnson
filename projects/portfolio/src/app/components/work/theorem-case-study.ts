import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TocItem {
  fragment: string;
  label: string;
}

interface UserGroup {
  name: string;
  need: string;
}

@Component({
  selector: 'app-theorem-case-study',
  imports: [RouterLink],
  templateUrl: './theorem-case-study.html',
})
export class TheoremCaseStudy {
  /** The five groups the application had to serve, from the 2017 discovery work. */
  protected readonly userGroups: UserGroup[] = [
    { name: 'Students', need: 'Move through a course, track progress, and know what comes next.' },
    { name: 'Teachers', need: 'Grade work and reach students about notifications and news.' },
    { name: 'Instructional designers', need: 'Author and publish course content.' },
    { name: 'Customer service', need: 'Answer account and enrollment questions.' },
    { name: 'Administrators', need: 'Oversee courses, accounts, and records across the school.' },
  ];

  protected readonly toc: TocItem[] = [
    { fragment: 'challenge', label: '01. A Decades-Old System' },
    { fragment: 'discovery', label: '02. Discovery' },
    { fragment: 'research', label: '03. Research' },
    { fragment: 'analysis', label: '04. Analysis' },
    { fragment: 'design', label: '05. Design and Build' },
    { fragment: 'system', label: '06. What It Became' },
  ];
}
