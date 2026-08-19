import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analysis-workflow-case-study',
  imports: [RouterLink],
  templateUrl: './analysis-workflow-case-study.html',
})
export class AnalysisWorkflowCaseStudy {
  protected readonly projectDetails = [
    { label: 'Timeline', value: '2023–2026' },
    { label: 'Focus', value: 'End-to-end workflow · Product strategy · Cross-product alignment' },
    { label: 'Role', value: 'Research · Synthesis · Product design' },
    { label: 'Methods', value: 'Contextual interviews · Workflow mapping · Design evaluation' },
  ];

  protected readonly workflowStages = [
    { title: 'Query', detail: 'Begin with a lead, question, person, event, or known piece of information.' },
    { title: 'Collect', detail: 'Bring together relevant digital evidence, communications, open-source intelligence, and records.' },
    { title: 'Analyze', detail: 'Narrow large datasets, examine activity, and identify information that warrants deeper investigation.' },
    { title: 'Map', detail: 'Place people, events, and activity in geographic context to examine movement and proximity.' },
    { title: 'Visualize', detail: 'Use timelines, relationships, and other representations to make complex information easier to understand.' },
    { title: 'Report', detail: 'Communicate findings and preserve supporting context for review, presentation, and legal use.' },
  ];

  protected readonly findings = [
    { title: 'Context must travel', detail: 'Analysts carry entities, time ranges, filters, and source information with them as they move between tools and levels of detail.' },
    { title: 'Overview and evidence work together', detail: 'Summaries and visual relationships help analysts orient, but conclusions still depend on a clear path back to the underlying records.' },
    { title: 'Questions change the level of detail', detail: 'Investigations move repeatedly between broad patterns and specific records as new information changes what the analyst needs to examine.' },
    { title: 'Interpretation is not evidence', detail: 'Signals, analyst observations, and supported conclusions play different roles and need to remain distinguishable throughout the workflow.' },
  ];

  protected readonly designInfluence = [
    { title: 'Navigation and state', detail: 'Evaluating whether filters, selections, and analytical context survive movement through the product.' },
    { title: 'Data representations', detail: 'Choosing tables, timelines, maps, or relationship views based on the question each representation helps answer.' },
    { title: 'Review and handoff', detail: 'Considering how observations remain connected to their source information for later review or reporting.' },
  ];

  protected readonly toc = [
    { fragment: 'need', label: '01. Fragmented Journey' },
    { fragment: 'approach', label: '02. Workflow Map' },
    { fragment: 'principles', label: '03. Research Findings' },
    { fragment: 'decisions', label: '04. Design Decisions' },
    { fragment: 'ongoing', label: '05. Across the Suite' },
  ];
}
