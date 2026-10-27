// Team profiles as published on estatealley.com/meettheteam (checked Oct 2026).
const photo = (file: string) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_516,h_704,al_c,q_85,enc_auto/${file}`;

export type Member = { name: string; role: string; email: string; phone: string; bio: string; img: string };

export const LEADS: Member[] = [
  { name: "Heather Alley", role: "Team Lead", email: "heather@estatealley.com", phone: "513-305-0102", img: photo("ddf363_68a680a232684b0bac078bf88428b941~mv2.png"),
    bio: "Heather Alley is a dedicated real estate professional with a keen eye for detail and a passion for helping clients find their dream homes. Known for her friendly and approachable demeanor, Heather brings extensive knowledge of the market and a commitment to client satisfaction." },
  { name: "John Alley", role: "Team Lead", email: "john@estatealley.com", phone: "513-535-7215", img: photo("ddf363_7876471166bf44c2b06302a87b67762f~mv2.png"),
    bio: "John Alley is a seasoned real estate expert known for his sharp negotiation skills and an in-depth understanding of the local market. His warm sense of humor and approachable nature make the buying and selling process enjoyable, building trust and rapport with clients every step of the way." },
];

export const AGENTS: Member[] = [
  { name: "Meagan Martin-Ioannou", role: "Agent", email: "meagan@estatealley.com", phone: "513-807-6256", img: photo("ddf363_9acf37d4fe894400b7df925b94f62568~mv2.png"),
    bio: "Meagan has a passion for real estate and leverages her Marketing degree to excel in selling homes. She covers a wide geographical and price range and she's not afraid to do whatever it takes to help her clients." },
  { name: "Tracy Ward", role: "Agent", email: "tracy@estatealley.com", phone: "817-522-2347", img: photo("ddf363_3bbf72edc06345578baeed7b4a06bb70~mv2.png"),
    bio: "Tracy has an intuitive eye for real estate potential, transforming properties into profitable investments and cherished homes. She is passionate about connecting with clients and empowering them to achieve their real estate goals confidently." },
  { name: "Laura Estes", role: "Agent", email: "laura@estatealley.com", phone: "513-919-0272", img: photo("ddf363_9f050da17357461089872c67144a3592~mv2.jpg"),
    bio: "Laura has been licensed since 2021 and serves buyers and sellers in Cincinnati and surrounding areas. She is highly focused on customer service. She lives in Anderson Township, in Cincinnati's southeast suburbs." },
  { name: "Stephanie Russell", role: "Agent", email: "stephanie@estatealley.com", phone: "937-286-4024", img: photo("ddf363_2551f1eb113b421db149528815a7b446~mv2.jpg"),
    bio: "Stephanie brings a background as a Dermatology Nurse Practitioner and a personalized approach to helping buyers, sellers and investors. She serves the Dayton and Cincinnati areas." },
  { name: "Mary Megios", role: "Agent", email: "mary@estatealley.com", phone: "513-252-3980", img: photo("ddf363_7564c1ddd1cf4d6da425068f3dfe893d~mv2.jpg"),
    bio: "With a calm, organized approach and genuine care for her clients, Mary helps make buying or selling feel effortless. She's passionate about connecting people to homes and communities they love." },
  { name: "Victor Theile", role: "Agent", email: "victor@estatealley.com", phone: "513-316-4262", img: photo("ddf363_f689bcd96255420db2e8c06fc8468b79~mv2.jpg"),
    bio: "A local agent and military veteran, Victor is passionate about helping people find the perfect place to call home, with strong market knowledge and a no-pressure approach." },
];

export const JOIN_IMAGE =
  "https://static.wixstatic.com/media/ddf363_be5a5082936e4c0baf7bf1de1747a3df~mv2.png/v1/fill/w_1200,h_917,al_c,q_90,enc_auto/ddf363_be5a5082936e4c0baf7bf1de1747a3df~mv2.png";

export const telHref = (p: string) => `tel:+1${p.replace(/\D/g, "")}`;
