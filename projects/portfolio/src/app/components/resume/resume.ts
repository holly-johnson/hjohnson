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
  /** Text shown to the reader. */
  url: string;
  /** Actual link target (mailto: for email, https:// for web). */
  href: string;
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
      period: 'Jan 2023 – Aug 2026',
      achievements: [
        'Built the original Penlink Design System in Figma and evolved it into Helios: a shared foundation of design tokens, structured Figma architecture, and a published Angular library. A four-person design team used it to carry shared decisions across 150+ engineers.',
        'Architected a layered token system (primitive → semantic → component) in Figma variables and SCSS, keeping design and front-end in sync across three adopting products.',
        'Built accessibility and internationalization into the components themselves: WCAG focus management, ARIA, modal focus-trapping, localization, and RTL (i18n, CSS logical properties). Foundation-level fixes improved every consuming product.',
        "Established the system's governance: a contribution model, versioned releases, and a roadmap that let product teams adopt Helios incrementally without pausing active feature work.",
        'Piloted applied AI in design-systems work: directed Claude through MCP to turn structured system information (components, tokens, states) into production Angular, and to run recurring adoption and critique scans that kept system debt visible and Figma intent tied to shipped code.',
        'Drove UX for complex intelligence platforms (investigative dashboards, alerting, geospatial analysis), grounded in analyst interviews and contextual workflow research.',
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
      note: 'Product Owner, NUcleus Design System',
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
      company: 'Southeast Community College, Graphic Design & Continuing Education',
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
    { label: 'LinkedIn', url: 'linkedin.com/in/holly-johnson-design', href: 'https://www.linkedin.com/in/holly-johnson-design', icon: 'linkedin' },
    { label: 'Email', url: 'hme2784@gmail.com', href: 'mailto:hme2784@gmail.com', icon: 'mail' },
  ];
}
