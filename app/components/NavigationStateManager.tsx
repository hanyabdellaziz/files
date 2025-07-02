"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { navigationTracker } from "../utils/navigationTracker"
import { useViewport } from "../contexts/ViewportContext"

export function NavigationStateManager() {
  const pathname = usePathname()
  const router = useRouter()
  const { width, height, isDesktop, isMobile, isMinimized } = useViewport()
  const lastPathRef = useRef<string | null>(null)
  const isFullscreen = useRef<boolean>(false)
  const isResizing = useRef<boolean>(false)
  const resizeTimer = useRef<NodeJS.Timeout | null>(null)
  const [debugMode, setDebugMode] = useState<boolean>(false)

  // Check for fullscreen state
  useEffect(() => {
    const checkFullscreen = () => {
      isFullscreen.current = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
    }

    // Initial check
    checkFullscreen()

    // Listen for fullscreen changes
    document.addEventListener("fullscreenchange", checkFullscreen)
    document.addEventListener("webkitfullscreenchange", checkFullscreen)
    document.addEventListener("mozfullscreenchange", checkFullscreen)
    document.addEventListener("MSFullscreenChange", checkFullscreen)

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen)
      document.removeEventListener("webkitfullscreenchange", checkFullscreen)
      document.removeEventListener("mozfullscreenchange", checkFullscreen)
      document.removeEventListener("MSFullscreenChange", checkFullscreen)
    }
  }, [])

  // Track navigation when pathname changes
  useEffect(() => {
    if (pathname) {
      // Only track as user navigation if not during resize
      if (!isResizing.current) {
        navigationTracker.trackNavigation({
          pathname,
          viewportWidth: width,
          viewportHeight: height,
          isFullscreen: isFullscreen.current,
          isMobile,
          source: "user",
        })
      }

      lastPathRef.current = pathname
    }
  }, [pathname, width, height, isMobile])

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      isResizing.current = true

      // Clear any existing timer
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current)
      }

      // Set a timer to track the end of resize
      resizeTimer.current = setTimeout(() => {
        isResizing.current = false

        // After resize completes, track a resize navigation event
        if (pathname) {
          navigationTracker.trackNavigation({
            pathname,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            isFullscreen: isFullscreen.current,
            isMobile: window.innerWidth < 768,
            source: "resize",
          })
        }
      }, 300)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current)
      }
    }
  }, [pathname])

  // Handle visibility change events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // App is visible again, check if we need to restore path
        const currentPath = window.location.pathname
        const lastActivePath = navigationTracker.getCurrentPath()

        // If we're on the homepage but were on a different page before, navigate back
        if (currentPath === "/" && lastActivePath && lastActivePath !== "/") {
          router.push(lastActivePath)

          // Track this as a restore navigation
          navigationTracker.trackNavigation({
            pathname: lastActivePath,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            isFullscreen: isFullscreen.current,
            isMobile: window.innerWidth < 768,
            source: "restore",
          })
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleVisibilityChange)
    }
  }, [router])

  // Handle keyboard shortcuts for debug mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug mode
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        const newDebugMode = !debugMode
        setDebugMode(newDebugMode)
        navigationTracker.enableDebugMode(newDebugMode)
        console.log(`[NavTracker] Debug mode ${newDebugMode ? "enabled" : "disabled"}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [debugMode])

  // Initialize debug mode from localStorage
  useEffect(() => {
    try {
      const savedDebugMode = localStorage.getItem("navDebug") === "true"
      setDebugMode(savedDebugMode)
    } catch (e) {
      console.error("Failed to read debug mode setting:", e)
    }
  }, [])

  // This component doesn't render anything
  return null
}
