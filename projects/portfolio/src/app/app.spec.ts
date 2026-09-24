import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navigation')).toBeTruthy();
  });

  /**
   * The shell owns the one `main` landmark and the skip link for the whole site,
   * so a page template must never add its own. These guard that: a second `main`
   * makes the landmark ambiguous, and a missing skip target breaks the link
   * silently, with nothing visible on screen to notice.
   */
  it('exposes exactly one main landmark, as the skip link target', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const mains = compiled.querySelectorAll('main');
    expect(mains.length).toBe(1);
    expect(mains[0].id).toBe('main-content');
    // Not a tab stop itself, but focusable so the skip actually lands.
    expect(mains[0].getAttribute('tabindex')).toBe('-1');
  });

  it('puts the skip link ahead of the navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const skip = compiled.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(skip).toBeTruthy();
    expect(skip!.getAttribute('href')).toBe('#main-content');

    // First focusable element in the document order, so Tab reaches it first.
    const firstFocusable = compiled.querySelector('a[href], button');
    expect(firstFocusable).toBe(skip);
  });
});
