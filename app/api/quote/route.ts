import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateEmailHtml } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.service) {
      return NextResponse.json({ error: "Name, email, and service are required" }, { status: 400 })
    }

    // Generate email HTML content
    const htmlContent = await generateEmailHtml(formData, "Quote Request")

    // Send email
    await sendEmail({
      to: process.env.EMAIL_FROM || "quotes@mawwany.com",
      subject: `New Quote Request: ${formData.service}`,
      html: htmlContent,
      replyTo: formData.email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 })
  }
}
