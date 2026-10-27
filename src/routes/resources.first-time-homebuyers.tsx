import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Sections";
import { LeadForm } from "@/components/site/LeadForm";
import { SITE, breadcrumbs, pageMeta } from "@/lib/site";

const PATH = "/resources/first-time-homebuyers";

const STEPS: { t: string; p: string[] }[] = [
  { t: "Prepare to buy", p: ["Review your monthly budget, savings and credit report.", "Set aside funds for a down payment, closing costs and moving.", "Make a short list of must-haves versus nice-to-haves."] },
  { t: "Financing and preapproval", p: ["Talk with a licensed lender about loan programs you may qualify for.", "A preapproval letter shows sellers you are ready and sets a realistic price range.", "Compare rates and fees from more than one lender."] },
  { t: "Search for homes", p: ["We help you narrow neighborhoods, school districts and commute options.", "Tour homes in person and take notes so details don't blur together.", "Look past paint and furniture — focus on layout, location and condition."] },
  { t: "Offers and negotiation", p: ["We review recent nearby sales to help you decide on a strong, fair offer.", "Your offer covers price, earnest money, contingencies and closing date.", "Expect some back-and-forth; we negotiate on your behalf."] },
  { t: "Inspections", p: ["A licensed home inspector checks the structure, roof, systems and more.", "Depending on the home, consider radon, sewer line or pest inspections.", "Findings may lead to repair requests or a price adjustment."] },
  { t: "Closing", p: ["Your lender completes the appraisal and final approval.", "Do a final walk-through before signing.", "Sign the paperwork, receive the keys, and you're home."] },
];

export const Route = createFileRoute("/resources/first-time-homebuyers")({
  head: () => ({
    meta: pageMeta(
      "First-Time Homebuyer Guide",
      "A clear, step-by-step guide for first-time homebuyers in Cincinnati and West Chester, Ohio, plus a free, no-pressure consultation with Estate Alley Group.",
      PATH,
    ),
    links: [{ rel: "canonical", href: SITE.url + PATH }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbs([["Home", "/"], ["First-Time Homebuyers", PATH]])) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Buyer resource"
        title="Are you a first-time homebuyer?"
        intro="Let us help direct your first steps to home ownership. Here is how the process works — and a free, no-pressure consultation to set you up for success on your first transaction."
      />
      <Section>
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.t} className="border-t border-border pt-6">
              <span className="font-serif text-4xl text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 font-serif text-2xl">{s.t}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {s.p.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-xs text-muted-foreground">
          This guide is general information, not legal, tax or lending advice. Speak with a licensed lender and attorney about your situation.
          More answers on our <Link to="/faq" className="underline">FAQ page</Link>.
        </p>
      </Section>
      <Section tone="ivory">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Free consultation</p>
          <h2 className="mt-3 font-serif text-4xl">Tell us what you're looking for</h2>
          <p className="mt-3 text-muted-foreground">Share your timeline, preferred areas and questions about the buying process. We'll follow up personally.</p>
          <div className="mt-8"><LeadForm kind="buyer" /></div>
        </div>
      </Section>
    </>
  );
}
