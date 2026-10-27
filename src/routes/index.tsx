import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import team from "@/assets/john-heather-alley.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";
import { HERO_IMAGE, RENO_AFTER, RENO_BEFORE, REVIEWS, SOLD, TEAM_GROUP_IMAGE, YOUTUBE_URL } from "@/lib/home-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta(
        "West Chester, Cincinnati & Dayton Real Estate",
        "Estate Alley Group at Keller Williams Advisors helps buyers, sellers and investors across Greater Cincinnati, West Chester, Mason, Liberty Township and Dayton.",
      ),
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE.url + "/" }],
  }),
  component: Home,
});

const buy = ["Explore available homes", "Understand local communities", "Receive knowledgeable guidance", "Schedule private showings"];
const sell = ["Complimentary home valuation", "Pricing and marketing strategy", "Professional photography and staging guidance", "Personalized selling consultation"];

const why = [
  { title: "Local Market Expertise", body: "Day-to-day work across Greater Cincinnati and Dayton means pricing and advice grounded in what's actually selling nearby." },
  { title: "Strategic Marketing and Presentation", body: "Research, staging ideas and thoughtful presentation so your home is seen at its best by the right buyers." },
  { title: "Personalized Client Service", body: "Relationships rooted in trust, prompt communication, and no-pressure consultations." },
  { title: "Experience From Consultation to Closing", body: "A streamlined process and steady guidance at every step, from the first conversation to the keys." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-foreground/40" />
      <p className="eyebrow">{children}</p>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-ivory">
        <div className="container-site pb-16 pt-10 md:pb-24 md:pt-14">
          <Eyebrow>{SITE.brokerage} · West Chester, Ohio</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <h1 className="text-[2.6rem] uppercase leading-[0.95] tracking-[-0.02em] sm:text-6xl xl:text-[4.6rem] animate-fade-up">
                  Exceptional<br />homes.<br />Exceptional<br />service.
                </h1>
                <p className="mt-8 max-w-md leading-relaxed text-muted-foreground animate-fade-up">
                  Your trusted real estate team serving Greater Cincinnati, West Chester, Mason, Liberty Township, Dayton and surrounding communities.
                </p>
              </div>
              <div className="mt-10 animate-fade-up">
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="lg:whitespace-normal"><Link to="/listed-properties">Find Your Home (Search the MLS Listings) <ArrowRight /></Link></Button>
                  <Button asChild size="lg" variant="outline"><Link to="/contact" search={{ form: "valuation" }}>What's My Home Worth?</Link></Button>
                </div>
                <Link to="/contact" search={{ form: "buyer" }} className="mt-6 inline-block rounded-sm border border-foreground/25 px-5 py-3 text-sm font-medium transition-colors duration-300 hover:border-foreground">
                  Or schedule a free consultation →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <img src={HERO_IMAGE} alt="Grand Legacy home sold by Estate Alley Group" width={1400} height={1163} className="aspect-[4/3] h-full w-full object-cover" fetchPriority="high" />
              <p className="eyebrow mt-3">Grand Legacy · Sold by Estate Alley Group</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Meet */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <img src={team.url} alt="John and Heather Alley" width={1100} height={1375} loading="lazy" className="aspect-[4/5] w-full object-cover object-top md:col-span-5" />
          <div className="md:col-span-7">
            <Eyebrow>Meet Estate Alley Group</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl">Real estate expertise. Relationships that last.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              John and Heather Alley lead the Estate Alley Group, bringing a fresh approach to real estate in Cincinnati and the surrounding areas. With years of experience and a genuine passion for what they do, they've built a team that values professionalism and personal service.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Whether you're buying, selling or investing, they offer personal guidance to make the process as smooth and enjoyable as possible, every step of the way.
            </p>
            <Button asChild variant="outline" className="mt-8"><Link to="/about">Meet Our Team</Link></Button>
          </div>
        </div>
      </Section>

      {/* 3. Pathways */}
      <section className="bg-ivory">
        <div className="container-site grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
          {[
            { eyebrow: "Buyers", title: "Looking to buy?", items: buy, cta: "Explore Available Homes", to: "/listed-properties" as const },
            { eyebrow: "Sellers", title: "Thinking of selling?", items: sell, cta: "Get Your Free Home Valuation", to: "/contact" as const },
          ].map((p) => (
            <div key={p.title} className="bg-ivory px-5 py-10 sm:p-8 md:p-14">
              <p className="eyebrow">{p.eyebrow}</p>
              <h2 className="mt-4 text-4xl md:text-5xl">{p.title}</h2>
              <ul className="mt-8 space-y-3">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-3 border-b pb-3"><Check className="mt-1 h-4 w-4 shrink-0" />{i}</li>
                ))}
              </ul>
              <Button asChild className="mt-10"><Link to={p.to}>{p.cta} <ArrowRight /></Link></Button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured listings */}
      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Featured listings</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Homes on the market now.</h2>
          </div>
          <div className="border p-8 md:col-span-7 md:p-10">
            <p className="leading-relaxed text-muted-foreground">
              Our current listings change quickly, so we show them only when they're verified as active. Browse every home for sale in the area — updated live from the MLS — or ask us about homes before they hit the market.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link to="/listed-properties">View All Listed Properties</Link></Button>
              <Button asChild variant="outline"><a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">Search the MLS</a></Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Recent sales */}
      <Section tone="ivory">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Recent sales & results</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Homes we've helped sell.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">Past transactions — these homes have sold and are no longer available.</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SOLD.map((s) => (
            <article key={s.name}>
              <div className="relative">
                <img src={s.img} alt={`${s.name} home, sold`} width={900} height={748} loading="lazy" className="aspect-[6/5] w-full object-cover" />
                <span className="absolute left-3 top-3 bg-charcoal px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-on-dark">Sold</span>
              </div>
              <h3 className="mt-4 text-2xl">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sold at {s.price} · {s.beds} bd · {s.baths} ba · {s.sqft.toLocaleString()} sq ft
              </p>
            </article>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-12"><Link to="/sold-properties">Explore Our Sold Properties</Link></Button>
      </Section>

      {/* 6. Why */}
      <Section>
        <Eyebrow>Why choose Estate Alley Group?</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-4xl md:text-5xl">What clients can expect from us.</h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((p, i) => (
            <div key={p.title} className="border-t pt-6">
              <p className="font-serif text-3xl text-champagne">0{i + 1}</p>
              <h3 className="mt-3 text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Reviews */}
      <section className="bg-charcoal text-on-dark">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow !text-champagne">Client reviews</p>
          <h2 className="mt-5 text-4xl md:text-5xl">In our clients' words.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="border-t border-on-dark/20 pt-6">
                <blockquote className="font-serif text-xl leading-snug">“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-on-dark-muted">{r.name} · {r.date}</figcaption>
              </figure>
            ))}
          </div>
          <Button asChild variant="outlineInverse" className="mt-12"><Link to="/reviews">Read Our Client Reviews</Link></Button>
        </div>
      </section>

      {/* 8. Renovation */}
      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Renovation & transformation</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">We've renovated homes ourselves.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              John and Heather bought a vacant home in need of renovation and documented the whole before, during and after process. That hands-on experience helps sellers prepare and price, helps investors judge a project, and helps buyers see a home's real potential.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link to="/about">Discover Our Story</Link></Button>
              <Button asChild variant="outline"><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {[{ src: RENO_BEFORE, l: "Before" }, { src: RENO_AFTER, l: "After" }].map((x) => (
              <figure key={x.l}>
                <img src={x.src} alt={`Alley renovation — ${x.l.toLowerCase()}`} width={900} height={582} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="eyebrow mt-3">{x.l}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. Join */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <img src={TEAM_GROUP_IMAGE} alt="The Estate Alley Group team" width={1600} height={908} loading="lazy" className="aspect-[16/9] w-full object-cover md:col-span-7" />
          <div className="md:col-span-5">
            <Eyebrow>Join the team</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Build your real estate career with us.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Mentorship, a collaborative culture and the backing of {SITE.brokerage}.
            </p>
            <Button asChild variant="outline" className="mt-8"><Link to="/join-our-team">Explore Team Opportunities</Link></Button>
          </div>
        </div>
      </Section>

      {/* 10. Final CTA */}
      <section className="bg-charcoal text-on-dark">
        <div className="container-site py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-3xl text-5xl uppercase leading-[0.95] md:text-7xl">Your next chapter starts here.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="inverse"><Link to="/contact" search={{ form: "buyer" }}>Schedule a Buyer Consultation</Link></Button>
            <Button asChild size="lg" variant="outlineInverse"><Link to="/contact" search={{ form: "valuation" }}>Request a Free Home Valuation</Link></Button>
            <Button asChild size="lg" variant="outlineInverse"><a href={SITE.phoneHref}><Phone /> Call {SITE.phone}</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
