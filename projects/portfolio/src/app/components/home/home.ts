import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeliosDiagram } from './diagrams/helios-diagram';

interface Project {
  id: string;
  title: string;
  discipline: string[];
  description: string;
  impact: string;
  link: string;
  /** Case study is fully built; unfinished ones render as non-clickable cards. */
  ready: boolean;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeliosDiagram],
  templateUrl: './home.html',
})
export class Home {
  protected readonly social = {
    linkedin: 'https://www.linkedin.com/in/holly-johnson-27336129/',
    email: 'mailto:hme2784@gmail.com',
  };

  // Helios card — aligned to the built /work/helios case study (role, impact).
  protected readonly projects: Project[] = [
    {
      id: '1',
      title: 'Helios',
      discipline: ['Design Systems', 'Product Platforms', 'Design Engineering'],
      description: 'A design system and product foundation connecting design architecture, coded components, documentation, distribution, and real product implementation.',
      impact: 'Built Helios from the ground up — from the first Figma foundations and token architecture to a published Angular component library that products could adopt incrementally.',
      link: '/work/helios',
      ready: true,
    },
    {
      id: '2',
      title: 'Investigative Analysis Workflow',
      discipline: ['Product UX', 'Complex Workflows', 'Data Visualization'],
      description: 'End-to-end workflows for law enforcement analysts — from dashboard triage through relationship exploration and reporting.',
      impact: 'Replaced dense tables and disconnected views with progressive, visual workflows that made patterns easier to find and investigative context easier to maintain.',
      link: '/work/analysis-workflow',
      ready: true,
    },
    {
      id: '3',
      title: 'NUcleus Design System',
      discipline: ['Design Systems', 'Platform Strategy', 'Front-End Integration'],
      description: 'A shared design and front-end system supporting 9 university brands and more than 20 websites and applications.',
      impact: 'Built the reusable front-end foundation first, then implemented it in the NU CMS. The same front-end has since been carried into a different CMS, allowing the system to outlast its original platform.',
      link: '/work/nucleus',
      ready: true,
    },
  ];
}
