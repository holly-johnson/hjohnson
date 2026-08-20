import { Routes } from '@angular/router';

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
    title: 'Holly Johnson — Product Designer & Design Systems Lead',
    data: {
      meta: {
        description: 'Product designer and design systems lead turning complex product needs into shared systems that connect design and production.',
        image: '/assets/social/home.png',
      },
    },
  },
  {
    path: 'resume',
    loadComponent: () => import('./components/resume/resume').then(m => m.Resume),
    title: 'Resume — Holly Johnson',
    data: {
      meta: {
        description: 'Holly Johnson is a product designer and design systems lead experienced in complex product UX, production Angular systems, and multi-brand platforms.',
        image: '/assets/social/resume.png',
      },
    },
  },
  {
    path: 'work/helios',
    loadComponent: () => import('./components/work/helios-case-study').then(m => m.HeliosCaseStudy),
    title: 'Helios Design System — Holly Johnson',
    data: {
      meta: {
        description: 'How Holly Johnson built a Figma-to-Angular product foundation that helped four designers scale decisions across more than 150 engineers.',
        image: '/assets/social/helios.png',
      },
    },
  },
  { path: 'work/penlink', redirectTo: 'work/helios', pathMatch: 'full' },
  {
    path: 'work/analysis-workflow',
    loadComponent: () => import('./components/work/analysis-workflow-case-study').then(m => m.AnalysisWorkflowCaseStudy),
    title: 'Investigative Workflow Research — Holly Johnson',
    data: {
      meta: {
        description: 'Research mapping how investigators query, collect, analyze, connect, visualize, document, and report across fragmented product workflows.',
        image: '/assets/social/investigative-workflow.png',
      },
    },
  },
  {
    path: 'work/nucleus',
    loadComponent: () => import('./components/work/nucleus-case-study').then(m => m.NucleusCaseStudy),
    title: 'NUcleus Design System — Holly Johnson',
    data: {
      meta: {
        description: 'A reusable design and front-end system supporting nine university brands across more than 20 websites and applications.',
        image: '/assets/social/nucleus.png',
      },
    },
  },
  // Orbit — case-study scaffold (WIP). Route retired until the case study is finished so the
  // draft placeholders can't surface via a shared or guessed URL. Component file kept in place.
  { path: 'work/ai-design', redirectTo: 'work/helios', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound),
    title: 'Not Found — Holly Johnson',
    data: { meta: { description: 'The requested page could not be found.', image: '/assets/social/home.png', noIndex: true } },
  },
];
