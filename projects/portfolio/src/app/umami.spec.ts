import { injectUmami } from './umami';

describe('injectUmami', () => {
  afterEach(() => {
    document.head.querySelectorAll('script[data-website-id]').forEach((el) => el.remove());
  });

  it('injects nothing when no website id is configured', () => {
    expect(injectUmami(document, '')).toBeNull();
    expect(document.head.querySelector('script[data-website-id]')).toBeNull();
  });

  it('injects a deferred tracker carrying the id and the domain allowlist', () => {
    const script = injectUmami(document, 'abc-123', 'https://cloud.umami.is/script.js', 'hollyjohnson.design');

    expect(script).not.toBeNull();
    expect(script!.defer).toBe(true);
    expect(script!.getAttribute('data-website-id')).toBe('abc-123');
    expect(script!.getAttribute('data-domains')).toBe('hollyjohnson.design');
    expect(document.head.querySelectorAll('script[data-website-id]').length).toBe(1);
  });

  it('does not add a second tracker when one is already present', () => {
    injectUmami(document, 'abc-123');
    expect(injectUmami(document, 'abc-123')).toBeNull();
    expect(document.head.querySelectorAll('script[data-website-id]').length).toBe(1);
  });
});
