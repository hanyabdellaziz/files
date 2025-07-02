"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type React from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const zoomIn = {
  hidden: { opacity: 0, scale: 0.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 1.2,
      ease: "easeOut",
    },
  },
}

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-mesh-gradient">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-mesh-gradient"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-8 text-center text-mawwany-gold">
              About <span className="mawwany-text">MAWWANY</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-2xl text-center mb-12 max-w-2xl mx-auto text-gray-200">
              Connecting Ports
            </motion.p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 text-gray-300">
                    Your Trusted Multi-Regional NVOCC and Liner Service Provider
                  </motion.h2>
                  <motion.div variants={fadeInUp}>
                    <p className="text-lg mb-4 text-gray-300">
                      Headquartered in Egypt, Mawwany Shipping Company stands as a leading NVOCC and liner service
                      provider with decades of expertise in global trade and logistics. Our mission is to deliver
                      seamless container and logistics services, ensuring efficiency and reliability at every stage.
                    </p>
                    <p className="text-lg mb-4 text-gray-300">
                      With a robust network spanning key regions—including the Gulf, Red Sea, Mediterranean, and Asian
                      ports—we are strategically positioned to support your logistics needs, no matter where your
                      business operates.
                    </p>
                    <p className="text-lg mb-4 text-gray-300">
                      What sets us apart is our dedication to cost-effective, innovative solutions. Our expert team goes
                      beyond offering services; we craft tailored, value-driven logistics solutions designed to empower
                      your business and drive growth.
                    </p>
                    <p className="text-lg text-gray-300">
                      At Mawwany, we believe in fostering partnerships that exceed expectations. Through transparent
                      communication and unwavering commitment, we help our clients achieve success and thrive in
                      competitive markets.
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  variants={zoomIn}
                  initial="hidden"
                  animate="visible"
                  className="relative w-full h-[300px] sm:h-[400px] overflow-hidden"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about%20page%20BG%201-d3AEaTEetw2HAcHOW19eOzLEgyJZW3.png"
                    alt="Decorative lighthouse illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <section id="vision" className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-1 md:order-2">
                  <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 text-mawwany-gold">
                    Our Vision
                  </motion.h2>
                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      Logistics Made Simple, Reliable, and Efficient
                    </h3>
                    <p className="text-lg mb-4 text-gray-300">
                      At Mawwany, our vision is to redefine logistics through connectivity, transparency, and
                      cost-effective solutions. We simplify shipping complexities to ensure your deliveries are timely
                      and aligned with your business goals.
                    </p>
                    <p className="text-lg text-gray-300">
                      We aim to be your trusted partner, offering unparalleled insight and expertise. By handling the
                      logistics details, we enable you to focus on your core business and achieve long-term success.
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  variants={zoomIn}
                  className="relative w-full h-[300px] sm:h-[400px] order-2 md:order-1 overflow-hidden"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about%20page%20BG%2022-vtSGvhlLOjO7gA8E4YlrlhqFp8H5DT.png"
                    alt="Decorative golden compass illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={1}>
            <section id="mission" className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 text-mawwany-gold">
                    Our Mission
                  </motion.h2>
                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      Tailored Shipping Solutions for Secure, Efficient Deliveries
                    </h3>
                    <p className="text-lg mb-4 text-gray-300">
                      Our mission is to provide customized shipping services that ensure your cargo arrives safely and
                      on time. With decades of experience and a commitment to reliability, we design stress-free,
                      efficient logistics plans to meet your specific needs.
                    </p>
                    <p className="text-lg text-gray-300">
                      Driven by innovation and sustainability, we deliver fully integrated logistics and transport
                      solutions. Our services empower businesses to grow and succeed while upholding the principles of
                      economic, ecological, and social responsibility.
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  variants={fadeInUp}
                  animate={{
                    scale: [1, 1.05, 1],
                    transition: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    },
                  }}
                  className="relative w-full h-[300px] sm:h-[400px] overflow-hidden"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about%20page%20BG%203-bsn9O6a9NbLznGkTzSsx2s625ZBzC6.png"
                    alt="Decorative sailing ship illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={1.2}>
            <section id="values" className="mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-mawwany-gold">
                Core Values
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div variants={fadeInUp} className="bg-gold-mesh p-6 rounded-frame shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-mawwany-gold">Integrity</h3>
                  <p className="text-gray-300">
                    Integrity is the foundation of our success. At Mawwany, we uphold the highest standards of honesty,
                    transparency, and ethical conduct. By fostering an environment of accountability and mutual respect,
                    we build lasting trust with our clients, partners, and employees.
                  </p>
                </motion.div>
                <motion.div variants={fadeInUp} className="bg-gold-mesh p-6 rounded-frame shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-mawwany-gold">Innovation and Sustainability</h3>
                  <p className="text-gray-300">
                    We embrace innovation to provide forward-thinking solutions that adapt to an ever-changing industry.
                    Our commitment to sustainability ensures that our practices support long-term economic and
                    environmental well-being.
                  </p>
                </motion.div>
                <motion.div variants={fadeInUp} className="bg-gold-mesh p-6 rounded-frame shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-mawwany-gold">Team Empowerment</h3>
                  <p className="text-gray-300">
                    We are dedicated to fostering the personal and professional growth of our team. Through continuous
                    learning, development opportunities, and a supportive work culture, we empower our colleagues to
                    excel and achieve their goals.
                  </p>
                </motion.div>
              </div>
            </section>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
