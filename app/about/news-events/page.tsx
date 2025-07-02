"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const newsItems = [
  {
    title: "Blockchain Implemented for Ship Registration",
    date: "December 1, 2024",
    content:
      "A blockchain-based ship registration system has been launched, streamlining the process and enhancing transparency in maritime operations across the region's ports.",
    image: "/blockchain-registration.jpg",
  },
  {
    title: "Suez Canal Expansion Boosts Maritime Trade",
    date: "December 15, 2024",
    content:
      "A major expansion project has increased daily vessel transit capacity by 30%. This development is expected to significantly reduce wait times and boost global maritime trade efficiency.",
    image: "/suez-canal-expansion.jpg",
  },
  {
    title: "Advanced Port Automation System Launched",
    date: "November 22, 2024",
    content:
      "A state-of-the-art port automation system featuring AI-driven logistics management and autonomous container handling has been unveiled. This innovation is set to reduce cargo processing times by up to 40%.",
    image: "/port-automation.jpg",
  },
  {
    title: "International Maritime Conference Hosted",
    date: "November 10, 2024",
    content:
      "A successful International Maritime Organization (IMO) Conference was held, focusing on sustainable shipping practices and environmental protection in the Red Sea and Mediterranean regions.",
    image: "/maritime-conference.jpg",
  },
  {
    title: "New Shipbuilding Facility Announced",
    date: "October 5, 2024",
    content:
      "Ground has been broken on a massive shipbuilding facility as part of a national initiative. This project aims to position the region as a major player in the global shipbuilding industry.",
    image: "/shipbuilding-facility.jpg",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function NewsAndEvents() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState("")

  const goToPrevious = () => {
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection("")
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-mawwany-gold">
          News & <span className="mawwany-text">Events</span>
        </h1>
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-lg mb-4 text-gray-300">
            Stay updated with the latest marine news, facts, and events from the region.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto bg-gold-mesh p-6 rounded-frame shadow-lg overflow-hidden">
          <div
            className={`transition-transform duration-500 ease-in-out ${
              direction === "left" ? "-translate-x-full" : direction === "right" ? "translate-x-full" : ""
            }`}
          >
            <div className="relative w-full h-64 mb-4">
              <Image
                src={newsItems[currentIndex].image}
                alt={newsItems[currentIndex].title}
                fill
                className="object-cover rounded-frame"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">{newsItems[currentIndex].title}</h2>
            <p className="text-sm text-gray-400 mb-2">{newsItems[currentIndex].date}</p>
            <p className="text-gray-300">{newsItems[currentIndex].content}</p>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-mawwany-navy/50 hover:bg-mawwany-navy text-white p-2 rounded-full"
            aria-label="Previous news item"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-mawwany-navy/50 hover:bg-mawwany-navy text-white p-2 rounded-full"
            aria-label="Next news item"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
