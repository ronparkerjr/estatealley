import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-home.jpg";
import team from "@/assets/john-heather-alley.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { CtaBand, Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Cincinnati & Dayton Real Estate",
      "Buy or sell with Estate Alley Group, Keller Williams Advisors. Free home valuations and personal guidance across Cincinnati, Dayton and surrounding areas.",
    ),
  }),
  component: Home,
});

const paths = [
  { eyebrow: "Sellers", title: "Sell with a clear plan", body: "Pricing grounded in local sales, staging ideas, and marketing built around your home.", to: "/contact", cta: "Request a valuation" },
  { eyebrow: "Buyers", title: "Find the right home", body: "Neighborhood insight, showings on your schedule, and steady guidance from offer to close.", to: "/listed-properties", cta: "View listings" },
  { eyebrow: "Agents", title: "Grow with our team", body: "Mentorship, support and a collaborative culture backed by Keller Williams Advisors.", to: "/join-our-team", cta: "Learn about joining" },
] as const;

const pillars = [
  { title: "Relationship-focused", body: "We build lasting relationships rooted in trust and personal service." },
  { title: "Experienced", body: "Ranked in the top 1.5% of Cincinnati realtors." },
  { title: "No-pressure consultations", body: "Complimentary valuations and honest advice, without obligation." },
  { title: "Market knowledge", body: "Current, local insight to help you decide with confidence." },
];

function Home() {
  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-charcoal text-on-dark">
        <img src={hero} alt="Brick and stone home at dusk in a wooded Cincinnati neighborhood" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-site flex min-h-[88vh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-0">
          <p className="eyebrow !text-champagne animate-fade-up">{SITE.brokerage}</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] md:text-7xl lg:text-8xl animate-fade-up">
            Real estate, handled with care.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-on-dark-muted animate-fade-up">
            Helping buyers and sellers across {SITE.serviceArea} move forward with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up">
            <Button asChild size="lg" variant="inverse"><Link to="/contact">Free Home Valuation</Link></Button>
            <Button asChild size="lg" variant="outlineInverse"><a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">Search MLS Listings</a></Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {paths.map((p) => (
            <Link key={p.title} to={p.to} className="group bg-background p-8 transition-colors hover:bg-ivory md:p-10">
              <p className="eyebrow">{p.eyebrow}</p>
              <h2 className="mt-4 text-3xl">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                {p.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <img src={team.url} alt="John and Heather Alley" width={1100} height={1375} loading="lazy" className="aspect-[4/5] w-full object-cover object-top shadow-soft" />
          <div>
            <p className="eyebrow">Your trusted partner</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Led by John & Heather Alley</h2>
            <span className="rule-champagne mt-6" />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              John and Heather lead the Estate Alley Group, bringing a fresh approach to real estate in Cincinnati and the surrounding areas. They've built a team that values professionalism and personal service — whether you're buying, selling or investing.
            </p>
            <Button asChild variant="outline" className="mt-8"><Link to="/about">Meet the team</Link></Button>
          </div>
        </div>
      </Section>

      <Section>
        <p className="eyebrow">Why Estate Alley</p>
        <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">What clients can expect from us.</h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={p.title} className="border-t pt-6">
              <p className="font-serif text-2xl text-champagne">0{i + 1}</p>
              <h3 className="mt-3 text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
