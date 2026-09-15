import type { Context } from "@netlify/edge-functions";
import { injectPageMetadata, siteMetadata } from "./lib/seo.ts";

/**
 * Fills in `index.html` for the URL that was actually requested.
 *
 * This is a single-page app, so every URL is served the same `index.html` and
 * the real title, description, and card are written by Angular after the bundle
 * boots. Crawlers that do not run JavaScript — Slack, LinkedIn, Bing, and most
 * of the AI assistants — never get that far, so without this every page in the
 * site looks like a copy of the home page.
 *
 * All the thinking is in `lib/seo.ts`, which is unit tested. This file is only
 * the part that has to know about HTTP.
 *
 * It runs on every path (see `netlify.toml`) rather than on a list of known
 * routes, because the URLs that most need handling are the ones that are *not*
 * routes. Static files are excluded by `excludedPath`; anything that slips
 * through is filtered by the content-type check below.
 */

/**
 * Absolute URLs always name the production site, even on a deploy preview: a
 * canonical pointing at a preview URL invites Google to index the preview.
 */
const ORIGIN = siteMetadata.origin;

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

  // The SPA redirect serves index.html for every URL with `status = 200`, so a
  // page that renders "Not Found" still claims to be fine — the textbook soft
  // 404. The body was already correct; only the status was lying.
  //
  // Narrowed to 200 on purpose: if the origin already failed with a 4xx or 5xx,
  // that status is the truthful one and overwriting it would hide a real error.
  const status = !indexable && response.status === 200 ? 404 : response.status;

  return new Response(html, { status, statusText: response.statusText, headers });
};
