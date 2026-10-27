import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Sections";
import { AgentInquiryForm } from "@/components/site/AgentInquiryForm";
import { SITE, pageMeta } from "@/lib/site";
import { LEADS, JOIN_IMAGE, telHref } from "@/lib/team";
import { TEAM_GROUP_IMAGE } from "@/lib/home-content";

export const Route = createFileRoute("/join-our-team")({
  head: () => ({
    meta: [
      ...pageMeta(
        "Real Estate Agent Careers",
        "Licensed or getting licensed? Start a confidential conversation about joining Estate Alley Group at Keller Williams Advisors in West Chester, Ohio.",
      ),
      { property: "og:image", content: TEAM_GROUP_IMAGE },
      { name: "twitter:image", content: TEAM_GROUP_IMAGE },
    ],
  }),
  component: Join,
});

const pillars = [
  { t: "Team culture", b: "A team that's professional, reliable — and knows how to have fun." },
  { t: "Collaborative environment", b: "Work alongside experienced team leads and fellow agents who share ideas and support each other." },
  { t: "Professional growth", b: "Learn from leads who have bought, renovated and sold homes themselves, and grow your skills with every transaction." },
  { t: "Client-first philosophy", b: "We put relationships and personal service first — the same standard we hold every agent to." },
  { t: "An established local team", b: `A known name in Greater Cincinnati and Dayton, based at ${SITE.brokerage} in West Chester.` },
];

const expect = [
  "A confidential, no-pressure first conversation",
  "Time with Heather and John to talk about your goals",
  "A clear, honest picture of how the team works day to day",
  "Answers on structure and support specific to your situation",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-foreground/40" />
      <p className="eyebrow">{children}</p>
    </div>
  );
}

function Join() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-site grid gap-10 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Careers at Estate Alley Group</Eyebrow>
            <h1 className="mt-8 text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-[4.6rem] animate-fade-up">
              Your career.<br />Your potential.<br />Our team.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              Are you a realtor looking to join a team that's professional, reliable and knows how to have fun? Let's talk about the next step in your real estate career.
            </p>
            <a href="#inquire" className="link-underline mt-8 inline-block text-sm font-semibold uppercase tracking-[0.15em]">Start a confidential conversation →</a>
          </div>
          <img src={TEAM_GROUP_IMAGE} alt="The Estate Alley Group agents" width={1600} height={908} className="aspect-[4/3] w-full object-cover lg:col-span-6" fetchPriority="high" />
        </div>
      </section>

      <Section>
        <Eyebrow>Why agents join us</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-4xl md:text-5xl">A team you'll be proud to grow with.</h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <div key={p.t} className="border-t pt-6">
              <p className="font-serif text-2xl text-champagne">0{i + 1}</p>
              <h3 className="mt-3 text-2xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <img src={JOIN_IMAGE} alt="Join the Estate Alley Group team" width={1200} height={917} loading="lazy" className="w-full md:col-span-6" />
          <div className="md:col-span-6">
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">A personal introduction.</h2>
            <ul className="mt-8 space-y-4">
              {expect.map((x) => <li key={x} className="border-b pb-4">{x}</li>)}
            </ul>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {LEADS.map((m) => (
                <div key={m.name} className="flex items-center gap-4">
                  <img src={m.img} alt={m.name} width={516} height={704} loading="lazy" className="h-20 w-16 object-cover object-top" />
                  <div className="text-sm">
                    <p className="font-serif text-xl">{m.name}</p>
                    <a href={`mailto:${m.email}`} className="link-underline block text-muted-foreground">{m.email}</a>
                    <a href={telHref(m.phone)} className="link-underline block text-muted-foreground">{m.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section id="inquire" className="scroll-mt-24 bg-background">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Agent inquiry</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Start a confidential conversation.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">Your details go directly to Heather and are never shared. Prefer to talk? Call {SITE.phone}.</p>
          </div>
          <div className="lg:col-span-8"><AgentInquiryForm /></div>
        </div>
      </section>
    </>
  );
}
