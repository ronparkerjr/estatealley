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
  serviceArea: "Cincinnati, Dayton and surrounding areas",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/listed-properties", label: "Listed Properties" },
  { to: "/sold-properties", label: "Sold Properties" },
  { to: "/reviews", label: "Reviews" },
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
