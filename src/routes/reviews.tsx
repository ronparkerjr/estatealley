import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Sections";
import { REVIEWS } from "@/lib/home-content";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: pageMeta("Client Reviews", "Read genuine reviews from buyers and sellers who worked with Estate Alley Group, Keller Williams Advisors, across Greater Cincinnati and Dayton."),
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

// TODO: replace with the confirmed "write a review" link from the Google Business Profile.
const GOOGLE_REVIEW_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Estate Alley Group with Keller Williams Advisors")}`;

const SOURCES = [
  { name: "Google", href: GOOGLE_REVIEW_URL },
  { name: "Experience.com", href: "https://www.experience.com/reviews/heather-3974694" },
  { name: "Keller Williams", href: "https://estatealley.kw.com/" },
];

const [featured, ...rest] = REVIEWS;

function Reviews() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-site pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="flex items-center gap-4"><span className="h-px w-10 bg-foreground/40" /><p className="eyebrow">Client reviews</p></div>
          <h1 className="mt-8 max-w-4xl text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-[4.6rem]">Great experiences. Lasting relationships.</h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave Us a Google Review <ExternalLink /></a></Button>
            <Button asChild size="lg" variant="outline"><Link to="/contact" search={{ form: "valuation" }}>Request a Free Home Valuation</Link></Button>
          </div>
        </div>
      </section>

      {featured && (
        <Section>
          <figure className="mx-auto max-w-4xl text-center">
            <span className="rule-champagne mx-auto" />
            <blockquote className="mt-10 font-serif text-3xl leading-snug md:text-5xl">“{featured.quote}”</blockquote>
            <figcaption className="mt-8 text-sm"><span className="font-medium">{featured.name}</span> <span className="text-muted-foreground">· {featured.date} · via estatealley.com</span></figcaption>
          </figure>
        </Section>
      )}

      <Section tone="ivory">
        <h2 className="text-3xl md:text-4xl">More from our clients</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {rest.map((r) => (
            <figure key={r.name} className="flex flex-col border bg-background p-8 md:p-10">
              <span className="font-serif text-6xl leading-none text-champagne" aria-hidden="true">“</span>
              <blockquote className="mt-2 flex-1 font-serif text-xl leading-snug md:text-2xl">{r.quote}</blockquote>
              <figcaption className="mt-6 border-t pt-4 text-sm"><span className="font-medium">{r.name}</span> <span className="text-muted-foreground">· {r.date} · via estatealley.com</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 border-t pt-8">
          <p className="eyebrow">Read more reviews on</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {SOURCES.map((s) => (
              <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm hover:bg-ivory">{s.name} <ExternalLink className="h-3.5 w-3.5" /></a></li>
            ))}
          </ul>
        </div>
      </Section>

      <section className="bg-charcoal text-on-dark">
        <div className="container-site grid gap-px py-px md:grid-cols-2">
          {[
            { e: "Sellers", h: "What could your home sell for?", cta: "Request a Free Home Valuation", form: "valuation" },
            { e: "Buyers", h: "Ready to start your search?", cta: "Schedule a Buyer Consultation", form: "buyer" },
          ].map((x) => (
            <div key={x.e} className="py-16 md:px-10 md:py-20">
              <p className="eyebrow !text-champagne">{x.e}</p>
              <h2 className="mt-4 text-3xl md:text-4xl">{x.h}</h2>
              <Button asChild size="lg" variant="inverse" className="mt-8"><Link to="/contact" search={{ form: x.form }}>{x.cta}</Link></Button>
            </div>
          ))}
        </div>
        <p className="container-site pb-10 text-xs text-on-dark-muted">Or call {SITE.phone}.</p>
      </section>
    </>
  );
}
