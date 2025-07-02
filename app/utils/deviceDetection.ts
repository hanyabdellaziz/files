// Utility functions to detect browser, OS, and device capabilities

export type BrowserType = "chrome" | "firefox" | "safari" | "edge" | "ie" | "opera" | "samsung" | "unknown"
export type OSType = "windows" | "macos" | "ios" | "android" | "linux" | "unknown"
export type DeviceType = "mobile" | "tablet" | "desktop"

export interface DeviceInfo {
  browser: BrowserType
  os: OSType
  deviceType: DeviceType
  isTouchDevice: boolean
  isWebView: boolean
  prefersReducedMotion: boolean
}

export function detectDevice(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      browser: "unknown",
      os: "unknown",
      deviceType: "desktop",
      isTouchDevice: false,
      isWebView: false,
      prefersReducedMotion: false,
    }
  }

  const ua = navigator.userAgent

  // Browser detection
  let browser: BrowserType = "unknown"
  if (/chrome|chromium/i.test(ua) && !/edg/i.test(ua)) browser = "chrome"
  else if (/firefox|fxios/i.test(ua)) browser = "firefox"
  else if (/safari/i.test(ua) && !/chrome|chromium/i.test(ua)) browser = "safari"
  else if (/edg/i.test(ua)) browser = "edge"
  else if (/msie|trident/i.test(ua)) browser = "ie"
  else if (/opera|opr/i.test(ua)) browser = "opera"
  else if (/samsungbrowser/i.test(ua)) browser = "samsung"

  // OS detection
  let os: OSType = "unknown"
  if (/windows/i.test(ua)) os = "windows"
  else if (/macintosh|mac os x/i.test(ua) && !/iphone|ipad/i.test(ua)) os = "macos"
  else if (/iphone|ipad|ipod/i.test(ua)) os = "ios"
  else if (/android/i.test(ua)) os = "android"
  else if (/linux/i.test(ua)) os = "linux"

  // Device type detection
  let deviceType: DeviceType = "desktop"
  if (/mobile/i.test(ua)) deviceType = "mobile"
  else if (/tablet|ipad/i.test(ua)) deviceType = "tablet"

  // Touch device detection
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  // WebView detection
  const isWebView =
    /wv|webview/i.test(ua) ||
    (/android/i.test(ua) && /wv/i.test(ua)) ||
    (/iphone|ipad|ipod/i.test(ua) && !/safari/i.test(ua))

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return {
    browser,
    os,
    deviceType,
    isTouchDevice,
    isWebView,
    prefersReducedMotion,
  }
}

// Helper function to add OS/browser specific classes to the document
export function applyDeviceClasses(): void {
  if (typeof document === "undefined") return

  const deviceInfo = detectDevice()

  document.documentElement.classList.add(`os-${deviceInfo.os}`)
  document.documentElement.classList.add(`browser-${deviceInfo.browser}`)
  document.documentElement.classList.add(`device-${deviceInfo.deviceType}`)

  if (deviceInfo.isTouchDevice) {
    document.documentElement.classList.add("touch-device")
  }

  if (deviceInfo.isWebView) {
    document.documentElement.classList.add("web-view")
  }

  if (deviceInfo.prefersReducedMotion) {
    document.documentElement.classList.add("prefers-reduced-motion")
  }
}
