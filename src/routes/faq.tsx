import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { FAQ } from "@/lib/faq";
import { SITE, breadcrumbs, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: pageMeta(
      "Home Buying & Selling FAQ",
      "Answers to common questions about home valuations, listing agents, first-time buyers, showings and relocation from Estate Alley Group in West Chester, Ohio.",
      "/faq",
    ),
    links: [{ rel: "canonical", href: SITE.url + "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs([["Home", "/"], ["FAQ", "/faq"]])) },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHeader eyebrow="Questions" title="Buying & Selling FAQ" intro="Straight answers to the questions we hear most from buyers and sellers." />
      <Section>
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <article key={f.q} className="py-8">
              <h2 className="text-2xl md:text-3xl">{f.q}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-sm text-muted-foreground">
          Have a different question? <Link to="/contact" search={{ form: "question" }} className="link-underline text-foreground">Ask us directly</Link> or call <a href={SITE.phoneHref} className="link-underline text-foreground">{SITE.phone}</a>. See also our <Link to="/areas" className="link-underline text-foreground">community guides</Link>.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
