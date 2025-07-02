"use client"

import { useEffect, useRef } from "react"

interface NewsPlaceholderProps {
  category?: string
  width?: number
  height?: number
  className?: string
}

export function NewsPlaceholder({
  category = "NEWS",
  width = 300,
  height = 400,
  className = "",
}: NewsPlaceholderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#1a1a1a")
    gradient.addColorStop(1, "#0a0a0a")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add maritime-themed elements to the placeholder
    // After the gradient background and before the subtle pattern:

    // Add a simple ship silhouette
    ctx.fillStyle = "rgba(212, 175, 55, 0.15)" // Gold with opacity
    ctx.beginPath()
    // Ship hull
    ctx.moveTo(width * 0.3, height * 0.4)
    ctx.lineTo(width * 0.7, height * 0.4)
    ctx.lineTo(width * 0.8, height * 0.5)
    ctx.lineTo(width * 0.2, height * 0.5)
    ctx.closePath()
    ctx.fill()

    // Ship cabin/bridge
    ctx.fillStyle = "rgba(212, 175, 55, 0.1)"
    ctx.fillRect(width * 0.4, height * 0.3, width * 0.2, height * 0.1)

    // Add some subtle pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 5 + 1
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add category text
    ctx.fillStyle = "#d4af37" // Gold color
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText(category.toUpperCase(), width / 2, height / 2)

    // Add "No Image Available" text
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.font = "16px Arial"
    ctx.fillText("No Image Available", width / 2, height / 2 + 30)
  }, [category, width, height])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover ${className}`}
      aria-label={`${category} news placeholder`}
    />
  )
}
