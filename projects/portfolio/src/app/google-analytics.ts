/**
 * Google Analytics 4, the second third-party script after Umami.
 *
 * Umami answers "which case study was read" without cookies. GA4 is here for
 * what it is uniquely good at: Search Console linkage, referral and campaign
 * attribution, and the reports recruiters' own tooling speaks. The two overlap
 * and will not agree on totals; that is expected, not a bug.
 *
 * Unlike Umami's `data-domains`, gtag has no built-in host allowlist, so the
 * gate is here: nothing is injected off the production host, which keeps
 * localhost and Netlify deploy previews out of the property.
 *
 * GA4's enhanced measurement tracks browser-history navigation on its own, so
 * SPA route changes report without a router hook, same as Umami.
 *
 * Framework-free on purpose, so it can be tested without booting Angular.
 */

/**
 * From Google Analytics: Admin → Data streams → the web stream → Measurement ID.
 *
 * Not a secret: it ships in the page's HTML by design. Empty means GA is off,
 * and nothing is injected or sent.
 */
export const GA_MEASUREMENT_ID = 'G-XKPVE72905';

/** Google's loader. */
export const GA_SCRIPT_URL = 'https://www.googletagmanager.com/gtag/js';

/**
 * Only these hosts report. Comma-separate to add more; an empty string reports
 * from anywhere, which is what the unit tests use.
 */
export const GA_HOSTNAMES = 'hollyjohnson.design';

/**
 * Append the gtag pair to <head>, unless GA is off, the host is not on the
 * allowlist, or a tag is already there. Returns the loader element it added, or
 * null when it added nothing.
 */
export function injectGoogleAnalytics(
  doc: Document,
  measurementId: string = GA_MEASUREMENT_ID,
  scriptUrl: string = GA_SCRIPT_URL,
  hostnames: string = GA_HOSTNAMES,
): HTMLScriptElement | null {
  if (!measurementId) return null;

  const allowed = hostnames
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean);
  if (allowed.length && !allowed.includes(doc.location.hostname)) return null;

  if (doc.head.querySelector('script[data-ga-measurement-id]')) return null;

  const loader = doc.createElement('script');
  loader.async = true;
  loader.src = `${scriptUrl}?id=${encodeURIComponent(measurementId)}`;
  loader.setAttribute('data-ga-measurement-id', measurementId);
  doc.head.appendChild(loader);

  // Google's own bootstrap, kept verbatim: gtag.js expects the `arguments`
  // object in dataLayer, not an array, so this is inline text rather than a
  // rest-parameter rewrite.
  const bootstrap = doc.createElement('script');
  bootstrap.textContent = [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js', new Date());",
    `gtag('config', '${measurementId}');`,
  ].join('\n');
  doc.head.appendChild(bootstrap);

  return loader;
}
