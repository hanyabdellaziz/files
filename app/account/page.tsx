"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

export default function Account() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Logo Section */}
      <div className="relative bg-mawwany-navy flex items-center justify-center p-8">
        <div className="w-[400px] h-[120px] relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FINAL%20LOGO%20(1)-5Vpn1s8G3JFt0sBRwPQZ3D1HttYdm5.png"
            alt="MAWWANY Logo"
            fill
            className="object-contain animate-[breathe_4s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex flex-col justify-center p-8 bg-mesh-gradient">
        <div className="max-w-md mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold mb-8 text-mawwany-gold">
              Welcome to <span className="mawwany-text">myM</span>
            </h1>

            {/* Under Development Notice */}
            <div className="bg-mawwany-gold/10 border-2 border-mawwany-gold rounded-frame p-6 mb-8">
              <div className="flex items-center gap-3 text-mawwany-gold mb-2">
                <AlertCircle className="h-5 w-5" />
                <h2 className="font-semibold">Coming Soon</h2>
              </div>
              <p className="text-gray-300">
                Our customer portal is currently under development. Soon you'll be able to:
              </p>
              <ul className="mt-4 space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-mawwany-gold"></div>
                  Track your shipments in real-time
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-mawwany-gold"></div>
                  Manage bookings and documentation
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-mawwany-gold"></div>
                  Access instant quotes
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-mawwany-gold"></div>
                  Receive notifications and updates
                </li>
              </ul>
            </div>

            {/* Placeholder Form */}
            <div className="space-y-4 opacity-50">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                  placeholder="Coming soon..."
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  disabled
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                  placeholder="Coming soon..."
                />
              </div>
              <button
                disabled
                className="w-full bg-mawwany-gold/50 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
              >
                Login
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
