import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (typeof process.env.VERCEL_URL === 'string'
    ? `https://${process.env.VERCEL_URL}`
    : '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, studentId, parentEmail, parentName } = body;

    if (
      typeof studentName !== 'string' ||
      typeof studentId !== 'string' ||
      typeof parentEmail !== 'string' ||
      typeof parentName !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid: studentName, studentId, parentEmail, parentName' },
        { status: 400 }
      );
    }

    const link = `${BASE_URL || request.headers.get('origin') || ''}/parent-pay/${encodeURIComponent(studentId)}`;

    const htmlContent = `
      <p>Hi ${parentName},</p>
      <p>${studentName} is studying hard on AP Dojo but needs the Season Pass ($29) to unlock full practice exams.</p>
      <p><a href="${link}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:white;text-decoration:none;border-radius:8px;font-weight:600;">Click here to pay securely</a></p>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Thanks,<br/>AP Dojo</p>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
      to: parentEmail.trim(),
      subject: `AP Dojo Season Pass for ${studentName}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('send-parent-link error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
