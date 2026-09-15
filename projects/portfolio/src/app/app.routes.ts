import { Routes } from '@angular/router';
import { seoFor } from '../seo/route-seo';
import { siteMetadata } from '../seo/site-metadata';
import { unpublishedRoutes } from './unpublished.routes';

// Lazy-load standalone components with loadComponent to reduce initial bundle.
//
// Helios is the flagship case study — the merged narrative (Penlink Design System
// spine + the "UX Doesn't Stop at Design" AI/design-to-code work as §07). The old
// standalone Penlink page is retired; the /work/penlink URL redirects here so any
// previously-shared links still resolve.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    ...seoFor('/'),
  },
  {
    path: 'resume',
    loadComponent: () => import('./components/resume/resume').then(m => m.Resume),
    ...seoFor('/resume'),
  },
  {
    path: 'work/helios',
    loadComponent: () => import('./components/work/helios-case-study').then(m => m.HeliosCaseStudy),
    ...seoFor('/work/helios'),
  },
  { path: 'work/penlink', redirectTo: 'work/helios', pathMatch: 'full' },
  {
    path: 'work/analysis-workflow',
    loadComponent: () => import('./components/work/analysis-workflow-case-study').then(m => m.AnalysisWorkflowCaseStudy),
    ...seoFor('/work/analysis-workflow'),
  },
  {
    path: 'work/nucleus',
    loadComponent: () => import('./components/work/nucleus-case-study').then(m => m.NucleusCaseStudy),
    ...seoFor('/work/nucleus'),
  },
  {
    path: 'work/orbit',
    loadComponent: () => import('./components/work/orbit-case-study').then(m => m.OrbitCaseStudy),
    ...seoFor('/work/orbit'),
  },
  { path: 'work/ai-design', redirectTo: 'work/orbit', pathMatch: 'full' },
  // Not ready to publish. Dev-only; see unpublished.routes.ts.
  ...unpublishedRoutes,
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound),
    title: siteMetadata.notFound.title,
    data: { meta: { ...siteMetadata.notFound, noIndex: true } },
  },
];
