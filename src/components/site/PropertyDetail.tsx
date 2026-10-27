import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyInquiryForm } from "@/components/site/PropertyInquiryForm";
import { ComplianceNote } from "@/components/site/ComplianceNote";
import { KIND_LABEL, sized, usd, type Property } from "@/lib/properties";
import { SITE } from "@/lib/site";

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const n = images.length;
  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${title} photos`}>
      <div className="relative">
        <img src={images[i]} alt={`${title} — photo ${i + 1} of ${n}`} width={1600} height={1067} className="aspect-[3/2] w-full object-cover" fetchPriority="high" />
        {n > 1 && (
          <>
            <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 p-2"><ChevronLeft /></button>
            <button type="button" onClick={() => setI((i + 1) % n)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 p-2"><ChevronRight /></button>
          </>
        )}
      </div>
      {n > 1 && <p className="eyebrow mt-3" aria-live="polite">Photo {i + 1} / {n}</p>}
    </div>
  );
}

export function PropertyDetail({ p, related }: { p: Property; related: Property[] }) {
  const isActive = p.kind === "active";
  const specs = [
    { l: isActive ? "List price" : p.kind === "sold" ? "Sold price" : "Purchase price", v: usd(p.price) },
    { l: "Bedrooms", v: p.beds },
    { l: "Bathrooms", v: p.baths ?? "—" },
    { l: "Square feet", v: p.sqft?.toLocaleString() ?? "—" },
    { l: "Type", v: p.type },
  ];
  const story =
    p.kind === "sold"
      ? "Estate Alley Group represented the seller of this home through to closing. It has sold and is no longer available."
      : p.kind === "buyer"
        ? "Estate Alley Group represented the buyers of this home, guiding them from search to closing. Our team was not the listing agent. This home is not currently available."
        : p.description;

  return (
    <>
      <section className="bg-ivory">
        <div className="container-site pb-14 pt-8 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {isActive ? <Link to="/listed-properties" className="link-underline">Listed properties</Link> : <Link to="/sold-properties" className="link-underline">Sold properties</Link>}
            <span className="mx-2">/</span>{p.title}
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8"><Gallery images={[sized(p.img, 1600, 1330)]} title={p.title} /></div>
            <div className="lg:col-span-4">
              <span className="inline-block bg-charcoal px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-on-dark">{KIND_LABEL[p.kind]}</span>
              <h1 className="mt-5 text-5xl">{p.title}</h1>
              {p.location && <p className="eyebrow mt-3">{p.location}</p>}
              <dl className="mt-8 divide-y border-y">
                {specs.map((s) => (
                  <div key={s.l} className="flex justify-between py-3 text-sm"><dt className="text-muted-foreground">{s.l}</dt><dd className="font-medium">{s.v}</dd></div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                {isActive ? (
                  <Button asChild size="lg"><a href="#inquire">Schedule a Private Showing</a></Button>
                ) : (
                  <Button asChild size="lg"><a href="#inquire">Find a Home Like This</a></Button>
                )}
                <Button asChild size="lg" variant="outline"><Link to="/contact">What Could Your Home Sell For?</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl">{isActive ? "About this home" : "About this transaction"}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{story}</p>
            {p.features && p.features.length > 0 && (
              <>
                <h3 className="mt-10 text-2xl">Features & amenities</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">{p.features.map((f) => <li key={f} className="border-b pb-2 text-sm">{f}</li>)}</ul>
              </>
            )}
            <p className="mt-8 text-sm text-muted-foreground">
              Looking for something similar right now? <a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer" className="link-underline font-medium text-foreground">Search current homes for sale</a>.
            </p>
            <ComplianceNote historical={!isActive} />
          </div>
          <div id="inquire" className="scroll-mt-24 lg:col-span-5">
            <h2 className="text-3xl">{isActive ? "Request a showing" : "Find a home like this"}</h2>
            <div className="mt-5"><PropertyInquiryForm property={`${p.title} (${KIND_LABEL[p.kind]})`} defaultRequest={isActive ? "Private showing" : "Find a home like this"} /></div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory">
          <div className="container-site py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl">Related properties</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <PropertyCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
