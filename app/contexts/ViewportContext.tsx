"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"

type ViewportContextType = {
  width: number
  height: number
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
  isMinimized: boolean
  isResizing: boolean
}

const ViewportContext = createContext<ViewportContextType>({
  width: 0,
  height: 0,
  isDesktop: false,
  isTablet: false,
  isMobile: false,
  isMinimized: false,
  isResizing: false,
})

export const useViewport = () => useContext(ViewportContext)

export const ViewportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewport, setViewport] = useState<ViewportContextType>(() => {
    // Initialize with default values that won't cause layout shifts
    const isClient = typeof window !== "undefined"
    return {
      width: isClient ? window.innerWidth : 1024, // Default to desktop
      height: isClient ? window.innerHeight : 768,
      isDesktop: isClient ? window.innerWidth >= 1024 : true,
      isTablet: isClient ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
      isMobile: isClient ? window.innerWidth < 768 : false,
      isMinimized: false,
      isResizing: false,
    }
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const skipInitialRender = useRef(true)
  const previousDimensionsRef = useRef({ width: viewport.width, height: viewport.height })
  const resizeStartTime = useRef<number | null>(null)

  const handleResize = useCallback(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight

    // Start resize tracking if not already started
    if (!resizeStartTime.current) {
      resizeStartTime.current = Date.now()
      setViewport((prev) => ({
        ...prev,
        isResizing: true,
      }))
    }

    // Check if this is likely a minimize/restore operation
    const isMinimizeOperation =
      (previousDimensionsRef.current.width > 0 && width === 0) ||
      (previousDimensionsRef.current.height > 0 && height === 0)

    // Update previous dimensions
    previousDimensionsRef.current = { width, height }

    setViewport((prev) => ({
      width,
      height,
      isDesktop: width >= 1024,
      isTablet: width >= 768 && width < 1024,
      isMobile: width < 768,
      isMinimized: isMinimizeOperation ? true : prev.isMinimized,
      isResizing: true,
    }))

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set timeout to mark end of resize
    timeoutRef.current = setTimeout(() => {
      setViewport((prev) => ({
        ...prev,
        isResizing: false,
      }))

      // Calculate resize duration
      const resizeDuration = resizeStartTime.current ? Date.now() - resizeStartTime.current : 0
      resizeStartTime.current = null

      // Log resize completion in debug mode
      if (localStorage.getItem("navDebug") === "true") {
        console.log(`[ViewportContext] Resize completed after ${resizeDuration}ms`, { width, height })
      }
    }, 300)
  }, [])

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // App is now visible again, reset minimized state
        setViewport((prev) => ({
          ...prev,
          isMinimized: false,
        }))
      } else if (document.visibilityState === "hidden") {
        // App is now hidden, might be minimized
        setViewport((prev) => ({
          ...prev,
          isMinimized: true,
        }))
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    // Initial calculation
    handleResize()

    // Debounced resize handler
    const debouncedResizeHandler = () => {
      handleResize()
    }

    window.addEventListener("resize", debouncedResizeHandler)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener("resize", debouncedResizeHandler)
    }
  }, [handleResize])

  return <ViewportContext.Provider value={viewport}>{children}</ViewportContext.Provider>
}
