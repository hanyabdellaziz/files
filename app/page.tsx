"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Mail, Package, Send, X } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type React from "react"
import Link from "next/link"
import AnimatedButton from "./components/AnimatedButton"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    pol: "",
    pod: "",
    cargoDescription: "",
    equipment: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Animation controls and inView hook moved to the top level
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const servicesControls = useAnimation()
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      let isReverse = false
      let canPlayHandled = false
      const loadedDataHandled = false
      let animationFrameId: number

      const animate = () => {
        if (!video.paused) {
          if (isReverse) {
            video.currentTime -= 1 / 30 // Adjust for smoother reverse playback
            if (video.currentTime <= 0) {
              video.currentTime = video.duration
            }
          } else {
            if (video.currentTime >= video.duration) {
              video.currentTime = 0
            }
          }
        }
        animationFrameId = requestAnimationFrame(animate)
      }

      const handleCanPlay = () => {
        if (!canPlayHandled) {
          if (process.env.NODE_ENV === "development") {
            console.log("New landing page background video can play")
          }
          setVideoLoaded(true)
          video.playbackRate = 0.5

          // iOS requires user interaction to play videos
          // We'll try to play and handle any errors gracefully
          video.play().catch((err) => {
            console.log("Video autoplay prevented:", err)
            // For iOS, we'll show the video but it won't animate until user interaction
            setVideoLoaded(true)
          })

          canPlayHandled = true
          animationFrameId = requestAnimationFrame(animate)
        }
      }

      const handleLoadedData = () => {
        if (process.env.NODE_ENV === "development") {
          console.log("New landing page background video data loaded")
        }
      }

      const handleEnded = () => {
        isReverse = !isReverse
        if (isReverse) {
          video.currentTime = video.duration
        } else {
          video.currentTime = 0
        }
      }

      const handleError = (e: Event) => {
        const target = e.target as HTMLVideoElement
        console.error("New landing page background video error:", target.error?.message || "Unknown error")
        setVideoLoaded(false)
      }

      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("ended", handleEnded)
      video.addEventListener("error", handleError)

      // Add touch event listener to help with iOS playback
      const handleUserInteraction = () => {
        if (video.paused) {
          video.play().catch((err) => console.log("Still can't play video:", err))
        }
      }

      document.addEventListener("touchstart", handleUserInteraction, { once: true })

      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("ended", handleEnded)
        video.removeEventListener("error", handleError)
        document.removeEventListener("touchstart", handleUserInteraction)
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    if (servicesInView) {
      servicesControls.start("visible")
    }
  }, [servicesControls, servicesInView])

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
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send quote request")
      }

      // Success!
      setSubmitSuccess(true)
      console.log("Quote request submitted successfully:", data)

      // Reset form
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        pol: "",
        pod: "",
        cargoDescription: "",
        equipment: "",
        message: "",
      })

      // Create styled confirmation dialog
      alert("Thank you for your inquiry. We will get back to you soon!")
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error sending quote request:", error)
      setSubmitError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute top-0 left-0 w-full h-full object-cover video-smooth"
          style={{ objectPosition: "center" }}
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landing-poster-image-Yx3Tz9Yx0Tz9Yx0Tz9.jpg"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landing%20page%20motion%20background-2SCZi1Q0Umq5lX5KALo2OYP55iO4vm.mov"
            type="video/quicktime"
          />
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landing%20page%20motion%20background-2SCZi1Q0Umq5lX5KALo2OYP55iO4vm.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag or the video format.
        </video>
        {!videoLoaded && (
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Fallback background"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 min-h-screen"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center mb-16">
            <div className="floating-animation w-[560px] h-[160px] relative mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FINAL%20LOGO%20(1)-5Vpn1s8G3JFt0sBRwPQZ3D1HttYdm5.png"
                alt="MAWWANY Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl text-center mb-8 text-white"
            >
              Global Shipping Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl text-center mb-12 max-w-2xl mx-auto text-gray-200"
            >
              Reliable logistics solutions for businesses worldwide. Fast, secure, and efficient shipping services
              tailored to your needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-8">
                <AnimatedButton
                  onClick={() => setIsModalOpen(true)}
                  className="bg-mawwany-gold hover:bg-mawwany-gold/90 text-black font-bold py-3 px-6 rounded-full inline-flex items-center"
                >
                  <Mail className="mr-2" />
                  Get a Quote
                </AnimatedButton>
                <AnimatedButton
                  disabled
                  className="border-2 border-mawwany-gold text-mawwany-gold hover:bg-mawwany-gold/10 font-bold py-3 px-6 rounded-full inline-flex items-center"
                >
                  <Package className="mr-2" />
                  Track Shipment (Coming Soon)
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>

        <section className="py-16 bg-black/50 backdrop-blur-sm">
          <div ref={servicesRef} className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              animate={servicesControls}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
              className="text-3xl font-bold mb-8 text-center text-mawwany-gold"
            >
              Our Services
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate={servicesControls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {[
                "NVOCC and Liner Agency",
                "Freight Forwarding",
                "Warehousing and Transportation",
                "Ship Chartering Services",
              ].map((service, index) => (
                <motion.div
                  key={service}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gold-mesh p-6 rounded-frame hover:border-mawwany-gold/40 transition-all duration-300 flex items-center justify-center h-full"
                >
                  <h3 className="text-xl font-semibold text-mawwany-gold text-center">{service}</h3>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="flex justify-center mt-8"
              initial="hidden"
              animate={servicesControls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 1,
                  },
                },
              }}
            >
              <Link
                href="/services"
                className="inline-block bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                See all services
              </Link>
            </motion.div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-mawwany-navy p-6 rounded-frame shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-mawwany-gold">Get a Quote</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-mawwany-gold hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
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
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
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
                    <label htmlFor="pol" className="block text-sm font-medium text-gray-300 mb-1">
                      Port of Loading (POL)
                    </label>
                    <input
                      type="text"
                      id="pol"
                      name="pol"
                      value={formData.pol}
                      onChange={handleChange}
                      required
                      className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="pod" className="block text-sm font-medium text-gray-300 mb-1">
                      Port of Discharge (POD)
                    </label>
                    <input
                      type="text"
                      id="pod"
                      name="pod"
                      value={formData.pod}
                      onChange={handleChange}
                      required
                      className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="cargoDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Cargo Description
                    </label>
                    <input
                      type="text"
                      id="cargoDescription"
                      name="cargoDescription"
                      value={formData.cargoDescription}
                      onChange={handleChange}
                      required
                      className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-gray-300 mb-1">
                      Equipment
                    </label>
                    <input
                      type="text"
                      id="equipment"
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleChange}
                      required
                      className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  {submitError && (
                    <div className="mb-4 w-full p-2 bg-red-500/20 border border-red-500 rounded text-red-500 text-sm">
                      {submitError}
                    </div>
                  )}
                  <AnimatedButton
                    type="submit"
                    className={`bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-3 px-6 rounded-full inline-flex items-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2" />
                    {isSubmitting ? "Sending..." : "Send Quote Request"}
                  </AnimatedButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
