// Everything here is real and verified. Never invent
// projects, figures, quotes or roles: ask instead.

export const site = {
  name: "Mohammad Mahadi Hasan",
  short: "Mahadi",
  brand: "Forest47",
  url: "https://mohammad-mahadi-hasan-portfolio.vercel.app",
  email: "hasantheking007@gmail.com",
  github: "https://github.com/HasanGMS0047",
  linkedin: "https://www.linkedin.com/in/mahadi-hasan-2aa0b5335",
  title: "Mohammad Mahadi Hasan: CSE student at UIU, Dhaka",
  description:
    "CSE student at United International University, learning by building. Five class, hackathon and personal projects, four of them live.",
};

export type Project = {
  id: string;
  title: string;
  line: string; // card title: a verb and an object
  body: string; // one or two sentences, with real details only
  image?: string; // live-site screenshot, without size suffix
  alt?: string;
  github: string;
  demo?: string;
  stack: string[];
};

// Order is fixed: Wastopia, Life Dashboard, AlgoCanvas, Nestly, ClearPath.
export const projects: Project[] = [
  {
    id: "wastopia",
    stack: ["Next.js","Hyperledger Fabric","Besu","Smart contracts","IoT"],
    title: "Wastopia",
    line: "Hackathon project: tracking waste on a blockchain",
    body: "Built with Team Se7en at UIU CSE FEST 2025. Smart bins log waste on Hyperledger Fabric and Besu, and a token rewards people for disposing of it properly.",
    image: "/images/work/wastopia",
    alt: "The Wastopia project page: an overview of the blockchain waste platform on a dark green ground",
    github: "https://github.com/HasanGMS0047/Project-Wastopia",
    demo: "https://project-wastopia-five.vercel.app",
  },
  {
    id: "life-dashboard",
    stack: ["Next.js","TypeScript","Prisma","PostgreSQL","NextAuth"],
    title: "Life Dashboard",
    line: "Personal project: journal, moods, habits and goals",
    body: "A personal app for journaling, tracking mood and habits, setting goals and saving memories, made with Next.js, Prisma and PostgreSQL.",
    image: "/images/work/life-dashboard",
    alt: "The Life Dashboard start screen: a serif headline over an illustrated window with books and a lamp",
    github: "https://github.com/HasanGMS0047/life-dashboard",
    demo: "https://life-dashboard-eosin-one.vercel.app",
  },
  {
    id: "algocanvas",
    stack: ["React","TypeScript","Vite","Canvas API","Vitest"],
    title: "AlgoCanvas",
    line: "Learning project: 27 algorithms, step by step",
    body: "Made to understand algorithms better. Each step comes with a plain-English explanation, and a guess-the-next-step mode tests what you picked up.",
    image: "/images/work/algocanvas",
    alt: "AlgoCanvas running bubble sort: ten blue bars on a dark canvas with step controls below",
    github: "https://github.com/HasanGMS0047/algocanvas",
    demo: "https://algocanvas-eight.vercel.app",
  },
  {
    id: "nestly",
    stack: ["React","Supabase","JavaScript"],
    title: "Nestly",
    line: "Personal project: student housing in Dhaka",
    body: "Verified shared housing near private university campuses, with the full cost shown, flatmate matching and a place to buy and sell second-hand household items.",
    image: "/images/work/nestly",
    alt: "The Nestly home page: a search for flats in Dhaka by zone, room type and budget",
    github: "https://github.com/HasanGMS0047/nestly-core",
    demo: "https://nestly-core.vercel.app",
  },
  {
    id: "clearpath",
    stack: ["PHP","MySQL","JavaScript"],
    title: "ClearPath",
    line: "University project: clearance, online",
    body: "A university project that moves student clearance online, from request to approval to certificate, in PHP and MySQL.",
    github: "https://github.com/HasanGMS0047/ClearPath",
  },
];

export type Tool = { name: string; use: string; icon: string; w: number; h: number; shape?: string };

// the skills mosaic: four languages, then the tools by job (all real, all used in the projects above).
// Twelve cells: a 3 x 4 mosaic beside the AlgoCanvas test run.
export const tools: Tool[] = [
  { name: "JavaScript", use: "Language", icon: "javascript.svg", w: 40, h: 40 },
  { name: "TypeScript", use: "Language", icon: "typescript.svg", w: 40, h: 40 },
  { name: "Python", use: "Language", icon: "python.svg", w: 40, h: 40 },
  { name: "Java", use: "Language", icon: "java.svg", w: 30, h: 40, shape: "ic-tall" },
  { name: "Next.js", use: "Life Dashboard", icon: "nextjs.svg", w: 40, h: 40 },
  { name: "React", use: "AlgoCanvas, Nestly", icon: "react.svg", w: 40, h: 36 },
  { name: "Node.js", use: "REST APIs", icon: "nodejs.svg", w: 35, h: 40 },
  { name: "PHP", use: "ClearPath", icon: "php.svg", w: 40, h: 21, shape: "ic-wide" },
  { name: "Prisma", use: "Life Dashboard", icon: "prisma.svg", w: 33, h: 40, shape: "ic-ink" },
  { name: "MySQL", use: "ClearPath", icon: "mysql.svg", w: 40, h: 39 },
  { name: "PostgreSQL", use: "Life Dashboard", icon: "postgres.svg", w: 39, h: 40 },
  { name: "Supabase", use: "Nestly", icon: "supabase.svg", w: 39, h: 40 },
];

export const uiu = {
  lead: "I'm in the 3rd year (7th trimester) of a BSc in Computer Science and Engineering at United International University. Since September 2026 I've also been a logistics intern at Eventors BD, helping with event planning, coordination and getting things ready. Right now I'm learning the basics of machine learning and getting more comfortable with programming by building small projects.",
  rows: [
    { name: "BSc in Computer Science and Engineering, UIU", value: "2024 to 2028 (expected)" },
    { name: "Logistics Intern, Eventors BD", value: "Sep 2026 to present" },
    { name: "Best Emerging Team, Blockchain, UIU CSE FEST 2025", value: "Jan 2025, with Team Se7en" },
    { name: "HSC (Science), Sena Public School and College", value: "2023" },
  ],
};

// Fun facts: the ONLY place chess, debate and language learning appear on the site.
export const funFacts = [
  { title: "I play competitive chess", body: "Thinking a few moves ahead, on the board and in code." },
  { title: "I was 2nd speaker on my college debate team", body: "I still argue my case, now in commit messages and pull request reviews." },
  { title: "I'm learning languages", body: "German and Japanese at an elementary level so far, and French on the side." },
  { title: "I'm learning machine learning", body: "Starting with the fundamentals." },
];
