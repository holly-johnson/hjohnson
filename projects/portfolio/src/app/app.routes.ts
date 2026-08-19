import { Routes } from '@angular/router';

// Lazy-load standalone components with loadComponent to reduce initial bundle.
//
// Helios is the flagship case study — the merged narrative (Penlink Design System
// spine + the "UX Doesn't Stop at Design" AI/design-to-code work as §07). The old
// standalone Penlink page is retired; the /work/penlink URL redirects here so any
// previously-shared links still resolve.
export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.Home), title: 'Holly Johnson — UX Designer' },
  { path: 'resume', loadComponent: () => import('./components/resume/resume').then(m => m.Resume), title: 'Resume — Holly Johnson' },
  { path: 'work/helios', loadComponent: () => import('./components/work/helios-case-study').then(m => m.HeliosCaseStudy), title: 'Helios — Holly Johnson' },
  { path: 'work/penlink', redirectTo: 'work/helios', pathMatch: 'full' },
  { path: 'work/analysis-workflow', loadComponent: () => import('./components/work/analysis-workflow-case-study').then(m => m.AnalysisWorkflowCaseStudy), title: 'Investigative Analysis Workflow — Holly Johnson' },
  { path: 'work/nucleus', loadComponent: () => import('./components/work/nucleus-case-study').then(m => m.NucleusCaseStudy), title: 'NUcleus Design System — Holly Johnson' },
  // Orbit — case-study scaffold (WIP). Reachable directly and linked from Helios §05; not yet featured on the homepage.
  { path: 'work/orbit', loadComponent: () => import('./components/work/orbit-case-study').then(m => m.OrbitCaseStudy), title: 'Orbit — Holly Johnson' },
  { path: 'work/ai-design', redirectTo: 'work/helios', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound), title: 'Not Found — Holly Johnson' },
];
