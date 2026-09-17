import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { absoluteUrl, normalizePath, pageFor, siteMetadata } from './site-metadata';

const publicDir = join(process.cwd(), 'projects/portfolio/public');

describe('site metadata', () => {
  it('has an origin with no trailing slash, since every URL is built by concatenation', () => {
    expect(siteMetadata.origin).toMatch(/^https:\/\/[^/]+$/);
  });

  it('lists each path once', () => {
    const paths = siteMetadata.pages.map(page => page.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('uses root-relative paths with no trailing slash', () => {
    for (const page of siteMetadata.pages) {
      expect(page.path === '/' || /^\/[^/].*[^/]$/.test(page.path)).toBe(true);
    }
  });

  it('points every page at a social card that exists', () => {
    for (const page of [...siteMetadata.pages, siteMetadata.notFound]) {
      expect(existsSync(join(publicDir, page.image)), page.image).toBe(true);
    }
  });

  it('keeps descriptions inside the length search engines will show', () => {
    for (const page of siteMetadata.pages) {
      expect(page.description.length, page.path).toBeLessThanOrEqual(200);
      expect(page.description.length, page.path).toBeGreaterThan(50);
    }
  });

  it('names the person in every title, because the name is what gets searched', () => {
    for (const page of siteMetadata.pages) {
      expect(page.title, page.path).toContain(siteMetadata.person.name);
    }
  });

  it('points each alias at a page that exists', () => {
    for (const [from, to] of Object.entries(siteMetadata.aliases)) {
      expect(siteMetadata.pages.some(page => page.path === to), `${from} → ${to}`).toBe(true);
      expect(siteMetadata.pages.some(page => page.path === from), from).toBe(false);
    }
  });
});

describe('normalizePath', () => {
  it.each([
    ['/', '/'],
    ['/resume', '/resume'],
    ['/resume/', '/resume'],
    ['/resume//', '/resume'],
    ['/resume?utm_source=linkedin', '/resume'],
    ['/resume#skills', '/resume'],
  ])('%s → %s', (input, expected) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

describe('pageFor', () => {
  it('finds a published page', () => {
    expect(pageFor('/work/helios')?.title).toContain('Helios');
  });

  it('follows a retired URL to its replacement, so old links keep their metadata', () => {
    expect(pageFor('/work/penlink')).toBe(pageFor('/work/helios'));
    expect(pageFor('/work/ai-design')).toBe(pageFor('/work/orbit'));
  });

  it('ignores a trailing slash', () => {
    expect(pageFor('/resume/')).toBe(pageFor('/resume'));
  });

  it('returns nothing for an unpublished URL', () => {
    expect(pageFor('/field-notes')).toBeUndefined();
    expect(pageFor('/work/does-not-exist')).toBeUndefined();
  });
});

describe('absoluteUrl', () => {
  it('builds URLs on the canonical origin', () => {
    expect(absoluteUrl('/')).toBe('https://hollyjohnson.design/');
    expect(absoluteUrl('/work/helios')).toBe('https://hollyjohnson.design/work/helios');
  });
});
