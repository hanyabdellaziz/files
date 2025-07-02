"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import OurVacancies from "./components/OurVacancies"
import ValuesCulture from "./components/ValuesCulture"
import WhyJoinMawwany from "./components/WhyJoinMawwany"
import ApplicationFAQ from "./components/ApplicationFAQ"
import AnimatedButton from "../components/AnimatedButton"

type Tab = "vacancies" | "values" | "why-join" | "faq"

export default function Career() {
  const [activeTab, setActiveTab] = useState<Tab>("vacancies")

  const tabs = [
    { id: "vacancies" as Tab, label: "OUR VACANCIES" },
    { id: "values" as Tab, label: "VALUES/CULTURE" },
    { id: "why-join" as Tab, label: "WHY JOIN MAWWANY?" },
    { id: "faq" as Tab, label: "APPLICATION PROCESS - FAQ" },
  ]

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4 text-center text-mawwany-gold"
        >
          Career at <span className="mawwany-text">MAWWANY</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-center text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Join us in shaping the future of global shipping and logistics. Discover opportunities to grow, innovate, and
          make a lasting impact.
        </motion.p>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {tabs.map((tab) => (
              <AnimatedButton
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm md:text-base transition-colors ${
                  activeTab === tab.id ? "text-mawwany-gold" : "text-gray-400 hover:text-mawwany-gold"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-mawwany-gold"
                    initial={false}
                  />
                )}
              </AnimatedButton>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          {activeTab === "vacancies" && <OurVacancies />}
          {activeTab === "values" && <ValuesCulture />}
          {activeTab === "why-join" && <WhyJoinMawwany />}
          {activeTab === "faq" && <ApplicationFAQ />}
        </motion.div>
      </div>
    </div>
  )
}
