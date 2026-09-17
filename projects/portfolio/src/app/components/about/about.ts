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
    'I didn’t take a particularly straight path to product design.',
    'The work is finding the system inside a complicated problem, then building enough structure to make it hold.',
    'Then staying long enough to see what it does to the teams who inherit it.',
  ].join(' ');

  protected readonly sections: AboutSection[] = [
    {
      num: '01',
      heading: 'How I got here',
      body: [
        'Law came first. Then code. Then UX. Eventually, design systems gave a name to the kind of work I’d already been gravitating toward: understanding complicated things, finding the connections between them and creating enough structure to make the whole thing work better.',
        'A lot of my career has been spent designing investigative software. These are complex products with complex users, enormous amounts of information and workflows where context matters. I learned to get comfortable not knowing the answer right away. Ask questions. Follow the workflow. Talk to the people who know it best. Understand why something works the way it does before deciding how it should work.',
        'That way of thinking has stuck.',
      ],
    },
    {
      num: '02',
      heading: 'I tend to find the system inside the problem.',
      body: [
        'Give me a messy workflow, a collection of products that have grown apart or five teams solving versions of the same problem. I immediately want to understand how the pieces relate.',
        'That instinct is what pulled me toward design systems.',
        'What started as noticing inconsistencies in interfaces became much bigger questions about how teams build products together. How do design decisions make it into code? Where does intent get lost? What should be shared and what genuinely needs to be different? How do you create consistency without making every product the same?',
        'The components matter. The relationships around them matter more.',
        'My best work tends to happen in that space between design and engineering, where understanding both sides can turn a good idea into something teams can actually build, use and evolve.',
      ],
    },
    {
      num: '03',
      heading: 'The part after launch matters to me.',
      body: [
        'Building the foundation is satisfying. Seeing what happens to it is even more interesting.',
        'Did people adopt it? Did it solve the problem we thought it would? What broke when the next product came along? What did we learn from the first version that changes the second? Does the thing we built still make sense when three teams become thirty?',
        'I want those answers.',
        'I want enough ownership to see the consequences of the decisions I helped make and enough runway to do something with what we learn.',
      ],
    },
    {
      num: '04',
      heading: 'Accessibility started as law, not craft.',
      body: [
        'It arrived as something to study on a pre-law track, before design or code entered the picture.',
        'Then it became practice. The state website work began with it rather than adding it afterward. Six years of teaching web design and front-end development meant teaching it too.',
        'Now it lives in the components. Focus management, ARIA, modal focus-trapping, localization and right-to-left support, built into shared infrastructure so a foundation-level fix reaches every product consuming it. Screen by screen is the expensive way to do it.',
      ],
    },
    {
      num: '05',
      heading: 'There’s a person outside the product work, too.',
      body: [
        'I’m based in Lincoln, Nebraska, where life includes my husband, two kids, a garden that is always becoming some new experiment and a habit of getting involved when something in my community catches my attention.',
        'That curiosity follows me pretty much everywhere. I like understanding how things work, why they work that way and whether there might be a better way to do them.',
        'Sometimes that means digging into a product architecture. Sometimes it means organizing people around a community problem. Sometimes it means standing in my garden wondering why a cucumber has decided to take over an entire raised bed.',
        'Apparently, I have a type.',
      ],
    },
  ];

  protected readonly links: SocialLink[] = [
    { label: 'LinkedIn', url: 'linkedin.com/in/holly-johnson-design', href: 'https://www.linkedin.com/in/holly-johnson-design' },
    { label: 'Email', url: 'hme2784@gmail.com', href: 'mailto:hme2784@gmail.com' },
  ];
}
