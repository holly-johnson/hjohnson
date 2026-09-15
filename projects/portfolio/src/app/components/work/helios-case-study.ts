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
    'Consistent fields, validation, and feedback',
    'Predictable component inputs and states',
    'Navigation, popup, and page foundations',
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
    { label: 'Classify matches', sub: 'direct candidate or needs review' },
    { label: 'Review product requirements', sub: 'align or extend Helios' },
  ];

  // Review forks: debt is recorded when it exists, the release path continues regardless.
  protected readonly adoptionDebt: Step = {
    label: 'Track system debt',
    sub: 'the system carries it, not the product',
  };

  protected readonly adoptionRelease: Step[] = [
    { label: 'Publish the Helios version', sub: 'merge and release' },
    { label: 'Product repoints', sub: 'consume the supported component' },
  ];


  // §05, constraints and open problems
  protected readonly constraints: string[] = [
    'The canonical source of truth across Figma, code, and tokens was not fully resolved, in part because the team did not have the Figma license tier that would have automated it.',
    'Figma Code Connect, which would have handed developers the real Helios implementation in Dev Mode instead of a generic snippet, was scoped but never set up.',
    'Too much of the system’s knowledge and ownership remained concentrated in one person. That was a known risk, and reducing it was already underway.',
  ];


}
