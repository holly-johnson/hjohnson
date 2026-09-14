import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project } from '../../project.model';
import { unpublishedProjects } from '../../unpublished.content';
import { availability } from '../../availability';




@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly availability = availability;

  protected readonly social = {
    linkedin: 'https://www.linkedin.com/in/holly-johnson-design/',
    email: 'mailto:hme2784@gmail.com',
  };

  protected readonly projects: Project[] = [
    {
      id: '1',
      num: '01',
      title: 'Helios',
      discipline: ['Design Systems', 'Product Platforms', 'Design Engineering', 'Applied AI'],
      description: 'A design system and product foundation connecting design architecture, coded components, documentation, distribution, and real product implementation.',
      impact: 'Built from the first Figma foundations and token architecture through to a published Angular component library. Four designers supported more than 150 engineers, so the system had to carry decisions the team could not review screen by screen.',
      blurb: 'Figma foundations through to the published Angular library products shipped on.',
      tag: 'DESIGN SYSTEM',
      link: '/work/helios',
      facts: [
        { label: 'ROLE', value: 'Senior UX Designer' },
        { label: 'YEAR', value: '2023–2026' },
        { label: 'OUTCOME', value: 'Design pulled into production, not handed to it', accent: true },
      ],
    },
    {
      id: '2',
      num: '02',
      title: 'Investigative Workflow Research',
      discipline: ['UX Research', 'Workflow Mapping', 'Product Strategy'],
      description: 'Contextual research mapping how investigators collect, examine, connect, and communicate information across a suite of separate tools.',
      impact: 'Turned a fragmented, tool-by-tool journey into a shared model of the end-to-end workflow.',
      blurb: 'One model of the end-to-end workflow, in place of a tool-by-tool journey.',
      tag: 'RESEARCH',
      link: '/work/analysis-workflow',
    },
    {
      id: '3',
      num: '03',
      title: 'NUcleus Design System',
      discipline: ['Design Systems', 'Platform Strategy', 'Front-End Integration'],
      description: 'A shared design and front-end system supporting 9 university brands and more than 20 websites and applications.',
      impact: 'Built the reusable front-end foundation first, then implemented it in the NU CMS.',
      blurb: 'Nine university brands on one front-end foundation that outlasted its CMS.',
      tag: 'PLATFORM',
      link: '/work/nucleus',
    },
  ];



  /**
   * Work that is not ready to publish is appended from a module the production build
   * swaps for an empty one. See unpublished.content.ts.
   */
  protected readonly published: Project[] = [...this.projects, ...unpublishedProjects];

  /** Everything below the flagship in the work list. */
  protected readonly supporting = this.published.filter(p => p.id !== '1');
  protected readonly flagship = this.published[0];
}
