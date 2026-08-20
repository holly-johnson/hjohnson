import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

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

  protected readonly mobileMenuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly url = signal(this.router.url);

  protected readonly links: NavLink[] = [
    { path: '/', label: 'Home', match: '/' },
    { path: '/', fragment: 'work', label: 'Work', match: '/#work' },
    { path: '/resume', label: 'Resume', match: '/resume' },
  ];

  // Dark only when sitting over the hero (home page, not yet scrolled)
  protected readonly isHome = computed(() => this.url().split(/[?#]/)[0] === '/');
  protected readonly isDark = computed(() => this.isHome() && !this.scrolled());

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

  // ── Conditional class strings (mirror the Make source's ternaries) ──

  protected navClass(): string {
    if (this.isDark()) return 'bg-transparent';
    return 'bg-background/95 backdrop-blur-sm';
  }

  protected logoBoxClass(): string {
    return this.isDark() ? 'bg-[#F2EEE9]' : 'bg-foreground';
  }

  protected logoInitialsClass(): string {
    return this.isDark() ? 'text-[#171513]' : 'text-background';
  }

  protected logoNameClass(): string {
    return this.isDark() ? 'text-[#F2EEE9]' : 'text-foreground';
  }

  protected linkClass(link: NavLink): string {
    const active = this.isActive(link);
    if (this.isDark()) {
      return active
        ? 'text-[#F2EEE9] font-semibold'
        : 'text-[#8B8B8B] font-medium hover:text-[#F2EEE9]';
    }
    return active
      ? 'text-[#1C1916] font-semibold'
      : 'text-[#6B7280] font-medium hover:text-[#1C1916]';
  }

  protected mobileBtnClass(): string {
    return this.isDark()
      ? 'text-[#F2EEE9] hover:text-[#D06A3D]'
      : 'text-foreground hover:text-[#B04318]';
  }
}
