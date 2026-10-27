import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ComingSoon, CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/listed-properties")({
  head: () => ({ meta: pageMeta("Listed Properties", "Browse homes currently listed by Estate Alley Group in Cincinnati, Dayton and surrounding areas, or search the full MLS.") }),
  component: Listed,
});

function Listed() {
  return (
    <>
      <PageHeader eyebrow="For sale" title="Listed Properties" intro="Current homes represented by Estate Alley Group." />
      <Section tone="ivory">
        <ComingSoon title="Featured listings are on the way">
          While we prepare this page, you can browse every active home in the area on our MLS search, or call us to schedule a showing.
        </ComingSoon>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">Search MLS Listings</a></Button>
          <Button asChild size="lg" variant="outline"><a href={SITE.phoneHref}>Request a showing</a></Button>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
