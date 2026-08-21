import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly social = {
    linkedin: 'https://www.linkedin.com/in/holly-johnson-design/',
    email: 'mailto:hme2784@gmail.com',
  };

  // Helios card — aligned to the built /work/helios case study (role, impact).
  protected readonly projects: Project[] = [
    {
      id: '1',
      title: 'Helios',
      discipline: ['Design Systems', 'Product Platforms', 'Design Engineering', 'Applied AI'],
      description: 'A design system and product foundation connecting design architecture, coded components, documentation, distribution, and real product implementation.',
      impact: 'Built Helios from the ground up, from the first Figma foundations and token architecture to a published Angular component library, with Claude woven into everything from how products adopt components to how design decisions get captured.',
      link: '/work/helios',
      ready: true,
    },
    {
      id: '2',
      title: 'Investigative Workflow Research',
      discipline: ['UX Research', 'Workflow Mapping', 'Product Strategy'],
      description: 'Contextual research mapping how investigators collect, examine, connect, and communicate information across a suite of separate tools.',
      impact: 'Turned a fragmented, tool-by-tool journey into a shared model of the end-to-end workflow, giving the team one foundation for deciding what each product should own, where it should stop, and how the products connect.',
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
