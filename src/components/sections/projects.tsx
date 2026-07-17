"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/use-tilt";
import { projects } from "@/lib/data";
import type { Project, ProjectCategory } from "@/lib/types";

const categories: (ProjectCategory | "All")[] = ["All", "Frontend", "Backend", "Full-Stack", "Blockchain"];

function ProjectCard({ project }: { project: Project }) {
  const tilt = useTilt();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className="group panel flex flex-col overflow-hidden transition-shadow duration-150 hover:shadow-[6px_6px_0_var(--color-ink)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-ink">
        <Image
          src={project.image}
          alt={`${project.title} thumbnail`}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="flex h-11 w-11 items-center justify-center border-2 border-paper bg-paper text-ink transition-transform hover:scale-110"
            >
              <GithubIcon size={18} />
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex h-11 w-11 items-center justify-center border-2 border-paper bg-paper text-ink transition-transform hover:scale-110"
            >
              <ExternalLink size={18} />
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-extrabold uppercase tracking-tight">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-soft text-pretty">{project.description}</p>

        {project.highlight ? (
          <div className="mt-4 flex items-center gap-2 bg-yellow px-3 py-2 text-ink">
            <Award size={14} className="shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wide">{project.highlight}</span>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="stamp px-3 py-1 text-xs font-bold uppercase tracking-wide">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-4 border-t-2 border-ink pt-4">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors hover:text-red"
            >
              <GithubIcon size={14} /> Code
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors hover:text-red"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<(ProjectCategory | "All")>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.categories.includes(active));
  }, [active]);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          index="N° 03"
          title="A few things I've built"
          description="Real, shipped projects — a hackathon-winning blockchain platform, a student housing marketplace, and a university clearance system."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "border-2 border-ink px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-150",
                active === category ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-surface-2",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 ? (
          <FadeIn className="mt-12 text-center text-ink-soft">
            No projects in this category yet.
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
