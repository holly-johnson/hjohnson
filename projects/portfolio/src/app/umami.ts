/**
 * Umami, the site's only third-party script.
 *
 * Netlify Analytics counts requests at the CDN, which means it counts bots and
 * cannot see in-app navigation at all: this is a single-page app, so moving from
 * the home page to a case study never reaches the server. Umami runs in the
 * browser, tracks route changes on its own, and scanners don't execute it.
 *
 * Cookieless and no personal data, so it needs no consent banner. Framework-free
 * on purpose, so it can be tested without booting Angular.
 */

/**
 * From the Umami dashboard: Websites → your site → Edit → Tracking code, the
 * `data-website-id` value.
 *
 * Not a secret: it ships in the page's HTML by design. Empty means analytics is
 * off, and nothing is injected or sent.
 */
export const UMAMI_WEBSITE_ID = '576302ba-8e38-4001-a8d6-59cc5552338a';

/** Umami Cloud's tracker. Self-hosting instead? Point this at your instance. */
export const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

/**
 * Only this host reports, so localhost and Netlify deploy previews stay out of
 * the numbers. Comma-separate to add more.
 */
export const UMAMI_DOMAINS = 'hollyjohnson.design';

/**
 * Append the tracker to <head>, unless analytics is off or a tag is already
 * there. Returns the element it added, or null when it added nothing.
 */
export function injectUmami(
  doc: Document,
  websiteId: string = UMAMI_WEBSITE_ID,
  scriptUrl: string = UMAMI_SCRIPT_URL,
  domains: string = UMAMI_DOMAINS,
): HTMLScriptElement | null {
  if (!websiteId) return null;
  if (doc.head.querySelector('script[data-website-id]')) return null;

  const script = doc.createElement('script');
  script.defer = true;
  script.src = scriptUrl;
  script.setAttribute('data-website-id', websiteId);
  if (domains) script.setAttribute('data-domains', domains);
  doc.head.appendChild(script);
  return script;
}
