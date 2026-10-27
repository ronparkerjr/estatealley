import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PropertyDetail } from "@/components/site/PropertyDetail";
import { Button } from "@/components/ui/button";
import { LISTINGS, findProperty, usd } from "@/lib/properties";
import { SITE, breadcrumbs, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/listed-properties_/$slug")({
  loader: ({ params }) => {
    const p = findProperty("active", params.slug);
    if (!p) throw notFound();
    return { p, related: LISTINGS.filter((x) => x.slug !== p.slug).slice(0, 3) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Listing unavailable | Estate Alley Group" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    return {
      meta: [
        ...pageMeta(`${p.title} · ${usd(p.price)}`, `${p.beds} bed, ${p.baths ?? "—"} bath ${p.type.toLowerCase()} listed by Estate Alley Group.`),
        { property: "og:image", content: p.img },
        { name: "twitter:image", content: p.img },
      ],
      links: [{ rel: "canonical", href: `${SITE.url}/listed-properties/${params.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbs([["Home", "/"], ["Listed Properties", "/listed-properties"], [p.title, `/listed-properties/${params.slug}`]])) }],
    };
  },
  component: () => {
    const { p, related } = Route.useLoaderData();
    return <PropertyDetail p={p} related={related} />;
  },
  notFoundComponent: () => (
    <div className="container-site py-28 text-center">
      <h1 className="text-4xl">This listing isn't available.</h1>
      <p className="mt-4 text-muted-foreground">It may have sold or been removed.</p>
      <Button asChild className="mt-8"><Link to="/listed-properties">Explore current homes</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="container-site py-28 text-center"><h1 className="text-4xl">Something went wrong.</h1></div>,
});
