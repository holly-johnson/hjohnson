/**
 * The tests that catch the failure this whole directory exists to prevent:
 * a page that is published in one place and missing from another.
 *
 * Adding a case study means touching the route table, the metadata file, and the
 * generated sitemap. Getting two of the three right produces a page that works
 * perfectly for visitors and is invisible to search — which is exactly the kind
 * of bug nobody notices for six months.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { routes } from '../app/app.routes';
import { siteMetadata } from './site-metadata';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

/** Angular route paths are relative; metadata paths are root-relative. */
const routePaths = routes
  .filter(route => route.loadComponent && route.path !== '**')
  .map(route => `/${route.path}`.replace(/^\/$/, '/').replace(/\/$/, '') || '/');

describe('routes and metadata', () => {
  it('gives every published page a route', () => {
    for (const page of siteMetadata.pages) {
      expect(routePaths, page.path).toContain(page.path);
    }
  });

  it('takes its titles and descriptions from the metadata file', () => {
    for (const page of siteMetadata.pages) {
      const path = page.path === '/' ? '' : page.path.slice(1);
      const route = routes.find(r => r.path === path);
      expect(route?.title, page.path).toBe(page.title);
      expect(route?.data?.['meta'], page.path).toMatchObject({
        description: page.description,
        image: page.image,
      });
    }
  });

  it('redirects every retired URL to the page its metadata names', () => {
    for (const [from, to] of Object.entries(siteMetadata.aliases)) {
      const route = routes.find(r => r.path === from.slice(1));
      expect(route?.redirectTo, from).toBe(to.slice(1));
    }
  });
});

describe('generated sitemap', () => {
  const sitemap = read('projects/portfolio/public/sitemap.xml');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

  it('lists every published page exactly once', () => {
    expect(locations).toEqual(siteMetadata.pages.map(page => `${siteMetadata.origin}${page.path}`));
  });

  it('is current — rerun `node scripts/generate-seo.mjs` if this fails', () => {
    expect(locations).toHaveLength(siteMetadata.pages.length);
  });

  it('lists no page that is unpublished or redirected', () => {
    for (const from of Object.keys(siteMetadata.aliases)) {
      expect(sitemap).not.toContain(`<loc>${siteMetadata.origin}${from}</loc>`);
    }
    expect(sitemap).not.toContain('/about');
    expect(sitemap).not.toContain('/field-notes');
  });
});

describe('generated robots.txt', () => {
  const robots = read('projects/portfolio/public/robots.txt');

  it('points at the sitemap on the canonical origin', () => {
    expect(robots).toContain(`Sitemap: ${siteMetadata.origin}/sitemap.xml`);
  });

  it('lets every crawler read the whole site', () => {
    expect(robots).toMatch(/User-agent: \*\s*\nAllow: \//);
    expect(robots).not.toMatch(/^Disallow: \S/m);
  });
});

describe('index.html fallback', () => {
  const { document } = new JSDOM(read('projects/portfolio/src/index.html')).window;
  const person = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}');

  it('describes the same person as the metadata file', () => {
    expect(person.name).toBe(siteMetadata.person.name);
    expect(person.jobTitle).toBe(siteMetadata.person.jobTitle);
    expect(person.sameAs).toEqual([...siteMetadata.person.sameAs]);
    expect(person.url).toBe(`${siteMetadata.origin}/`);
  });

  it('falls back to the home page, since that is the page served under an unknown URL', () => {
    const home = siteMetadata.pages.find(page => page.path === '/')!;
    expect(document.title).toBe(home.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(home.description);
  });

  it('uses absolute URLs for the card, which relative ones would break', () => {
    for (const selector of ['meta[property="og:url"]', 'meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      expect(document.querySelector(selector)?.getAttribute('content'), selector).toMatch(/^https:\/\//);
    }
  });
});
