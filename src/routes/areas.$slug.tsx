import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CtaBand, Section } from "@/components/site/Sections";
import { AREAS, findArea } from "@/lib/areas";
import { SITE, breadcrumbs, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/areas/$slug")({
  loader: ({ params }) => {
    const area = findArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Community unavailable | Estate Alley Group" }, { name: "robots", content: "noindex" }] };
    const { area } = loaderData;
    const path = `/areas/${params.slug}`;
    return {
      meta: pageMeta(
        `${area.name}, OH Real Estate Guide`,
        `Buying or selling a home in ${area.name}, Ohio? Local guide to ${area.name} schools, homes and commuting from Estate Alley Group, Keller Williams Advisors.`,
        path,
      ),
      links: [{ rel: "canonical", href: SITE.url + path }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbs([["Home", "/"], ["Communities", "/areas"], [`${area.name}, OH`, path]])) }],
    };
  },
  component: AreaPage,
  notFoundComponent: () => (
    <div className="container-site py-28 text-center">
      <h1 className="text-4xl">We don't have a guide for that community yet.</h1>
      <Button asChild className="mt-8"><Link to="/areas">See all communities</Link></Button>
    </div>
  ),
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  const others = AREAS.filter((a) => a.slug !== area.slug);
  return (
    <>
      <section className="bg-ivory">
        <div className="container-site py-20">
          <nav aria-label="Breadcrumb" className="eyebrow">
            <Link to="/">Home</Link> / <Link to="/areas">Communities</Link> / {area.name}
          </nav>
          <h1 className="mt-6 max-w-4xl text-5xl uppercase md:text-7xl">{area.name}, Ohio Real Estate</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{area.intro}</p>
          <p className="mt-4 text-sm text-muted-foreground">{area.county}</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl">Living in {area.name}</h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              {area.living.map((l) => <li key={l} className="border-l border-champagne pl-4">{l}</li>)}
            </ul>
          </div>
          <div className="space-y-8">
            <div><h2 className="text-3xl">Homes</h2><p className="mt-3 text-muted-foreground">{area.homes}</p></div>
            <div><h2 className="text-3xl">Schools</h2><p className="mt-3 text-muted-foreground">{area.schools}</p></div>
            <div><h2 className="text-3xl">Getting around</h2><p className="mt-3 text-muted-foreground">{area.commute}</p></div>
          </div>
        </div>
      </Section>
      <Section tone="ivory">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl">Selling a home in {area.name}</h2>
            <p className="mt-3 text-muted-foreground">{area.sellerTip}</p>
            <Button asChild className="mt-6"><Link to="/contact" search={{ form: "valuation" }}>Request a free home valuation</Link></Button>
          </div>
          <div>
            <h2 className="text-3xl">Buying a home in {area.name}</h2>
            <p className="mt-3 text-muted-foreground">
              Search current homes for sale on our MLS search, then tell us what you're looking for and we'll help you narrow it down. We work with clients here from our office at {SITE.street}, {SITE.city}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline"><a href={SITE.mlsSearch} target="_blank" rel="noopener">Search homes for sale</a></Button>
              <Button asChild variant="outline"><Link to="/contact" search={{ form: "buyer" }}>Start your home search</Link></Button>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="text-2xl">Other communities we serve</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {others.map((o) => (
            <li key={o.slug}><Link to="/areas/$slug" params={{ slug: o.slug }} className="inline-block rounded-full border border-border px-4 py-2 text-sm">{o.name}, OH</Link></li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
