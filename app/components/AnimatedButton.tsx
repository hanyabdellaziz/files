"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  onClick?: () => void
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, className, children, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

export default AnimatedButton
