import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Resume } from './components/resume/resume';
import { PenlinkCaseStudy } from './components/work/penlink-case-study';
import { AiDesignCaseStudy } from './components/work/ai-design-case-study';
import { AnalysisWorkflowCaseStudy } from './components/work/analysis-workflow-case-study';
import { NucleusCaseStudy } from './components/work/nucleus-case-study';
import { NotFound } from './components/not-found/not-found';

// Mirrors the Figma Make router (src/app/routes.ts). All four case studies are
// ported from the HJohnson-Design Make file.
export const routes: Routes = [
  { path: '', component: Home, title: 'Holly Johnson — UX Designer' },
  { path: 'resume', component: Resume, title: 'Resume — Holly Johnson' },
  { path: 'work/penlink', component: PenlinkCaseStudy, title: 'Penlink Design System — Holly Johnson' },
  { path: 'work/analysis-workflow', component: AnalysisWorkflowCaseStudy, title: 'Investigative Analysis Workflow — Holly Johnson' },
  { path: 'work/nucleus', component: NucleusCaseStudy, title: 'NUcleus Design System — Holly Johnson' },
  { path: 'work/ai-design', component: AiDesignCaseStudy, title: 'UX Doesn’t Stop at Design — Holly Johnson' },
  { path: '**', component: NotFound, title: 'Not Found — Holly Johnson' },
];
