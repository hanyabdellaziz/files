"use client"

import { useEffect } from "react"
import { applyDeviceClasses, detectDevice } from "../utils/deviceDetection"

export default function DeviceOptimizer() {
  useEffect(() => {
    // Apply device-specific classes to the document
    applyDeviceClasses()

    // Apply iOS-specific fixes
    const deviceInfo = detectDevice()
    if (deviceInfo.os === "ios") {
      // Fix for iOS 100vh issue
      const setVhProperty = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      }

      setVhProperty()
      window.addEventListener("resize", setVhProperty)
      return () => window.removeEventListener("resize", setVhProperty)
    }
  }, [])

  return null
}
