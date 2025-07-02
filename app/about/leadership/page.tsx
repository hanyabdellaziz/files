"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const directors = [
  {
    name: "Captain. Mahmoud Abuzour",
    title: "Chief Executive Officer",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cpt.%20Mahmoud.png-TgC1oaEz3YmD0oycyIB5bMI3bShRPT.webp",
  },
  {
    name: "Mrs. Shaimaa Yousry",
    title: "Managing Director",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mrs.%20Shaimaa.png-ym9UwWGRmvIhCk6S4qx1RJyIOGImOZ.webp",
  },
  {
    name: "Mr. Hany Abd El-Aziz",
    title: "Chairman",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mr.%20Hany%20.png-VqCB3wHtbS46xKYqMIoQoZpw0q0mbH.webp",
  },
]

export default function Leadership() {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000) // Delay to allow for the intro animation

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-mawwany-gold">
          Our <span className="mawwany-text">Leadership</span>
        </h1>
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg mb-4 text-gray-300">
            Our leadership team brings decades of experience in global logistics and shipping. Their vision and
            expertise drive our company's success and innovation in the industry.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-mawwany-gold">Board of Directors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {directors.map((director, index) => (
            <div
              key={director.name}
              className={`director-card bg-gold-mesh p-6 rounded-frame shadow-lg text-center transition-all duration-1000 ease-in-out ${
                animationComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Image
                src={director.image || "/placeholder.svg"}
                alt={director.name}
                width={200}
                height={200}
                className="mx-auto mb-4 rounded-frame object-cover object-center h-[250px] w-[200px]"
              />
              <h3 className="text-xl font-semibold mb-2 text-mawwany-gold">{director.name}</h3>
              <p className="text-gray-300">{director.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
