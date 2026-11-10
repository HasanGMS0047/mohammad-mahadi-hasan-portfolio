"use client";

import { useState } from "react";

type Status = { kind: "idle" | "sending" | "sent" | "error"; text?: string };

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus({ kind: "sent", text: "Message sent. I'll reply to the email you gave." });
    } catch (err) {
      setStatus({
        kind: "error",
        text: `${err instanceof Error ? err.message : "Not sent."} You can also email ${email}.`,
      });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={100} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className="field">
        <span>Subject</span>
        <input name="subject" type="text" required maxLength={150} />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={6} required maxLength={5000} />
      </label>
      {/* honeypot: hidden from people, bots fill it in */}
      <label className="hp" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form__foot">
        <button className="btn btn--red" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </button>
        <p className={`form__status form__status--${status.kind}`} role="status" aria-live="polite">
          {status.text}
        </p>
      </div>
    </form>
  );
}
