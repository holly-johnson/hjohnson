import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Navigation } from './components/navigation/navigation';

interface RouteMeta {
  description: string;
  image: string;
  noIndex?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.updateRouteMetadata(event.urlAfterRedirects));
  }

  private updateRouteMetadata(url: string): void {
    let snapshot = this.route.snapshot;
    while (snapshot.firstChild) snapshot = snapshot.firstChild;

    const routeMeta = snapshot.data['meta'] as RouteMeta | undefined;
    if (!routeMeta) return;

    const origin = this.document.location?.origin ?? '';
    const path = url.split(/[?#]/)[0] || '/';
    const canonicalUrl = `${origin}${path}`;
    const imageUrl = `${origin}${routeMeta.image}`;
    const pageTitle = snapshot.title ?? this.document.title;

    this.meta.updateTag({ name: 'description', content: routeMeta.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Holly Johnson' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: routeMeta.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: routeMeta.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'robots', content: routeMeta.noIndex ? 'noindex, nofollow' : 'index, follow' });
    this.setCanonical(canonicalUrl);
  }

  private setCanonical(href: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = href;
  }
}
