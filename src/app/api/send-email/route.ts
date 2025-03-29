import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, dates, message } = body;

    const htmlContent = `
      <h2>New Tutoring Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Preferred Dates:</strong> ${dates}</p>
      <p><strong>Additional Notes:</strong> ${message}</p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'garrett@apdojo.com',
        subject: `New Tutoring Request from ${name}`,
        html: htmlContent
      });
      return NextResponse.json({ success: true });
    } catch (emailError: any) {
      console.error('Resend API error:', emailError);
      return NextResponse.json(
        { error: emailError?.message || 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
} 