import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Stub } from './components/stub/stub';

// Mirrors the Figma Make router (src/app/routes.ts). Home is built (Phase 1);
// Resume + the four case studies are stubs until later phases.
export const routes: Routes = [
  { path: '', component: Home, title: 'Holly Johnson — UX Designer' },
  { path: 'resume', component: Stub, title: 'Resume — Holly Johnson' },
  { path: 'work/penlink', component: Stub, title: 'Penlink Design System — Holly Johnson' },
  { path: 'work/analysis-workflow', component: Stub, title: 'Investigative Analysis Workflow — Holly Johnson' },
  { path: 'work/nucleus', component: Stub, title: 'NUcleus Design System — Holly Johnson' },
  { path: 'work/ai-design', component: Stub, title: 'UX Doesn’t Stop at Design — Holly Johnson' },
  { path: '**', component: Stub, title: 'Not Found — Holly Johnson' },
];
