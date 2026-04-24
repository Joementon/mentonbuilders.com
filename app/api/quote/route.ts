import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = "https://mentonbuilderscom.vercel.app/brand/menton-lockup.png";
const BRAND = {
  teal: "#0D9488",
  tealDark: "#134E4A",
  stone50: "#FAFAF9",
  stone100: "#F5F5F4",
  stone200: "#E7E5E4",
  stone500: "#78716C",
  stone800: "#292524",
  stone900: "#1C1917",
  white: "#FFFFFF",
};

function buildInquiryTable({ name, email, phone, location, projectType, budget, details }: {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  projectType: string;
  budget: string;
  details?: string;
}) {
  const rows = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    ...(phone ? [{ label: "Phone", value: phone }] : []),
    ...(location ? [{ label: "Location", value: location }] : []),
    { label: "Project Type", value: projectType },
    { label: "Budget Range", value: budget },
  ];

  const rowsHtml = rows.map((row, i) => {
    const bg = i % 2 === 0 ? BRAND.white : BRAND.stone50;
    return `<tr>
      <td style="padding: 12px 16px; color: ${BRAND.stone500}; width: 130px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background: ${bg}; border-bottom: 1px solid ${BRAND.stone200};">${row.label}</td>
      <td style="padding: 12px 16px; color: ${BRAND.stone900}; font-size: 14px; font-weight: 500; background: ${bg}; border-bottom: 1px solid ${BRAND.stone200};">${row.value}</td>
    </tr>`;
  }).join("");

  return `
    <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid ${BRAND.stone200};">
      ${rowsHtml}
    </table>
    ${details ? `
    <div style="margin-top: 20px; padding: 20px; background: ${BRAND.stone50}; border-radius: 8px; border: 1px solid ${BRAND.stone200};">
      <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; color: ${BRAND.stone500}; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
      <p style="margin: 0; font-size: 14px; color: ${BRAND.stone800}; line-height: 1.7; white-space: pre-wrap;">${details}</p>
    </div>
    ` : ""}
  `;
}

function emailWrapper(content: string) {
  return `
    <div style="background: ${BRAND.stone100}; padding: 40px 20px;">
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background: ${BRAND.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        <!-- Header with logo -->
        <div style="background: ${BRAND.white}; padding: 36px 32px; text-align: center; border-bottom: 3px solid ${BRAND.teal};">
          <img src="${LOGO_URL}" alt="Menton Builders" width="280" style="display: inline-block;" />
        </div>
        <!-- Body -->
        <div style="padding: 32px;">
          ${content}
        </div>
        <!-- Footer -->
        <div style="background: ${BRAND.stone50}; padding: 20px 32px; border-top: 1px solid ${BRAND.stone200}; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: ${BRAND.stone500}; line-height: 1.6;">
            Menton Builders Inc. &middot; Mendocino &amp; Sonoma Counties<br/>
            (707) 468-8814 &middot; mentonbuilders.com
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, projectType, budget, details, isInternational, phoneCountry } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("inquiries").insert({
      name,
      email,
      phone,
      phone_country: phoneCountry || "US",
      is_international: isInternational || false,
      location: location || null,
      project_type: projectType || null,
      budget: budget || null,
      details: details || null,
      source: "website",
    });
    if (dbError) console.error("Supabase insert error:", dbError.message);

    const inquiryTable = buildInquiryTable({ name, email, phone, location, projectType, budget, details });

    const customerHtml = emailWrapper(`
      <p style="font-size: 16px; color: ${BRAND.stone900}; line-height: 1.6; margin: 0 0 16px;">Hi ${name},</p>
      <p style="font-size: 15px; color: ${BRAND.stone800}; line-height: 1.7; margin: 0 0 16px;">Thank you for reaching out to Menton Builders. We&rsquo;ve received your project inquiry and will be in touch within <strong>2 business days</strong>.</p>
      <p style="font-size: 15px; color: ${BRAND.stone800}; line-height: 1.7; margin: 0 0 24px;">Here&rsquo;s a copy of what you submitted:</p>
      ${inquiryTable}
      <p style="font-size: 15px; color: ${BRAND.stone800}; line-height: 1.7; margin: 24px 0 0;">Best regards,<br/><strong>The Menton Builders Team</strong></p>
    `);

    const internalHtml = emailWrapper(`
      <p style="font-size: 14px; color: ${BRAND.teal}; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">New Project Inquiry</p>
      <p style="font-size: 12px; color: ${BRAND.stone500}; margin: 0 0 20px;">Submitted via mentonbuilders.com</p>
      ${inquiryTable}
    `);

    // Send both emails in parallel
    const [customerResult, internalResult] = await Promise.all([
      resend.emails.send({
        from: "Menton Builders <hello@mentonbuilders.com>",
        to: email,
        replyTo: "aimee@mentonbuilders.com",
        subject: `We received your inquiry — Menton Builders`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: "Menton Builders <alerts@mentonbuilders.com>",
        to: "aimee@mentonbuilders.com",
        replyTo: email,
        subject: `New Inquiry from ${name} — ${projectType}`,
        html: internalHtml,
      }),
    ]);

    if (customerResult.error) {
      console.error("Customer email failed:", customerResult.error.message);
    }
    if (internalResult.error) {
      console.error("Internal email failed:", internalResult.error.message);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
