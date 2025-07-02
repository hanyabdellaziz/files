"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What is the application process at Mawwany?",
    answer:
      "Our application process typically involves: 1) Submitting your application through our careers page, 2) Initial screening by our HR team, 3) First interview (virtual or in-person), 4) Technical/skills assessment if applicable, 5) Final interview with department heads, 6) Reference checks, and 7) Job offer.",
  },
  {
    question: "How long does the hiring process usually take?",
    answer:
      "The hiring process usually takes 2-4 weeks from application to offer, depending on the position and number of candidates. We strive to keep all candidates informed throughout the process.",
  },
  {
    question: "What should I include in my application?",
    answer:
      "Please include your updated CV, a cover letter explaining your interest in Mawwany and the specific role, and any relevant certifications or portfolios. Make sure your contact information is current.",
  },
  {
    question: "Can I apply for multiple positions?",
    answer:
      "Yes, you can apply for multiple positions if you meet the qualifications. Please submit separate applications for each position you're interested in.",
  },
  {
    question: "Do you offer internships or graduate programs?",
    answer:
      "Yes, we offer both internships and graduate programs throughout the year. These opportunities are posted on our careers page when available.",
  },
  {
    question: "What benefits does Mawwany offer?",
    answer:
      "We offer competitive benefits including health insurance, retirement plans, professional development opportunities, paid time off, and performance bonuses. Specific benefits vary by position and location.",
  },
  {
    question: "How can I check the status of my application?",
    answer:
      "You will receive email updates about your application status. If you haven't heard from us within two weeks of applying, feel free to contact our HR team.",
  },
]

export default function ApplicationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gold-mesh p-8 rounded-frame shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-mawwany-gold">Application Process FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-mawwany-gold/20 last:border-b-0">
              <button
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-mawwany-gold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-mawwany-gold flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-mawwany-gold flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
