"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useViewport } from "../contexts/ViewportContext"
import { navigationTracker, type NavigationEvent } from "../utils/navigationTracker"

export function NavigationDebugger() {
  const [isVisible, setIsVisible] = useState(false)
  const [history, setHistory] = useState<NavigationEvent[]>([])
  const pathname = usePathname()
  const { width, height, isDesktop, isTablet, isMobile, isResizing, isMinimized } = useViewport()

  // Check if debug mode is enabled
  useEffect(() => {
    try {
      const debugMode = localStorage.getItem("navDebug") === "true"
      setIsVisible(debugMode)

      // Set up interval to refresh history
      const interval = setInterval(() => {
        if (debugMode) {
          try {
            const savedHistory = sessionStorage.getItem("navigationHistory")
            if (savedHistory) {
              setHistory(JSON.parse(savedHistory))
            }
          } catch (e) {
            console.error("Failed to load navigation history:", e)
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    } catch (e) {
      console.error("Failed to check debug mode:", e)
    }
  }, [])

  // Update when pathname changes
  useEffect(() => {
    if (isVisible) {
      try {
        const savedHistory = sessionStorage.getItem("navigationHistory")
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory))
        }
      } catch (e) {
        console.error("Failed to load navigation history:", e)
      }
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 z-[9999] max-w-md max-h-[300px] overflow-auto text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Navigation Debugger</h3>
        <button
          onClick={() => {
            navigationTracker.clearHistory()
            setHistory([])
          }}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Clear
        </button>
      </div>

      <div className="mb-2">
        <div>
          <strong>Current Path:</strong> {pathname}
        </div>
        <div>
          <strong>Viewport:</strong> {width}x{height} ({isDesktop ? "Desktop" : isTablet ? "Tablet" : "Mobile"})
        </div>
        <div>
          <strong>State:</strong>
          {isResizing && <span className="ml-1 bg-yellow-500 text-black px-1 rounded">Resizing</span>}
          {isMinimized && <span className="ml-1 bg-purple-500 text-white px-1 rounded">Minimized</span>}
        </div>
      </div>

      <div className="border-t border-gray-500 pt-2">
        <h4 className="font-bold mb-1">Navigation History:</h4>
        <div className="space-y-1">
          {history
            .slice()
            .reverse()
            .map((event, index) => (
              <div key={index} className="border-b border-gray-700 pb-1">
                <div className="flex justify-between">
                  <span className="font-medium">{event.pathname}</span>
                  <span className="text-gray-400">{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>
                    {event.viewportWidth}x{event.viewportHeight}
                  </span>
                  <span
                    className={`
                  ${event.source === "user" ? "text-green-400" : ""}
                  ${event.source === "system" ? "text-blue-400" : ""}
                  ${event.source === "resize" ? "text-yellow-400" : ""}
                  ${event.source === "restore" ? "text-purple-400" : ""}
                `}
                  >
                    {event.source}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
