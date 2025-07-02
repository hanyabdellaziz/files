import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateEmailHtml } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.position) {
      return NextResponse.json({ error: "Name, email, and position are required" }, { status: 400 })
    }

    // Generate email HTML content
    const htmlContent = await generateEmailHtml(formData, "Career Application")

    // Send email
    await sendEmail({
      to: process.env.EMAIL_FROM || "careers@mawwany.com",
      subject: `New Career Application: ${formData.position}`,
      html: htmlContent,
      replyTo: formData.email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Career application error:", error)
    return NextResponse.json({ error: "Failed to submit career application" }, { status: 500 })
  }
}
