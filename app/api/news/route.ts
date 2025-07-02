import { NextResponse } from "next/server"

// DECOMMISSIONED: This API endpoint has been temporarily disabled
export async function GET() {
  // Return a service unavailable response
  return NextResponse.json(
    {
      error: "This service is temporarily unavailable",
      status: "decommissioned",
      message: "The news service has been temporarily disabled",
    },
    { status: 503 },
  )
}
