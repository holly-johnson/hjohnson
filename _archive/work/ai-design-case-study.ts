import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

interface Step {
  label: string;
  sub: string;
}

@Component({
  selector: 'app-ai-design-case-study',
  imports: [RouterLink, Icon],
  templateUrl: './ai-design-case-study.html',
})
export class AiDesignCaseStudy {
  // Fig. 01 — Translation Pipeline
  protected readonly flowSteps: Step[] = [
    { label: 'Figma Component', sub: 'design source' },
    { label: 'Token Consumption', sub: 'reads design tokens' },
    { label: 'State Resolution', sub: 'completes component states' },
    { label: 'Structured Data', sub: 'machine-readable output' },
    { label: 'Angular Component', sub: 'production implementation' },
  ];

  // Fig. 02 — Process Comparison
  protected readonly traditionalSteps: Step[] = [
    { label: 'Design in Figma', sub: 'components & specs' },
    { label: 'Handoff', sub: 'redlines, documentation' },
    { label: 'Implementation', sub: 'engineering build' },
    { label: 'UX Review', sub: 'design QA' },
    { label: 'Iterate', sub: 'revisions & corrections' },
    { label: 'Feature ready', sub: 'production release' },
  ];

  protected readonly continuousSteps: Step[] = [
    { label: 'Design in Figma', sub: 'components & tokens' },
    { label: 'Iterate through Claude', sub: 'AI-assisted generation' },
    { label: 'Feature ready', sub: 'production implementation' },
  ];

  protected readonly impactBullets: string[] = [
    'Reduced friction between design and development workflows',
    'Improved alignment between component structure in Figma and code',
    'Enabled faster iteration by minimizing translation overhead',
  ];
}
