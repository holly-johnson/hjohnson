import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stub',
  imports: [RouterLink],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-background pt-20 px-6">
      <div class="max-w-md text-center">
        <div class="font-mono text-xs text-[#7A2C10] mb-3">// coming soon</div>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Case study in progress
        </h1>
        <p class="text-muted-foreground mb-8">
          This case study is being written up. In the meantime, take a look at the
          Penlink Design System or get in touch.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            routerLink="/work/penlink"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#B04318] text-[#F2EEE9] hover:bg-[#913615] transition-colors font-medium border border-[#913615]"
          >
            View Penlink case study
          </a>
          <a
            routerLink="/"
            class="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-secondary/40 transition-colors font-medium"
          >
            Back home
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Stub {}
