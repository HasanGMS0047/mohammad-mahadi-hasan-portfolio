import type { ComponentType } from "react";

export type IconComponent = ComponentType<{ size?: number; className?: string }>;

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconComponent;
};

export type SkillCategory = {
  title: string;
  icon: IconComponent;
  skills: string[];
};

export type ProjectCategory = "Frontend" | "Backend" | "Full-Stack" | "Blockchain";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  stack: string[];
  highlight?: string;
  github?: string;
  demo?: string;
};

export type ActivityItem = {
  organization: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  description: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export type BeyondItem = {
  icon: IconComponent;
  title: string;
  description: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};
