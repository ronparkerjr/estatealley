import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/sold-properties")({
  head: () => ({ meta: pageMeta("Sold Properties", "Recently sold homes and assisted purchases by Estate Alley Group across Greater Cincinnati and Dayton.") }),
  component: Sold,
});

function Sold() {
  return (
    <>
      <PageHeader eyebrow="Track record" title="Sold Properties" intro="Homes we've helped sellers and buyers close on." />
      <Section tone="ivory">
        <ComingSoon title="Our sales gallery is being prepared">
          Recently sold homes, assisted purchases and renovation projects will be featured here soon.
        </ComingSoon>
      </Section>
      <CtaBand />
    </>
  );
}
