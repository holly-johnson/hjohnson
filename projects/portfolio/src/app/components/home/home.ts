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

  /** Order is priority. Every card is the same size; Helios leads by position. */
  protected readonly projects: Project[] = [
    {
      id: 'helios',
      title: 'Helios',
      category: 'Design System',
      outcome: 'Design decisions shipped as production Angular components in an organization of more than 150 engineers.',
      capabilities: ['Design system architecture', 'Front-end development', 'AI-assisted tooling'],
      link: '/work/helios',
      visual: {
        kind: 'image',
        src: 'assets/work/home/helios-components.webp',
        width: 615,
        height: 462,
        fit: 'contain',
      },
    },
    {
      id: 'orbit',
      title: 'Orbit',
      category: 'AI-Assisted Product Development',
      outcome: 'A persistent workspace where the design team ran real features using Claude, with every prototype built from published Helios components.',
      capabilities: ['AI workflow design', 'Prototyping infrastructure', 'Design systems'],
      link: '/work/orbit',
      visual: {
        kind: 'orbit',
      },
    },
    {
      id: 'research',
      title: 'Investigative Workflow Research',
      category: 'Research',
      outcome: 'One shared picture of investigative work, placed in front of every team responsible for building it.',
      capabilities: ['Contextual research', 'Workflow modeling', 'Cross-functional alignment'],
      link: '/work/analysis-workflow',
      visual: {
        kind: 'workflow',
      },
    },
    {
      id: 'nucleus',
      title: 'NUcleus',
      category: 'Design System',
      outcome: 'A code-first design system that survived a CMS transition and remains in use after the original team changed.',
      capabilities: ['Product ownership', 'Design systems', 'Front-end architecture'],
      link: '/work/nucleus',
      visual: {
        kind: 'image',
        src: 'assets/work/home/nucleus-card.webp',
        width: 1680,
        height: 954,
      },
    },
    {
      id: 'theorem',
      title: 'Theorem',
      category: 'Product Design',
      outcome: 'Student needs shaped the replacement for a decades-old learning management system.',
      capabilities: ['Product design', 'Research', 'Front-end prototyping'],
      link: '/work/theorem',
      visual: {
        kind: 'image',
        src: 'assets/work/theorem/lesson.webp',
        width: 1600,
        height: 792,
        position: 'left top',
        chrome: true,
      },
    },
  ];

  /**
   * Work that is not ready to publish is appended from a module the production build
   * swaps for an empty one. See unpublished.content.ts.
   */
  protected readonly published: Project[] = [...this.projects, ...unpublishedProjects];

  /** A card whose image was cropped for it: shown whole, in a 4:3 box. */
  protected contained(project: Project): boolean {
    return project.visual.kind === 'image' && project.visual.fit === 'contain';
  }

  /** The six stages of the investigative workflow model, drawn small on the research card. */
  protected readonly workflowStages = ['Query', 'Collect', 'Analyze', 'Map', 'Visualize', 'Report'];

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
