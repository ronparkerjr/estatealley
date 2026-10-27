import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/site/Sections";
import { SITE, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: pageMeta("Contact & Free Home Valuation", "Contact Estate Alley Group at 513-305-0102 or request a free home valuation. 9277 Centre Pointe Dr, Suite 200, West Chester, OH.") }),
  component: Contact,
});

const field = "mt-2 w-full border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-foreground";

function Contact() {
  const [topic, setTopic] = useState("Free home valuation");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get("name")}\nPhone: ${d.get("phone")}\nEmail: ${d.get("email")}\nTopic: ${topic}\n\n${d.get("message")}`;
    window.location.href = `${SITE.emailHref}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk about your next move." intro="Request a complimentary valuation, schedule a showing, or ask us anything." />
      <Section>
        <div className="grid gap-16 md:grid-cols-5">
          <form onSubmit={onSubmit} className="space-y-6 md:col-span-3">
            <div>
              <label htmlFor="topic" className="eyebrow">I'm interested in</label>
              <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
                <option>Free home valuation</option>
                <option>Buying a home / showing request</option>
                <option>General consultation</option>
                <option>Joining the team</option>
              </select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div><label htmlFor="name" className="eyebrow">Name</label><input id="name" name="name" required autoComplete="name" className={field} /></div>
              <div><label htmlFor="phone" className="eyebrow">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
            </div>
            <div><label htmlFor="email" className="eyebrow">Email</label><input id="email" name="email" type="email" required autoComplete="email" className={field} /></div>
            <div><label htmlFor="message" className="eyebrow">Message</label><textarea id="message" name="message" rows={5} className={field} placeholder="Property address, timeline, questions…" /></div>
            <Button type="submit" size="lg">Send message</Button>
          </form>

          <address className="not-italic md:col-span-2">
            <div className="bg-ivory p-8 md:p-10">
              <p className="font-serif text-3xl">{SITE.name}</p>
              <p className="text-sm text-muted-foreground">{SITE.brokerage}</p>
              <span className="rule-champagne mt-6" />
              <p className="mt-6 leading-relaxed">{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.zip}</p>
              <p className="mt-6"><a href={SITE.phoneHref} className="link-underline text-lg font-medium">{SITE.phone}</a></p>
              <p className="mt-1"><a href={SITE.emailHref} className="link-underline">{SITE.email}</a></p>
            </div>
          </address>
        </div>
      </Section>
    </>
  );
}
