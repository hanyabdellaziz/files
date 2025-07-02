"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Copy } from "lucide-react"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import AnimatedButton from "../components/AnimatedButton"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [copySuccess, setCopySuccess] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    // Check if the user agent indicates an iOS device
    const userAgent = navigator.userAgent.toLowerCase()
    const iosPlatforms = ["iphone", "ipad", "ipod"]
    setIsIOS(iosPlatforms.some((platform) => userAgent.includes(platform)))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Success!
      setSubmitSuccess(true)
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      })

      // Create styled confirmation dialog
      const dialog = document.createElement("div")
      dialog.className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      dialog.innerHTML = `
      <div class="bg-mawwany-navy p-6 rounded-frame border-2 border-mawwany-gold shadow-lg max-w-md">
        <h3 class="text-2xl font-bold text-mawwany-gold mb-4">Thank You!</h3>
        <p class="text-gray-300 mb-6">We appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
        <div class="flex justify-center">
          <button class="bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-2 px-6 rounded-full transition-colors">
            Close
          </button>
        </div>
      </div>
    `

      document.body.appendChild(dialog)

      // Add event listener to close button
      const closeButton = dialog.querySelector("button")
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          document.body.removeChild(dialog)
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation() // Prevent the mailto link from activating
    e.preventDefault()
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  // Simplified and standardized vCard format
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:MAWWANY Shipping Services
ORG:MAWWANY
TEL;TYPE=WORK:+20034962999
TEL;TYPE=CELL:+201114433318
EMAIL:info@mawwany.com
ADR:;;12-14 Mahmoud Hamdi Khattab St.;Alexandria;;21131;Egypt
URL:https://www.mawwany.com
END:VCARD`

  const holidays = [
    { name: "Orthodox Christmas Day", date: "7 Jan" },
    { name: "Revolution Day 2011", date: "25 Jan" },
    { name: "Spring Festival", date: "21 Apr" },
    { name: "Sinai Liberation Day", date: "25 Apr" },
    { name: "Labor Day", date: "1 May" },
    { name: "Islamic New Year's Day", date: "26 Jun" },
    { name: "30 June Day", date: "30 Jun" },
    { name: "Revolution Day", date: "23 Jul" },
    { name: "Birth of the Prophet", date: "4 Sep" },
    { name: "Armed Forces Day", date: "6 Oct" },
  ]

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8 text-center text-mawwany-gold"
        >
          Contact <span className="mawwany-text">MAWWANY</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl text-center mb-12 max-w-2xl mx-auto text-gray-200"
        >
          Get in Touch with Our Shipping Experts
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-gold-mesh p-8 rounded-frame shadow-lg h-full">
            <h2 className="text-2xl font-semibold mb-4 text-mawwany-gold">Get in touch with our shipping experts</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="recipient" value="info@mawwany.com" />
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-300">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-gray-300">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-300">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 text-gray-300">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white h-32"
                ></textarea>
              </div>
              <div>
                {submitError && (
                  <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-red-500 text-sm">
                    {submitError}
                  </div>
                )}
                <AnimatedButton
                  type="submit"
                  className={`bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-2 px-4 rounded transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </AnimatedButton>
              </div>
            </form>
          </div>
          <div className="bg-gold-mesh p-8 rounded-frame shadow-lg h-full flex flex-col">
            <div className={`flex justify-between items-start mb-6 ${isIOS ? "ios-contact-header" : ""}`}>
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl font-semibold text-mawwany-gold mb-4">Company Details</h2>
                <p className="flex items-start text-gray-300">
                  <MapPin className="mr-2 text-mawwany-gold mt-1 flex-shrink-0" />
                  <span>12-14 Mahmoud Hamdi Khattab St. (formerly Aristotle), Alexandria, Egypt.</span>
                </p>
                <div className="flex items-center text-gray-300">
                  <Phone className="mr-2 text-mawwany-gold flex-shrink-0" />
                  <span>+20 (03) 4962999</span>
                  <span className="mx-3 text-mawwany-gold/50">|</span>
                  <span>+20 1114433318</span>
                </div>
                <p className="flex items-center text-gray-300 group relative">
                  <Mail className="mr-2 text-mawwany-gold" />
                  <a
                    href="mailto:info@mawwany.com"
                    rel="noopener noreferrer"
                    className="hover:text-mawwany-gold hover:underline transition-all flex items-center"
                    target="_blank"
                  >
                    info@mawwany.com
                    <button
                      onClick={(e) => copyToClipboard(e, "info@mawwany.com")}
                      className="ml-2 focus:outline-none"
                      aria-label="Copy email address"
                    >
                      <Copy
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-mawwany-gold"
                      />
                    </button>
                  </a>
                  {copySuccess && (
                    <span className="absolute left-full ml-2 text-xs bg-mawwany-gold text-black px-2 py-1 rounded">
                      Copied!
                    </span>
                  )}
                </p>
              </div>
              <div className={`ml-4 flex-shrink-0 qr-code-container ${isIOS ? "ios-qr-code" : ""}`}>
                <div
                  className="bg-white p-3 rounded-lg flex items-center justify-center"
                  style={{
                    minWidth: isIOS ? "110px" : "130px",
                    minHeight: isIOS ? "110px" : "130px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <QRCodeSVG
                    value={vCardData}
                    size={isIOS ? 100 : 120}
                    bgColor="#FFFFFF"
                    fgColor="#c4a484"
                    level="Q"
                    includeMargin={true}
                    imageSettings={{
                      src: "/images/new-mawwany-logo.png",
                      x: undefined,
                      y: undefined,
                      height: 18,
                      width: 18,
                      excavate: true,
                    }}
                  />
                </div>
                <p className="text-[10px] text-center mt-1 text-gray-300">Scan to save contact</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-mawwany-gold">Location</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-frame overflow-hidden bg-black/20 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-mawwany-navy/50 text-white text-sm">
                  Loading map...
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d213.29791037654593!2d29.912357867459093!3d31.199485200000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-frame ios-map relative z-10"
                  onLoad={(e) => {
                    // Make iframe visible once loaded
                    if (e.currentTarget) {
                      e.currentTarget.style.opacity = "1"
                    }
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
