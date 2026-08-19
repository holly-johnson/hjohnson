import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Orbit — case-study scaffold (WORK IN PROGRESS).
 *
 * Mirrors the shared case-study IA (hero + meta sidebar, numbered sections,
 * sticky table of contents, next-project footer). Seeded with the framing
 * already approved in the Helios case study; every "Draft" placeholder box is
 * a prompt for Holly to flesh out. Not yet featured on the homepage.
 */
@Component({
  selector: 'app-orbit-case-study',
  imports: [RouterLink],
  templateUrl: './orbit-case-study.html',
})
export class OrbitCaseStudy {
  // Draft section list — mirrors the TOC. Adjust as the narrative firms up.
  protected readonly sections: { id: string; num: string; title: string }[] = [
    { id: 'what', num: '01', title: 'What Orbit Was' },
    { id: 'missions', num: '02', title: 'Missions: Feature Context in One Place' },
    { id: 'prototyping', num: '03', title: 'AI-Assisted Prototyping' },
    { id: 'contributions', num: '04', title: 'Contributions Back to Helios' },
    { id: 'outcomes', num: '05', title: 'Outcomes & Where It Was Headed' },
  ];
}
