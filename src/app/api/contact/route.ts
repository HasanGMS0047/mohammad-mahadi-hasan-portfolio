import { NextResponse } from "next/server";

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

  // Wire this up to an email provider (e.g. Resend, SendGrid) or a database of your choice.
  return NextResponse.json({ ok: true });
}
