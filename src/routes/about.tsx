import { createFileRoute } from "@tanstack/react-router";
import team from "@/assets/john-heather-alley.jpg.asset.json";
import { CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: pageMeta("About John & Heather Alley", "Meet John and Heather Alley and the Estate Alley Group team at Keller Williams Advisors in West Chester, Ohio.") }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="A team built on personal service." intro="Estate Alley Group is led by John and Heather Alley and serves Cincinnati, Dayton and the surrounding communities." />
      <Section>
        <div className="grid gap-12 md:grid-cols-5 md:gap-20">
          <img src={team.url} alt="John and Heather Alley" width={1100} height={1375} loading="lazy" className="aspect-[4/5] w-full object-cover object-top md:col-span-2" />
          <div className="md:col-span-3">
            <h2 className="text-4xl">John & Heather Alley</h2>
            <span className="rule-champagne mt-6" />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              With years of experience and a genuine passion for what they do, John and Heather have built a team that values professionalism and personal service. Whether you're buying, selling or investing, the Estate Alley Group is here to make the process as smooth as possible, every step of the way.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">Full team bios and photos will be added in a later phase.</p>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
