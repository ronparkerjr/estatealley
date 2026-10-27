import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Sections";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ComplianceNote } from "@/components/site/ComplianceNote";
import { usePropertyFilters } from "@/components/site/PropertyFilters";
import { BUYER, PORTFOLIO, SOLD } from "@/lib/properties";
import { RENO_AFTER, RENO_BEFORE, YOUTUBE_URL } from "@/lib/home-content";
import { pageMeta , SITE } from "@/lib/site";

export const Route = createFileRoute("/sold-properties")({
  head: () => ({
    meta: pageMeta("Sold Homes & Track Record", "Explore homes Estate Alley Group has sold for sellers and helped buyers purchase across Greater Cincinnati and Dayton, plus our renovation projects."),
    links: [{ rel: "canonical", href: SITE.url + "/sold-properties" }],
  }),
  component: Sold,
});

const TABS = [
  { k: "all", l: `All (${PORTFOLIO.length})`, items: PORTFOLIO },
  { k: "sold", l: `Sold listings (${SOLD.length})`, items: SOLD },
  { k: "buyer", l: `Buyer purchases (${BUYER.length})`, items: BUYER },
] as const;

function Sold() {
  const [tab, setTab] = useState<(typeof TABS)[number]["k"]>("all");
  const items = TABS.find((t) => t.k === tab)!.items;
  const { results, ui } = usePropertyFilters(items);

  return (
    <>
      <section className="bg-ivory">
        <div className="container-site pb-16 pt-12 md:pb-20 md:pt-16">
          <div className="flex items-center gap-4"><span className="h-px w-10 bg-foreground/40" /><p className="eyebrow">Sold properties</p></div>
          <h1 className="mt-8 max-w-4xl text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-[4.6rem]">A track record you can explore.</h1>
          <div className="mt-12 grid gap-px border bg-border md:grid-cols-3">
            {[
              { t: "Sold listings", b: "Homes our team listed and sold on behalf of the seller." },
              { t: "Buyer purchases", b: "Homes we helped buyers purchase. Another brokerage was the listing agent." },
              { t: "Renovation projects", b: "Homes John and Heather renovated themselves, documented start to finish." },
            ].map((x) => (
              <div key={x.t} className="bg-ivory p-6 md:p-8"><h2 className="text-2xl">{x.t}</h2><p className="mt-2 text-sm text-muted-foreground">{x.b}</p></div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div role="tablist" aria-label="Transaction type" className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)}
              className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${tab === t.k ? "bg-charcoal text-on-dark" : "hover:bg-ivory"}`}>
              {t.l}
            </button>
          ))}
        </div>
        <div className="mt-8">{ui}</div>
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">Showing {results.length} of {items.length} properties</p>
        {results.length ? (
          <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
        ) : (
          <p className="mt-10 border p-10 text-center text-muted-foreground">No properties match those filters.</p>
        )}
        <ComplianceNote historical />
      </Section>

      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Renovation projects</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Homes we've transformed ourselves.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">These are personal and team renovation projects, not client sales. They're why we can spot potential — and costly problems — when you're buying or preparing to sell.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link to="/about">Discover Our Story</Link></Button>
              <Button asChild variant="outline"><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch the documentary</a></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {[{ src: RENO_BEFORE, l: "Before" }, { src: RENO_AFTER, l: "After" }].map((x) => (
              <figure key={x.l}>
                <img src={x.src} alt={`Renovation project — ${x.l.toLowerCase()}`} width={900} height={582} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="eyebrow mt-3">{x.l}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-charcoal text-on-dark">
        <div className="container-site flex flex-wrap items-center justify-between gap-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl">What could your home sell for?</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="inverse"><Link to="/contact" search={{ form: "valuation" }}>Get a Free Valuation</Link></Button>
            <Button asChild size="lg" variant="outlineInverse"><Link to="/listed-properties">Find a Home Like This</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
