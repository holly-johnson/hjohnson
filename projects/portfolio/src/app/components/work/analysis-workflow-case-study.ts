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
    { title: 'Query', detail: 'Document what was provided at the start of an investigation and where each piece of information came from.' },
    { title: 'Collect', detail: 'Follow the available leads, recording what was found along with the branch, trail, and source that led to it.' },
    { title: 'Analyze', detail: 'Filter, search, and sort information to identify patterns while documenting findings and assumptions.' },
    { title: 'Map', detail: 'Place people, locations, events, and activity on a map to document geographic relationships and movement.' },
    { title: 'Visualize', detail: 'Look at the same information in different ways because each representation can reveal something different.' },
    { title: 'Report', detail: 'Bring the work together so it remains understandable to someone else, or to the same investigator years later.' },
  ];

  protected readonly findings = [
    { title: 'Documentation is continuous', detail: 'Sources, decisions, branches, findings, and assumptions need to be recorded throughout the investigation, not reconstructed at the end.' },
    { title: 'Every finding needs a trail', detail: 'New information only remains useful when an investigator can trace where it came from and how one lead produced the next.' },
    { title: 'The workflow loops and branches', detail: 'Analysis creates new questions that send investigators back to collect, query, compare, and document again.' },
    { title: 'The view should follow the question', detail: 'Tables, maps, timelines, and relationship views reveal different aspects of the same information. No single representation works for every task.' },
    { title: 'The work must remain understandable', detail: 'The final record needs to preserve enough context for another person, or the same investigator years later, to understand how the findings were reached.' },
  ];

  protected readonly designInfluence = [
    { title: 'Product scope', detail: 'Defining which parts of the investigative workflow each product should support and how far its responsibility should extend.' },
    { title: 'Product boundaries', detail: 'Recognizing where a product should stop instead of adding capability that belongs elsewhere in the suite.' },
    { title: 'Integration points', detail: 'Identifying where products need to share context, evidence, or actions so the larger workflow remains coherent.' },
  ];

  protected readonly toc = [
    { fragment: 'need', label: '01. Fragmented Journey' },
    { fragment: 'approach', label: '02. Workflow Map' },
    { fragment: 'principles', label: '03. Research Findings' },
    { fragment: 'decisions', label: '04. Product Direction' },
    { fragment: 'ongoing', label: '05. Shared Guide' },
  ];
}
