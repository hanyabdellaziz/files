"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin } from "lucide-react"
import { XLogo } from "./XLogo"
import AnimatedButton from "./AnimatedButton"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Footer: React.FC = () => {
  const router = useRouter()
  const [isIOS, setIsIOS] = useState(false)

  // Detect iOS devices
  useEffect(() => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

    setIsIOS(isIOSDevice)
  }, [])

  // Update the handleNavigation function to scroll to top for regular page navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  }

  return (
    <footer className="bg-mawwany-navy text-white py-4 sm:py-8 border-t border-mawwany-gold/20">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 ${isIOS ? "ios-footer-grid" : ""}`}>
          <div className="flex flex-col items-center justify-center h-full col-span-2 lg:col-span-1">
            <Link href="/" passHref>
              <div
                onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/")}
                className="w-[400px] h-[120px] relative cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FINAL%20LOGO%20(1)-5Vpn1s8G3JFt0sBRwPQZ3D1HttYdm5.png"
                  alt="MAWWANY Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-center mt-4">
              Your trusted partner in global logistics and shipping solutions.
              <br />
            </p>
          </div>
          <div className={isIOS ? "ios-footer-section" : ""}>
            <h4 className="text-lg font-semibold mb-4 text-mawwany-gold">Our Branches</h4>
            <ul className={`space-y-1 sm:space-y-2 ${isIOS ? "ios-footer-links" : ""}`}>
              <li>
                <Link href="/contact" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/contact")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Alexandria
                  </AnimatedButton>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/contact")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Cairo
                  </AnimatedButton>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/contact")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Sokhna
                  </AnimatedButton>
                </Link>
              </li>
            </ul>
          </div>
          <div className={isIOS ? "ios-footer-section" : ""}>
            <h4 className="text-lg font-semibold mb-4 text-mawwany-gold">Quick Links</h4>
            <ul className={`space-y-1 sm:space-y-2 ${isIOS ? "ios-footer-links" : ""}`}>
              <li>
                <Link href="/services" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/services")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Our Services
                  </AnimatedButton>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/about")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    About Us
                  </AnimatedButton>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/contact")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Contact Us
                  </AnimatedButton>
                </Link>
              </li>
              <li>
                <Link href="/career" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/career")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Career
                  </AnimatedButton>
                </Link>
              </li>
            </ul>
          </div>
          <div className={isIOS ? "ios-footer-section" : ""}>
            <h4 className="text-lg font-semibold mb-4 text-mawwany-gold">Legal</h4>
            <ul className={`space-y-1 sm:space-y-2 ${isIOS ? "ios-footer-links" : ""}`}>
              <li>
                <Link href="/privacy-policy" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/privacy-policy")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Privacy Policy
                  </AnimatedButton>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" passHref>
                  <AnimatedButton
                    onClick={(e) => handleNavigation(e as React.MouseEvent<HTMLAnchorElement>, "/terms-and-conditions")}
                    className="hover:text-mawwany-gold transition-colors"
                  >
                    Terms and Conditions
                  </AnimatedButton>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://www.linkedin.com/company/mawwany/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mawwany-gold hover:opacity-80 transition-opacity"
            >
              <Linkedin />
            </a>
            <a href="https://x.com/MAWWANYegy" className="text-mawwany-gold hover:opacity-80 transition-opacity">
              <XLogo size={24} />
            </a>
            <a
              href="https://www.facebook.com/share/1CwZxmidqy/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mawwany-gold hover:opacity-80 transition-opacity"
            >
              <Facebook />
            </a>
          </div>
          <p className="text-mawwany-gold/60">&copy; 2025 MAWWANY Shipping Company LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
