import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ProjectFigure {
  src: string;
  alt: string;
  /** Intrinsic pixel size, bound so the browser reserves space before the image loads. */
  width: number;
  height: number;
}

interface Project {
  id: string;
  title: string;
  discipline: string[];
  description: string;
  impact: string;
  link: string;
  /** Case study is fully built; unfinished ones render as non-clickable cards. */
  ready: boolean;
  /**
   * Card artwork. Absent where the case study has no publishable capture yet, in
   * which case the card falls back to the markup stage diagram below.
   */
  figure?: ProjectFigure;
  /** Fallback for cards without a figure: workflow stages drawn in markup. */
  stages?: string[];
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
      figure: {
        src: 'assets/work/helios-anatomy.webp',
        width: 815,
        height: 235,
        alt: 'The anatomy figure from the Helios button documentation: a button with four numbered callouts, keyed to a legend naming the leading icon, the label, the notification badge, and the container.',
      },
    },
    {
      id: '2',
      title: 'Investigative Workflow Research',
      discipline: ['UX Research', 'Workflow Mapping', 'Product Strategy'],
      description: 'Contextual research mapping how investigators collect, examine, connect, and communicate information across a suite of separate tools.',
      impact: 'Turned a fragmented, tool-by-tool journey into a shared model of the end-to-end workflow, giving the team one foundation for deciding what each product should own, where it should stop, and how the products connect.',
      link: '/work/analysis-workflow',
      ready: true,
      stages: ['Collect', 'Examine', 'Connect', 'Communicate'],
    },
    {
      id: '3',
      title: 'NUcleus Design System',
      discipline: ['Design Systems', 'Platform Strategy', 'Front-End Integration'],
      description: 'A shared design and front-end system supporting 9 university brands and more than 20 websites and applications.',
      impact: 'Built the reusable front-end foundation first, then implemented it in the NU CMS. The same front-end has since been carried into a different CMS, allowing the system to outlast its original platform.',
      link: '/work/nucleus',
      ready: true,
      figure: {
        src: 'assets/work/nucleus-scholarship.webp',
        width: 750,
        height: 350,
        alt: 'A NUcleus stat layout on an NU platform page: a red feature panel for 3,318 Regent Scholars beside a grid of figures for states, international students, countries, honors programs, graduate students, and Fulbright scholars.',
      },
    },
  ];
}
