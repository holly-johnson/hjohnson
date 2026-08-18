import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

interface ArchRow {
  label: string;
  detail: string;
}

interface Outcome {
  category: string;
  stat: string;
}

interface Reference {
  label: string;
  url: string;
  domain: string;
}

@Component({
  selector: 'app-nucleus-case-study',
  imports: [RouterLink, Icon],
  templateUrl: './nucleus-case-study.html',
})
export class NucleusCaseStudy {
  // Fig 2. System Scale — ecosystem grid. The source Make file's image fills for
  // these eight properties are broken/unresolved, so they render as labeled tiles.
  protected readonly scaleSites: string[] = [
    'Nebraska Research & Innovation Conference',
    'Young Nebraska Scientists',
    'Transfer Nebraska',
    'Buffett Early Childhood Institute',
    'Water for Food Global Institute',
    'National Strategic Research Institute',
    'University of Nebraska President',
    'University of Nebraska System',
  ];

  protected readonly archRows: ArchRow[] = [
    { label: 'Brand', detail: 'Typography · Color · Spacing' },
    { label: 'Patterns', detail: 'Layout systems · Interaction rules' },
    { label: 'Components', detail: 'HTML · SCSS · Handlebars · NU CMS' },
  ];

  protected readonly outputLabels: string[] = ['Departments', 'Institutes', 'Programs', 'Online High School'];

  protected readonly outcomes: Outcome[] = [
    { category: 'Reach', stat: 'Websites across University departments, institutes, and programs' },
    { category: 'Efficiency', stat: 'Reusable front-end patterns implemented as CMS components' },
    { category: 'Cost', stat: 'Reduced reliance on external development' },
    { category: 'Stewardship', stat: 'More efficient use of public funding' },
    { category: 'Collaboration', stat: 'Increased collaboration across teams building within the system' },
  ];

  protected readonly references: Reference[] = [
    { label: 'University of Nebraska System', url: 'https://nebraska.edu/', domain: 'nebraska.edu' },
    { label: 'Water for Food Global Institute', url: 'https://waterforfood.nebraska.edu/', domain: 'waterforfood.nebraska.edu' },
    { label: 'Buffett Early Childhood Institute', url: 'https://buffettinstitute.nebraska.edu/', domain: 'buffettinstitute.nebraska.edu' },
    { label: 'National Strategic Research Institute', url: 'https://nsri.nebraska.edu/', domain: 'nsri.nebraska.edu' },
    { label: 'Transfer Nebraska', url: 'https://transfer.nebraska.edu/', domain: 'transfer.nebraska.edu' },
  ];

  protected readonly technologies: string[] = ['Figma', 'HTML', 'SCSS', 'Handlebars', 'NU CMS'];

  protected favicon(domain: string): string {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
  }
}
