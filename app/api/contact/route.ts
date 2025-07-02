import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateEmailHtml } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Generate email HTML content
    const htmlContent = await generateEmailHtml(formData, "Contact Form")

    // Send email
    await sendEmail({
      to: process.env.EMAIL_FROM || "info@mawwany.com",
      subject: "New Contact Form Submission",
      html: htmlContent,
      replyTo: formData.email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
