import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure RESEND_API_KEY is in your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (typeof process.env.VERCEL_URL === 'string'
    ? `https://${process.env.VERCEL_URL}`
    : '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, studentId, parentEmail, parentName, product } = body;

    // Validation
    if (
      typeof studentName !== 'string' ||
      typeof studentId !== 'string' ||
      typeof parentEmail !== 'string' ||
      typeof parentName !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    const productSlug = product === 'bundle' || product === 'micro' ? product : undefined;
    const isBundle = product === 'bundle';
    const price = isBundle ? 49 : 29;
    const productLabel = isBundle ? 'Ultimate AP Bundle (Macro + Micro)' : 'Season Pass';

    const base = BASE_URL || request.headers.get('origin') || '';
    const path = `/parent-pay/${encodeURIComponent(studentId)}${productSlug ? `?product=${productSlug}` : ''}`;
    const link = `${base}${path}`;

    // THE SALES PITCH (Optimized for Parents) — copy varies by product
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <h2 style="color: #111827; font-size: 20px; font-weight: 700;">Hi ${parentName},</h2>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Your student, <strong>${studentName}</strong>, is studying AP Economics on AP Dojo. They are requesting the <strong>${productLabel} ($${price})</strong> to unlock full practice exams and other resources before the test in May.
        </p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #2563eb;">
          <strong style="color: #111827; display: block; margin-bottom: 8px;">Why this matters:</strong>
          <p style="margin: 0; font-size: 15px; color: #374151;">
            Passing an AP exam often grants college credit, potentially saving your family over <strong>$3,000</strong> in future tuition costs.
          </p>
        </div>

        <div style="margin: 32px 0; text-align: center;">
          <a href="${link}" style="display: inline-block; padding: 16px 32px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
            Secure Payment ($${price})
          </a>
        </div>

        <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 32px;">
          Secure link via Stripe. If the button doesn't work, copy this URL:<br/>
          <a href="${link}" style="color: #2563eb; text-decoration: underline;">${link}</a>
        </p>
      </div>
    `;

    const fromAddress = process.env.RESEND_FROM ?? 'garrett@apdojo.com';

    await resend.emails.send({
      from: fromAddress,
      to: parentEmail.trim(),
      subject: isBundle ? `Approve ${studentName}'s AP Macro + Micro Bundle` : `Approve ${studentName}'s AP Prep Tools`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('send-parent-link error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}