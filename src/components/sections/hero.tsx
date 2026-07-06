"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BauhausField } from "@/components/background/bauhaus-field";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <BauhausField />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-ink lg:border-r-4 lg:pr-12">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-red opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-red" />
            </span>
            Open to opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold uppercase leading-[0.88] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Mohammad
            <br />
            <span className="text-red">Mahadi</span> Hasan
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 inline-block bg-ink px-4 py-2 text-sm font-bold uppercase tracking-widest text-paper"
          >
            {siteConfig.title}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-ink-soft text-pretty"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#projects" size="lg">
              View Projects
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Contact Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full">
            <div className="absolute -bottom-5 -right-5 h-full w-full border-4 border-red" />
            <div className="panel relative h-full w-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt={`Portrait of ${siteConfig.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 440px, 340px"
                className="object-cover grayscale contrast-110"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-soft sm:flex"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
