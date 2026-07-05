import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "hasantheking007@gmail.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.subject !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.message.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all fields with a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email delivery isn't configured yet. Please email me directly instead.",
      },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = body;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send your message. Please try again or email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
