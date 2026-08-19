import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-analysis-workflow-case-study',
  imports: [RouterLink, Icon],
  templateUrl: './analysis-workflow-case-study.html',
})
export class AnalysisWorkflowCaseStudy {
  protected readonly projectDetails = [
    { label: 'Role', value: 'UX Designer', wide: false },
    { label: 'Timeline', value: '2022–2024', wide: false },
    { label: 'Focus', value: 'Analysis workflows · Data interfaces · Evidence capture', wide: true },
    { label: 'Methods', value: 'Contextual interviews · Workflow mapping · Prototyping', wide: true },
  ];

  protected readonly thesis = [
    { label: 'Constraint', text: 'Large, connected datasets spread across specialized views.' },
    { label: 'Design question', text: 'How might analysts change lenses without losing their place?' },
    { label: 'Result', text: 'A persistent investigative frame from first signal to saved finding.' },
  ];

  protected readonly oldFlow = [
    { index: '01', title: 'Search records', text: 'Start broad in a dense result table.' },
    { index: '02', title: 'Open a new view', text: 'Rebuild filters and locate the same entities.' },
    { index: '03', title: 'Document elsewhere', text: 'Copy the finding and reconstruct its source.' },
  ];

  protected readonly workflow = [
    { number: '01', verb: 'Orient', question: 'What changed?', detail: 'Surface new activity, anomalies, and unresolved findings without pretending every signal has equal weight.' },
    { number: '02', verb: 'Narrow', question: 'What matters here?', detail: 'Keep time, entity, source, and confidence filters visible as the dataset becomes more focused.' },
    { number: '03', verb: 'Connect', question: 'How is it related?', detail: 'Move between timeline, map, and network lenses while holding the same investigative frame.' },
    { number: '04', verb: 'Preserve', question: 'Can I support this?', detail: 'Save the observation with its underlying records, analyst note, and relevant context intact.' },
  ];

  protected readonly workspaceStats = [
    { label: 'Records in frame', value: '148' },
    { label: 'Linked entities', value: '12' },
    { label: 'Unreviewed', value: '07' },
  ];

  protected readonly nodes = [
    { label: 'M. Rivera', x: 22, y: 28, primary: true },
    { label: 'Northstar LLC', x: 52, y: 49, primary: true },
    { label: 'Device ··38', x: 78, y: 25, primary: false },
    { label: 'Pier 9', x: 75, y: 76, primary: false },
    { label: 'Account ··04', x: 25, y: 78, primary: false },
  ];

  protected readonly decisions = [
    { title: 'Treat filters as part of the investigation', desc: 'The active time range, entities, and data sources remain legible and portable. Analysts can see the frame shaping every result instead of relying on hidden query state.' },
    { title: 'Separate signals from findings', desc: 'The interface does not promote an anomaly into a conclusion. Analysts review signals, attach interpretation, and deliberately save supported findings.' },
    { title: 'Keep provenance attached', desc: 'A finding carries links back to the source records and the state of the workspace when it was captured, making later review less dependent on memory.' },
    { title: 'Let views answer different questions', desc: 'Tables support verification, timelines expose sequence, maps reveal co-location, and networks show relationships. No single visualization is treated as the product.' },
  ];

  protected readonly outcomes = [
    { title: 'Less context rebuilding', text: 'Selections and filters persist as analysts move between analytical lenses.' },
    { title: 'Clearer investigative state', text: 'The workspace distinguishes unreviewed signals, active lines of inquiry, and saved findings.' },
    { title: 'Stronger handoff', text: 'Findings retain their notes and source records for review and reporting.' },
  ];

  protected readonly toc = [
    { href: '#problem', label: '01. The problem' },
    { href: '#model', label: '02. Workflow model' },
    { href: '#workspace', label: '03. The workspace' },
    { href: '#decisions', label: '04. Design decisions' },
    { href: '#outcome', label: '05. Outcome' },
  ];
}
