export const SITE = {
  name: "Estate Alley Group",
  url: "https://www.estatealley.com",
  brokerage: "Keller Williams Advisors",
  street: "9277 Centre Pointe Dr, Suite 200",
  city: "West Chester",
  region: "OH",
  zip: "45069",
  phone: "513-305-0102",
  phoneHref: "tel:+15133050102",
  email: "heather@estatealley.com",
  emailHref: "mailto:heather@estatealley.com",
  mlsSearch: "https://estatealley.kw.com/",
  facebook: "https://www.facebook.com/EstateAlley",
  youtube: "https://www.youtube.com/@heatherandjohnalleywithest3684",
  serviceArea: "Cincinnati, Dayton and surrounding areas",
  // Communities the team serves (no offices implied). Office is in West Chester only.
  areasServed: ["Greater Cincinnati", "West Chester", "Mason", "Liberty Township", "Lebanon", "Loveland", "Maineville", "Fairfield", "Blue Ash", "Montgomery", "Dayton"],
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/sold-properties", label: "Sold Properties" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/join-our-team", label: "Join Our Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function pageMeta(title: string, description: string, path?: string) {
  const full = `${title} | Estate Alley Group`;
  return [
    { title: full },
    { name: "description", content: description },
    { property: "og:title", content: full },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(path ? [{ property: "og:url", content: SITE.url + path }] : []),
  ];
}

export function breadcrumbs(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE.url + path })),
  };
}
