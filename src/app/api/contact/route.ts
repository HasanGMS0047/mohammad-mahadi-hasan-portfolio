import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "hasantheking007@gmail.com";
const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 } as const;

// Best-effort rate limit: 5 messages per IP per 10 minutes. On Vercel each serverless instance keeps
// its own map, so this slows down a script hammering one instance; it is not a hard global cap.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

// Only accept posts from this site (browsers always send Origin on a cross-site POST).
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin form posts and server tools may omit it
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function readFields(request: Request): Promise<Record<string, string> | null> {
  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const body = await request.json();
      return body && typeof body === "object" ? (body as Record<string, string>) : null;
    }
    const form = await request.formData();
    return Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
  } catch {
    return null;
  }
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const body = await readFields(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // honeypot: people never see this field; pretend success so bots learn nothing
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(String(body.name ?? ""));
  const email = oneLine(String(body.email ?? ""));
  const subject = oneLine(String(body.subject ?? ""));
  const message = String(body.message ?? "").trim();

  if (
    !name ||
    !subject ||
    !message ||
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field with a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email delivery isn't configured yet. Please email me directly instead." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    // plain text only, so nothing a visitor types can render as HTML in the inbox
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) throw new Error(error.message);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send your message. Please try again or email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
