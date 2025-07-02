"use client"

import Image from "next/image"

// Add this new CSS class
const breatheAnimation = `
  @keyframes breathe {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`

export default function OurBrand() {
  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-mawwany-gold">
          Our <span className="mawwany-text">Brand</span>
        </h1>
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg mb-4 text-gray-300">
            The MAWWANY brand represents our commitment to excellence in global shipping and logistics. Our brand
            identity is built on the pillars of reliability, innovation, and customer-centricity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-mawwany-gold">Our Logo</h2>
            <p className="text-gray-300 mb-4">
              Our logo embodies the essence of global connectivity. The circular arrangement of golden dots represents
              the network of ports we connect, while the flowing wave-like typography of "MAWWANY" symbolizes the
              dynamic nature of maritime trade. Below, "CONNECTING PORTS" reinforces our core mission in a strong,
              industrial typeface. The golden palette represents excellence and premium quality, embodying our
              commitment to delivering superior shipping and logistics solutions.
            </p>
          </div>
          <div className="flex justify-center">
            <style jsx>{breatheAnimation}</style>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FINAL%20LOGO%20(1)-5Vpn1s8G3JFt0sBRwPQZ3D1HttYdm5.png"
              alt="MAWWANY Logo"
              width={600}
              height={160}
              className="object-contain animate-[breathe_4s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
