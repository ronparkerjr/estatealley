import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-ivory">
      <div className="container-site py-20 md:py-28">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-5xl md:text-7xl animate-fade-up">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground animate-fade-up">{intro}</p>}
      </div>
    </section>
  );
}

export function Section({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "ivory"; className?: string }) {
  return (
    <section className={`${tone === "ivory" ? "bg-ivory" : "bg-background"} ${className}`}>
      <div className="container-site py-20 md:py-28">{children}</div>
    </section>
  );
}

export function ComingSoon({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl border bg-background p-10 text-center md:p-14">
      <span className="rule-champagne mx-auto" />
      <h2 className="mt-6 text-3xl md:text-4xl">{title}</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="bg-charcoal text-on-dark">
      <div className="container-site grid items-center gap-10 py-20 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow !text-champagne">Thinking of selling?</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Find out what your home is worth today.</h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="max-w-md text-on-dark-muted md:text-right">
            A complimentary, no-pressure valuation based on current local sales — prepared by people who know your neighborhood.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="inverse"><Link to="/contact">Request a Valuation</Link></Button>
            <Button asChild size="lg" variant="outlineInverse"><a href={SITE.phoneHref}>Call {SITE.phone}</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
