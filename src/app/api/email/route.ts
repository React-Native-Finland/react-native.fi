import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    // Validate the input
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // Send email using SendGrid
    await sgMail.send({
      to: process.env.CONTACT_EMAIL ?? '',
      from: process.env.SENDGRID_VERIFIED_SENDER ?? '',
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0;"><strong>Name:</strong></td>
              <td style="padding: 10px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Email:</strong></td>
              <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0;" colspan="2">
                <strong>Message:</strong>
                <div style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
              </td>
            </tr>
          </table>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
