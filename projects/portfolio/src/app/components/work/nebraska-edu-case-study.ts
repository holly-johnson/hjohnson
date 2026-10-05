import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TocItem {
  fragment: string;
  label: string;
}

interface Site {
  name: string;
  url?: string;
  domain?: string;
}

interface Shot {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-nebraska-edu-case-study',
  imports: [RouterLink],
  templateUrl: './nebraska-edu-case-study.html',
})
export class NebraskaEduCaseStudy {
  /** The nine approved brand expressions, in the order Holly listed them on 2026-10-04. */
  protected readonly brands: Site[] = [
    { name: 'University of Nebraska System', url: 'https://nebraska.edu/', domain: 'nebraska.edu' },
    { name: 'University of Nebraska High School', url: 'https://highschool.nebraska.edu/', domain: 'highschool.nebraska.edu' },
    { name: 'National Strategic Research Institute', url: 'https://nsri.nebraska.edu/', domain: 'nsri.nebraska.edu' },
    { name: 'Daugherty Water for Food Global Institute', url: 'https://waterforfood.nebraska.edu/', domain: 'waterforfood.nebraska.edu' },
    { name: 'Buffett Early Childhood Institute', url: 'https://buffettinstitute.nebraska.edu/', domain: 'buffettinstitute.nebraska.edu' },
    { name: 'Transfer Nebraska', url: 'https://transfer.nebraska.edu/', domain: 'transfer.nebraska.edu' },
    { name: 'Office of the President', url: 'https://nebraska.edu/president/', domain: 'nebraska.edu/president' },
    { name: 'Nebraska EPSCoR', url: 'https://epscor.nebraska.edu/', domain: 'epscor.nebraska.edu' },
    { name: 'Young Nebraska Scientists', url: 'https://yns.nebraska.edu/', domain: 'yns.nebraska.edu' },
  ];

  /** The gallery from the original case study, in its order. */
  protected readonly gallery: Shot[] = [
    { src: 'assets/work/nebraska-edu/gallery-01.webp', alt: 'NU Advance non-credit and professional development landing page' },
    { src: 'assets/work/nebraska-edu/gallery-02.webp', alt: 'NU Advance sections for bootcamps, credentials, masterclasses and resources' },
    { src: 'assets/work/nebraska-edu/gallery-03.webp', alt: 'University mission page with the road ahead and the history of the University' },
    { src: 'assets/work/nebraska-edu/gallery-04.webp', alt: 'Scholarship page with enrollment figures and student stories' },
    { src: 'assets/work/nebraska-edu/gallery-05.webp', alt: 'Online education page with campus cards and program statistics' },
    { src: 'assets/work/nebraska-edu/gallery-06.webp', alt: 'One University, four campuses: a campus overview page' },
    { src: 'assets/work/nebraska-edu/gallery-07.webp', alt: 'Leadership page for the University president and the five-year strategy' },
    { src: 'assets/work/nebraska-edu/gallery-08.webp', alt: 'Economic impact stories with featured podcast episodes' },
    { src: 'assets/work/nebraska-edu/gallery-09.webp', alt: 'Discovery research hero with a podcast series and research stories' },
    { src: 'assets/work/nebraska-edu/gallery-10.webp', alt: 'News and events page with media resources and upcoming events' },
    { src: 'assets/work/nebraska-edu/gallery-11.webp', alt: 'University-wide business services with policies and documents' },
    { src: 'assets/work/nebraska-edu/gallery-12.webp', alt: 'Provost office page with announcements and key contacts' },
  ];

  protected readonly toc: TocItem[] = [
    { fragment: 'problem', label: '01. A Shared Foundation' },
    { fragment: 'engagement', label: '02. A Repeatable Engagement' },
    { fragment: 'content', label: '03. Content to Shipped Page' },
    { fragment: 'library', label: '04. The Compounding Library' },
    { fragment: 'self-service', label: '05. Self-Service' },
    { fragment: 'impact', label: '06. Organizational Impact' },
    { fragment: 'brands', label: '07. Nine Brand Expressions' },
    { fragment: 'outlast', label: '08. Built to Outlast' },
    { fragment: 'reflection', label: 'Reflection' },
  ];
}
