import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon],
  template: `
    <div class="min-h-screen flex items-center justify-center px-6">
      <div class="text-center space-y-6">
        <div class="inline-block px-4 py-2 bg-foreground text-background mb-4">
          <span class="text-sm uppercase tracking-widest">404 Error</span>
        </div>
        <h1 class="text-6xl lg:text-8xl">Page Not Found</h1>
        <p class="text-xl text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors mt-8"
        >
          <app-icon name="home" [size]="20" />
          Back to Home
        </a>
      </div>
    </div>
  `,
})
export class NotFound {}
