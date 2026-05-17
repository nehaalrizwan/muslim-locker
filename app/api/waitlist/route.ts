import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Owner notification
    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: process.env.WAITLIST_TO_EMAIL!,
      subject: 'New signup: ' + email,
      html: `<p>${email} joined</p>`
    });

    // User welcome
    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: email,
      subject: "You're in ??",
      html: `<h1>Assalamu Alaikum</h1><p>You're on the Muslim Locker waitlist. We'll notify you at launch.</p>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}