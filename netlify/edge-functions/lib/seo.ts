/**
 * Everything the edge function does to an HTML document, as plain string work.
 *
 * Lives here rather than in the app's `src/seo/` because Deno and Angular cannot
 * agree on how to spell an import. Deno resolves by exact file path and needs the
 * `.ts`; Angular rejects that extension unless `noEmit` is set, which its builder
 * controls. Sharing one module across both is what broke the first deploy:
 *
 *   Could not find file: /opt/build/repo/projects/portfolio/src/seo/site-metadata
 *
 * So the two sides share data instead of code. `site-metadata.generated.ts` is
 * written from the app's `site-metadata.json` by `scripts/generate-seo.mjs`, and
 * `consistency.spec.ts` fails the build if the copy drifts from the original.
 *
 * Nothing in this file imports Deno or Angular, so it is testable as what it is:
 * a string in, a string out.
 */
import { siteMetadata as data } from './site-metadata.generated.ts';

export type PageKind = 'profile' | 'case-study';

export interface PageMetadata {
  path: string;
  kind: PageKind;
  title: string;
  description: string;
  image: string;
}

interface SiteMetadata {
  origin: string;
  siteName: string;
  person: {
    name: string;
    jobTitle: string;
    description: string;
    email: string;
    image: string;
    sameAs: readonly string[];
    knowsAbout: readonly string[];
  };
  pages: readonly PageMetadata[];
  aliases: Readonly<Record<string, string>>;
  notFound: Pick<PageMetadata, 'title' | 'description' | 'image'>;
}

export const siteMetadata = data as unknown as SiteMetadata;

/** Trailing slashes and query strings are not distinct pages. `/` stays `/`. */
export function normalizePath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0] ?? '/';
  return path.replace(/\/+$/, '') || '/';
}

/**
 * The page a URL should be described as, following one alias hop.
 *
 * Undefined for anything unpublished, which is the signal to serve `noindex`
 * rather than let the URL inherit the home page's description.
 */
export function pageFor(pathname: string): PageMetadata | undefined {
  const path = normalizePath(pathname);
  const target = siteMetadata.aliases[path] ?? path;
  return siteMetadata.pages.find(page => page.path === target);
}

// ── Structured data ────────────────────────────────────────────────────────
//
// `sameAs` is the load-bearing line: the claim that this site and that LinkedIn
// profile are one person, which is what lets a search for the name resolve to
// somebody rather than to several. Everything here has to be true and has to
// match the page it describes.

export const PERSON_ID = `${siteMetadata.origin}/#person`;
export const WEBSITE_ID = `${siteMetadata.origin}/#website`;

type JsonLdNode = Record<string, unknown>;

function absolute(path: string): string {
  return `${siteMetadata.origin}${path}`;
}

function personNode(): JsonLdNode {
  const { person } = siteMetadata;
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: absolute('/'),
    email: `mailto:${person.email}`,
    image: absolute(person.image),
    sameAs: [...person.sameAs],
    knowsAbout: [...person.knowsAbout],
  };
}

function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteMetadata.siteName,
    url: absolute('/'),
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

/**
 * A profile page *is* about her, so it carries `mainEntity`. A case study is
 * authored *by* her, so it carries `author` — the same Person node either way,
 * which is what ties six pages to one identity instead of to six.
 */
export function structuredDataFor(page: PageMetadata): JsonLdNode {
  const url = absolute(page.path);
  const image = absolute(page.image);

  const pageNode: JsonLdNode =
    page.kind === 'profile'
      ? {
          '@type': 'ProfilePage',
          '@id': `${url}#page`,
          url,
          name: page.title,
          description: page.description,
          primaryImageOfPage: image,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: { '@id': PERSON_ID },
        }
      : {
          '@type': 'Article',
          '@id': `${url}#article`,
          url,
          headline: page.title,
          description: page.description,
          image,
          isPartOf: { '@id': WEBSITE_ID },
          author: { '@id': PERSON_ID },
          publisher: { '@id': PERSON_ID },
          inLanguage: 'en',
        };

  return { '@context': 'https://schema.org', '@graph': [websiteNode(), personNode(), pageNode] };
}

/**
 * `<` is escaped because a `</script>` sequence inside a JSON string would end
 * the block early and spill the rest of the graph into the document as markup.
 */
export function serializeStructuredData(graph: JsonLdNode): string {
  return JSON.stringify(graph).replaceAll('<', '\\u003c');
}

// ── Document rewriting ─────────────────────────────────────────────────────

export function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/**
 * Point one `<meta>` at a new value, adding the tag if the template lacks it.
 *
 * Matched on the identifying attribute rather than the whole tag, so attribute
 * order and the build's minification do not matter.
 */
function setMeta(html: string, attribute: 'name' | 'property', key: string, content: string): string {
  const escaped = escapeAttribute(content);
  const tag = new RegExp(`<meta\\b[^>]*\\b${attribute}="${key}"[^>]*>`, 'i');
  const existing = html.match(tag);

  if (!existing) {
    return html.replace('</head>', `<meta ${attribute}="${key}" content="${escaped}" />\n</head>`);
  }

  const updated = existing[0].includes('content=')
    ? existing[0].replace(/content="[^"]*"/i, `content="${escaped}"`)
    : existing[0].replace(/\s*\/?>$/, ` content="${escaped}" />`);
  return html.replace(tag, updated);
}

function setLink(html: string, rel: string, href: string): string {
  const escaped = escapeAttribute(href);
  const tag = new RegExp(`<link\\b[^>]*\\brel="${rel}"[^>]*>`, 'i');
  return tag.test(html)
    ? html.replace(tag, `<link rel="${rel}" href="${escaped}" />`)
    : html.replace('</head>', `<link rel="${rel}" href="${escaped}" />\n</head>`);
}

function setStructuredData(html: string, json: string): string {
  const block = /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i;
  const script = `<script type="application/ld+json">${json}</script>`;
  return block.test(html) ? html.replace(block, script) : html.replace('</head>', `${script}\n</head>`);
}

export interface InjectionResult {
  html: string;
  /** False for URLs with no published page, which are served `noindex` and 404. */
  indexable: boolean;
}

/**
 * Describe `pathname` in `html`, for crawlers that will never run the app.
 *
 * An unknown URL is deliberately not left alone. Serving the home page's title
 * and description under a URL that renders a 404 is a soft 404: the crawler sees
 * a page that looks real, indexes it, and the site competes with itself on its
 * own name. Those get the 404 description and `noindex, follow` — follow,
 * because the links on the page are still worth crawling.
 */
export function injectPageMetadata(html: string, pathname: string, origin: string): InjectionResult {
  const page = pageFor(pathname);
  const canonicalPath = page?.path ?? normalizePath(pathname);
  const url = `${origin}${canonicalPath}`;
  const meta = page ?? siteMetadata.notFound;
  const image = `${origin}${meta.image}`;

  let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(meta.title)}</title>`);

  out = setMeta(out, 'name', 'description', meta.description);
  out = setMeta(out, 'property', 'og:type', page?.kind === 'case-study' ? 'article' : 'profile');
  out = setMeta(out, 'property', 'og:site_name', siteMetadata.siteName);
  out = setMeta(out, 'property', 'og:title', meta.title);
  out = setMeta(out, 'property', 'og:description', meta.description);
  out = setMeta(out, 'property', 'og:url', url);
  out = setMeta(out, 'property', 'og:image', image);
  out = setMeta(out, 'property', 'og:image:alt', meta.title);
  out = setMeta(out, 'name', 'twitter:card', 'summary_large_image');
  out = setMeta(out, 'name', 'twitter:title', meta.title);
  out = setMeta(out, 'name', 'twitter:description', meta.description);
  out = setMeta(out, 'name', 'twitter:image', image);
  out = setMeta(out, 'name', 'robots', page ? 'index, follow' : 'noindex, follow');
  out = setLink(out, 'canonical', url);

  if (page) out = setStructuredData(out, serializeStructuredData(structuredDataFor(page)));

  return { html: out, indexable: Boolean(page) };
}
