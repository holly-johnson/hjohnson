import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

export type ThemePreference = 'system' | 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly preferenceState = signal<ThemePreference>('system');
  private readonly systemIsDark = signal(false);
  private mediaQuery?: MediaQueryList;

  readonly preference = this.preferenceState.asReadonly();
  readonly resolvedTheme = computed<'light' | 'dark'>(() => {
    const preference = this.preferenceState();
    return preference === 'system' ? (this.systemIsDark() ? 'dark' : 'light') : preference;
  });

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemIsDark.set(this.mediaQuery.matches);

    const saved = window.localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      this.preferenceState.set(saved);
    }

    this.applyTheme();
    this.mediaQuery.addEventListener('change', (event) => {
      this.systemIsDark.set(event.matches);
      if (this.preferenceState() === 'system') this.applyTheme();
    });
  }

  cycle(): void {
    const current = this.preferenceState();
    const next: ThemePreference = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
    this.preferenceState.set(next);
    window.localStorage.setItem('portfolio-theme', next);
    this.applyTheme();
  }

  private applyTheme(): void {
    const dark = this.resolvedTheme() === 'dark';
    this.document.documentElement.classList.toggle('dark', dark);
    this.document.documentElement.style.colorScheme = dark ? 'dark' : 'light';

    const meta = this.document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    meta?.setAttribute('content', dark ? '#151515' : '#FAF8F4');
  }
}
