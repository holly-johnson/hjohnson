import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analysis-workflow-case-study',
  imports: [RouterLink],
  templateUrl: './analysis-workflow-case-study.html',
})
export class AnalysisWorkflowCaseStudy {
  protected readonly workflowStages = [
    { title: 'Query', detail: 'Document what was provided at the start of an investigation, what is known and where each piece of information came from.' },
    { title: 'Collect', detail: 'Follow available leads while recording what was found and the source or trail that produced it.' },
    { title: 'Analyze', detail: 'Filter, search and compare information to identify patterns, findings and assumptions.' },
    { title: 'Map', detail: 'Place people, locations, events and activity geographically to understand relationships and movement.' },
    { title: 'Visualize', detail: 'Represent the same information in different ways because each view may reveal a different pattern.' },
    { title: 'Report', detail: 'Bring the work together so another person, or the same investigator years later, can understand what was found and how.' },
  ];

  protected readonly findings = [
    { title: 'The workflow loops and branches', detail: 'Investigators repeatedly return to earlier questions as new people, locations, events and sources appear.' },
    { title: 'Every finding needs a trail', detail: 'Information remains useful only when someone can understand where it came from and how one lead produced the next.' },
    { title: 'Different representations reveal different things', detail: 'Lists, maps, timelines, networks and reports are not interchangeable views of the same work. Each helps investigators recognize different relationships.' },
    { title: 'Products can overlap without being interchangeable', detail: 'Two products may support similar actions while serving different investigative standards or stages.' },
    { title: 'Handoffs are part of the experience', detail: 'The work does not stop when an investigator changes products. Context, sourcing and accountability must move with it.' },
  ];

  protected readonly toc = [
    { fragment: 'portfolio', label: '01. Different Models' },
    { fragment: 'research', label: '02. Research Over Time' },
    { fragment: 'standards', label: '03. Two Standards' },
    { fragment: 'workflow', label: '04. Workflow Map' },
    { fragment: 'findings', label: '05. Research Findings' },
    { fragment: 'responsibilities', label: '06. Responsibilities' },
    { fragment: 'released', label: '07. Released Work' },
    { fragment: 'gap', label: '08. The Remaining Gap' },
  ];
}
