import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/join-our-team")({
  head: () => ({ meta: pageMeta("Join Our Team", "Explore real estate agent opportunities with Estate Alley Group at Keller Williams Advisors in West Chester, Ohio.") }),
  component: Join,
});

function Join() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Build your business with us." intro="We're always glad to talk with licensed agents and new professionals who share our commitment to client service." />
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl">Start a confidential conversation</h2>
          <p className="mt-4 text-muted-foreground">Reach out to Heather directly to learn about mentorship, support and how our team works.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><a href={`${SITE.emailHref}?subject=Joining%20Estate%20Alley%20Group`}>Email Heather</a></Button>
            <Button asChild size="lg" variant="outline"><a href={SITE.phoneHref}>Call {SITE.phone}</a></Button>
          </div>
        </div>
      </Section>
    </>
  );
}
