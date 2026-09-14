import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ThemeService } from '../../theme.service';
import { showUnpublished } from '../../unpublished.content';

interface NavLink {
  path: string;
  fragment?: string;
  label: string;
  /** value used for active-state matching, mirrors the Make source */
  match: string;
}

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
})
export class Navigation {
  private router = inject(Router);
  protected readonly theme = inject(ThemeService);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly url = signal(this.router.url);

  // About is not ready to publish, so its route is dev-only. See unpublished.routes.ts.
  protected readonly links: NavLink[] = [
    { path: '/', fragment: 'work', label: 'Work', match: '/#work' },
    ...(showUnpublished ? [{ path: '/about', label: 'About', match: '/about' }] : []),
    { path: '/resume', label: 'Resume', match: '/resume' },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.url.set(this.router.url);
        this.updateScrolled(); // re-evaluate so returning to "/" at top starts dark
      });
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.updateScrolled();
  }

  private updateScrolled(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  protected toggleMobile(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  protected isActive(link: NavLink): boolean {
    const url = this.url();
    if (link.match === '/') {
      return url === '/';
    }
    if (link.match === '/#work') {
      return url === '/#work' || url.startsWith('/work');
    }
    return url.startsWith(link.path);
  }

  // A hairline appears under the header only once the page has moved.
  protected navClass(): string {
    return this.scrolled() ? 'border-b border-border' : 'border-b border-transparent';
  }




  protected linkClass(link: NavLink): string {
    const active = this.isActive(link);
    return active
      ? 'text-primary'
      : 'text-muted-foreground transition-colors hover:text-foreground';
  }

  protected mobileBtnClass(): string {
    return 'text-foreground hover:text-primary';
  }
}
