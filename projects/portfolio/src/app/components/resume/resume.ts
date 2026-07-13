import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

interface Job {
  title: string;
  company: string;
  period: string;
  note?: string;
  achievements: string[];
}

interface ApproachItem {
  label: string;
  icon: string;
  description: string;
}

interface Honor {
  role: string;
  org: string;
  year: string;
}

interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-resume',
  imports: [RouterLink, Icon],
  templateUrl: './resume.html',
})
export class Resume {
  protected readonly experience: Job[] = [
    {
      title: 'Senior UX Designer',
      company: 'Penlink',
      period: 'Jan 2023 – Present',
      achievements: [
        'Unified multiple product brands under a scalable design system aligned with the company brand, creating a consistent foundation across the product ecosystem.',
        'Designed and applied design token architecture using Figma variables, enabling consistent UI development across products and supporting scalable component systems.',
        'Drive UX design for complex intelligence platforms including investigative dashboards, alert systems, and geospatial analysis tools.',
        'Conduct analyst interviews and contextual research to understand investigative workflows and translate them into intuitive product experiences.',
        'Used Claude to translate Figma design system components into reusable Angular components for feature teams to integrate via MCP, creating a bridge between design systems and engineering implementation.',
      ],
    },
    {
      title: 'Digital Design System Specialist',
      company: 'University of Nebraska System – Office of the President',
      period: 'Apr 2022 – Jan 2023',
      achievements: [
        "Transitioned the NUcleus design system into the university's brand and marketing organization following an institutional restructure.",
        'Partnered with communications, marketing, product, and engineering teams across campuses to align brand standards with the design system and digital platforms.',
        'Created reusable marketing templates and digital assets that enabled internal teams to produce materials in-house and reduced reliance on external contractors.',
      ],
    },
    {
      title: 'Lead Web Designer / Developer',
      company: 'University of Nebraska System – Information Technology Services',
      period: 'May 2018 – Apr 2022',
      note: 'Product Owner — NUcleus Design System',
      achievements: [
        'Created and led the NUcleus design system from the ground up, defining the vision, roadmap, and governance model supporting 9 university brands and 20+ website and application implementations.',
        "Designed and implemented the system's design token architecture (primitive, semantic, and component layers) using Figma variables and SCSS, ensuring consistency between design and front-end implementation.",
        "Established reusable UI components, interaction patterns, and system standards that unified the university's digital ecosystem.",
        'Reviewed 300+ feature implementations to ensure alignment with system standards and intended user experience.',
        'Collaborated with product managers, designers, and engineers to prioritize system enhancements and drive adoption across teams.',
      ],
    },
    {
      title: 'Web Designer / Developer',
      company: 'University of Nebraska System – Information Technology Services',
      period: 'Aug 2017 – May 2018',
      achievements: [
        'Designed websites, applications, and communications platforms in collaboration with product managers and engineers.',
        'Created user journeys, information architecture, and wireframes to support product development.',
      ],
    },
  ];

  protected readonly additionalExperience: Job[] = [
    {
      title: 'Adjunct Instructor',
      company: 'Southeast Community College — Graphic Design & Continuing Education',
      period: 'Apr 2017 – 2023',
      achievements: [
        'Taught courses in Adobe Illustrator, web design, and HTML/CSS development.',
        'Guided students through agile workflows, portfolio development, and real-world client projects.',
      ],
    },
    {
      title: 'Art Director',
      company: 'Firespring',
      period: 'Mar 2017 – Aug 2017',
      achievements: [
        'Designed digital products and campaigns in collaboration with UX designers, engineers, and clients.',
      ],
    },
    {
      title: 'Freelance Designer & Developer',
      company: 'Self-Employed',
      period: 'Jan 2014 – Jan 2019',
      achievements: [
        'Designed and developed websites, branding systems, and digital media for clients across multiple industries.',
      ],
    },
    {
      title: 'Communications Designer',
      company: 'Nebraska Department of Education',
      period: 'Nov 2012 – Mar 2017',
      achievements: [
        'Designed digital media, publications, and websites supporting statewide early childhood initiatives.',
      ],
    },
  ];

  protected readonly approach: ApproachItem[] = [
    { label: 'Systems First', icon: 'grid-3x3', description: 'Products scale when they are built from coherent systems rather than isolated features.' },
    { label: 'Clarity Over Complexity', icon: 'target', description: 'Design should organize complex tools so people can focus on the work that matters.' },
    { label: 'Design That Ships', icon: 'rocket', description: 'Strong design connects directly to implementation through shared components and engineering collaboration.' },
    { label: 'Better Together', icon: 'users', description: 'The best solutions emerge when designers, engineers, and domain experts shape them collectively.' },
    { label: 'Design the Foundation', icon: 'layers', description: 'Thoughtful systems and components create the structure teams rely on as products grow.' },
    { label: 'Evolving the Craft', icon: 'trending-up', description: 'As AI and new tooling reshape how software is built, design systems must evolve to support faster and more flexible creation.' },
  ];

  protected readonly leadership: Honor[] = [
    { role: 'Me, Myself & Design Director', org: 'AIGA Nebraska', year: '2018' },
    { role: 'Me, Myself & Design Co-Chair', org: 'AIGA Nebraska', year: '2017' },
    { role: 'Web Designer', org: 'FORGE Collaborative by Emspace', year: '2017' },
    { role: 'Panel Judge', org: 'University of Nebraska Omaha, Final Presentation', year: '2016' },
  ];

  protected readonly links: SocialLink[] = [
    { label: 'LinkedIn', url: 'linkedin.com/in/holly-johnson-27336129', icon: 'linkedin' },
    { label: 'Email', url: 'hme2784@gmail.com', icon: 'mail' },
  ];
}
