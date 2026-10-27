import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: pageMeta("Client Reviews", "Read what buyers and sellers say about working with Estate Alley Group in Cincinnati and Dayton.") }),
  component: Reviews,
});

function Reviews() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title="In our clients' words." />
      <Section>
        <figure className="mx-auto max-w-3xl text-center">
          <span className="rule-champagne mx-auto" />
          <blockquote className="mt-8 font-serif text-3xl leading-snug md:text-4xl">
            “John and Heather are an unbeatable team. They do great research and offer great ideas for staging.”
          </blockquote>
          <figcaption className="eyebrow mt-8">Estate Alley Group client</figcaption>
        </figure>
        <p className="mt-16 text-center text-sm text-muted-foreground">More verified reviews will be added in a later phase.</p>
      </Section>
      <CtaBand />
    </>
  );
}
