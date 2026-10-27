import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";
import { AGENTS, LEADS, telHref, type Member } from "@/lib/team";
import { RENO_AFTER, RENO_BEFORE, REVIEWS, TEAM_GROUP_IMAGE, YOUTUBE_URL } from "@/lib/home-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      ...pageMeta(
        "About Our Team",
        "Meet Heather and John Alley and the Estate Alley Group agents at Keller Williams Advisors, serving Greater Cincinnati, West Chester, Mason and Dayton.",
      ),
      { property: "og:image", content: TEAM_GROUP_IMAGE },
      { name: "twitter:image", content: TEAM_GROUP_IMAGE },
    ],
  }),
  component: About,
});

const commitments = [
  { t: "Relationships first", b: "We build lasting relationships rooted in trust and personalized service." },
  { t: "No-pressure guidance", b: "Consultations and home valuations come without obligation, so you can decide with confidence." },
  { t: "A streamlined process", b: "From the first consultation to closing, a clear process and steady guidance at every step." },
  { t: "Honest market insight", b: "Current local knowledge to help you price, offer and negotiate well." },
];

const areas = ["Cincinnati", "West Chester", "Mason", "Liberty Township", "Anderson Township", "Dayton"];

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`h-px w-10 ${dark ? "bg-on-dark/40" : "bg-foreground/40"}`} />
      <p className={`eyebrow ${dark ? "!text-champagne" : ""}`}>{children}</p>
    </div>
  );
}

function Contact({ m }: { m: Member }) {
  return (
    <div className="mt-4 space-y-1 text-sm">
      <a href={`mailto:${m.email}`} className="link-underline flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{m.email}</a>
      <a href={telHref(m.phone)} className="link-underline flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{m.phone}</a>
    </div>
  );
}

function About() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-site pb-16 pt-12 md:pb-24 md:pt-16">
          <Eyebrow>About Estate Alley Group</Eyebrow>
          <h1 className="mt-8 max-w-5xl text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-[5rem] animate-fade-up">
            Dedication. Expertise. Passion.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Led by husband-and-wife team Heather and John Alley, Estate Alley Group is a {SITE.brokerage} team helping buyers, sellers and investors across Greater Cincinnati, Dayton and the surrounding communities.
          </p>
          <img src={TEAM_GROUP_IMAGE} alt="The Estate Alley Group team" width={1600} height={908} className="mt-12 aspect-[16/7] w-full object-cover" fetchPriority="high" />
        </div>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">A fresh approach to real estate.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-7">
            <p>John and Heather Alley lead the Estate Alley Group, bringing a fresh approach to real estate in Cincinnati and the surrounding areas. With years of experience and a genuine passion for what they do, they've built a team that values professionalism and personal service.</p>
            <p>Whether you're buying, selling or investing, the team is here to make the process as smooth and enjoyable as possible, every step of the way.</p>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <Eyebrow>Team leads</Eyebrow>
        <h2 className="mt-5 text-4xl md:text-5xl">Meet Heather & John.</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {LEADS.map((m) => (
            <article key={m.name} className="grid gap-6 sm:grid-cols-5">
              <img src={m.img} alt={m.name} width={516} height={704} loading="lazy" className="aspect-[3/4] w-full object-cover object-top sm:col-span-2" />
              <div className="sm:col-span-3">
                <p className="eyebrow">{m.role}</p>
                <h3 className="mt-2 text-3xl">{m.name}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{m.bio}</p>
                <Contact m={m} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Our agents</Eyebrow>
        <h2 className="mt-5 text-4xl md:text-5xl">The people behind your move.</h2>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((m) => (
            <article key={m.name}>
              <img src={m.img} alt={m.name} width={516} height={704} loading="lazy" className="aspect-[4/5] w-full bg-ivory object-cover object-top" />
              <p className="eyebrow mt-5">{m.role}</p>
              <h3 className="mt-1 text-2xl">{m.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              <Contact m={m} />
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Our commitments</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">How we work with every client.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">We know these communities — where we live, work and help clients every week:</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => <li key={a} className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em]">{a}</li>)}
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7">
            {commitments.map((c, i) => (
              <div key={c.t} className="border-t pt-5">
                <p className="font-serif text-2xl text-champagne">0{i + 1}</p>
                <h3 className="mt-2 text-2xl">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {[{ src: RENO_BEFORE, l: "Before" }, { src: RENO_AFTER, l: "After" }].map((x) => (
              <figure key={x.l}>
                <img src={x.src} alt={`Alley family renovation — ${x.l.toLowerCase()}`} width={900} height={582} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="eyebrow mt-3">{x.l}</figcaption>
              </figure>
            ))}
          </div>
          <div className="md:col-span-5">
            <Eyebrow>On a more personal note</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Our renovation documentary.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              John and Heather purchased a vacant home in need of renovation and documented the entire before, during and after process — sharing how they got started and how real estate has become a valuable income stream for their family and their clients.
            </p>
            <Button asChild className="mt-8"><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></Button>
          </div>
        </div>
      </Section>

      <section className="bg-charcoal text-on-dark">
        <div className="container-site py-20 md:py-28">
          <Eyebrow dark>Client reviews</Eyebrow>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="border-t border-on-dark/20 pt-6">
                <blockquote className="font-serif text-xl leading-snug">“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-on-dark-muted">{r.name} · {r.date}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-on-dark/20 pt-10">
            <h2 className="text-3xl md:text-4xl">Let's talk about your real estate goals.</h2>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="inverse"><Link to="/contact">Let's Talk About Your Real Estate Goals</Link></Button>
              <Button asChild size="lg" variant="outlineInverse"><a href={SITE.phoneHref}>Call {SITE.phone}</a></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
