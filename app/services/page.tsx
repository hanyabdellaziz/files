"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import AnimatedButton from "../components/AnimatedButton"

const services = [
  {
    id: "nvocc",
    title: "NVOCC and Liner Agency",
    summary: "Deep local expertise with global reach",
    description:
      "As pioneers in NVOCC operations in Egypt, Mawwany combines deep local expertise with global reach. Our strong regional relationships enable us to effectively represent our principals and deliver streamlined logistics solutions tailored to your unique needs.",
    icon: "/nvocc-icon.svg",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NVOCC%20and%20Liner%20Agency%20-%20final-KmHs4KO4v6IcSVYCC50GDC4qpSQmW4.png",
  },
  {
    id: "freight-forwarding",
    title: "Freight Forwarding",
    summary: "Seamless coordination and expert handling",
    description:
      "Recognized as a leader in third-party logistics, Mawwany ensures smooth operations at every step of your shipping journey. From initial pickup to final delivery, our dedicated team leverages industry expertise to provide efficient, reliable solutions that keep your supply chain moving.",
    icon: "/freight-icon.svg",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Freight%20Forwarding%20-%20final-cucUxHD9yNwu9p0hvswoGP1HCtY4SZ.png",
  },
  {
    id: "warehousing",
    title: "Warehousing and Transportation",
    summary: "Tailored solutions for your business",
    description:
      "We offer customized land transportation and warehousing services designed to support and grow your business in Egypt. Leveraging our Engineering and Contracting divisions, we design and build state-of-the-art warehouses that meet your operational requirements while optimizing efficiency and reducing costs.",
    icon: "/warehouse-icon.svg",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Warehousing%20and%20Transportation%20-%20final-tFTM2YWUFlZT9vi4f2xVRSveBYYFqL.png",
  },
  {
    id: "ship-charter",
    title: "Ship Chartering Services",
    summary: "Efficient and secure transport for all cargo types",
    description:
      "No matter the size or nature of your cargo, Mawwany is committed to finding the perfect vessel to suit your needs. With a global network of trusted carriers, we ensure that every shipment is transported securely and efficiently, meeting the highest standards of safety and performance.",
    icon: "/charter-icon.svg",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ship%20Chartering%20Services%20-%20final-mmt3ZupZXv5qmvbFKfuBSFT4qkOunt.png",
  },
]

const ServiceCard = ({
  service,
  isActive,
  isHovered,
  onClick,
  onHover,
}: {
  service: (typeof services)[0]
  isActive: boolean
  isHovered: boolean
  onClick: () => void
  onHover: (isHovered: boolean) => void
}) => {
  const isExpanded = isActive || isHovered

  return (
    <motion.div
      layout
      className={`relative cursor-pointer transition-all duration-300 ease-in-out h-full lg:h-auto`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <motion.div
        layout
        className={`relative h-full flex flex-col justify-between p-4 sm:p-6 rounded-lg overflow-y-auto transition-all duration-300 ease-in-out ${
          isExpanded ? "shadow-lg" : ""
        }`}
        animate={{
          scale: isExpanded ? 1 : 1,
        }}
        transition={{ duration: 0.1 }}
        style={{ maxHeight: "calc(585px - 2rem)" }} // Adjust this value to match your background image height
      >
        <motion.div layout className="relative z-10 flex flex-col h-full">
          <motion.h3
            className={`text-2xl font-semibold mb-4 transition-colors duration-300 ease-in-out text-center ${
              isExpanded ? "text-mawwany-gold" : "text-white"
            }`}
          >
            {service.title}
          </motion.h3>
          <p className="text-lg text-center text-gray-300 mb-6">{service.summary}</p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-y-auto flex-grow"
              >
                <p className="text-base text-center text-gray-300 mt-2">{service.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 bg-black opacity-40 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>("nvocc")
  const [hoveredService, setHoveredService] = useState<string | null>("nvocc")

  const activeServiceData = services.find((s) => s.id === activeService || s.id === hoveredService)

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8 text-center text-mawwany-gold"
        >
          <span className="mawwany-text">MAWWANY</span> Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl text-center mb-12 max-w-3xl mx-auto text-gray-200"
        >
          Comprehensive shipping solutions for every need
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="relative">
            {/* Background Image Container */}
            <AnimatePresence>
              {activeServiceData && (
                <motion.div
                  key={`${activeServiceData.id}-bg`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-full lg:w-[1175px] h-full lg:h-[585px] z-0"
                >
                  <Image
                    src={activeServiceData.backgroundImage || "/placeholder.svg"}
                    alt={`${activeServiceData.title} background`}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Services Cards Container */}
            <motion.div
              layout
              className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 rounded-lg transition-all duration-300 ease-in-out mx-auto overflow-y-auto max-h-[80vh] lg:max-h-none lg:overflow-visible w-full lg:w-[1175px] h-full lg:h-[585px]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ServiceCard
                    service={service}
                    isActive={activeService === service.id}
                    isHovered={hoveredService === service.id}
                    onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                    onHover={(isHovered) => setHoveredService(isHovered ? service.id : null)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 md:mt-16 text-center"
          >
            <Link href="/contact" passHref>
              <AnimatedButton className="inline-block bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-3 px-8 rounded-full">
                Contact Us for More Information
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
