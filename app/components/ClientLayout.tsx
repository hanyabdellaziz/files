"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Header from "./Header"
import Footer from "./Footer"
import AnimatedLayout from "./AnimatedLayout"
import { ViewportProvider } from "../contexts/ViewportContext"
import { NavigationStateManager } from "./NavigationStateManager"
import { NavigationDebugger } from "./NavigationDebugger"
import ResponsiveHandler from "./ResponsiveHandler"

// Import the ScrollToTop component
import ScrollToTop from "./ScrollToTop"

// Import the DeviceOptimizer component
import DeviceOptimizer from "./DeviceOptimizer"

// Import the OfflineDetector component
import OfflineDetector from "./OfflineDetector"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <ViewportProvider>
      <DeviceOptimizer />
      <ScrollToTop />
      <NavigationStateManager />
      <NavigationDebugger />
      <ResponsiveHandler>
        <Header isHomepage={pathname === "/"} />
        <div className="flex-grow pt-16">
          <AnimatedLayout key={pathname}>
            <main>{children}</main>
          </AnimatedLayout>
        </div>
        <Footer />
        <OfflineDetector />
      </ResponsiveHandler>
    </ViewportProvider>
  )
}
