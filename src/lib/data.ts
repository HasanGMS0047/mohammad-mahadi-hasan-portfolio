import {
  Blocks,
  BrainCircuit,
  Database,
  Globe2,
  Languages,
  Mail,
  MapPin,
  Mic2,
  ServerCog,
  Swords,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import type {
  ActivityItem,
  BeyondItem,
  EducationItem,
  NavLink,
  Project,
  SkillCategory,
  SocialLink,
  Stat,
  TimelineEntry,
} from "./types";

export const siteConfig = {
  name: "Mohammad Mahadi Hasan",
  title: "CSE Student & Full-Stack Developer",
  tagline:
    "Computer Science undergrad building full-stack platforms, exploring machine learning, and arguing my way through debate rounds along the way.",
  shortBio:
    "I'm a Computer Science & Engineering student at United International University (UIU), Dhaka. I build full-stack web platforms — from a blockchain waste-tracking system to a student housing marketplace — and I'm currently working my way into machine learning. Outside of code, I compete in chess, used to argue as 2nd speaker on my college debate team, and I'm slowly picking up German, French, and Japanese.",
  location: "Dhaka, Bangladesh",
  email: "hasantheking007@gmail.com",
  university: "United International University (UIU)",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Activities", href: "#activities" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/HasanGMS0047", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahadi-hasan-2aa0b5335",
    icon: LinkedinIcon,
  },
  { label: "Email", href: "mailto:hasantheking007@gmail.com", icon: Mail },
];

export const contactDetails = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  {
    label: "LinkedIn",
    value: "mahadi-hasan-2aa0b5335",
    href: "https://www.linkedin.com/in/mahadi-hasan-2aa0b5335",
    icon: LinkedinIcon,
  },
  { label: "Location", value: siteConfig.location, href: "#contact", icon: MapPin },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Globe2,
    skills: ["Next.js", "React", "JavaScript", "HTML & CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: ServerCog,
    skills: ["PHP", "Node.js", "RESTful APIs", "MySQL"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "Supabase (PostgreSQL)"],
  },
  {
    title: "Blockchain & IoT",
    icon: Blocks,
    skills: ["Hyperledger Fabric", "Besu", "Smart Contracts", "IoT Systems"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git & GitHub", "Vercel", "VS Code", "npm"],
  },
];

export const projects: Project[] = [
  {
    id: "wastopia",
    title: "Wastopia",
    description:
      "A blockchain and IoT platform that tracks organic, recyclable, and hazardous waste end-to-end, using SmartBin devices and a WastoCoin incentive token to keep disposal transparent and fraud-proof.",
    image: "/images/projects/wastopia.svg",
    categories: ["Full-Stack", "Blockchain"],
    stack: ["Next.js", "Hyperledger Fabric", "Besu", "Smart Contracts", "IoT"],
    highlight: "Team Se7en — Best Emerging Team, Blockchain Category (UIU CSE FEST 2025)",
    github: "https://github.com/HasanGMS0047/Project-Wastopia",
    demo: "https://project-wastopia-five.vercel.app",
  },
  {
    id: "life-dashboard",
    title: "Life Dashboard",
    description:
      "A personal life-tracking app for journaling, mood, habits, goals, and a memory gallery, with a replay view over your own history. Built on Next.js with Prisma over a Postgres/Supabase database and NextAuth for authentication.",
    image: "/images/projects/life-dashboard.svg",
    categories: ["Full-Stack"],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
    github: "https://github.com/HasanGMS0047/life-dashboard",
    demo: "https://life-dashboard-eosin-one.vercel.app",
  },
  {
    id: "algocanvas",
    title: "AlgoCanvas",
    description:
      "A from-scratch algorithm visualizer covering 27 algorithms — sorting, searching, graphs, trees, and hashing — rendered on a real <canvas> with a \"Think Like the Algorithm\" predict mode and plain-English step explanations. Backed by 218 tests, with results cross-checked against independent implementations.",
    image: "/images/projects/algocanvas.svg",
    categories: ["Frontend"],
    stack: ["React", "TypeScript", "Vite", "Canvas API", "Vitest"],
    github: "https://github.com/HasanGMS0047/algocanvas",
    demo: "https://algocanvas-eight.vercel.app",
  },
  {
    id: "uiunest",
    title: "UIUNest",
    description:
      "A rental marketplace built for UIU students, with fully transparent cost breakdowns, 8-dimension flatmate compatibility matching, a secondary marketplace for used items, and NID-verified landlords.",
    image: "/images/projects/uiunest.svg",
    categories: ["Full-Stack", "Frontend"],
    stack: ["React", "Supabase", "JavaScript"],
    github: "https://github.com/HasanGMS0047/uiu-nest-core",
    demo: "https://uiu-nest-core.vercel.app",
  },
  {
    id: "clearpath",
    title: "ClearPath",
    description:
      "A digital university clearance system that replaces paper forms with role-based Student, Department Admin, and Master Admin portals — complete with live review queues and automatic certificate generation.",
    image: "/images/projects/clearpath.svg",
    categories: ["Full-Stack", "Backend"],
    stack: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/HasanGMS0047/ClearPath",
  },
];

export const activities: ActivityItem[] = [
  {
    organization: "UIU CSE FEST 2025",
    role: "Team Se7en — Project Wastopia",
    period: "2025",
    location: "Dhaka, Bangladesh",
    points: [
      "Built a hybrid Hyperledger Fabric + Besu blockchain platform for transparent waste management in under hackathon time constraints.",
      "Competed as part of Team Se7en and won \"Best Emerging Team – Blockchain Category\" among competing university teams.",
    ],
  },
  {
    organization: "College Debate Team",
    role: "2nd Speaker",
    period: "College",
    location: "Bangladesh",
    points: [
      "Argued as 2nd speaker in competitive debate rounds, building structured rebuttals under time pressure.",
      "Sharpened the same skills that carry directly into technical problem-solving: structuring an argument, thinking on my feet, and defending a position with evidence.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: "United International University (UIU)",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "Currently Enrolled",
    description:
      "Studying CSE with a focus on software engineering and web development, while independently exploring machine learning outside of coursework.",
  },
];

export const beyondTheCode: BeyondItem[] = [
  {
    icon: BrainCircuit,
    title: "Learning Machine Learning",
    description:
      "Currently working through the fundamentals of ML — model training, data pipelines, and where it fits into real products.",
  },
  {
    icon: Swords,
    title: "Competitive Chess",
    description: "I play competitive chess — thinking a few moves ahead on the board and in code.",
  },
  {
    icon: Mic2,
    title: "Former Debate Speaker",
    description:
      "Was 2nd speaker on my college debate team. Still argue my case, just in commit messages and PR reviews now.",
  },
  {
    icon: Languages,
    title: "Learning German, French & Japanese",
    description: "Picking up three new languages at once, one grammar rule at a time.",
  },
];

export const stats: Stat[] = [
  { label: "Projects Shipped", value: 5, suffix: "" },
  { label: "Years Coding", value: 2, suffix: "+" },
  { label: "Hackathon Awards", value: 1, suffix: "" },
  { label: "Languages Learning", value: 3, suffix: "" },
];

export const timeline: TimelineEntry[] = [
  {
    year: "College",
    title: "2nd Speaker, Debate Team",
    description: "Represented my college in competitive debate as 2nd speaker.",
  },
  {
    year: "2024",
    title: "Started Building",
    description: "Started writing code seriously and shipping my first real projects.",
  },
  {
    year: "2025",
    title: "Hackathon Win",
    description:
      "Wastopia won \"Best Emerging Team – Blockchain Category\" at UIU CSE FEST 2025.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "Studying CSE at UIU, building full-stack platforms, and exploring machine learning.",
  },
];

export const interests = [
  "Machine Learning",
  "Competitive Chess",
  "Debate & Public Speaking",
  "Learning German",
  "Learning French",
  "Learning Japanese",
];
