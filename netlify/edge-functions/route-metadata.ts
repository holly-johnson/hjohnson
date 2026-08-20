import type { Context } from "@netlify/edge-functions";

interface RouteMetadata {
  title: string;
  description: string;
  image: string;
  noIndex?: boolean;
}

const metadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Holly Johnson — Product Designer & Design Systems Lead",
    description: "Product designer and design systems lead turning complex product needs into shared systems that connect design and production.",
    image: "/assets/social/home.png",
  },
  "/resume": {
    title: "Resume — Holly Johnson",
    description: "Holly Johnson is a product designer and design systems lead experienced in complex product UX, production Angular systems, and multi-brand platforms.",
    image: "/assets/social/resume.png",
  },
  "/work/helios": {
    title: "Helios Design System — Holly Johnson",
    description: "How Holly Johnson built a Figma-to-Angular product foundation that helped four designers scale decisions across more than 150 engineers.",
    image: "/assets/social/helios.png",
  },
  "/work/analysis-workflow": {
    title: "Investigative Workflow Research — Holly Johnson",
    description: "Research mapping how investigators query, collect, analyze, connect, visualize, document, and report across fragmented product workflows.",
    image: "/assets/social/investigative-workflow.png",
  },
  "/work/nucleus": {
    title: "NUcleus Design System — Holly Johnson",
    description: "A reusable design and front-end system supporting nine university brands across more than 20 websites and applications.",
    image: "/assets/social/nucleus.png",
  },
};

const aliases: Record<string, string> = {
  "/work/penlink": "/work/helios",
  "/work/ai-design": "/work/helios",
};

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceMeta(html: string, selector: string, value: string): string {
  const escaped = escapeAttribute(value);
  const pattern = new RegExp(`<meta\\s+([^>]*${selector.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}[^>]*)>`, "i");
  return html.replace(pattern, (tag) => tag.replace(/content="[^"]*"/i, `content="${escaped}"`));
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = aliases[url.pathname] ?? (url.pathname.replace(/\/$/, "") || "/");
  const route = metadata[path];
  if (!route) return;

  const response = await context.next();
  if (!response.headers.get("content-type")?.includes("text/html")) return response;

  const absoluteUrl = `${url.origin}${path}`;
  const absoluteImage = `${url.origin}${route.image}`;
  let html = await response.text();

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeAttribute(route.title)}</title>`);
  html = replaceMeta(html, 'name="description"', route.description);
  html = replaceMeta(html, 'property="og:title"', route.title);
  html = replaceMeta(html, 'property="og:description"', route.description);
  html = replaceMeta(html, 'property="og:url"', absoluteUrl);
  html = replaceMeta(html, 'property="og:image"', absoluteImage);
  html = replaceMeta(html, 'property="og:image:alt"', route.title);
  html = replaceMeta(html, 'name="twitter:title"', route.title);
  html = replaceMeta(html, 'name="twitter:description"', route.description);
  html = replaceMeta(html, 'name="twitter:image"', absoluteImage);
  html = html.replace("</head>", `<link rel="canonical" href="${escapeAttribute(absoluteUrl)}" />\n<meta name="robots" content="${route.noIndex ? "noindex, nofollow" : "index, follow"}" />\n</head>`);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};
