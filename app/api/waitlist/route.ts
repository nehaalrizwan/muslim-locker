import { NextResponse } from "next/server";
import { Resend } from "resend";
import { waitlistSchema } from "@/lib/waitlist";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email", message: "Check the form fields and try again." },
      { status: 400 }
    );
  }

  const payload = parsed.data;

  try {
    await resend.emails.send({
      from: "Muslim Locker <noreply@resend.dev>",
      to: process.env.WAITLIST_TO_EMAIL!,
      subject: "New Waitlist Signup",
      replyTo: payload.email,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#0D4B35">New Muslim Locker waitlist signup</h2>
          <p><strong>${payload.email}</strong> just joined the waitlist.</p>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Platform:</strong> ${payload.platform}</p>
          <p><strong>Intent:</strong> ${payload.intent || "Not provided"}</p>
        </div>
      `
    });

    await resend.contacts.create({
      email: payload.email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    await resend.emails.send({
      from: "Muslim Locker <noreply@resend.dev>",
      to: payload.email,
      subject: "You're on the list",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
          <h2 style="color:#0D4B35">Assalamu Alaikum</h2>
          <p>You're officially on the <strong>Muslim Locker</strong> waitlist.</p>
          <p>We'll notify you the moment we launch. JazakAllahu Khayran for your support.</p>
          <p style="color:#C9A84C;font-weight:bold">- The Muslim Locker Team</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist capture failed", error);

    return NextResponse.json(
      { error: "Failed to send", message: "We could not save your signup. Please try again." },
      { status: 500 }
    );
  }
}
