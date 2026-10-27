// Content sourced from the current estatealley.com site (checked Oct 2026).
const wix = (id: string, crop: string, w = 900, h = 748) =>
  `https://static.wixstatic.com/media/${id}~mv2.jpg/v1/crop/${crop}/fill/w_${w},h_${h},al_c,q_85,enc_auto/${id}.jpg`;
const wixFill = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_85,enc_auto/${file}`;

export const HERO_IMAGE = wix("ddf363_0abad36e68214eb18479999327276335", "x_147,y_0,w_1206,h_1002", 1400, 1163);
export const TEAM_GROUP_IMAGE = wixFill("ddf363_b76958e512434dc5977676a7a8a1b154~mv2.jpg", 1600, 908);
export const RENO_BEFORE = wixFill("ddf363_94af86bd5aea4369b5d7b975cebfd0b6~mv2.jpg", 900, 582);
export const RENO_AFTER = wixFill("ddf363_728241261ba341d39eca3f1f3fd5a8b1~mv2.webp", 900, 582);
export const YOUTUBE_URL = "https://www.youtube.com/@heatherandjohnalleywithest3684";

/** Historical sales shown on the existing site. Not current listings. */
export const SOLD = [
  { name: "Grand Legacy", price: "$2,250,000", beds: 5, baths: 6, sqft: 9855, img: HERO_IMAGE },
  { name: "Piper Glen", price: "$1,150,000", beds: 5, baths: 7, sqft: 4200, img: wix("ddf363_be8a29e0e0974f8c9239cef3e4c3715e", "x_150,y_0,w_1200,h_997") },
  { name: "Liberty Township", price: "$705,000", beds: 5, baths: 4, sqft: 4388, img: wix("ddf363_3615d86dd4354d79a9223d4f464f10ee", "x_242,y_0,w_1015,h_843") },
  { name: "Eden Ridge", price: "$575,000", beds: 5, baths: 5, sqft: 4115, img: wix("ddf363_af37643bba324cd888164d382bb047a2", "x_73,y_0,w_1354,h_1125") },
  { name: "Hermitage", price: "$539,900", beds: 4, baths: 3, sqft: 4308, img: wix("ddf363_cd4aa1e888204f9fba851ae0d3ac3009", "x_147,y_0,w_1203,h_1000") },
  { name: "Wittmer", price: "$461,900", beds: 4, baths: 3, sqft: 2732, img: wix("ddf363_c08d124eca404b73a4a4128357eb7d04", "x_149,y_0,w_1202,h_999") },
] as const;

/** Reviews published on the existing estatealley.com homepage. */
export const REVIEWS = [
  { quote: "John and Heather are an unbeatable team. They do great research and offer great ideas for staging. We offer our highest recommendation. You won't find nicer and more knowledgable agents.", name: "Tom Isaacs", date: "November 2023" },
  { quote: "My wife and I really enjoyed working with Heather. She quickly found us a house before it even went to market. I was an out of state buyer and the process was so easy, great communication, and flexible.", name: "Jess Kramer", date: "July 2022" },
  { quote: "I highly recommend Heather. She is a great listener, efficient, and has prompt responses. She will go extra miles finding the answers and help you. She has very positive energy.", name: "Amy Wong", date: "August 2020" },
] as const;
