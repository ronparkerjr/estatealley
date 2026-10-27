import { createFileRoute } from "@tanstack/react-router";
import { AREAS } from "@/lib/areas";
import { LISTINGS, PORTFOLIO } from "@/lib/properties";
import { SITE } from "@/lib/site";

const STATIC = ["/", "/about", "/listed-properties", "/sold-properties", "/reviews", "/join-our-team", "/contact", "/faq", "/areas", "/renovations", "/resources/first-time-homebuyers"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...STATIC,
          ...AREAS.map((a) => `/areas/${a.slug}`),
          ...LISTINGS.map((p) => `/listed-properties/${p.slug}`),
          ...PORTFOLIO.map((p) => `/sold-properties/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${SITE.url}${p}</loc></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
