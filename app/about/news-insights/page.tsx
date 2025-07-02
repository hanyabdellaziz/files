import { redirect } from "next/navigation"

export const metadata = {
  title: "News & Insights | MAWWANY",
  description: "Stay updated with the latest marine news and insights from MAWWANY.",
}

// DECOMMISSIONED: This page has been temporarily disabled
export default function NewsInsightsPage() {
  // Redirect to the main about page
  redirect("/about")

  // The code below is preserved but will not execute due to the redirect
  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        {/* Original NewsInsights component preserved but not rendered */}
        {/* <NewsInsights /> */}
      </div>
    </div>
  )
}
