/**
 * One description of this site, read by everything that needs to describe it.
 *
 * The same six pages used to be spelled out three times — in `app.routes.ts` for
 * in-app navigation, in the Netlify edge function for social crawlers, and
 * nowhere at all for search engines, which is part of why search engines could
 * not see the site. Publishing a page meant remembering every copy, and the
 * comment in `unpublished.routes.ts` had to carry that reminder by hand.
 *
 * Now the copy lives in `site-metadata.json` and three very different runtimes
 * read it: Angular (bundled), the Netlify edge function (Deno), and the sitemap
 * generator (Node, via `fs`). JSON is the one format all three load without a
 * build step, which is the only reason this is not a `.ts` file.
 *
 * Adding a page means adding it here and adding its route. Nothing else.
 */
import data from './site-metadata.json';

/** What a page is, which decides the shape of its structured data. */
export type PageKind = 'profile' | 'case-study';

export interface PageMetadata {
  /** Root-relative, no trailing slash. The home page is `/`. */
  path: string;
  kind: PageKind;
  /** Used for `<title>`, `og:title`, and the social card's alt text. */
  title: string;
  description: string;
  /** Root-relative path to the 1200×630 social card. */
  image: string;
}

export interface PersonMetadata {
  name: string;
  jobTitle: string;
  description: string;
  email: string;
  image: string;
  /**
   * Profiles that are provably the same person. Google uses these to decide that
   * this site and that LinkedIn profile are one entity rather than two.
   */
  sameAs: readonly string[];
  /** Topics, tools, and practices — the `knowsAbout` of the Person graph. */
  knowsAbout: readonly string[];
}

export interface SiteMetadata {
  /** Canonical origin, no trailing slash. Every absolute URL is built from it. */
  origin: string;
  siteName: string;
  person: PersonMetadata;
  pages: readonly PageMetadata[];
  /** Retired URL → the page that replaced it, so shared links keep resolving. */
  aliases: Readonly<Record<string, string>>;
  /** Served under any URL with no published page. Never indexed, never listed. */
  notFound: Pick<PageMetadata, 'title' | 'description' | 'image'>;
}

export const siteMetadata = data as SiteMetadata;

/** Trailing slashes and query strings are not distinct pages. `/` stays `/`. */
export function normalizePath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0] ?? '/';
  return path.replace(/\/+$/, '') || '/';
}

/**
 * The page a URL should be described as, following one alias hop.
 *
 * Returns undefined for anything unpublished — which is the signal to mark the
 * response `noindex` rather than to let it inherit the home page's description.
 */
export function pageFor(pathname: string): PageMetadata | undefined {
  const path = normalizePath(pathname);
  const target = siteMetadata.aliases[path] ?? path;
  return siteMetadata.pages.find(page => page.path === target);
}

/** Root-relative path → absolute URL on the canonical origin. */
export function absoluteUrl(path: string, origin: string = siteMetadata.origin): string {
  return `${origin}${path === '/' ? '/' : path}`;
}
