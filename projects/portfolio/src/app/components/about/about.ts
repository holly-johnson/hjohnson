import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { availability } from '../../availability';

interface AboutSection {
  /** Section number in the mono rail, the same idiom the case studies use. */
  num: string;
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
  // The h1 carries the through-line, so the lede picks up where it lands rather
  // than restating it. The title line under the name carries the role label.
  protected readonly lede = [
    'I’ve always loved learning, solving problems and finding ways to help the people around me.',
    'For a long time, I thought law would be how I did that. I was fascinated by it, but I also saw it as a way to serve my community and take some responsibility for how the systems around me work.',
    'Then I started learning the web.',
    'Yes, with Adobe Dreamweaver.',
    'But learning the web was never really about learning the web. It gave me a way to solve problems I already cared about. How could this be easier for someone? How could we get people the information they needed? How could technology help an organization serve them better?',
    'The tools changed as I learned more. The questions really haven’t.',
  ];

  protected readonly sections: AboutSection[] = [
    {
      num: '01',
      heading: 'The website that changed my career',
      body: [
        'My first career was in the Legal and Enforcement Division of the Nebraska Liquor Control Commission. I prepared cases for the Assistant Attorney General and coordinated background investigations with the Nebraska State Patrol. I was on a pre-law track and expected law to be the work.',
        'Accessibility entered the picture there as law first. I learned about Section 508 and the ADA before I knew much about design or code.',
        'Then the agency redesigned its public website.',
        'I got involved, started learning how the web worked and discovered that design and code gave me another way to solve the kinds of problems I already cared about. We also consulted with the Nebraska Commission for the Blind and Visually Impaired about how blind people actually used our websites. It made accessibility tangible in a way reading the requirements couldn’t.',
        'That website changed the direction of my career.',
        'Design and code arrived together, and they’ve stayed together ever since.',
      ],
    },
    {
      num: '02',
      heading: 'Complex products need more than good screens.',
      body: [
        'What followed was years of building for the web, including six years teaching web design and front-end development while working in the field myself. My work stayed close to public service through government and education, while the problems I was solving grew from websites into increasingly complex products.',
        'Eventually, that brought me back surprisingly close to where I started: law, investigations and evidence, this time through software.',
        'Investigative products brought enormous amounts of information, specialized users and workflows where context matters. You can’t understand that kind of work from a requirements document alone.',
        'Ask questions. Follow the workflow. Sit with the people doing the work. Understand why something works the way it does before deciding how it should work.',
        'That’s still how I approach complex products today.',
      ],
    },
    {
      num: '03',
      heading: 'Sometimes the system is the problem.',
      body: [
        'Give me a collection of products that have grown apart or five teams solving versions of the same problem, and I want to understand how the pieces relate.',
        'That’s what pulled me toward design systems.',
        'What started as inconsistencies in interfaces quickly became bigger questions about how teams build software together. How do design decisions make it into code? Where does intent get lost? What should be shared and what genuinely needs to be different? How do you create consistency without making every product the same?',
        'That’s also where all those years of code became useful in a different way.',
        'My best work tends to happen in the space between design and engineering, where product thinking, design and implementation meet. Components and tokens are part of that work, but the goal is bigger: creating a foundation that helps teams build better products together.',
      ],
    },
    {
      num: '04',
      heading: 'The part after launch matters.',
      body: [
        'Building something is only the beginning.',
        'Did people adopt it? Did it actually make their work easier? What broke when the next product came along? What did we learn from the first version that should change the second? Does something built for three teams still work for thirty?',
        'I want those answers.',
        'I want enough ownership to see the consequences of the decisions I helped make and enough runway to do something with what we learn.',
        'The next version is usually more interesting to me than the first.',
      ],
    },
    {
      num: '05',
      heading: 'Accessibility has been there from the beginning.',
      body: [
        'Accessibility is one of the few threads that reaches all the way back to my first career.',
        'It started with law. Then it became something I had to understand as a person building for the web. Later, I taught it. Product design brought it into increasingly complex experiences, and design systems gave me a way to address it at scale.',
        'Today, focus management, semantic structure, ARIA, keyboard behavior, localization and right-to-left support can be built into shared foundations instead of solved again on every screen.',
        'A foundation-level improvement can reach every product that inherits it.',
        'That’s the kind of scale I like.',
      ],
    },
    {
      num: '06',
      heading: 'It still comes back to people.',
      body: [
        'Better technology can make a team faster. It can make an organization more efficient. It can help people find information, understand something complicated or spend less time fighting with the software they need to do their jobs.',
        'In government and education, those improvements reach even further. Better software can help public institutions make better use of limited resources and be more responsible with the time and money people have entrusted to them.',
        'That mattered to me before I knew how to build any of it.',
        'It still does.',
      ],
    },
    {
      num: '07',
      heading: 'Outside the product work',
      body: [
        'I’m based in Lincoln, Nebraska, with my husband, two kids and a garden that is always becoming some new experiment.',
        'The question-asking doesn’t stop when I close my laptop. When something catches my attention, I tend to want to understand it and, usually, do something with what I learn.',
        'Sometimes that means getting involved in my community. Sometimes it means starting a new project. Sometimes it means standing in my garden debating whether I should, once again, give the tomatoes more square footage.',
        'Apparently, curiosity is a permanent condition.',
      ],
    },
  ];

  protected readonly links: SocialLink[] = [
    { label: 'LinkedIn', url: 'linkedin.com/in/holly-johnson-design', href: 'https://www.linkedin.com/in/holly-johnson-design' },
    { label: 'Email', url: 'hme2784@gmail.com', href: 'mailto:hme2784@gmail.com' },
  ];
}
