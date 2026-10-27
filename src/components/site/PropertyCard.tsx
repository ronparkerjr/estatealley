import { Link } from "@tanstack/react-router";
import { KIND_LABEL, usd, type Property } from "@/lib/properties";

export function PropertySpecs({ p, className = "" }: { p: Property; className?: string }) {
  const parts = [`${p.beds} bd`, p.baths != null && `${p.baths} ba`, p.sqft != null && `${p.sqft.toLocaleString()} sq ft`].filter(Boolean);
  return <p className={className}>{parts.join(" · ")}</p>;
}

export function PropertyCard({ p }: { p: Property }) {
  const detail =
    p.kind === "active"
      ? ({ to: "/listed-properties/$slug", params: { slug: p.slug } } as const)
      : ({ to: "/sold-properties/$slug", params: { slug: p.slug } } as const);
  return (
    <article className="group flex flex-col">
      <Link {...detail} className="relative block overflow-hidden" aria-label={`View details for ${p.title}`}>
        <img src={p.img} alt={`${p.title} — ${p.type.toLowerCase()}`} width={900} height={748} loading="lazy" className="aspect-[6/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 bg-charcoal px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-on-dark">
          {KIND_LABEL[p.kind]}
        </span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="eyebrow">{p.type}{p.location ? ` · ${p.location}` : ""}</p>
        <h3 className="mt-1 text-2xl">{p.title}</h3>
        <p className="mt-1 font-serif text-xl">{p.kind === "active" ? "" : p.kind === "sold" ? "Sold at " : "Purchased at "}{usd(p.price)}</p>
        <PropertySpecs p={p} className="mt-1 text-sm text-muted-foreground" />
        <Link {...detail} className="link-underline mt-4 self-start text-xs font-semibold uppercase tracking-[0.15em]">View Details →</Link>
      </div>
    </article>
  );
}
