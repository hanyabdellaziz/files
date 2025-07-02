"use client"

import { motion } from "framer-motion"

const TermsAndConditions = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
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
          Terms and <span className="mawwany-text">Conditions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl text-center mb-12 max-w-2xl mx-auto text-gray-200"
        >
          Understanding Our Service Agreement
        </motion.p>
        <div className="max-w-4xl mx-auto bg-gold-mesh p-8 rounded-frame shadow-lg">
          <motion.div
            className="space-y-6 text-gray-300"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you acknowledge and agree to be bound by the following Terms and
                Conditions. Mawwany Shipping Company reserves the right to update, modify, or amend these terms at any
                time without prior notice. Your continued use of this website constitutes acceptance of any such
                changes. We encourage you to periodically review these Terms and Conditions for updates.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">2. Intellectual Property Rights</h2>
              <p>
                Unless explicitly stated otherwise, all content on this website, including but not limited to text,
                images, graphics, logos, and articles, is the property of Mawwany Shipping Company and is protected by
                applicable copyright and intellectual property laws. No part of this website may be reproduced,
                distributed, or used in any form without prior written consent from Mawwany Shipping Company, except in
                cases where permitted by law or explicitly indicated (such as press releases).
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">3. Website Content and Accuracy</h2>
              <p>
                Mawwany Shipping Company endeavors to ensure that all information presented on this website is accurate
                and up to date. However, we make no representations or warranties, either express or implied, regarding
                the completeness, accuracy, or reliability of the information provided. Any reliance you place on such
                information is strictly at your own risk.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">4. Limitation of Liability</h2>
              <p>
                Mawwany Shipping Company, its affiliates, partners, agents, and employees shall not be held liable for
                any direct, indirect, incidental, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The use or inability to use this website;</li>
                <li>Any errors or omissions in the information provided;</li>
                <li>Unauthorized access to or alteration of your data;</li>
                <li>Any damages to your device resulting from viruses, malware, or security breaches.</li>
              </ul>
              <p className="mt-2">
                Under no circumstances shall Mawwany Shipping Company be responsible for any loss of profits, data, or
                business resulting from the use of this website.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">5. Information Submission and Privacy</h2>
              <p>
                By submitting any data, comments, or suggestions through this website, you acknowledge and agree that
                such submissions become the property of Mawwany Shipping Company and may be used for business purposes
                without restriction. These contributions will not be considered confidential. For details on how we
                collect, process, and protect your personal data, please refer to our Privacy Notice.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">6. Unauthorized Access and Security</h2>
              <p>
                Password-protected sections of this website are restricted to authorized users only. Any unauthorized
                attempt to access these areas may result in legal action. Mawwany Shipping Company shall not be liable
                for any unauthorized access to, or misuse of, data submitted via this website.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">7. Jurisdiction and Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and interpreted in accordance with the laws of Egypt. Any
                disputes arising from or relating to the use of this website shall be subject to the exclusive
                jurisdiction of the Egyptian courts.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">8. Contact Information</h2>
              <p>
                For any inquiries regarding these Terms and Conditions, please contact us via our official communication
                channels.
              </p>
            </motion.section>

            <motion.p {...fadeInUp} className="mt-8 font-semibold">
              By using this website, you confirm that you have read, understood, and agreed to these Terms and
              Conditions.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions
