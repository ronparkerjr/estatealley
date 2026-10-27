import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Sections";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ComplianceNote } from "@/components/site/ComplianceNote";
import { usePropertyFilters } from "@/components/site/PropertyFilters";
import { LISTINGS } from "@/lib/properties";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/listed-properties")({
  head: () => ({
    meta: pageMeta("Homes for Sale", "Explore homes with Estate Alley Group at Keller Williams Advisors. Search current listings across Greater Cincinnati, West Chester, Mason and Dayton."),
    links: [{ rel: "canonical", href: "/listed-properties" }],
  }),
  component: Listed,
});

function Listed() {
  const { results, ui } = usePropertyFilters(LISTINGS);
  return (
    <>
      <section className="bg-ivory">
        <div className="container-site pb-16 pt-12 md:pb-20 md:pt-16">
          <div className="flex items-center gap-4"><span className="h-px w-10 bg-foreground/40" /><p className="eyebrow">Listed properties</p></div>
          <h1 className="mt-8 max-w-4xl text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-[4.6rem]">Explore homes with Estate Alley Group.</h1>
          <div className="mt-10 grid gap-6 border bg-background p-6 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-8">
              <h2 className="text-3xl">Search every home for sale.</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Filter by city, price, bedrooms and more on our Keller Williams home search — powered directly by the MLS.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button asChild size="lg"><a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">Search MLS Listings <ExternalLink /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <h2 className="text-4xl md:text-5xl">Our current listings</h2>
        {LISTINGS.length > 0 ? (
          <>
            <div className="mt-8">{ui}</div>
            <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{results.length} of {LISTINGS.length} homes</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
          </>
        ) : (
          <div className="mt-8 grid gap-8 border p-8 md:grid-cols-12 md:p-12">
            <div className="md:col-span-7">
              <p className="text-lg leading-relaxed text-muted-foreground">
                We only feature homes here once they're confirmed active, so you'll never see an outdated listing. Right now, the most up-to-date view of the market — including our team's listings — is on our MLS search.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Want to hear about homes before they hit the market? Tell us what you're looking for.</p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-5">
              <Button asChild size="lg"><a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">Find a Home</a></Button>
              <Button asChild size="lg" variant="outline"><Link to="/contact" search={{ form: "showing" }}>Request a Property Showing</Link></Button>
              <Button asChild size="lg" variant="outline"><a href={SITE.phoneHref}>Speak With an Estate Alley Agent</a></Button>
            </div>
          </div>
        )}
        <ComplianceNote historical={false} />
      </Section>

      <Section tone="ivory">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl">Thinking of selling?</h2>
            <p className="mt-2 text-muted-foreground">See homes we've sold, or ask for a complimentary valuation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link to="/sold-properties">View Sold Properties</Link></Button>
            <Button asChild><Link to="/contact" search={{ form: "valuation" }}>What Could Your Home Sell For?</Link></Button>
          </div>
        </div>
      </Section>
    </>
  );
}
