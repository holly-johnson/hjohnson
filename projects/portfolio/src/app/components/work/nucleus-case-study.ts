import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ArchRow {
  label: string;
  detail: string;
}

interface Reference {
  label: string;
  url: string;
  domain: string;
}

interface EcosystemSite {
  name: string;
  url: string;
  /** Archived home-page capture, composited into the browser frame. */
  screenshot: string;
}

@Component({
  selector: 'app-nucleus-case-study',
  imports: [RouterLink],
  templateUrl: './nucleus-case-study.html',
})
export class NucleusCaseStudy {
  /** Nebraska.edu follows NUcleus in the case-study sequence. */
  protected readonly nextProject = { link: '/work/nebraska-edu', label: 'Nebraska.edu' };

  protected readonly scaleSites: EcosystemSite[] = [
    {
      name: 'University of Nebraska System',
      url: 'https://nebraska.edu/',
      screenshot: '/assets/work/nucleus-site-nebraska-edu-home-framed.webp',
    },
    {
      name: 'National Strategic Research Institute',
      url: 'https://nsri.nebraska.edu/',
      screenshot: '/assets/work/nucleus-site-nsri-framed.webp',
    },
    {
      name: 'Transfer Nebraska',
      url: 'https://transfer.nebraska.edu/',
      screenshot: '/assets/work/nucleus-site-transfer-nebraska-framed.webp',
    },
    {
      name: 'Office of the President',
      url: 'https://nebraska.edu/president/',
      screenshot: '/assets/work/nucleus-site-office-of-the-president-framed.webp',
    },
    {
      name: 'Young Nebraska Scientists',
      url: 'https://yns.nebraska.edu/',
      screenshot: '/assets/work/nucleus-site-young-nebraska-scientists-framed.webp',
    },
  ];

  protected readonly archRows: ArchRow[] = [
    { label: 'ITCSS', detail: 'Settings · Elements · Objects · Components · Utilities' },
    { label: 'SCSS', detail: 'Variables in primitive, semantic and component layers' },
    { label: 'Patterns', detail: 'Reusable components · Interaction behavior' },
  ];

  protected readonly referenceStack: string[] = ['HTML', 'SCSS', 'Handlebars'];

  protected readonly references: Reference[] = [
    { label: 'University of Nebraska System', url: 'https://nebraska.edu/', domain: 'nebraska.edu' },
    { label: 'Water for Food Global Institute', url: 'https://waterforfood.nebraska.edu/', domain: 'waterforfood.nebraska.edu' },
    { label: 'Buffett Early Childhood Institute', url: 'https://buffettinstitute.nebraska.edu/', domain: 'buffettinstitute.nebraska.edu' },
    { label: 'National Strategic Research Institute', url: 'https://nsri.nebraska.edu/', domain: 'nsri.nebraska.edu' },
    { label: 'Transfer Nebraska', url: 'https://transfer.nebraska.edu/', domain: 'transfer.nebraska.edu' },
  ];

  protected favicon(domain: string): string {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
  }
}
