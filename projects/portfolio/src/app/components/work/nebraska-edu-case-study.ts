import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TocItem {
  fragment: string;
  label: string;
}

interface Stage {
  title: string;
  detail: string;
}

interface Property {
  name: string;
  url?: string;
  domain?: string;
}

@Component({
  selector: 'app-nebraska-edu-case-study',
  imports: [RouterLink],
  templateUrl: './nebraska-edu-case-study.html',
})
export class NebraskaEduCaseStudy {
  /** The repeatable sequence every site engagement ran through. */
  protected readonly stages: Stage[] = [
    {
      title: 'Kickoff',
      detail: 'Stakeholders, project managers, content creators, designers and developers in one room. The questions asked here become the creative brief.',
    },
    {
      title: 'Information architecture',
      detail: 'Content sorted into sections and pages, with SEO decisions made while the structure is still cheap to change.',
    },
    {
      title: 'Page overviews',
      detail: 'The client states the goal and the action for every page. Paired with the brief, this is how success gets measured later.',
    },
    {
      title: 'Content maps',
      detail: 'Each page mapped block by block. The client owns the message, the design decides which NUcleus components carry it.',
    },
    {
      title: 'Wireframes',
      detail: 'Pages composed from what the system already provides. Anything missing enters the new component process.',
    },
    {
      title: 'Build and train',
      detail: 'Built in Sitecore with assets optimized, reviewed against the content map, then handed over with training.',
    },
  ];

  /** Domains built on NUcleus through this process. Institutes and departments, not campuses. */
  protected readonly properties: Property[] = [
    { name: 'University of Nebraska System', url: 'https://nebraska.edu/', domain: 'nebraska.edu' },
    { name: 'Digital Learning', url: 'https://online.nebraska.edu/', domain: 'online.nebraska.edu' },
    { name: 'National Strategic Research Institute', url: 'https://nsri.nebraska.edu/', domain: 'nsri.nebraska.edu' },
    { name: 'Daugherty Water for Food Global Institute', url: 'https://waterforfood.nebraska.edu/', domain: 'waterforfood.nebraska.edu' },
    { name: 'Young Nebraska Scientists', url: 'https://yns.nebraska.edu/', domain: 'yns.nebraska.edu' },
    { name: 'Transfer Nebraska', url: 'https://transfer.nebraska.edu/', domain: 'transfer.nebraska.edu' },
    { name: 'Information Technology Services' },
    { name: 'Enterprise Data Solutions' },
    { name: 'Nebraska Research & Innovation Conference' },
    { name: 'NU Connections' },
  ];

  protected readonly toc: TocItem[] = [
    { fragment: 'challenge', label: '01. One University Voice' },
    { fragment: 'process', label: '02. A Repeatable Process' },
    { fragment: 'architecture', label: '03. Structure First' },
    { fragment: 'mapping', label: '04. Content Mapping' },
    { fragment: 'build', label: '05. Build and Hand Over' },
    { fragment: 'reach', label: '06. Where It Ran' },
  ];
}
