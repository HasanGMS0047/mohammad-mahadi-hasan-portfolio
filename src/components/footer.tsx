"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-ink">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <Link href="#home" className="text-xl font-extrabold uppercase tracking-tight">
              Mahadi<span className="text-red">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">{siteConfig.tagline}</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-ink-soft transition-colors hover:text-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-ink pt-6 sm:flex-row">
          <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">
            &copy; {year} {siteConfig.name}
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-soft transition-colors hover:text-red"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center border-2 border-ink">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
