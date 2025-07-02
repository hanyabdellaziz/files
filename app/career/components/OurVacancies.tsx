"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, X } from "lucide-react"
import type React from "react"
import AnimatedButton from "../../components/AnimatedButton"

const vacancies = [
  {
    title: "Senior Sales Executive",
    description:
      "We are seeking a dynamic and results-driven Senior Sales Executive to join our team, responsible for driving business growth, building strong client relationships, and leading sales strategies in a competitive market.",
  },
  {
    title: "Sales Supervisor",
    description:
      "We are seeking a motivated and experienced Sales Supervisor to lead our dynamic sales team, drive performance, and deliver exceptional customer service while ensuring the achievement of sales targets and growth objectives.",
  },
  {
    title: "Shipping Accountant Supervisor",
    description:
      "We are seeking a detail-oriented and experienced Shipping Accountant Supervisor to manage and oversee shipping-related financial processes, ensure accurate accounting records, supervise a team, and drive efficiency in the reconciliation and reporting of shipping expenses and revenues",
  },
  {
    title: "Customer Service and Operation Supervisor",
    description:
      "We are looking for a dedicated and skilled Customer Service & Operations Supervisor to oversee daily operations, ensure exceptional service delivery, manage a high-performing team, and drive process improvements to enhance customer satisfaction and operational efficiency.",
  },
]

export default function OurVacancies() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    emailConfirmation: "",
    cv: null as File | null,
    coverLetter: null as File | null,
  })

  // Add state for file upload progress
  const [uploadProgress, setUploadProgress] = useState({
    cv: 0,
    coverLetter: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }))
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email and email confirmation match
    if (formData.email !== formData.emailConfirmation) {
      alert("Email addresses do not match!")
      return
    }

    try {
      // Create form data for file uploads
      const fileFormData = new FormData()
      const attachments = []

      // Add cv file if present
      if (formData.cv) {
        fileFormData.append("cv", formData.cv)

        // In a real-world scenario, we would upload the file to a storage service
        // first and then reference it in the email
        attachments.push({
          filename: formData.cv.name,
          // We can't include the actual file content here as it's not supported in the JSON payload
          // This is just a placeholder
          description: `CV from ${formData.fullName} (${formData.email})`,
        })
      }

      // Add cover letter if present
      if (formData.coverLetter) {
        fileFormData.append("coverLetter", formData.coverLetter)

        attachments.push({
          filename: formData.coverLetter.name,
          description: `Cover letter from ${formData.fullName} (${formData.email})`,
        })
      }

      // Send the application data
      const response = await fetch("/api/career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          job: selectedJob,
          fileReferences: attachments.map((att) => att.filename),
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Application submission failed")
      }

      // Create styled confirmation dialog
      const dialog = document.createElement("div")
      dialog.className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      dialog.innerHTML = `
      <div class="bg-mawwany-navy p-6 rounded-frame border-2 border-mawwany-gold shadow-lg max-w-md">
        <h3 class="text-2xl font-bold text-mawwany-gold mb-4">Thank You!</h3>
        <p class="text-gray-300 mb-6">Thank you for your interest in joining our team. We have received your application and will review it soon. If your profile matches our requirements, we will contact you for the next steps.</p>
        <div class="flex justify-center">
          <button class="bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-2 px-6 rounded-full transition-colors">
            Close
          </button>
        </div>
      </div>
    `

      document.body.appendChild(dialog)

      // Add event listener to close button
      const closeButton = dialog.querySelector("button")
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          document.body.removeChild(dialog)
          setIsModalOpen(false)
        })
      }

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        emailConfirmation: "",
        cv: null,
        coverLetter: null,
      })
    } catch (error) {
      console.error("Application submission error:", error)
      alert(`Application submission failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center text-mawwany-gold">
        Join Our <span className="mawwany-text">Team</span>
      </h2>
      <p className="text-lg text-center text-gray-300 mb-8 max-w-2xl mx-auto">
        Explore our current opportunities and become part of our dynamic team.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vacancies.map((vacancy, index) => (
          <motion.div
            key={vacancy.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gold-mesh p-6 rounded-frame shadow-lg flex flex-col"
          >
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-4 text-mawwany-gold">{vacancy.title}</h2>
              <p className="text-gray-300 mb-4">{vacancy.description}</p>
            </div>
            <div className="flex justify-end">
              <AnimatedButton
                onClick={() => {
                  setSelectedJob(vacancy.title)
                  setIsModalOpen(true)
                }}
                className="bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-2 px-4 rounded transition-colors"
              >
                Apply Now
              </AnimatedButton>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-mawwany-navy p-6 rounded-frame shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-mawwany-gold">Apply for {selectedJob}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-mawwany-gold hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="recipient" value="hr@mawwany.com" />
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="emailConfirmation" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Email
                </label>
                <input
                  type="email"
                  id="emailConfirmation"
                  name="emailConfirmation"
                  value={formData.emailConfirmation}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-300 mb-1">
                  CV (PDF or Word)
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleChange}
                  required
                  accept=".pdf,.doc,.docx"
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 mb-1">
                  Cover Letter (Optional)
                </label>
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full p-2 bg-black/50 rounded border border-mawwany-gold text-white"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" required className="form-checkbox text-mawwany-gold" />
                  <span className="ml-2 text-gray-300">I'm not a robot</span>
                </label>
              </div>
              <div className="flex justify-center">
                <AnimatedButton
                  type="submit"
                  className="bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-3 px-6 rounded-full inline-flex items-center"
                >
                  <Mail className="mr-2" />
                  Submit Application
                </AnimatedButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
