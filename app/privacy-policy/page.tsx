"use client"
import { motion } from "framer-motion"

const PrivacyPolicy = () => {
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
          Privacy <span className="mawwany-text">Policy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl text-center mb-12 max-w-2xl mx-auto text-gray-200"
        >
          Your Privacy is Our Priority
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
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">1. Introduction</h2>
              <p>
                At Mawwany Shipping Company, we take your privacy seriously. This Privacy Policy outlines how we
                collect, use, and protect your personal data when you interact with our website. We are committed to
                safeguarding your information and ensuring compliance with applicable data protection laws, including
                the Personal Data Protection Law (PDP Law). Mawwany Shipping Company acts as the Data Controller for the
                purposes of this Privacy Policy.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">2. Data Collection and Use</h2>
              <p>
                We collect personal data that you voluntarily provide when using our services, such as registering an
                account, making inquiries, or completing transactions. The types of personal data we collect include but
                are not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Identity Data: Name, surname, and title.</li>
                <li>Contact Data: Email address, phone number, mailing address.</li>
                <li>Financial Data: Bank account or credit card details for processing payments.</li>
                <li>Technical Data: IP address, browser type, operating system, time zone settings.</li>
                <li>Usage Data: Information about how you interact with our website and services.</li>
                <li>
                  Marketing and Communications Data: Preferences regarding receiving updates and promotional materials.
                </li>
              </ul>
              <p className="mt-2">
                We use your personal data to provide services, process transactions, respond to inquiries, improve
                website functionality, and comply with legal obligations. Your data will not be shared with third
                parties unless necessary for contract fulfillment, legal compliance, or with your explicit consent.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">3. Data Security</h2>
              <p>
                We implement robust technical and organizational measures to protect your personal data against
                unauthorized access, loss, or misuse. Our employees are trained in data protection, and all payment
                transactions are encrypted using SSL technology. While we strive to maintain high security standards, no
                system is entirely immune to cyber threats, and users should take necessary precautions when sharing
                data online.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">4. Data Retention</h2>
              <p>
                Personal data will be retained only for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy. Once the retention period expires, your data will be securely deleted unless longer
                retention is required by legal obligations or contractual necessity.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">5. Cookies and Tracking Technologies</h2>
              <p>
                Cookies are small data files stored on your device to enhance website functionality and user experience.
                Mawwany Shipping Company uses both first-party and third-party cookies for:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Essential website functions.</li>
                <li>Analyzing user behavior to improve our services.</li>
                <li>Providing personalized content and targeted advertisements.</li>
              </ul>
              <p className="mt-2">
                You have the option to accept or decline cookies. Most browsers allow you to manage cookie preferences
                through settings. Disabling cookies may impact website functionality.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">6. User Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Request access to your personal data.</li>
                <li>Request correction or deletion of your data.</li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>Object to the processing of your data for marketing purposes.</li>
              </ul>
              <p className="mt-2">
                To exercise your rights or inquire about data protection practices, please contact us through our
                official communication channels.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">7. Jurisdiction and Governing Law</h2>
              <p>
                This Privacy Policy is governed by the laws of Egypt. Any disputes related to data protection and
                privacy shall be subject to the jurisdiction of Egyptian courts.
              </p>
            </motion.section>

            <motion.section {...fadeInUp}>
              <h2 className="text-2xl font-semibold mb-2 text-mawwany-gold">8. Contact Information</h2>
              <p>For questions regarding this Privacy Policy, please contact us at: www.Mawwany.com</p>
            </motion.section>

            <motion.p {...fadeInUp} className="mt-8 font-semibold">
              By using this website, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
