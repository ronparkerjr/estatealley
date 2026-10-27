import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { MapPin, Mail, Phone } from "lucide-react";
import { LeadForm, type LeadKind } from "@/components/site/LeadForm";
import { SITE, pageMeta } from "@/lib/site";

const FORMS: { k: LeadKind; l: string; h: string; p: string }[] = [
  { k: "contact", l: "General", h: "Send us a message", p: "Tell us what you're looking for and we'll be in touch." },
  { k: "valuation", l: "Home valuation", h: "Request a free home valuation", p: "A complimentary, no-obligation estimate based on current local sales." },
  { k: "buyer", l: "Buyer consultation", h: "Schedule a buyer consultation", p: "Talk through neighborhoods, budget and timing with an agent." },
  { k: "showing", l: "Showing", h: "Request a property showing", p: "Share the address or MLS number and when you'd like to see it." },
  { k: "question", l: "Ask a question", h: "Ask a real estate question", p: "No question is too small — we're happy to help." },
];

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(z.object({ form: fallback(z.string(), "contact").default("contact") })),
  head: () => ({
    meta: pageMeta("Contact Us", "Contact Estate Alley Group at 9277 Centre Pointe Dr, Suite 200, West Chester, OH 45069. Call 513-305-0102 or request a free home valuation."),
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name}, ${SITE.street}, ${SITE.city}, ${SITE.region} ${SITE.zip}`)}`;

function Contact() {
  const { form } = Route.useSearch();
  const active = FORMS.find((f) => f.k === form) ?? FORMS[0]!;
  return (
    <>
      <section className="bg-ivory">
        <div className="container-site pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="flex items-center gap-4"><span className="h-px w-10 bg-foreground/40" /><p className="eyebrow">Contact</p></div>
          <h1 className="mt-8 max-w-4xl text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-[4.6rem]">Let's talk about your next move.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Whether you're buying, selling, investing or just have a question, we'll respond personally.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <nav aria-label="Choose a form" className="flex flex-wrap gap-2">
              {FORMS.map((f) => (
                <Link key={f.k} to="/contact" search={{ form: f.k }} replace resetScroll={false} aria-current={f.k === active.k ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] ${f.k === active.k ? "bg-charcoal text-on-dark" : "hover:bg-ivory"}`}>
                  {f.l}
                </Link>
              ))}
            </nav>
            <h2 className="mt-10 text-3xl md:text-4xl">{active.h}</h2>
            <p className="mt-2 text-muted-foreground">{active.p}</p>
            <div className="mt-8"><LeadForm key={active.k} kind={active.k} /></div>
          </div>

          <address className="not-italic lg:col-span-4">
            <div className="sticky top-28 bg-ivory p-8 md:p-10">
              <p className="font-serif text-3xl">{SITE.name}</p>
              <p className="text-sm text-muted-foreground">{SITE.brokerage}</p>
              <span className="rule-champagne mt-6" />
              <ul className="mt-6 space-y-5">
                <li><a href={MAPS} target="_blank" rel="noopener noreferrer" className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" /><span className="link-underline">{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.zip}</span></a></li>
                <li><a href={SITE.phoneHref} className="flex items-center gap-3 text-lg font-medium"><Phone className="h-4 w-4" /><span className="link-underline">{SITE.phone}</span></a></li>
                <li><a href={SITE.emailHref} className="flex items-center gap-3"><Mail className="h-4 w-4" /><span className="link-underline">{SITE.email}</span></a></li>
              </ul>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-xs font-semibold uppercase tracking-[0.15em] link-underline">Get directions →</a>
            </div>
          </address>
        </div>
      </section>
    </>
  );
}
