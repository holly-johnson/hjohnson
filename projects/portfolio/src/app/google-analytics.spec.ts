import { injectGoogleAnalytics } from './google-analytics';

describe('injectGoogleAnalytics', () => {
  afterEach(() => {
    document.head.querySelectorAll('script[data-ga-measurement-id]').forEach((el) => el.remove());
  });

  it('injects nothing when no measurement id is configured', () => {
    expect(injectGoogleAnalytics(document, '')).toBeNull();
    expect(document.head.querySelector('script[data-ga-measurement-id]')).toBeNull();
  });

  it('injects nothing when the host is not on the allowlist', () => {
    expect(
      injectGoogleAnalytics(document, 'G-TEST123', 'https://www.googletagmanager.com/gtag/js', 'hollyjohnson.design'),
    ).toBeNull();
    expect(document.head.querySelector('script[data-ga-measurement-id]')).toBeNull();
  });

  it('injects an async loader carrying the measurement id', () => {
    const script = injectGoogleAnalytics(document, 'G-TEST123', 'https://www.googletagmanager.com/gtag/js', '');

    expect(script).not.toBeNull();
    expect(script!.async).toBe(true);
    expect(script!.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123');
    expect(script!.getAttribute('data-ga-measurement-id')).toBe('G-TEST123');
  });

  it('configures the measurement id in a dataLayer bootstrap', () => {
    injectGoogleAnalytics(document, 'G-TEST123', 'https://www.googletagmanager.com/gtag/js', '');

    const bootstrap = document.head.querySelector('script[data-ga-measurement-id] + script');
    expect(bootstrap!.textContent).toContain('window.dataLayer = window.dataLayer || []');
    expect(bootstrap!.textContent).toContain("gtag('config', 'G-TEST123')");
  });

  it('does not add a second tag when one is already present', () => {
    injectGoogleAnalytics(document, 'G-TEST123', 'https://www.googletagmanager.com/gtag/js', '');
    expect(injectGoogleAnalytics(document, 'G-TEST123', 'https://www.googletagmanager.com/gtag/js', '')).toBeNull();
    expect(document.head.querySelectorAll('script[data-ga-measurement-id]').length).toBe(1);
  });
});
