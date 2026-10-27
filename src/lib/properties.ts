// Property data migrated from estatealley.com (checked Oct 2026):
//  - /recently-sold-properties → kind "sold" (homes the team listed and sold)
//  - /properties → kind "buyer" (homes the team helped buyers purchase)
// Listing kind "active" must only be added with verified, currently-active MLS data.

export type PropertyKind = "active" | "sold" | "buyer";

export type Property = {
  slug: string;
  kind: PropertyKind;
  title: string;
  price: number;
  beds: number;
  baths?: number | undefined;
  sqft?: number | undefined;
  type: string;
  location?: string | undefined;
  img: string;
  description?: string;
  features?: string[];
};

const crop = (id: string, c: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}~mv2.jpg/v1/crop/${c}/fill/w_${w},h_${h},al_c,q_85,enc_auto/${id}.jpg`;
const fill = (id: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}~mv2.jpg/v1/fill/w_${w},h_${h},al_c,q_85,enc_auto/${id}.jpg`;

/** Image at a requested size. Works for both helper URL shapes. */
export const sized = (url: string, w: number, h: number) => url.replace(/fill\/w_\d+,h_\d+/, `fill/w_${w},h_${h}`);

const s = (slug: string, title: string, price: number, beds: number, baths: number | undefined, sqft: number | undefined, id: string, c: string): Property => ({
  slug, kind: "sold", title, price, beds, baths, sqft, type: "Single-family home", img: crop(id, c, 900, 748),
});
const b = (slug: string, title: string, price: number, beds: number, baths: number, sqft: number, id: string, type = "Single-family home", location?: string): Property => ({
  slug, kind: "buyer", title, price, beds, baths, sqft, type, location, img: fill(id, 900, 748),
});

export const LISTINGS: Property[] = [];

// Mirrors https://www.estatealley.com/recently-sold-properties (same order, prices, specs, photos).
export const SOLD: Property[] = [
  s("eden-ridge", "Eden Ridge", 575000, 5, 5, 4115, "ddf363_af37643bba324cd888164d382bb047a2", "x_73,y_0,w_1354,h_1125"),
  // Source lists 12 baths for Little River, likely a typo — omitted until confirmed.
  s("little-river", "Little River", 695000, 4, undefined, 3178, "ddf363_33bc15e8117c4b09bfa9775ab161187c", "x_150,y_0,w_1200,h_997"),
  s("hermitage", "Hermitage", 539900, 4, 3, 4308, "ddf363_cd4aa1e888204f9fba851ae0d3ac3009", "x_147,y_0,w_1203,h_1000"),
  s("liberty-township", "Liberty Township", 705000, 5, 4, 4388, "ddf363_3615d86dd4354d79a9223d4f464f10ee", "x_242,y_0,w_1015,h_843"),
  s("waynes-way", "Waynes Way", 255000, 3, 1, 1076, "ddf363_600c683ebfce466aa7af3e65dd69b82e", "x_150,y_0,w_1200,h_997"),
  s("wittmer", "Wittmer", 461900, 4, 3, 2732, "ddf363_c08d124eca404b73a4a4128357eb7d04", "x_149,y_0,w_1202,h_999"),
  s("springdale", "Springdale", 437000, 3, 3, 2957, "ddf363_e6daa71a9b794e64b9dc9ed01d53dbb1", "x_147,y_0,w_1206,h_1002"),
  s("piper-glen", "Piper Glen", 1150000, 5, 7, 4200, "ddf363_be8a29e0e0974f8c9239cef3e4c3715e", "x_150,y_0,w_1200,h_997"),
  s("grand-legacy", "Grand Legacy", 2250000, 5, 6, 9855, "ddf363_0abad36e68214eb18479999327276335", "x_147,y_0,w_1206,h_1002"),
  { ...s("vine", "Vine", 240000, 1, 1, 826, "ddf363_23194b2318cf497c9c680b906ff44f83", "x_149,y_0,w_1202,h_999"), type: "Condo" },
  s("winding-river", "Winding River", 1100000, 4, 3, 3110, "ddf363_046c37c3fd8c486b82326d2c5d522995", "x_148,y_0,w_1203,h_1000"),
];

export const BUYER: Property[] = [
  b("open-floor-plan", "Open Floor Plan", 1067000, 5, 7, 7759, "ddf363_4c21eff3f159405cb9b6423ec1bd0a00"),
  b("custom-ranch-style-home", "Custom Ranch Style Home", 705000, 5, 4, 4388, "ddf363_3615d86dd4354d79a9223d4f464f10ee"),
  b("single-family-two-story-home", "Single Family Two Story Home", 620000, 4, 3, 3250, "ddf363_26ed70b54c9d4fb2b3d3333140dcc9f8"),
  b("log-home", "Log Home", 605000, 4, 3, 2848, "ddf363_526442db1897471bb96ffee208ee63f8"),
  b("condominium", "Condominium", 435000, 2, 2, 1692, "ddf363_f109646b7cd544a19dc2e72a4a860bd7", "Condo"),
  b("ranch-style-condo", "Ranch Style Condo", 430000, 2, 3, 2545, "ddf363_9fee272b2b854543bb30c2ab61b69057", "Condo"),
  b("custom-built-two-story-home", "Custom Built Two Story Home", 429900, 4, 3, 2432, "ddf363_09fde5fdd0d242f39a53a4ad84db5beb"),
  b("two-story-single-family-home", "Two Story Single Family Home", 374000, 4, 4, 2642, "ddf363_c46355d6e08f4afb97afed79157f3489"),
  b("single-family-home", "Single Family Home", 345000, 3, 3, 1755, "ddf363_5634952dd8a845cda82e98640892b10b"),
  b("single-family-two-story", "Single Family Two Story", 324900, 4, 3, 1920, "ddf363_30e4114bb82e450d9c75e69c9d612f22"),
  b("adorable-home-in-norwood", "Adorable Home in Norwood", 260000, 3, 2, 1148, "ddf363_e603d183c29a4642938444fad6f02bf4", "Single-family home", "Norwood"),
];

export const PORTFOLIO = [...SOLD, ...BUYER];

export const KIND_LABEL: Record<PropertyKind, string> = {
  active: "Active listing",
  sold: "Sold · Listed by our team",
  buyer: "Purchased · Buyer represented",
};

export const findProperty = (kind: PropertyKind, slug: string) =>
  (kind === "active" ? LISTINGS : kind === "sold" ? SOLD : BUYER).find((p) => p.slug === slug);

export const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
