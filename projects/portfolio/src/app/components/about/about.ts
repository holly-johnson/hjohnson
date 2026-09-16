import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { availability } from '../../availability';

interface AboutSection {
  /** Mono label above the section, house idiom. */
  label: string;
  heading: string;
  /** Paragraphs. Leave empty and the section renders as an unwritten placeholder. */
  body: string[];
}

interface SocialLink {
  label: string;
  url: string;
  href: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
})
export class About {
  protected readonly availability = availability;

  // Every line here traces to something Holly has said or to an entry already on
  // the resume. Leave a `body` empty and the section renders as a placeholder,
  // so nothing invented ships.
  // The title line under the name carries the label, so the lede leads with the
  // work instead of competing with it.
  protected readonly lede = [
    'Design systems and the production code underneath them.',
    'Most of that work has been investigative software: platforms where a finding has to carry its sources with it and still hold up years later.',
  ].join(' ');

  protected readonly sections: AboutSection[] = [
    {
      label: 'Background',
      heading: 'How I got here',
      body: [
        'Law came first. Legal Assistant in the Legal and Enforcement Division of the Nebraska Liquor Control Commission, preparing cases for the Assistant Attorney General and coordinating applicant background investigations, while on a pre-law track.',
        'Then in 2011 the agency redesigned its public website. That redesign redirected everything. Design and code arrived together rather than in sequence, which is why the titles that followed usually carried both words.',
        'Communications design at the Nebraska Department of Education came next. Then more than five years at the University of Nebraska System, as Web Designer / Developer and then Lead. NUcleus started there. Penlink followed, where the investigative products and Helios were the work.',
      ],
    },
    {
      label: 'Through-line',
      heading: 'What the work has in common',
      body: [
        'Law, history, investigative software, design systems. Four subjects, one instinct applied four times.',
        'The instinct is the durable record. A decision, a finding or a standard that still means the same thing years later, under challenge, after the people who made it have moved on.',
        'Investigative work makes that literal. A finding has to carry its sources and its reasoning, because someone will question it long after the analyst closed the case. A design system makes it structural. Encode a decision once, so the next team inherits it instead of reinterpreting it.',
      ],
    },
    {
      label: 'Practice',
      heading: 'How I work',
      body: [
        'Designer and developer, both, from the start. Design decisions get tested against the code that has to carry them. The handoff is short because there is less to hand off.',
        'The favorite part of the job is partnering with a leader who has a direction, then turning it into something a team can actually build. Figma architecture and token systems sit on one side, production Angular and SCSS on the other. Governance holds the middle: a contribution model, versioned releases and a roadmap teams can adopt without pausing feature work.',
        'AI belongs in that toolkit the way any other tool does. At Penlink that meant directing Claude through MCP to turn structured system information into production Angular. The same setup ran recurring adoption scans, so system debt stayed visible rather than buried. Half the design team was working that way by the end.',
      ],
    },
    {
      label: 'Accessibility',
      heading: 'Where it started',
      body: [
        'Accessibility arrived as law, not as craft. It was something to study on a pre-law track, before design or code entered the picture.',
        'Then it became practice. The state website work began with it rather than adding it afterward. Six years of teaching web design and front-end development meant teaching it too.',
        'Now it lives in the components. Focus management, ARIA, modal focus-trapping, localization and right-to-left support, built into shared infrastructure so a foundation-level fix reaches every product consuming it. Screen by screen is the expensive way to do it.',
      ],
    },
    {
      label: 'Beyond the work',
      heading: 'Outside of it',
      body: [
        'History, still and the law that started all of it. Heather Cox Richardson and Jack Smith testimony for fun. That interest never went anywhere. It just stopped being the career.',
        'Gardening. And a collection of crystals and gems that keeps growing.',
        "Mostly, though, time with my kids. They're the best of it.",
      ],
    },
  ];

  protected readonly links: SocialLink[] = [
    { label: 'LinkedIn', url: 'linkedin.com/in/holly-johnson-design', href: 'https://www.linkedin.com/in/holly-johnson-design' },
    { label: 'Email', url: 'hme2784@gmail.com', href: 'mailto:hme2784@gmail.com' },
  ];
}
