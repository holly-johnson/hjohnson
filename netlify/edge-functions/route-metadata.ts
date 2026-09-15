import type { Context } from "@netlify/edge-functions";
import { injectPageMetadata } from "../../projects/portfolio/src/seo/inject-metadata.ts";
import { siteMetadata } from "../../projects/portfolio/src/seo/site-metadata.ts";

/**
 * Absolute URLs always name the production site, even when this runs on a deploy
 * preview: a canonical pointing at a preview URL invites Google to index the
 * preview instead of the real page.
 */
const ORIGIN = siteMetadata.origin;

/**
 * Fills in `index.html` for the URL that was actually requested.
 *
 * All the thinking lives in `inject-metadata.ts`, which is plain string work and
 * is unit tested. This file is only the part that has to know about HTTP: get the
 * response, bail out if it is not a document, rewrite it, send it on.
 *
 * It runs on every path (see `netlify.toml`) rather than on a list of known
 * routes, because the URLs that most need handling are the ones that are *not*
 * routes — those are the ones that would otherwise be served as a second copy of
 * the home page. Static files are excluded by `excludedPath`, and anything that
 * slips through is filtered by the content-type check below.
 */
export default async (request: Request, context: Context) => {
  const response = await context.next();

  if (!response.headers.get("content-type")?.includes("text/html")) return response;

  const { pathname } = new URL(request.url);
  const { html, indexable } = injectPageMetadata(await response.text(), pathname, ORIGIN);

  const headers = new Headers(response.headers);
  // Set on the body above for crawlers that read the markup, and here for the
  // ones that only read headers. They have to agree.
  if (!indexable) headers.set("x-robots-tag", "noindex, follow");
  // The body length changed, and a stale content-length truncates the response.
  headers.delete("content-length");

  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};
