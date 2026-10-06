import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project } from '../../project.model';
import { unpublishedProjects } from '../../unpublished.content';
import { availability } from '../../availability';

/**
 * Quoted verbatim from LinkedIn recommendations, read 2026-09-28. Punctuation is theirs,
 * including Jackie's serial comma. An ellipsis marks every place words were left out.
 */
interface ColleagueQuote {
  quote: string;
  name: string;
  title: string;
  org: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly availability = availability;

  protected readonly social = {
    linkedin: 'https://www.linkedin.com/in/holly-johnson-design/',
    email: 'mailto:hme2784@gmail.com',
  };

  /** Every quote card opens the recommendations list, where all six of them are. */
  protected readonly recommendationsUrl = `${this.social.linkedin}details/recommendations/`;

  /** Order is priority. Every card is the same size; Helios leads by position. */
  protected readonly projects: Project[] = [
    {
      id: 'helios',
      title: 'Helios',
      category: 'Design System',
      outcome: 'A cross-platform design system connecting a shared Figma library to production Angular components, desktop specifications and AI-assisted prototyping.',
      capabilities: ['Design system architecture', 'Front-end development', 'AI-assisted tooling'],
      link: '/work/helios',
      visual: {
        kind: 'image',
        src: 'assets/work/home/helios-hero-card.webp',
        width: 1536,
        height: 895,
        fit: 'framed',
      },
    },
    {
      id: 'nucleus',
      title: 'NUcleus',
      category: 'Design System',
      outcome: 'A code-first design system that survived a CMS transition and remains in use after the original team changed.',
      capabilities: ['Product direction', 'Design systems', 'Front-end architecture'],
      link: '/work/nucleus',
      visual: {
        kind: 'image',
        src: 'assets/work/home/nucleus-card.webp',
        width: 1536,
        height: 895,
        fit: 'framed',
      },
    },
    {
      id: 'nebraska-edu',
      title: 'Nebraska.edu',
      category: 'Web Platform Practice',
      outcome: 'A repeatable web-platform practice that gave distinct university brands a shared foundation and marketing teams the tools to run their own sites.',
      capabilities: ['Information architecture', 'Content strategy', 'Sitecore'],
      link: '/work/nebraska-edu',
      visual: {
        kind: 'image',
        src: 'assets/work/home/nebraska-edu-card.webp',
        width: 1536,
        height: 895,
        fit: 'framed',
      },
    },
    {
      id: 'research',
      title: 'Investigative Workflow Research',
      category: 'Research',
      outcome: 'A shared model of investigative work that exposed cross-product overlap, surfaced gaps and aligned teams around how each product should support the broader investigative flow.',
      capabilities: ['Contextual research', 'Workflow modeling', 'Cross-functional alignment'],
      link: '/work/analysis-workflow',
      visual: {
        kind: 'image',
        src: 'assets/work/home/workflow-card.webp',
        width: 1536,
        height: 895,
        fit: 'framed',
      },
    },
    {
      id: 'orbit',
      title: 'Orbit',
      category: 'AI-Assisted Product Development',
      outcome: 'An internal AI-assisted workspace that kept each feature’s documentation and working prototype together, with prototypes built in code from published Helios components.',
      capabilities: ['AI workflow design', 'Prototyping infrastructure', 'Design systems'],
      link: '/work/orbit',
      visual: {
        kind: 'image',
        src: 'assets/work/home/orbit-card.webp',
        srcDark: 'assets/work/home/orbit-card-dark.webp',
        width: 1536,
        height: 895,
        fit: 'framed',
      },
    },
    {
      id: 'theorem',
      title: 'Theorem',
      category: 'Product Design',
      outcome: 'A decades-old learning platform rebuilt around observed workflows and usage data, creating the application patterns that became NUcleus for Apps.',
      capabilities: ['Product design', 'Research', 'Front-end prototyping'],
      link: '/work/theorem',
      visual: {
        kind: 'image',
        src: 'assets/work/home/theorem-card.webp',
        width: 1536,
        height: 895,
        fit: 'framed',
      },
    },
  ];

  /**
   * Work that is not ready to publish is slotted in after Nebraska.edu, from a module the
   * production build swaps for an empty one. See unpublished.content.ts.
   */
  protected readonly published: Project[] = [
    ...this.projects.slice(0, 3),
    ...unpublishedProjects,
    ...this.projects.slice(3),
  ];

  /** A shot that brought its own window: shown whole, with no panel tone behind it. */
  protected framed(project: Project): boolean {
    return project.visual.kind === 'image' && project.visual.fit === 'framed';
  }

  protected readonly quotes: ColleagueQuote[] = [
    {
      // The bracketed subject is the only word not his: the source sentence carries on
      // from the clause before it, which is elided here.
      quote: '… She was also the first person in our UX group to treat AI as a working tool rather than a novelty. [She] built new integrations into the tools we already used, Figma among them, so the gains showed up in everyday work instead of in a demo. …',
      name: 'Christian Natis',
      title: 'Head of Canadian R&D',
      org: 'Penlink',
    },
    {
      quote: "… Holly noticed that Nebraska.edu didn't use a design system and pitched it for efficiency and consistency. When I bought off on the idea, she designed, implemented, and maintained the design system and has managed it over the past several years. …",
      name: 'Jackie M. Ostrowicki',
      title: 'Chief Marketing Officer',
      org: 'University of Nebraska System',
    },
    {
      // His closing sentence is about personality rather than the work, so it is left
      // out. The other two cards carry substance only and this one should match.
      quote: 'Holly was instrumental in bringing front-end development skills and processes to our team. Her expertise, knowledge and leadership skills were vital in developing a design system for the University of Nebraska. …',
      name: 'Eric Zoz',
      title: 'Senior Web Developer',
      org: 'University of Nebraska',
    },
  ];
}
