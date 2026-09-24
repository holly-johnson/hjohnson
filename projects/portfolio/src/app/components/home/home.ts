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
      description: 'A design system and product foundation connecting design architecture, coded components, documentation, distribution and real product implementation.',
      impact: 'Built from the first Figma foundations and token architecture through to a published Angular component library. Four designers supported more than 150 engineers, so the system had to carry decisions the team could not review screen by screen.',
      tag: 'DESIGN SYSTEM',
      link: '/work/helios',
      linkLabel: 'Read the full case study',
      facts: [
        { label: 'ROLE', value: 'System and token architecture, Angular component library, accessibility, governance' },
        { label: 'YEAR', value: '2023–2026' },
        { label: 'OUTCOME', value: 'Figma decisions shipped as Angular components' },
      ],
    },
    {
      id: '2',
      num: '02',
      title: 'Investigative Workflow Research',
      discipline: ['UX Research', 'Workflow Mapping', 'Product Strategy'],
      description: 'Contextual research mapping how investigators collect, examine, connect and communicate information across a suite of separate tools.',
      impact: 'Turned a fragmented, tool-by-tool journey into a shared model of the end-to-end workflow.',
      tag: 'RESEARCH',
      link: '/work/analysis-workflow',
      linkLabel: 'Read the research',
      facts: [{ label: 'OUTCOME', value: 'One shared picture of the work, in front of every team that touches it' }],
    },
    {
      id: '3',
      num: '03',
      title: 'NUcleus',
      discipline: ['Design Systems', 'Platform Strategy', 'Front-End Integration'],
      description: 'A shared design and front-end system supporting 9 university brands and more than 20 websites and applications.',
      impact: 'Built the reusable front-end foundation first, then implemented it in the NU CMS.',
      tag: 'DESIGN SYSTEM',
      link: '/work/nucleus',
      linkLabel: 'Read the case study',
      facts: [{ label: 'OUTCOME', value: 'The CMS and team changed. The foundation didn’t.' }],
    },
    {
      id: '4',
      num: '04',
      title: 'Theorem',
      discipline: ['Product Design', 'UX Research', 'Front-End Development'],
      description: 'A learning management system rebuilt for the University of Nebraska High School, serving students, teachers, customer service, administrators and instructional designers.',
      impact: 'Analytics on the legacy application showed almost no traffic on paths stakeholders had called essential, which reset the requirements around the actual work.',
      tag: 'PRODUCT DESIGN',
      link: '/work/theorem',
      linkLabel: 'Read the case study',
      facts: [{ label: 'OUTCOME', value: 'Student success drove every decision, replacing a decades-old system' }],
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
