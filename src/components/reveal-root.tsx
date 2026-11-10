"use client";

import { useEffect } from "react";

// Watches every [data-reveal] element and adds .is-in once it scrolls into view (once only).
// Content stays visible without JS: the hidden starting state only applies under html.js.
export function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
