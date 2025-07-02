"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export default function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    // Check initial state
    setIsOffline(!navigator.onLine)

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-red-500 text-white p-4 rounded-lg shadow-lg z-[1000] flex items-center">
      <WifiOff className="mr-2 flex-shrink-0" />
      <div>
        <p className="font-bold">You are offline</p>
        <p className="text-sm">Some features may be unavailable until you reconnect</p>
      </div>
    </div>
  )
}
