import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { AREAS } from "@/lib/areas";
import { SITE, breadcrumbs, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/areas/")({
  head: () => ({
    meta: pageMeta(
      "Communities We Serve",
      "Community guides for West Chester, Mason, Liberty Township, Lebanon, Loveland and Cincinnati from Estate Alley Group, Keller Williams Advisors.",
      "/areas",
    ),
    links: [{ rel: "canonical", href: SITE.url + "/areas" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbs([["Home", "/"], ["Communities", "/areas"]])) }],
  }),
  component: Areas,
});

function Areas() {
  return (
    <>
      <PageHeader
        eyebrow="Communities"
        title="Communities We Serve"
        intro={`From our office in ${SITE.city}, we help buyers and sellers across Greater Cincinnati and Dayton. These guides cover the basics of each area.`}
      />
      <Section>
        <ul className="grid gap-px border border-border sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <li key={a.slug} className="bg-background p-8">
              <p className="eyebrow">{a.county}</p>
              <h2 className="mt-3 text-3xl">
                <Link to="/areas/$slug" params={{ slug: a.slug }} className="link-underline">{a.name}, Ohio real estate</Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.intro}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          We also work with clients in Maineville, Fairfield, Blue Ash, Montgomery, Dayton and surrounding communities. Our only office is in {SITE.city}.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
