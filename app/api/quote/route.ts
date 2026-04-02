import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_RECIPIENTS = [
  "sam@samuelholley.com",
  "joe@mentonbuilders.com",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, projectType, budget, details } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
        <div style="background: #0D9488; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">New Project Inquiry</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">mentonbuilders.com</p>
        </div>
        <div style="background: #F8FAFC; padding: 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748B; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #0F172A; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;">Email</td>
              <td style="padding: 8px 0; color: #0F172A;">${email}</td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #64748B;">Phone</td><td style="padding: 8px 0; color: #0F172A;">${phone}</td></tr>` : ""}
            ${location ? `<tr><td style="padding: 8px 0; color: #64748B;">Location</td><td style="padding: 8px 0; color: #0F172A;">${location}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #64748B;">Project Type</td>
              <td style="padding: 8px 0; color: #0F172A;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;">Budget</td>
              <td style="padding: 8px 0; color: #0F172A;">${budget}</td>
            </tr>
          </table>
          ${details ? `
          <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #E2E8F0;">
            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Project Details</p>
            <p style="margin: 0; font-size: 14px; color: #0F172A; line-height: 1.6; white-space: pre-wrap;">${details}</p>
          </div>
          ` : ""}
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Menton Builders <notifications@mentonbuilders.com>",
      to: NOTIFY_RECIPIENTS,
      replyTo: email,
      subject: `New Inquiry from ${name} — ${projectType}`,
      html,
    });

    if (error) {
      console.error("Quote email failed:", error.message);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
