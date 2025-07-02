"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useViewport } from "../contexts/ViewportContext"

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)
  const prevPathRef = useRef(pathname)
  const isRestoringRef = useRef(false)
  const { isResizing } = useViewport()

  // Check if this is a restoration from minimized state
  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const lastActivePath = sessionStorage.getItem("lastActivePath")
      if (lastActivePath === pathname && prevPathRef.current !== pathname) {
        isRestoringRef.current = true
        // Reset after a short delay
        setTimeout(() => {
          isRestoringRef.current = false
        }, 100)
      }
    }

    // Only update prevPathRef if not during resize
    if (!isResizing) {
      prevPathRef.current = pathname
    }
  }, [pathname, isResizing])

  // Only animate on genuine navigation, not on restoration or resize
  useEffect(() => {
    if (!isRestoringRef.current && !isResizing && prevPathRef.current !== pathname) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [pathname, isResizing])

  // Add a useEffect to scroll to top when pathname changes
  useEffect(() => {
    // Scroll to top on route change, but only if it's a new route
    if (!isRestoringRef.current && !isResizing && prevPathRef.current !== pathname) {
      window.scrollTo(0, 0)
    }
  }, [pathname, isResizing])

  const pageVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  }

  // Determine if we should skip animation
  const shouldSkipAnimation = isRestoringRef.current || isResizing

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldSkipAnimation ? "animate" : "initial"}
        animate="animate"
        exit={shouldSkipAnimation ? "animate" : "exit"}
        variants={pageVariants}
        transition={{ duration: 0.4 }}
        className={`min-h-screen ${isAnimating ? "pointer-events-none" : ""}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
