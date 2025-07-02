"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "What shipping services does MAWWANY offer?",
    answer:
      "MAWWANY offers a comprehensive range of shipping services including NVOCC, general shipping, freight forwarding, and logistics solutions for various types of cargo.",
  },
  {
    question: "How can I get a quote for my shipment?",
    answer:
      "You can easily get a quote by filling out our contact form on the Contact page or by directly emailing us at info@mawwany.com with details of your shipment.",
  },
  {
    question: "Does MAWWANY handle international shipments?",
    answer:
      "Yes, MAWWANY specializes in global logistics and can handle shipments to and from over 150 countries worldwide.",
  },
  {
    question: "What types of cargo does MAWWANY ship?",
    answer:
      "We handle a wide variety of cargo types including general cargo, bulk goods, and specialized shipments. Please contact us for specific inquiries about your cargo type.",
  },
  {
    question: "How can I track my shipment?",
    answer:
      "We are currently developing our online tracking system. In the meantime, please contact our customer service team for updates on your shipment status.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8 text-center text-mawwany-gold"
        >
          <span className="mawwany-text">MAWWANY</span> FAQ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl text-center mb-12 max-w-2xl mx-auto text-gray-200"
        >
          Answers to Your Most Common Questions
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-gold-mesh rounded-frame focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-mawwany-gold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-mawwany-gold" />
                ) : (
                  <ChevronDown className="text-mawwany-gold" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-2 p-4 bg-black/50 rounded-frame">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
