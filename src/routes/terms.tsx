import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta("Terms of Use", "Terms for using the Estate Alley Group website, including property information and brokerage disclosures.", "/terms"),
    links: [{ rel: "canonical", href: SITE.url + "/terms" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" />
      <Section>
        <div className="max-w-3xl space-y-6 text-muted-foreground [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground">
          <h2>General information</h2>
          <p>Content on this website is provided for general information only and is not legal, tax, lending or financial advice.</p>
          <h2>Property information</h2>
          <p>Property details are believed reliable but not guaranteed and should be independently verified. Sold and buyer-represented homes are shown as past transactions and are not currently for sale.</p>
          <h2>Brokerage</h2>
          <p>{SITE.name} is a real estate team affiliated with {SITE.brokerage}. Each Keller Williams office is independently owned and operated. Equal Housing Opportunity.</p>
          <h2>Use of content</h2>
          <p>Photos and text on this site belong to {SITE.name} or their respective owners and may not be reused without permission.</p>
          <h2>Contact</h2>
          <p><a className="underline" href={SITE.emailHref}>{SITE.email}</a> · <a className="underline" href={SITE.phoneHref}>{SITE.phone}</a></p>
        </div>
      </Section>
    </>
  );
}
