"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { useTilt } from "@/lib/use-tilt";
import { contactDetails, socialLinks } from "@/lib/data";
import type { IconComponent } from "@/lib/types";

type Status = "idle" | "loading" | "success" | "error";

function ContactTile({
  label,
  value,
  href,
  icon: Icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: IconComponent;
}) {
  const tilt = useTilt();

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className="panel flex items-center gap-4 p-5 transition-shadow duration-150 hover:shadow-[9px_9px_0_var(--color-red)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink bg-ink text-paper">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </motion.a>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          index="N° 07"
          title="Let's build something together"
          description="Have a project, a hackathon team, or an opportunity in mind? My inbox is open."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn direction="right" className="space-y-6">
            {contactDetails.map((detail) => (
              <ContactTile
                key={detail.label}
                label={detail.label}
                value={detail.value}
                href={detail.href}
                icon={detail.icon}
              />
            ))}

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center border-2 border-ink text-ink transition-colors hover:border-red hover:bg-red hover:text-white"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <Panel className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" type="text" required autoComplete="name" />
                  <Field label="Email" name="email" type="email" required autoComplete="email" />
                </div>
                <Field label="Subject" name="subject" type="text" required />
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none border-2 border-ink bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-red"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </Button>

                {status === "success" ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-600"
                    role="status"
                  >
                    <CheckCircle2 size={16} /> Thanks for reaching out — I&apos;ll reply soon!
                  </motion.p>
                ) : null}
                {status === "error" ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm font-bold text-red"
                    role="alert"
                  >
                    <XCircle size={16} /> {errorMessage}
                  </motion.p>
                ) : null}
              </form>
            </Panel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-bold uppercase tracking-widest">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full border-2 border-ink bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-red"
        placeholder={label}
      />
    </div>
  );
}
