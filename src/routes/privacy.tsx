import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: pageMeta("Privacy Policy", "How Estate Alley Group collects, uses and protects the information you share through this website.", "/privacy"),
    links: [{ rel: "canonical", href: SITE.url + "/privacy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <div className="max-w-3xl space-y-6 text-muted-foreground [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground">
          <h2>Information we collect</h2>
          <p>When you submit a form on this website we receive the details you enter, such as your name, email, phone number, property address and message.</p>
          <h2>How we use it</h2>
          <p>We use your information only to respond to your request and to provide real estate services you ask about. We do not sell your personal information.</p>
          <h2>Form delivery</h2>
          <p>Form submissions are delivered to our team by email through a third-party form service (FormSubmit), which processes the data only to deliver it.</p>
          <h2>Text messages</h2>
          <p>We text you only if you check the consent box on a form. Message and data rates may apply. Reply STOP to opt out at any time.</p>
          <h2>Links to other sites</h2>
          <p>This site links to services such as Keller Williams property search, Google and YouTube, which have their own privacy policies.</p>
          <h2>Contact</h2>
          <p>Questions or requests to update or delete your information: <a className="underline" href={SITE.emailHref}>{SITE.email}</a> or <a className="underline" href={SITE.phoneHref}>{SITE.phone}</a>. {SITE.name}, {SITE.street}, {SITE.city}, {SITE.region} {SITE.zip}.</p>
        </div>
      </Section>
    </>
  );
}
