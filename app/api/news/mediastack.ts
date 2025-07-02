// This file provides a direct way to access the mediastack API
// and can be used as a fallback if environment variables aren't working

import { mockNews } from "./mockData"

// Hardcoded API key as a last resort fallback
// Note: In production, you should always use environment variables
const FALLBACK_API_KEY = "" // Intentionally left empty - fill only if absolutely necessary

export interface MediastackResponse {
  data?: Array<{
    title: string
    url: string
    published_at: string
    source: string
    category: string
    image?: string
  }>
  pagination?: {
    total: number
    limit: number
    offset: number
    count: number
  }
  error?: {
    code: string
    message: string
    context?: any
  }
}

export async function fetchMediastackNews(retryCount = 0) {
  try {
    // Try to use environment variable first
    const apiKey = process.env.MEDIASTACK_API_KEY || FALLBACK_API_KEY

    if (!apiKey || apiKey.trim() === "") {
      console.error("No API key available for mediastack")
      return {
        success: false,
        articles: mockNews,
        error: "API key not available",
      }
    }

    // Build the mediastack API URL with appropriate parameters
    const url = new URL("http://api.mediastack.com/v1/news")

    // Add required parameters
    url.searchParams.append("access_key", apiKey)

    // Add sources - specify major news sources for maritime news
    url.searchParams.append("sources", "reuters,bloomberg,cnn,al-jazeera,bbc,cnbc")

    // Add categories - using business and general since Mediastack doesn't have specific marine categories
    url.searchParams.append("categories", "business,general")

    // Add languages - English only
    url.searchParams.append("languages", "en")

    // Add countries - focusing on relevant maritime regions
    // Using country codes: eg (Egypt), ae (UAE), sa (Saudi Arabia), cn (China), ru (Russia), us (USA)
    url.searchParams.append("countries", "eg,ae,sa,cn,ru,us,gb,sg,my")

    // Add keywords - specific to maritime industry
    // Note: Mediastack treats these as OR conditions, not AND
    url.searchParams.append(
      "keywords",
      "maritime,shipping,cargo,logistics,port,vessel,container,suez canal,jebel ali,marine transport",
    )

    // Add sorting - newest first
    url.searchParams.append("sort", "published_desc")

    // Add pagination - get more results to increase chances of relevant news
    url.searchParams.append("limit", "100")
    url.searchParams.append("offset", "0")

    console.log("Fetching from URL:", url.toString().replace(apiKey, "API_KEY_HIDDEN"))

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Mediastack API responded with status: ${response.status}`)
    }

    const data = (await response.json()) as MediastackResponse

    if ("error" in data) {
      // Handle specific mediastack error codes
      const errorCode = data.error?.code || "unknown_error"
      const errorMessage = data.error?.message || "Unknown error occurred"

      let userFriendlyMessage = "An error occurred while fetching news"

      switch (errorCode) {
        case "invalid_access_key":
          userFriendlyMessage = "The API access key is invalid"
          break
        case "missing_access_key":
          userFriendlyMessage = "No API access key was provided"
          break
        case "inactive_user":
          userFriendlyMessage = "The API account is inactive"
          break
        case "function_access_restricted":
          userFriendlyMessage = "This feature is not available on the current API plan"
          break
        case "usage_limit_reached":
          userFriendlyMessage = "Monthly API request limit reached"
          break
        case "rate_limit_reached":
          // If rate limited and we haven't retried too many times, wait and retry
          if (retryCount < 2) {
            console.log(`Rate limit reached, retrying in ${(retryCount + 1) * 2} seconds...`)
            await new Promise((resolve) => setTimeout(resolve, (retryCount + 1) * 2000))
            return fetchMediastackNews(retryCount + 1)
          }
          userFriendlyMessage = "API rate limit reached. Please try again later"
          break
        default:
          userFriendlyMessage = `API Error: ${errorMessage}`
      }

      throw new Error(userFriendlyMessage)
    }

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format from Mediastack API")
    }

    // Check if we have any articles
    if (data.data.length === 0) {
      console.warn("No articles returned from mediastack API, using mock data")
      return {
        success: false,
        articles: mockNews,
        error: "No articles found matching the criteria",
      }
    }

    // Transform the mediastack data format to our application format
    const articles = data.data.map((article) => ({
      title: article.title,
      url: article.url,
      time: article.published_at,
      source: {
        title: article.source || "News Source",
      },
      // Better image fallback with category-specific placeholders
      image:
        article.image && article.image.trim() !== ""
          ? article.image
          : `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(article.category?.toUpperCase() || "NEWS")}`,
      category: article.category?.toUpperCase() || "NEWS",
    }))

    console.log(`Successfully fetched ${articles.length} articles from mediastack`)

    return {
      success: true,
      articles,
      totalResults: articles.length,
    }
  } catch (error) {
    console.error("Error fetching from mediastack:", error)
    return {
      success: false,
      articles: mockNews,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
