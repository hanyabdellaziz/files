"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, MapPin, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useViewport } from "../contexts/ViewportContext"

const Header = ({ isHomepage = false }: { isHomepage?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMenuMinimized, setIsMenuMinimized] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isIOS, setIsIOS] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const burgerMenuRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { isDesktop, isTablet, isMobile } = useViewport()

  // Detect iOS
  useEffect(() => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

    setIsIOS(isIOSDevice)

    // Add iOS class to body for more specific CSS targeting
    if (isIOSDevice && typeof document !== "undefined") {
      document.body.classList.add("ios-device")
    }
  }, [])

  useEffect(() => {
    const lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 10)

      if (currentScrollY > lastScrollY) {
        setIsMenuMinimized(true)
        setActiveDropdown(null)
        setIsMenuOpen(false)
      } else {
        setIsMenuMinimized(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideHeader = headerRef.current && !headerRef.current.contains(event.target as Node)
      const isOutsideBurger = burgerMenuRef.current && !burgerMenuRef.current.contains(event.target as Node)

      if (isOutsideHeader && isOutsideBurger) {
        setActiveDropdown(null)
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen || activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("scroll", handleClickOutside)
    }
  }, [isMenuOpen, activeDropdown])

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setActiveDropdown(null)
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (e: React.MouseEvent, dropdownName: string) => {
    e.stopPropagation()
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()

      // Don't manipulate scroll for regular page navigation
      if (!href.startsWith("#")) {
        // Use router.push and scroll to top for regular pages
        router.push(href)
        window.scrollTo(0, 0)
        return
      }

      // Only handle scroll for anchor links
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    },
    [router],
  )

  return (
    <header
      ref={headerRef}
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled ? "bg-mawwany-navy/95 backdrop-blur-sm shadow-lg shadow-mawwany-gold/10" : "bg-mawwany-navy"
      } text-white pt-safe`}
    >
      <div className="container mx-auto px-4">
        <nav className={`flex justify-between items-center transition-all duration-300 py-2 px-4`}>
          <div className="flex-shrink-0 flex items-center justify-start w-16">
            <button ref={burgerMenuRef} className="text-mawwany-gold p-2" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex-grow flex justify-center items-center">
            <Link href="/" onClick={(e) => handleNavigation(e, "/")} className="flex items-center justify-center">
              <div className={`relative transition-all duration-300 w-[300px] h-[60px] my-1`}>
                {(!isHomepage || scrollPosition > 100) && (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20hd-AtDnqWXuH0tzmrIXnVYSVQNA6sAfTw.png"
                    alt="MAWWANY Logo"
                    fill
                    className={`object-contain object-center transition-opacity duration-300 ${
                      isHomepage && scrollPosition <= 100 ? "opacity-0" : "opacity-100"
                    }`}
                    priority
                  />
                )}
              </div>
            </Link>
          </div>

          <div className="flex-shrink-0 flex items-center justify-end w-16 space-x-2">
            {/* Only show tracking and myM icons on tablet and desktop */}
            {!isMobile && (
              <>
                <button
                  className="flex flex-col items-center text-white hover:text-mawwany-gold transition-colors"
                  aria-label="Track shipment"
                >
                  <MapPin size={20} />
                  <span className="text-xs mt-1">Tracking</span>
                </button>
                <div className="relative group">
                  <div className="flex flex-col items-center px-4 py-2 bg-mawwany-gold text-black rounded cursor-not-allowed">
                    <User size={20} />
                    <span className="text-xs mt-1 font-medium">myM</span>
                  </div>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block w-max">
                    <div className="bg-black/90 text-white text-sm py-1 px-3 rounded">Under Development</div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-mawwany-navy/80 backdrop-blur-sm border-t border-mawwany-gold/20 shadow-lg shadow-mawwany-gold/10 overflow-hidden transition-all duration-300">
            <div className={`ios-menu-container py-0 ${isIOS ? "ios-header-container" : ""}`}>
              <div className="container mx-auto px-4">
                <div
                  className={`flex flex-col ios-menu ${isIOS ? "ios-header-menu" : ""} ${isMobile && isIOS ? "ios-mobile-menu" : ""}`}
                >
                  <Link
                    href="/services"
                    onClick={(e) => handleNavigation(e, "/services")}
                    className={`text-mawwany-gold hover:text-white transition-colors ${isIOS ? "py-1.5 ios-menu-item ios-header-item" : "py-1"} ${isMobile && isIOS ? "ios-mobile-item" : ""}`}
                  >
                    Our Services
                  </Link>
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown(e, "about")}
                      className={`flex items-center text-mawwany-gold hover:text-white transition-colors focus:outline-none w-full text-left ${isIOS ? "py-2 ios-menu-item ios-header-item" : "py-1"} ${isMobile && isIOS ? "ios-mobile-item" : ""}`}
                    >
                      <span className="mawwany-text">About Us</span>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === "about" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === "about" && (
                      <div
                        className={`ios-dropdown pl-4 ${isIOS ? "ios-header-dropdown" : ""} ${isMobile && isIOS ? "ios-mobile-dropdown" : ""}`}
                      >
                        <Link
                          href="/about"
                          onClick={(e) => handleNavigation(e, "/about")}
                          className={`block text-sm text-mawwany-gold hover:text-white transition-colors ${isIOS ? "py-0.5 ios-dropdown-item ios-header-dropdown-item" : "py-0.5"} ${isMobile && isIOS ? "ios-mobile-dropdown-item" : ""}`}
                        >
                          About MAWWANY
                        </Link>
                        <Link
                          href="/about/brand"
                          onClick={(e) => handleNavigation(e, "/about/brand")}
                          className={`block text-sm text-mawwany-gold hover:text-white transition-colors ${isIOS ? "py-0.5 ios-dropdown-item ios-header-dropdown-item" : "py-0.5"} ${isMobile && isIOS ? "ios-mobile-dropdown-item" : ""}`}
                        >
                          Our Brand
                        </Link>
                        <Link
                          href="/about/leadership"
                          onClick={(e) => handleNavigation(e, "/about/leadership")}
                          className={`block text-sm text-mawwany-gold hover:text-white transition-colors ${isIOS ? "py-0.5 ios-dropdown-item ios-header-dropdown-item" : "py-0.5"} ${isMobile && isIOS ? "ios-mobile-dropdown-item" : ""}`}
                        >
                          Our Leadership
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/contact"
                    onClick={(e) => handleNavigation(e, "/contact")}
                    className={`text-mawwany-gold hover:text-white transition-colors ${isIOS ? "py-1.5 ios-menu-item ios-header-item" : "py-1"} ${isMobile && isIOS ? "ios-mobile-item" : ""}`}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
