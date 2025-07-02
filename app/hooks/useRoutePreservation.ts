"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useRoutePreservation() {
  const router = useRouter()
  const pathname = usePathname()
  const [preservedRoute, setPreservedRoute] = useState(pathname)

  useEffect(() => {
    setPreservedRoute(pathname)
  }, [pathname])

  useEffect(() => {
    const handleRouteChange = () => {
      if (preservedRoute !== pathname) {
        router.push(preservedRoute)
      }
    }

    window.addEventListener("resize", handleRouteChange)
    return () => window.removeEventListener("resize", handleRouteChange)
  }, [preservedRoute, pathname, router])

  return preservedRoute
}
