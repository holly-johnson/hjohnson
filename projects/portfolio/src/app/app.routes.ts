import { Routes } from '@angular/router';

// Lazy-load standalone components with loadComponent to reduce initial bundle.
//
// Helios is the flagship case study. It currently renders the existing Penlink
// case-study component as an INTERIM page — the real Helios narrative (merging in
// "UX Doesn't Stop at Design") is the next task. The old /work/penlink URL
// redirects here so existing links still resolve.
export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.Home), title: 'Holly Johnson — UX Designer' },
  { path: 'resume', loadComponent: () => import('./components/resume/resume').then(m => m.Resume), title: 'Resume — Holly Johnson' },
  { path: 'work/helios', loadComponent: () => import('./components/work/penlink-case-study').then(m => m.PenlinkCaseStudy), title: 'Helios — Holly Johnson' },
  { path: 'work/penlink', redirectTo: 'work/helios', pathMatch: 'full' },
  { path: 'work/analysis-workflow', loadComponent: () => import('./components/work/analysis-workflow-case-study').then(m => m.AnalysisWorkflowCaseStudy), title: 'Investigative Analysis Workflow — Holly Johnson' },
  { path: 'work/nucleus', loadComponent: () => import('./components/work/nucleus-case-study').then(m => m.NucleusCaseStudy), title: 'NUcleus Design System — Holly Johnson' },
  { path: 'work/ai-design', loadComponent: () => import('./components/work/ai-design-case-study').then(m => m.AiDesignCaseStudy), title: 'UX Doesn’t Stop at Design — Holly Johnson' },
  { path: '**', loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound), title: 'Not Found — Holly Johnson' },
];
