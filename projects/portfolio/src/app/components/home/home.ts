import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PenlinkDiagram } from './diagrams/penlink-diagram';
import { NucleusDiagram } from './diagrams/nucleus-diagram';
import { AiDiagram } from './diagrams/ai-diagram';
import { AnalysisDiagram } from './diagrams/analysis-diagram';

interface Approach {
  num: string;
  title: string;
  desc: string;
}

interface Metric {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  discipline: string[];
  role: string;
  description: string;
  impact: string;
  link: string;
  /** Case study is fully built; unfinished ones render as non-clickable cards. */
  ready: boolean;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, PenlinkDiagram, NucleusDiagram, AiDiagram, AnalysisDiagram],
  templateUrl: './home.html',
})
export class Home {
  protected readonly metrics: Metric[] = [
    { label: 'years_exp', value: '15+' },
    { label: 'brands_unified', value: '9+' },
    { label: 'platforms', value: '20+' },
    { label: 'systems_led', value: '2' },
  ];

  protected readonly social = {
    linkedin: 'https://www.linkedin.com/in/holly-johnson-27336129/',
    email: 'mailto:hme2784@gmail.com',
  };

  protected readonly approach: Approach[] = [
    { num: '01', title: 'Systems First', desc: 'Products scale when built from coherent systems rather than isolated features.' },
    { num: '02', title: 'Clarity Over Complexity', desc: 'Design should organize complex tools so people can focus on their work.' },
    { num: '03', title: 'Design That Ships', desc: 'Strong design translates cleanly into implementation through shared components.' },
    { num: '04', title: 'Collaborative by Design', desc: 'Great products emerge when design and engineering work closely together.' },
    { num: '05', title: 'Evolving the Craft', desc: 'AI is reshaping our tools. Responsible design must guide their use.' },
    { num: '06', title: 'Design for Good', desc: 'The systems we build should make the world better.' },
  ];

  protected readonly projects: Project[] = [
    {
      id: '1',
      title: 'Penlink Design System',
      discipline: ['Design Systems', 'Product UX'],
      role: 'Lead UX Designer',
      description: 'Created a design system aligning multiple investigative products under a consistent UI and scalable component architecture.',
      impact: 'Established a shared foundation that improved consistency across investigative tools and enabled faster feature development.',
      link: '/work/penlink',
      ready: true,
    },
    {
      id: '2',
      title: "UX Doesn't Stop at Design",
      discipline: ['Design Systems', 'Engineering Collab'],
      role: 'UX Engineer · Exploration',
      description: 'Bridging design systems and front-end through AI-assisted workflows to improve speed, alignment, and system integrity.',
      impact: 'Demonstrated a potential future workflow where design systems can move more directly from design architecture into engineering implementation.',
      link: '/work/ai-design',
      ready: true,
    },
    {
      id: '3',
      title: 'Investigative Analysis Workflow',
      discipline: ['Product UX', 'Data Interfaces'],
      role: 'UX Designer',
      description: 'Designed dashboards and exploration workflows that help analysts navigate complex datasets and generate investigative insights.',
      impact: 'Reduced cognitive load for analysts by organizing complex data into clearer workflows that support faster investigative analysis.',
      link: '/work/analysis-workflow',
      ready: true,
    },
    {
      id: '4',
      title: 'NUcleus Design System',
      discipline: ['Design Systems', 'Front-End Integration'],
      role: 'Product Owner · Lead Designer',
      description: 'Created and led a design system supporting 9 university brands and more than 20 websites and applications.',
      impact: 'Unified the university’s digital ecosystem while reducing reliance on external contractors by enabling internal teams to build and maintain sites more efficiently.',
      link: '/work/nucleus',
      ready: true,
    },
  ];
}
