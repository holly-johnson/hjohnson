import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step {
  label: string;
  sub: string;
}

/**
 * Helios, flagship case study. Follows the same page IA as the other case studies:
 * hero, numbered sections, sticky table of contents, and next-project footer.
 */
@Component({
  selector: 'app-helios-case-study',
  imports: [RouterLink],
  templateUrl: './helios-case-study.html',
})
export class HeliosCaseStudy {
  // §02, components encoded behavior and contracts, not just appearance
  protected readonly behavioralFoundations: string[] = [
    'Consistent field structure, validation, and feedback',
    'Predictable component inputs and states',
    'Reusable navigation, popup, and page foundations',
    'Shared state-management patterns',
    'Internationalization and RTL layout support',
    'Compatibility with existing product requirements',
  ];

  // §02, accessibility built into the components (Angular/CDK foundations)
  protected readonly accessibilityFoundations: string[] = [
    'Focus management',
    'Keyboard interaction patterns',
    'ARIA behavior',
    'Guaranteed IDs',
    'Live regions',
    'Modal focus trapping',
  ];

  // §04, incremental adoption pipeline
  protected readonly adoptionSteps: Step[] = [
    { label: 'Recurring repository scan', sub: 'Claude across all products' },
    { label: 'Classify matches', sub: 'adoption or possible adoption' },
    { label: 'Review product requirements', sub: 'align or extend Helios' },
    { label: 'Track system debt', sub: 'plan later cleanup' },
    { label: 'Publish the Helios version', sub: 'merge and release' },
    { label: 'Product repoints', sub: 'consume the supported component' },
  ];

  protected readonly reviewSteps: Step[] = [
    { label: 'Figma component', sub: 'ready for UX critique' },
    { label: 'Helios review tab', sub: 'review stays within UX' },
    { label: 'Claude review synthesis', sub: 'decisions captured from recording' },
    { label: 'Resolved decisions', sub: 'tasks plus documentation' },
    { label: 'Direct implementation', sub: 'no design retranslation' },
    { label: 'Final review', sub: 'component returns for approval' },
  ];

  // §05, constraints and open problems
  protected readonly constraints: string[] = [
    'The canonical source of truth across Figma, code, and tokens was not fully resolved.',
    'Too much of the system’s knowledge and ownership remained concentrated in one person, a risk I had identified and was working to reduce.',
  ];
}
