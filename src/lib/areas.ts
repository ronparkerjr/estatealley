// Community guides. Facts here are general public geography (county, school
// district, landmarks). Estate Alley Group's only office is in West Chester —
// never imply an office in any other community.

export type Area = {
  slug: string;
  name: string;
  county: string;
  intro: string;
  living: string[];
  schools: string;
  homes: string;
  commute: string;
  sellerTip: string;
};

export const AREAS: Area[] = [
  {
    slug: "west-chester-oh",
    name: "West Chester",
    county: "Butler County",
    intro:
      "West Chester Township is home to our office at 9277 Centre Pointe Dr. It sits along the I-75 corridor between Cincinnati and Dayton, which makes it one of the most practical bases in the region for people who work in either city.",
    living: [
      "Shopping and dining at The Streets of West Chester and the Union Centre area.",
      "Township parks including Keehner Park and Beckett Park, plus the Voice of America MetroPark.",
      "Quick access to I-75, I-275 and the Union Centre Boulevard interchange.",
    ],
    schools: "Most of West Chester is served by Lakota Local Schools. Always confirm the assigned school for a specific address with the district.",
    homes: "Housing ranges from established 1980s–1990s subdivisions to newer construction and condominiums, so buyers can usually find a range of sizes and price points.",
    commute: "Downtown Cincinnati and downtown Dayton are both reachable by I-75; drive times vary with traffic.",
    sellerTip: "Because buyers here compare many similar subdivisions, accurate pricing against recent nearby sales and strong listing photography matter a great deal.",
  },
  {
    slug: "mason-oh",
    name: "Mason",
    county: "Warren County",
    intro:
      "Mason is a city in southwest Warren County, just northeast of West Chester. Buyers often look here for its neighborhoods, parks and access to the I-71 corridor.",
    living: [
      "Kings Island amusement park and the Lindner Family Tennis Center (home of the Cincinnati Open).",
      "The Mason Community Center and city parks such as Pine Hill Lakes.",
      "Access to I-71 via Fields Ertel and Western Row roads.",
    ],
    schools: "Most of the city is served by Mason City Schools. Confirm the assigned school for a specific address with the district.",
    homes: "Mason offers everything from townhomes and mid-size family homes to larger estate-style properties in newer subdivisions.",
    commute: "Downtown Cincinnati is reached via I-71; many residents also commute to employers along the I-71 and I-75 corridors.",
    sellerTip: "Mason buyers frequently compare school assignment, lot size and HOA details — having those facts ready before listing helps a sale move smoothly.",
  },
  {
    slug: "liberty-township-oh",
    name: "Liberty Township",
    county: "Butler County",
    intro:
      "Liberty Township borders West Chester to the north. Much of its housing was built from the 1990s onward, and it continues to see new development.",
    living: [
      "Liberty Center, a mixed-use shopping, dining and entertainment district.",
      "Township parks including Liberty Park and Hixson Park.",
      "Access to I-75 at the Liberty Way interchange.",
    ],
    schools: "Most of the township is served by Lakota Local Schools; some addresses fall in other districts, so confirm by address.",
    homes: "Expect a mix of newer subdivisions, larger-lot homes and new-construction communities.",
    commute: "I-75 connects to both Cincinnati and Dayton.",
    sellerTip: "Sellers here often compete with new construction, so presentation, condition and clear pricing against resale comparables are especially important.",
  },
  {
    slug: "lebanon-oh",
    name: "Lebanon",
    county: "Warren County",
    intro:
      "Lebanon is the county seat of Warren County, known for its historic downtown and a slightly more small-town pace than communities closer to I-275.",
    living: [
      "Historic downtown Lebanon, including The Golden Lamb, Ohio's oldest continuously operating inn.",
      "The LM&M Railroad excursions and seasonal downtown events.",
      "Nearby access to I-71 and State Routes 48 and 63.",
    ],
    schools: "Much of the city is served by Lebanon City Schools; confirm by address.",
    homes: "Lebanon has historic homes near downtown, established neighborhoods and newer subdivisions on its edges, some with larger lots.",
    commute: "Cincinnati and Dayton are both reachable via I-71 and I-75 connections.",
    sellerTip: "Historic and older homes benefit from documenting updates — roof, mechanicals, windows — so buyers can see the care the home has received.",
  },
  {
    slug: "loveland-oh",
    name: "Loveland",
    county: "Hamilton, Clermont and Warren counties",
    intro:
      "Loveland is a city along the Little Miami River that spans parts of three counties. Its walkable historic downtown sits right on the Little Miami Scenic Trail.",
    living: [
      "The Little Miami Scenic Trail for walking, running and cycling.",
      "Canoeing and kayaking on the Little Miami River.",
      "Historic downtown shops and restaurants, plus Loveland Castle nearby.",
    ],
    schools: "Much of the area is served by Loveland City Schools, though some addresses fall in neighboring districts; confirm by address.",
    homes: "Housing includes older homes near downtown, wooded lots and established subdivisions.",
    commute: "I-275 and I-71 are both close by for commutes into Cincinnati.",
    sellerTip: "Because Loveland spans three counties, property taxes and school assignment vary — we help sellers present those facts clearly.",
  },
  {
    slug: "cincinnati-oh",
    name: "Cincinnati",
    county: "Hamilton County",
    intro:
      "Greater Cincinnati covers the city itself and dozens of surrounding communities. We help buyers and sellers across the metro, with a focus on the northern suburbs closest to our West Chester office.",
    living: [
      "Neighborhoods ranging from historic urban districts to quiet suburban communities like Blue Ash and Montgomery.",
      "Major employers, universities and hospital systems across the region.",
      "An extensive park system, riverfront and professional sports.",
    ],
    schools: "School districts vary widely across the metro. Confirm the assigned district and schools for any specific address.",
    homes: "Every style is represented, from historic city homes and condos to suburban single-family neighborhoods.",
    commute: "I-71, I-75 and I-275 tie the region together.",
    sellerTip: "In a large market, knowing which nearby sales buyers will actually compare your home against is the foundation of a good pricing strategy.",
  },
];

export const findArea = (slug: string) => AREAS.find((a) => a.slug === slug);
