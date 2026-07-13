import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Resume } from './components/resume/resume';
import { Stub } from './components/stub/stub';
import { NotFound } from './components/not-found/not-found';

// Mirrors the Figma Make router (src/app/routes.ts). Home + Resume are built;
// the four case studies are stubs until they're ported.
export const routes: Routes = [
  { path: '', component: Home, title: 'Holly Johnson — UX Designer' },
  { path: 'resume', component: Resume, title: 'Resume — Holly Johnson' },
  { path: 'work/penlink', component: Stub, title: 'Penlink Design System — Holly Johnson' },
  { path: 'work/analysis-workflow', component: Stub, title: 'Investigative Analysis Workflow — Holly Johnson' },
  { path: 'work/nucleus', component: Stub, title: 'NUcleus Design System — Holly Johnson' },
  { path: 'work/ai-design', component: Stub, title: 'UX Doesn’t Stop at Design — Holly Johnson' },
  { path: '**', component: NotFound, title: 'Not Found — Holly Johnson' },
];
