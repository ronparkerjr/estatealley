import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PropertyDetail } from "@/components/site/PropertyDetail";
import { Button } from "@/components/ui/button";
import { PORTFOLIO, KIND_LABEL, sized, usd } from "@/lib/properties";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/sold-properties_/$slug")({
  loader: ({ params }) => {
    const p = PORTFOLIO.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    const related = PORTFOLIO.filter((x) => x.slug !== p.slug && x.kind === p.kind)
      .sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
      .slice(0, 3);
    return { p, related };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Property unavailable | Estate Alley Group" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    const verb = p.kind === "sold" ? "sold by" : "purchased with buyer representation from";
    const img = sized(p.img, 1200, 630);
    return {
      meta: [
        ...pageMeta(`${p.title} — ${KIND_LABEL[p.kind]}`, `${p.title}: ${p.beds} bed ${p.type.toLowerCase()} ${verb} Estate Alley Group at ${usd(p.price)}. Historical transaction.`),
        { property: "og:image", content: img },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: `/sold-properties/${params.slug}` }],
    };
  },
  component: () => {
    const { p, related } = Route.useLoaderData();
    return <PropertyDetail p={p} related={related} />;
  },
  notFoundComponent: () => (
    <div className="container-site py-28 text-center">
      <h1 className="text-4xl">We couldn't find that property.</h1>
      <Button asChild className="mt-8"><Link to="/sold-properties">Back to our portfolio</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="container-site py-28 text-center"><h1 className="text-4xl">Something went wrong.</h1></div>,
});
