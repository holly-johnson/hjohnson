import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { escapeAttribute, injectPageMetadata, siteMetadata } from './seo.ts';

/**
 * The real template, not a fixture. The whole job of this module is to rewrite
 * the file the build actually ships, so a fixture that drifted from it would let
 * every one of these tests pass while production served the wrong tags.
 */
const template = readFileSync(join(process.cwd(), 'projects/portfolio/src/index.html'), 'utf8');
const ORIGIN = siteMetadata.origin;

function head(html: string) {
  const { document } = new JSDOM(html).window;
  return {
    title: document.title,
    meta: (selector: string) => document.querySelector(`meta[${selector}]`)?.getAttribute('content'),
    canonical: () => document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    jsonLd: () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      return script ? JSON.parse(script.textContent ?? '{}') : undefined;
    },
    count: (selector: string) => document.querySelectorAll(selector).length,
  };
}

describe('injectPageMetadata on a published page', () => {
  const { html, indexable } = injectPageMetadata(template, '/work/nucleus', ORIGIN);
  const page = head(html);
  const expected = siteMetadata.pages.find(p => p.path === '/work/nucleus')!;

  it('is indexable', () => {
    expect(indexable).toBe(true);
    expect(page.meta('name="robots"')).toBe('index, follow');
  });

  it('writes the page title, not the template title', () => {
    expect(page.title).toBe(expected.title);
  });

  it('writes the page description everywhere a description appears', () => {
    expect(page.meta('name="description"')).toBe(expected.description);
    expect(page.meta('property="og:description"')).toBe(expected.description);
    expect(page.meta('name="twitter:description"')).toBe(expected.description);
  });

  it('writes absolute URLs for the card and the canonical', () => {
    expect(page.meta('property="og:url"')).toBe(`${ORIGIN}/work/nucleus`);
    expect(page.meta('property="og:image"')).toBe(`${ORIGIN}${expected.image}`);
    expect(page.canonical()).toBe(`${ORIGIN}/work/nucleus`);
  });

  it('marks a case study as an article', () => {
    expect(page.meta('property="og:type"')).toBe('article');
  });

  it('replaces the fallback graph rather than adding a second one', () => {
    expect(page.count('script[type="application/ld+json"]')).toBe(1);
    const graph = page.jsonLd()['@graph'] as Record<string, unknown>[];
    expect(graph.find(n => n['@type'] === 'Article')?.['url']).toBe(`${ORIGIN}/work/nucleus`);
  });

  it('leaves exactly one of each tag it touches', () => {
    for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'link[rel="canonical"]', 'title']) {
      expect(page.count(selector), selector).toBe(1);
    }
  });
});

describe('injectPageMetadata on a retired URL', () => {
  it('describes the page that replaced it and points the canonical there', () => {
    const { html } = injectPageMetadata(template, '/work/penlink', ORIGIN);
    const page = head(html);
    expect(page.title).toContain('Helios');
    expect(page.canonical()).toBe(`${ORIGIN}/work/helios`);
  });
});

describe('injectPageMetadata on a URL that is not a page', () => {
  const { html, indexable } = injectPageMetadata(template, '/not-a-real-page', ORIGIN);
  const page = head(html);

  it('is not indexable, so a 404 is never indexed as a copy of the home page', () => {
    expect(indexable).toBe(false);
    expect(page.meta('name="robots"')).toBe('noindex, follow');
  });

  it('stops claiming to be the home page', () => {
    expect(page.title).toBe(siteMetadata.notFound.title);
    expect(page.meta('name="description"')).toBe(siteMetadata.notFound.description);
  });

  it('says nothing structured, rather than something false', () => {
    expect(page.count('script[type="application/ld+json"]')).toBe(1);
    expect(page.jsonLd()['@type']).toBe('Person');
  });
});

describe('escapeAttribute', () => {
  it('neutralizes the characters that would let a value break out of an attribute', () => {
    expect(escapeAttribute('Evil" onload="alert(1)')).toBe('Evil&quot; onload=&quot;alert(1)');
    expect(escapeAttribute('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes the ampersand first, so an escape is not itself re-escaped', () => {
    expect(escapeAttribute('Design & Systems')).toBe('Design &amp; Systems');
    expect(escapeAttribute('&quot;')).toBe('&amp;quot;');
  });

  it('is applied to every value written into the document', () => {
    // Round-trip, rather than asserting the copy contains a character that
    // needs escaping: the titles have held "&" and may again, and the test
    // should not break when a line is rewritten.
    const { html } = injectPageMetadata(template, '/', ORIGIN);
    const title = siteMetadata.pages.find(p => p.path === '/')!.title;
    expect(html).toContain(`content="${escapeAttribute(title)}"`);
    expect(head(html).meta('property="og:title"')).toBe(title);
  });
});

describe('injectPageMetadata across every published page', () => {
  it('gives each one a distinct title, description, and canonical', () => {
    const seen = siteMetadata.pages.map(p => {
      const page = head(injectPageMetadata(template, p.path, ORIGIN).html);
      return [page.title, page.meta('name="description"'), page.canonical()].join('|');
    });
    expect(new Set(seen).size).toBe(siteMetadata.pages.length);
  });
});
