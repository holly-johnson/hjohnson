import { Component } from '@angular/core';

interface Profile {
  handle: string;
  platform: string;
  posts: string;
  flagged: boolean;
}

interface TimelineEvent {
  time: string;
  w: string;
  active: boolean;
}

@Component({
  selector: 'app-analysis-diagram',
  templateUrl: './analysis-diagram.html',
})
export class AnalysisDiagram {
  protected readonly profiles: Profile[] = [
    { handle: '@entity_041', platform: 'X', posts: '1.2K', flagged: true },
    { handle: '@node_087', platform: 'IG', posts: '847', flagged: true },
    { handle: '@acct_123', platform: 'FB', posts: '203', flagged: false },
  ];

  protected readonly events: TimelineEvent[] = [
    { time: '09:41', w: '60%', active: true },
    { time: '10:12', w: '85%', active: true },
    { time: '11:03', w: '40%', active: false },
    { time: '13:27', w: '72%', active: false },
  ];
}
