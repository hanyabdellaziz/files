"use server"

import nodemailer from "nodemailer"

export type EmailPayload = {
  to: string
  subject: string
  text?: string
  html?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer
  }>
}

// Function to check if we're in preview mode (server-side only)
async function isInPreviewMode(): Promise<boolean> {
  // Only check VERCEL_ENV - completely remove any reference to PREVIEW_SECRET variables
  return process.env.VERCEL_ENV === "preview"
}

export async function sendEmail(payload: EmailPayload) {
  // Check if we're in preview mode using the server-side function
  if (await isInPreviewMode()) {
    console.log("Preview mode detected - email sending skipped")
    console.log("Would have sent email:", payload)

    // Return a mock success response
    return {
      accepted: [payload.to],
      rejected: [],
      envelopeTime: 0,
      messageTime: 0,
      messageSize: 0,
      response: "Mock response from preview mode",
      envelope: { from: process.env.EMAIL_FROM || "preview@example.com", to: [payload.to] },
      messageId: `<mock-id-${Date.now()}@preview.example.com>`,
    }
  }

  try {
    // Create transport configuration using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Verify the connection configuration
    await transporter.verify()

    return await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...payload,
    })
  } catch (error) {
    console.error("Email sending error:", error)
    throw new Error("Failed to send email")
  }
}

export async function generateEmailHtml(data: Record<string, any>, formType: string): Promise<string> {
  // Create a clean table for email data
  const tableRows = Object.entries(data)
    .filter(([key]) => !["recipient", "files", "attachments"].includes(key))
    .map(([key, value]) => {
      // Format the key for better readability
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">${formattedKey}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>
      `
    })
    .join("")

  // Create a nice HTML email template
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1B2D3F; color: #C4A484; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        table { width: 100%; border-collapse: collapse; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MAWWANY - ${formType}</h1>
        </div>
        <div class="content">
          <p>A new ${formType.toLowerCase()} submission has been received with the following details:</p>
          <table>
            ${tableRows}
          </table>
        </div>
        <div class="footer">
          <p>This email was sent automatically from the MAWWANY website.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
