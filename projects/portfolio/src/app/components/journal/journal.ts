import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ReadingLink {
  title: string;
  author: string;
  source: string;
  url: string;
  note: string;
  topic: string;
  image?: string;
  imageAlt?: string;
}

@Component({
  selector: 'app-journal',
  imports: [RouterLink],
  templateUrl: './journal.html',
})
export class Journal {
  protected readonly reading: ReadingLink[] = [
    {
      title: 'AI makes it easier to design—not easier to be a designer',
      author: 'Zander Whitehurst',
      source: 'LinkedIn',
      url: 'https://lnkd.in/p/gAdBCFWE',
      note: 'A sharp visual argument for why faster interface production does not replace product judgment, context, or the work of solving the right problem.',
      topic: 'AI + design',
      image: 'https://media.licdn.com/dms/image/v2/D4E22AQFO8EwyHrOYjA/feedshare-shrink_800/B4EaAP1vp.IkAc-/0/1786972142575?e=2147483647&v=beta&t=0UK-HS3Wfgyh-sFMSyOwXEGDlTpXD2IWbK5QvYoGLJs',
      imageAlt: 'Editorial graphic about the distinction between generating a user interface and doing the work of design',
    },
    {
      title: "The Web's Grain",
      author: 'Frank Chimero',
      source: 'frankchimero.com',
      url: 'https://frankchimero.com/blog/2015/the-webs-grain/',
      note: 'A lasting argument for designing with the web’s natural materials instead of forcing it to imitate another medium.',
      topic: 'Design craft',
    },
    {
      title: 'The Expanding Dark Forest and Generative AI',
      author: 'Maggie Appleton',
      source: 'maggieappleton.com',
      url: 'https://maggieappleton.com/ai-dark-forest',
      note: 'A thoughtful look at trust, identity, and what human-made work means in an internet full of generated content.',
      topic: 'AI + culture',
    },
    {
      title: 'Design Systems are for People',
      author: 'Amy Hupe',
      source: 'amyhupe.co.uk',
      url: 'https://amyhupe.co.uk/articles/design-systems-are-for-people/',
      note: 'A useful reminder that a design system succeeds through the people and relationships around it—not the library alone.',
      topic: 'Design systems',
    },
  ];
}
