"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useViewport } from "../contexts/ViewportContext"
import { navigationTracker } from "../utils/navigationTracker"

export default function ResponsiveHandler({ children }: { children: React.ReactNode }) {
  const { width, height, isResizing, isMinimized } = useViewport()
  const pathname = usePathname()
  const router = useRouter()
  const lastStablePathRef = useRef<string | null>(null)
  const resizeEndTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Store the current path when it's stable (not during resize)
  useEffect(() => {
    if (!isResizing && pathname) {
      lastStablePathRef.current = pathname
    }
  }, [pathname, isResizing])

  // Handle resize end
  useEffect(() => {
    if (!isResizing && lastStablePathRef.current) {
      // Clear any existing timeout
      if (resizeEndTimeoutRef.current) {
        clearTimeout(resizeEndTimeoutRef.current)
      }

      // Set a short timeout to ensure we don't trigger navigation too early
      resizeEndTimeoutRef.current = setTimeout(() => {
        const currentPath = window.location.pathname

        // If we're on the homepage but were on a different page before resizing
        if (currentPath === "/" && lastStablePathRef.current !== "/") {
          // Get the last path for the current viewport
          const lastEvent = navigationTracker.getLastEventForViewport(width, height)

          // If we have a matching event, use its path, otherwise use the last stable path
          const targetPath = lastEvent ? lastEvent.pathname : lastStablePathRef.current

          // Navigate back to the correct path
          router.push(targetPath)

          // Track this as a system navigation
          navigationTracker.trackNavigation({
            pathname: targetPath,
            viewportWidth: width,
            viewportHeight: height,
            isFullscreen: !!document.fullscreenElement,
            isMobile: width < 768,
            source: "system",
          })
        }
      }, 100)
    }

    return () => {
      if (resizeEndTimeoutRef.current) {
        clearTimeout(resizeEndTimeoutRef.current)
      }
    }
  }, [isResizing, width, height, router])

  return <>{children}</>
}
