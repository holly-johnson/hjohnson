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

interface SiteGroup {
  label: string;
  sites: Site[];
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
  /**
   * The site lists from the original Squarespace case study, written in 2022. Buffett sat
   * on the roadmap then; it launched on NUcleus later and is confirmed among the nine.
   */
  protected readonly siteGroups: SiteGroup[] = [
    {
      label: 'Subdomains',
      sites: [
        { name: 'Enterprise Data Solutions' },
        { name: 'Digital Learning', url: 'https://online.nebraska.edu/', domain: 'online.nebraska.edu' },
        { name: 'Information Technology Services' },
        { name: 'Young Nebraska Scientists', url: 'https://yns.nebraska.edu/', domain: 'yns.nebraska.edu' },
        { name: 'Nebraska Research & Innovation Conference' },
        { name: 'Transfer Nebraska', url: 'https://transfer.nebraska.edu/', domain: 'transfer.nebraska.edu' },
        { name: 'NU Connections' },
      ],
    },
    {
      label: 'Institutes',
      sites: [
        { name: 'National Strategic Research Institute', url: 'https://nsri.nebraska.edu/', domain: 'nsri.nebraska.edu' },
        { name: 'Daugherty Water for Food Global Institute', url: 'https://waterforfood.nebraska.edu/', domain: 'waterforfood.nebraska.edu' },
        { name: 'Buffett Early Childhood Institute', url: 'https://buffettinstitute.nebraska.edu/', domain: 'buffettinstitute.nebraska.edu' },
      ],
    },
    {
      label: 'On the roadmap',
      sites: [
        { name: 'Established Program to Stimulate Competitive Research (EPSCoR)' },
        { name: 'University of Nebraska High School' },
      ],
    },
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
    { fragment: 'role', label: '01. My Role' },
    { fragment: 'kickoff', label: '02. Kickoff and Brief' },
    { fragment: 'mapping', label: '03. Content Mapping' },
    { fragment: 'build', label: '04. Build and Iterate' },
    { fragment: 'sites', label: '05. Sites' },
  ];
}
