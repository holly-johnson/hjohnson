import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { availability } from '../../availability';

interface ProjectFigure {
  src: string;
  alt: string;
  /** Intrinsic pixel size, bound so the browser reserves space before the image loads. */
  width: number;
  height: number;
}

/** The ROLE / YEAR / OUTCOME column beside the flagship case study. */
interface FactRow {
  label: string;
  value: string;
  /** Renders in the accent colour, for the one fact worth landing on. */
  accent?: boolean;
}

interface Project {
  id: string;
  /** Two-digit index shown in the work list. */
  num: string;
  title: string;
  discipline: string[];
  description: string;
  impact: string;
  link: string;
  /** One line for the work list. */
  blurb: string;
  /** Mono label at the end of the work-list row. */
  tag: string;
  facts?: FactRow[];
  /** A real product shot. Unset falls back to the drawn system placeholder. */
  figure?: ProjectFigure;
}

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
    {
      id: '4',
      num: '04',
      title: 'Theorem',
      discipline: ['Product Design', 'UX Research', 'Front-End Development'],
      description: 'A learning management system rebuilt for the University of Nebraska High School, serving students, teachers, instructional designers, customer service, and administrators.',
      impact: 'Analytics on the legacy application showed almost no traffic on paths stakeholders had called essential, which reset the requirements around the actual work.',
      blurb: 'Five kinds of user, one application, requirements rebuilt on evidence.',
      tag: 'PRODUCT',
      link: '/work/theorem',
    },
    {
      id: '5',
      num: '05',
      title: 'Nebraska.edu',
      discipline: ['Information Architecture', 'Content Strategy', 'Design Systems in Practice'],
      description: 'The repeatable engagement that turned NUcleus into websites for departments and institutes across the University of Nebraska System.',
      impact: 'Architecture, content maps, and wireframes through to a Sitecore build and client training, so marketing staff ran their own sites afterward.',
      blurb: 'The practice that put a design system to work, one client at a time.',
      tag: 'PRACTICE',
      link: '/work/nebraska-edu',
    },
  ];

  /** Everything below the flagship in the work list. */
  protected readonly supporting = this.projects.filter(p => p.id !== '1');
  protected readonly flagship = this.projects[0];
}
