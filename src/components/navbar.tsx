"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper transition-shadow duration-200",
        scrolled ? "shadow-[0_4px_0_var(--color-ink)]" : "",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#home"
          className="text-lg font-extrabold uppercase tracking-tight focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          Mahadi<span className="text-red">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink-soft transition-colors hover:text-red focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Button href="#contact" size="md" className="hidden sm:inline-flex">
            {siteConfig.name.split(" ")[0]}
          </Button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border-2 border-ink text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="overflow-hidden border-t-2 border-ink bg-paper md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b-2 border-ink px-6 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 px-6 py-4">
                <ThemeToggle />
                <Button href="#contact" className="flex-1" onClick={() => setOpen(false)}>
                  Contact Me
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
