import { useMemo, useState } from "react";
import type { Property } from "@/lib/properties";

const PRICES = [
  { v: "", l: "Any price" },
  { v: "0-400000", l: "Under $400K" },
  { v: "400000-700000", l: "$400K – $700K" },
  { v: "700000-1000000", l: "$700K – $1M" },
  { v: "1000000-999999999", l: "$1M+" },
];

const sel = "w-full rounded-sm border bg-background px-3 py-2.5 text-sm";

export function usePropertyFilters(items: Property[]) {
  const [f, setF] = useState({ price: "", beds: "", baths: "", type: "", location: "" });
  const types = useMemo(() => [...new Set(items.map((p) => p.type))].sort(), [items]);
  const locations = useMemo(() => [...new Set(items.map((p) => p.location).filter(Boolean) as string[])].sort(), [items]);
  const results = useMemo(() => {
    const [lo, hi] = f.price ? f.price.split("-").map(Number) : [0, Infinity];
    return items.filter((p) =>
      p.price >= lo && p.price < hi &&
      (!f.beds || p.beds >= +f.beds) &&
      (!f.baths || (p.baths ?? 0) >= +f.baths) &&
      (!f.type || p.type === f.type) &&
      (!f.location || p.location === f.location));
  }, [items, f]);

  const ui = (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="search" aria-label="Filter properties">
      {locations.length > 0 && (
        <label className="text-xs font-medium uppercase tracking-[0.15em]">Community
          <select className={`${sel} mt-1.5`} value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })}>
            <option value="">Any</option>{locations.map((l) => <option key={l}>{l}</option>)}
          </select></label>
      )}
      <label className="text-xs font-medium uppercase tracking-[0.15em]">Price
        <select className={`${sel} mt-1.5`} value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })}>
          {PRICES.map((p) => <option key={p.v} value={p.v}>{p.l}</option>)}
        </select></label>
      <label className="text-xs font-medium uppercase tracking-[0.15em]">Bedrooms
        <select className={`${sel} mt-1.5`} value={f.beds} onChange={(e) => setF({ ...f, beds: e.target.value })}>
          <option value="">Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select></label>
      <label className="text-xs font-medium uppercase tracking-[0.15em]">Bathrooms
        <select className={`${sel} mt-1.5`} value={f.baths} onChange={(e) => setF({ ...f, baths: e.target.value })}>
          <option value="">Any</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select></label>
      <label className="text-xs font-medium uppercase tracking-[0.15em]">Property type
        <select className={`${sel} mt-1.5`} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
          <option value="">Any</option>{types.map((t) => <option key={t}>{t}</option>)}
        </select></label>
    </div>
  );
  return { results, ui };
}
