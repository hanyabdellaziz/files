"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface Translations {
  [key: string]: {
    en: string
    ar: string
  }
}

const translations: Translations = {
  // Header
  services: { en: "Services", ar: "الخدمات" },
  about: { en: "About Us", ar: "عن الشركة" },
  aboutMawwany: { en: "About MAWWANY", ar: "عن موانئ" },
  ourBrand: { en: "Our Brand", ar: "علامتنا التجارية" },
  ourLeadership: { en: "Our Leadership", ar: "قيادتنا" },
  newsInsights: { en: "News & Insights", ar: "الأخبار والرؤى" },
  contact: { en: "Contact", ar: "اتصل بنا" },
  tracking: { en: "Tracking", ar: "تتبع" },
  myM: { en: "myM", ar: "حسابي" },

  // Footer
  quickLinks: { en: "Quick Links", ar: "روابط سريعة" },
  legalInfo: { en: "Legal", ar: "معلومات قانونية" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  termsAndConditions: { en: "Terms and Conditions", ar: "الشروط والأحكام" },
  allRightsReserved: { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },

  // Home Page
  globalShippingSolutions: { en: "Global Shipping Solutions", ar: "حلول الشحن العالمية" },
  reliableLogistics: {
    en: "Reliable logistics solutions for businesses worldwide. Fast, secure, and efficient shipping services tailored to your needs.",
    ar: "حلول لوجستية موثوقة للشركات في جميع أنحاء العالم. خدمات شحن سريعة وآمنة وفعالة مصممة لتلبية احتياجاتك.",
  },
  getQuote: { en: "Get a Quote", ar: "احصل على عرض سعر" },
  trackShipment: { en: "Track Shipment", ar: "تتبع الشحنة" },
  comingSoon: { en: "(Coming Soon)", ar: "(قريباً)" },
  ourServices: { en: "Our Services", ar: "خدماتنا" },

  // Services
  nvocc: { en: "NVOCC and Liner Agency", ar: "وكالة NVOCC والخطوط الملاحية" },
  freightForwarding: { en: "Freight Forwarding", ar: "الشحن والتخليص" },
  warehousing: { en: "Warehousing and Transportation", ar: "التخزين والنقل" },
  shipChartering: { en: "Ship Chartering Services", ar: "خدمات استئجار السفن" },

  // About Page
  connectingPorts: { en: "Connecting Ports", ar: "ربط الموانئ" },
  trustedProvider: {
    en: "Your Trusted Multi-Regional NVOCC and Liner Service Provider",
    ar: "مزود خدمات NVOCC والخطوط الملاحية الموثوق به متعدد المناطق",
  },
  ourVision: { en: "Our Vision", ar: "رؤيتنا" },
  ourMission: { en: "Our Mission", ar: "مهمتنا" },
  coreValues: { en: "Core Values", ar: "قيمنا الأساسية" },

  // Contact Page
  getInTouch: { en: "Get in Touch with Our Shipping Experts", ar: "تواصل مع خبراء الشحن لدينا" },
  companyDetails: { en: "Company Details", ar: "تفاصيل الشركة" },
  location: { en: "Location", ar: "الموقع" },

  // FAQ Page
  faqTitle: { en: "FAQ", ar: "الأسئلة الشائعة" },
  commonQuestions: { en: "Answers to Your Most Common Questions", ar: "إجابات على أكثر أسئلتك شيوعًا" },

  // Career Page
  careerAtMawwany: { en: "Career at MAWWANY", ar: "الوظائف في موانئ" },
  joinOurTeam: { en: "Join Our Team", ar: "انضم إلى فريقنا" },
  ourVacancies: { en: "Our Vacancies", ar: "الوظائف الشاغرة" },
  valuesCulture: { en: "Values/Culture", ar: "القيم/الثقافة" },
  whyJoinMawwany: { en: "Why Join MAWWANY?", ar: "لماذا تنضم إلى موانئ؟" },
  applicationFAQ: { en: "Application Process - FAQ", ar: "عملية التقديم - الأسئلة الشائعة" },

  // Add more translations as needed
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
