"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  if (!user || !pass) {
    return { success: false, message: "Server configuration error. Please check environment variables." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${user}>`,
    to: user, // Sending to yourself
    replyTo: email,
    subject: `Contact Form Inquiry: ${subject}`,
    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #d4af37;">New Inquiry from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Nodemailer error:", error);
    return { success: false, message: "Failed to send email. Please try again later." };
  }
}
