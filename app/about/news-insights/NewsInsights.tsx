"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { RefreshCcw, AlertTriangle, ExternalLink } from "lucide-react"
import { NewsPlaceholder } from "@/components/ui/news-placeholder"

interface NewsItem {
  title: string
  url: string
  time: string
  source: {
    title: string
  }
  image: string
  category?: string
}

export default function NewsInsights() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchNews = useCallback(async (retryAttempt = 0) => {
    setLoading(true)
    if (retryAttempt === 0) {
      setError(null)
    }

    try {
      const response = await fetch("/api/news")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      // Check if we have articles
      if (!data.articles || data.articles.length === 0) {
        console.warn("No articles returned from API, using mock data")
        const { mockNews } = await import("../../api/news/mockData")
        setNews(mockNews)
        setLastUpdated(new Date().toISOString())
        setError("No articles found matching the criteria. Showing mock data instead.")
        setLoading(false)
        return
      }

      if (data.error) {
        console.warn("API returned an error but with status 200:", data.error)

        // If we hit a rate limit and haven't retried too many times, wait and retry
        if (data.error.includes("rate_limit") && retryAttempt < 2) {
          console.log(`Rate limit error, retrying in ${(retryAttempt + 1) * 3} seconds...`)
          setTimeout(() => fetchNews(retryAttempt + 1), (retryAttempt + 1) * 3000)
          return
        }

        // Still use the data since we have fallback mock data
        setError(data.error)
      }

      setNews(data.articles)
      setLastUpdated(data.lastUpdated || new Date().toISOString())
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")

      // Set fallback mock data directly in the component as a last resort
      try {
        const { mockNews } = await import("../../api/news/mockData")
        setNews(mockNews)
        setLastUpdated(new Date().toISOString())
        console.log("Using fallback mock data from direct import")
      } catch (importErr) {
        console.error("Failed to import mock data:", importErr)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
    // Reduced refresh frequency to avoid potential rate limiting
    const intervalId = setInterval(fetchNews, 600000) // Refresh every 10 minutes
    return () => clearInterval(intervalId)
  }, [fetchNews])

  // Function to get domain name from URL for display
  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "")
      return domain
    } catch (e) {
      return url
    }
  }

  if (loading && news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin text-mawwany-gold">
          <RefreshCcw size={24} />
        </div>
        <p className="text-gray-400">Loading latest maritime news...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Maritime & Shipping News</h1>
        <div className="w-24 h-1 bg-mawwany-gold mx-auto mb-4"></div>
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-400">
          {lastUpdated && <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>}
          <button
            onClick={() => fetchNews()}
            className="inline-flex items-center text-mawwany-gold hover:text-white transition-colors"
            disabled={loading}
          >
            <RefreshCcw size={16} className={`mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
            <AlertTriangle size={24} />
            <p className="font-semibold">
              {error.includes("rate_limit")
                ? "API Rate Limit Reached"
                : error.includes("usage_limit")
                  ? "API Usage Limit Reached"
                  : error.includes("access_key")
                    ? "API Key Issue"
                    : error.includes("No articles found")
                      ? "No Matching Articles"
                      : "Error"}
            </p>
          </div>
          <p className="text-gray-300 mb-4">
            {error}
            <br />
            {news.length > 0
              ? "Showing available news. Unable to refresh with latest data."
              : "Using fallback news data."}
          </p>
          <button
            onClick={() => fetchNews()}
            className="bg-mawwany-gold text-black px-6 py-2 rounded-full hover:bg-mawwany-gold/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {news.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <li key={index} className="relative h-[400px] group overflow-hidden rounded-lg">
              {item.image && !item.image.includes("placeholder.svg") ? (
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // If the image fails to load, replace with our custom placeholder
                    const target = e.target as HTMLImageElement
                    target.onerror = null // Prevent infinite loop
                    target.style.display = "none" // Hide the broken image

                    // The NewsPlaceholder will be shown instead
                  }}
                />
              ) : (
                <div className="absolute inset-0">
                  <NewsPlaceholder category={item.category} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-3 py-1 bg-mawwany-gold text-black text-sm font-semibold rounded">
                      {item.category || "NEWS"}
                    </span>
                    <span className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded">
                      {item.source?.title || getDomainFromUrl(item.url)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {item.time ? new Date(item.time).toLocaleDateString() : "Recent"}
                  </p>
                  <h3 className="text-xl font-bold mt-2 line-clamp-3">{item.title}</h3>
                </div>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-mawwany-gold hover:text-white transition-colors group"
                  >
                    <span className="mr-2">READ MORE</span>
                    <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <span className="text-gray-400">No link available</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center p-8 bg-black/20 rounded-lg">
          <p className="text-gray-300">No news articles available at this time.</p>
        </div>
      )}
    </div>
  )
}
