import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/LeadForm";
import { PageHeader } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

const PATH = "/first-time-buyer-form";

export const Route = createFileRoute("/first-time-buyer-form")({
  head: () => ({
    meta: [
      ...pageMeta("First-Time Buyer Consultation", "Request a free, no-pressure first-time homebuyer consultation with Estate Alley Group. Share your timing, preferred neighborhood and questions.", PATH),
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: SITE.url + PATH }],
  }),
  component: FirstTimeBuyerFormPage,
});

function FirstTimeBuyerFormPage() {
  return (
    <>
      <PageHeader eyebrow="First-time buyers" title="Are you a first-time homebuyer?" intro="Let us help direct your first steps to home ownership. Contact us for a free, no-pressure consultation to help you navigate your first transaction." />
      <section className="bg-background">
        <div className="container-site py-12 md:py-20">
          <div className="mx-auto max-w-3xl"><LeadForm kind="firstTimeBuyer" /></div>
        </div>
      </section>
    </>
  );
}