import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

interface Decision {
  title: string;
  desc: string;
}

interface Metric {
  label: string;
  value: string;
  desc: string;
}

@Component({
  selector: 'app-analysis-workflow-case-study',
  imports: [RouterLink, Icon],
  templateUrl: './analysis-workflow-case-study.html',
})
export class AnalysisWorkflowCaseStudy {
  protected readonly decisions: Decision[] = [
    {
      title: 'Progressive Disclosure',
      desc: 'Information is revealed based on investigation context, allowing high-level summaries to lead into detailed exploration without overwhelming the user.',
    },
    {
      title: 'Visual Data Relationships',
      desc: 'Network graphs and timeline visualizations surface patterns such as connection density, temporal clustering, and anomalies that are difficult to detect in tabular views.',
    },
    {
      title: 'Contextual Actions',
      desc: "Actions such as tagging suspects, flagging evidence, and creating reports are surfaced in context, reducing navigation and supporting the analyst's current task.",
    },
  ];

  protected readonly metrics: Metric[] = [
    { label: 'Relationship Discovery', value: 'Faster', desc: 'Time to identify key relationships' },
    { label: 'Navigation Friction', value: 'Reduced', desc: 'Between data views' },
    { label: 'Dataset Clarity', value: 'Improved', desc: 'Analyzing complex datasets' },
  ];
}
