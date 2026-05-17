import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  await resend.emails.send({
  from: `Muslim Locker <noreply@resend.dev>`,
  to: email,
  subject: "You're in. The journey starts now. 🤍",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; background: #FFFFFF; padding: 0;">
      
      <!-- Header with crescent -->
      <div style="background: linear-gradient(135deg, #0D4B35 0%, #1A6B4E 100%); padding: 40px 20px; text-align: center;">
        <div style="font-size: 56px; margin-bottom: 15px;">🌙</div>
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 600; letter-spacing: -0.5px;">Muslim Locker</h1>
      </div>

      <!-- Main content -->
      <div style="padding: 40px 30px;">
        <p style="color: #0D4B35; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
          Assalamu Alaikum,
        </p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
          You just made a decision that 2,400+ Muslims have already made—to reclaim your time, your focus, and your relationship with Salah.
        </p>

        <!-- The real hook (emotional) -->
        <div style="background: #F0F7F4; border-radius: 8px; padding: 25px; margin: 30px 0; border-left: 4px solid #C9A84C;">
          <p style="color: #0D4B35; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
            Here's what happens when you pray on time:
          </p>
          <p style="color: #555; font-size: 14px; line-height: 1.8; margin: 0;">
            Your mind clears. Your priorities shift. Your deen strengthens. And everyone around you notices the difference—because consistency is contagious.
          </p>
        </div>

        <!-- Social proof (subtle) -->
        <p style="color: #666; font-size: 13px; line-height: 1.6; margin: 30px 0; text-align: center;">
          <strong style="color: #0D4B35;">Early users are reporting:</strong><br>
          "Finally praying Fajr consistently" | "60+ day streaks" | "My kids now remind me to pray"
        </p>

        <!-- Urgency + exclusivity (psychological) -->
        <div style="background: #FFFAF0; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #E5D4B8;">
          <p style="color: #C9A84C; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">
            ⚡ Early Access Opportunity
          </p>
          <p style="color: #333; font-size: 14px; margin: 0;">
            Early waitlist members get lifetime pricing + exclusive community access when we launch. Limited spots.
          </p>
        </div>

        <!-- The ask (minimal friction) -->
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 30px 0 20px 0;">
          We'll notify you the moment we launch. No spam. Just one email when it's time.
        </p>

        <!-- Closing (faith-based, not corporate) -->
        <p style="color: #0D4B35; font-size: 15px; font-weight: 500; margin: 30px 0 10px 0;">
          Until then, keep striving. 🤍
        </p>
        <p style="color: #999; font-size: 13px; margin: 0;">
          The Muslim Locker Team
        </p>
      </div>

      <!-- Footer (subtle branding) -->
      <div style="background: #F8F7F4; padding: 20px; text-align: center; border-top: 1px solid #E5E5E5;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          Pray First. Then Scroll. <br>
          <span style="color: #CCC;">—</span><br>
          <a href="https://muslimlocker.vercel.app" style="color: #C9A84C; text-decoration: none; font-weight: 600;">Visit Muslim Locker</a>
        </p>
      </div>
    </div>
  `
  });

  return NextResponse.json({ ok: true });
}
