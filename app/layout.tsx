import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import ClientLayout from "./components/ClientLayout"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "MAWWANY - Global Shipping Solutions",
  description:
    "Reliable logistics solutions for businesses worldwide. Fast, secure, and efficient shipping services tailored to your needs.",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover",
  themeColor: "#1B2D3F",
  appleWebAppCapable: "yes",
  appleWebAppStatusBarStyle: "black-translucent",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-XXY47wgZt8ZisBp9SRL1JlTQpA6tGU.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-XXY47wgZt8ZisBp9SRL1JlTQpA6tGU.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans bg-navy text-white min-h-screen flex flex-col`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
