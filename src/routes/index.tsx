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
      <section className="bg-ivory">
        <div className="container-site pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-foreground/40" />
            <p className="eyebrow">{SITE.brokerage} · Cincinnati & Dayton</p>
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <h1 className="text-[3.4rem] uppercase leading-[0.92] tracking-[-0.02em] sm:text-7xl xl:text-[6.5rem] animate-fade-up">
                  Homes,<br />handled<br />with care.
                </h1>
                <p className="mt-8 max-w-sm text-xs font-medium uppercase leading-relaxed tracking-[0.22em] text-muted-foreground animate-fade-up">
                  Personal guidance for buyers and sellers across Greater Cincinnati and Dayton.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3 animate-fade-up">
                <Button asChild size="lg"><Link to="/contact">Free Home Valuation <ArrowRight /></Link></Button>
                <Button asChild size="lg" variant="outline"><a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">Search Listings</a></Button>
              </div>
            </div>
            <div className="relative lg:col-span-7">
              <img src={hero} alt="Brick and stone home at dusk in a wooded Cincinnati neighborhood" width={1920} height={1088} className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" fetchPriority="high" />
              <p className="absolute right-5 top-5 hidden border-l border-on-dark/60 pl-3 text-[0.65rem] font-semibold uppercase leading-relaxed tracking-[0.24em] text-on-dark md:block">
                Local<br />Trusted<br />Personal
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 border-t pt-6 md:grid-cols-12">
            <img src={interior} alt="Bright living room with black steel windows and a marble fireplace" width={1280} height={960} loading="lazy" className="aspect-[16/10] w-full object-cover md:col-span-5" />
            <div className="grid grid-cols-2 items-center md:col-span-5">
              <div className="border-r pr-4 text-center">
                <p className="font-serif text-6xl md:text-7xl">1.5%</p>
                <p className="eyebrow mt-3">Top Cincinnati realtors</p>
              </div>
              <div className="pl-4 text-center">
                <p className="font-serif text-6xl md:text-7xl">$0</p>
                <p className="eyebrow mt-3">Home valuations</p>
              </div>
            </div>
            <div className="hidden flex-col justify-center gap-2 md:col-span-2 md:flex">
              {["Sell", "Buy", "Invest", "Relocate"].map((w) => (
                <p key={w} className="eyebrow">{w}</p>
              ))}
              <span className="rule-champagne mt-2" />
            </div>
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
