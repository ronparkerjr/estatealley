import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, PageHeader, Section } from "@/components/site/Sections";
import { YOUTUBE_URL } from "@/lib/home-content";
import { SITE, breadcrumbs, pageMeta } from "@/lib/site";

const img = (id: string) => `https://static.wixstatic.com/media/${id}/v1/fill/w_800,h_560,al_c,q_80,enc_avif,quality_auto/${id}`;

const PROJECTS: { title: string; note: string; photos: [string, string][] }[] = [
  {
    title: "John & Heather Alley's home",
    note: "A vacant home in need of renovation, documented before, during and after.",
    photos: [
      ["ddf363_94af86bd5aea4369b5d7b975cebfd0b6~mv2.jpg", "Exterior before renovation"],
      ["ddf363_293fc6b513ae4f629ef83ec9cd9b22b9~mv2.webp", "Renovation progress"],
      ["ddf363_728241261ba341d39eca3f1f3fd5a8b1~mv2.webp", "Primary bathroom after renovation"],
      ["ddf363_ed1690d9f5564f6f8cd1b1010526e30b~mv2.jpeg", "Interior before renovation"],
      ["ddf363_e7a3098b251e4756a7887e52f7c173f0~mv2.jpeg", "Renovation progress"],
      ["ddf363_6c4068d05654426c8768803f57416aa6~mv2.jpeg", "Renovation progress"],
      ["ddf363_d93bf5135bb04c37abb2c831ae11c5ca~mv2.jpg", "Room before renovation"],
      ["ddf363_2b34e95402ce4c36ab8e22d16c2c451e~mv2.jpg", "Renovation progress"],
      ["ddf363_3e016f25ab9d41cda1b877869d3db3ce~mv2.jpg", "Renovation progress"],
    ],
  },
  {
    title: "Tracy Ward renovation",
    note: "A renovation project by team member Tracy Ward.",
    photos: [
      ["ddf363_1a2c160ef9d44ae098492289f0298019~mv2.png", "Before renovation"],
      ["ddf363_4ea90893b4264b04ba5ba167310c23f6~mv2.png", "After renovation"],
      ["ddf363_84790b9b627840778e2ffdeb85f0b52f~mv2.png", "Renovation photo"],
      ["ddf363_6a31a99ff5a249d9b5648e0c488b1db1~mv2.png", "Renovation photo"],
      ["ddf363_86151a73559c4883917179fc35d26d6d~mv2.png", "Renovation photo"],
      ["ddf363_edb7e8c69fcd4413bb7179b59418ef34~mv2.png", "Renovation photo"],
      ["ddf363_c883bc5580734721bf0b71f523c413c4~mv2.png", "Renovation photo"],
      ["ddf363_74bfc3661d244ef8a6506bc127b41539~mv2.png", "Renovation photo"],
      ["ddf363_d3bd55c843654275acd70688d3ecb941~mv2.png", "Renovation photo"],
    ],
  },
];

export const Route = createFileRoute("/renovations")({
  head: () => ({
    meta: pageMeta(
      "Home Renovations & Investments",
      "Before-and-after photos from real Estate Alley Group renovation projects, including John and Heather Alley's documented home renovation.",
      "/renovations",
    ),
    links: [{ rel: "canonical", href: SITE.url + "/renovations" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbs([["Home", "/"], ["Renovations", "/renovations"]])) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Renovations" title="Our renovations" intro="Real projects from our team — before, during and after." />
      {PROJECTS.map((p, i) => (
        <Section key={p.title} tone={i % 2 ? "ivory" : "light"}>
          <h2 className="font-serif text-3xl md:text-4xl">{p.title}</h2>
          <p className="mt-2 text-muted-foreground">{p.note}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {p.photos.map(([id, alt]) => (
              <img key={id} src={img(id)} alt={`${p.title} — ${alt}`} loading="lazy" width={800} height={560} className="aspect-[10/7] w-full rounded-sm object-cover" />
            ))}
          </div>
        </Section>
      ))}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">On a more personal note</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">The renovation documentary</h2>
          <p className="mt-4 text-muted-foreground">
            John and Heather Alley, a husband-and-wife team, purchased a vacant home in need of renovation and documented the entire before, during and after process. They share how they got started and how real estate has become a valuable income stream for their family and their clients.
          </p>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block underline">Watch on their YouTube channel</a>
          <p className="mt-6 text-sm text-muted-foreground">Thinking about a fixer-upper? <Link to="/contact" search={{ form: "buyer" }} className="underline">Talk with us</Link>.</p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
