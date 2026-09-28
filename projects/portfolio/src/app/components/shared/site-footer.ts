import { Component } from '@angular/core';

/**
 * The one site footer. It used to be copy-pasted into home, about and resume, which
 * left the case studies with no footer landmark at all. Rendering it once from
 * `app.html` puts it on every route instead.
 *
 * The middle line is the colophon. The site is the only Angular work a reader can
 * inspect directly, and nothing on it said so.
 */
@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="border-t border-border">
      <div
        class="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-8 gap-y-2 px-6 py-6 font-mono text-label text-muted-foreground lg:px-12"
      >
        <span>Holly Johnson &middot; 2026</span>
        <span>Designed and coded in Angular 21 and TypeScript</span>
        <span>hollyjohnson.design</span>
      </div>
    </footer>
  `,
})
export class SiteFooter {}
