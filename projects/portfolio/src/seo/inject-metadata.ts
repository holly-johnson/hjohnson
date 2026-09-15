/**
 * Rewrites the built `index.html` for one URL.
 *
 * This is a single-page app, so every URL is served the same `index.html` and
 * the real title, description, and card are filled in by Angular after the
 * bundle boots. Crawlers that do not run JavaScript — Slack, LinkedIn, Bing,
 * and most of the AI assistants — never get that far, so without this every
 * page in the site looks like a copy of the home page.
 *
 * The Netlify edge function runs this on the way out. Kept separate from the
 * function itself, and free of Deno and Angular alike, so it is just a string
 * in and a string out and can be tested like one.
 */
import { normalizePath, pageFor, siteMetadata, type PageMetadata } from './site-metadata';
import { serializeStructuredData, structuredDataFor } from './structured-data';

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
 * Matched on the identifying attribute rather than on the whole tag so that
 * attribute order and spacing in the template do not matter.
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
  /** False for URLs with no published page, which are served `noindex`. */
  indexable: boolean;
}

/**
 * Describe `pathname` in `html`, for crawlers that will never run the app.
 *
 * An unknown URL is deliberately *not* left alone. Serving the home page's title
 * and description under a URL that renders a 404 is a soft 404: the crawler sees
 * a page that looks real, indexes it, and the site ends up competing with itself
 * on its own name. Those URLs get the 404 description and `noindex, follow`
 * instead — follow, because the links on the page are still worth crawling.
 */
export function injectPageMetadata(html: string, pathname: string, origin: string): InjectionResult {
  const page: PageMetadata | undefined = pageFor(pathname);
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
