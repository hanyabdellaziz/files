import { redirect } from "next/navigation"

// DECOMMISSIONED: This page has been temporarily disabled
export default function NewsArticlePage() {
  // Redirect to the main about page
  redirect("/about")

  // The rest of the code is preserved but will not execute
  return null
}
