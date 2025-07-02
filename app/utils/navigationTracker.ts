// Navigation tracking utility
export type NavigationEvent = {
  pathname: string
  timestamp: number
  viewportWidth: number
  viewportHeight: number
  isFullscreen: boolean
  isMobile: boolean
  source: "user" | "system" | "resize" | "restore"
}

export type ViewMode = "desktop" | "mobile" | "fullscreen" | "minimized"

class NavigationTracker {
  private static instance: NavigationTracker
  private navigationHistory: NavigationEvent[] = []
  private currentPath = "/"
  private isDebugMode = false

  private constructor() {
    // Initialize from sessionStorage if available
    try {
      const savedHistory = sessionStorage.getItem("navigationHistory")
      if (savedHistory) {
        this.navigationHistory = JSON.parse(savedHistory)
        const lastEvent = this.navigationHistory[this.navigationHistory.length - 1]
        if (lastEvent) {
          this.currentPath = lastEvent.pathname
        }
      }

      // Check for debug mode
      this.isDebugMode = localStorage.getItem("navDebug") === "true"
    } catch (e) {
      console.error("Failed to initialize navigation tracker:", e)
    }
  }

  public static getInstance(): NavigationTracker {
    if (!NavigationTracker.instance) {
      NavigationTracker.instance = new NavigationTracker()
    }
    return NavigationTracker.instance
  }

  public trackNavigation(event: Omit<NavigationEvent, "timestamp">): void {
    const navigationEvent: NavigationEvent = {
      ...event,
      timestamp: Date.now(),
    }

    this.navigationHistory.push(navigationEvent)
    this.currentPath = navigationEvent.pathname

    // Keep history at a reasonable size
    if (this.navigationHistory.length > 50) {
      this.navigationHistory = this.navigationHistory.slice(-50)
    }

    // Save to sessionStorage
    try {
      sessionStorage.setItem("navigationHistory", JSON.stringify(this.navigationHistory))
      sessionStorage.setItem("lastActivePath", navigationEvent.pathname)
    } catch (e) {
      console.error("Failed to save navigation history:", e)
    }

    // Log in debug mode
    if (this.isDebugMode) {
      console.log(`[NavTracker] ${navigationEvent.source} navigation to ${navigationEvent.pathname}`, navigationEvent)
    }
  }

  public getCurrentPath(): string {
    return this.currentPath
  }

  public getLastPathBeforeResize(): string | null {
    // Find the last user-initiated navigation before any resize events
    const userEvents = this.navigationHistory
      .filter((event) => event.source === "user")
      .sort((a, b) => b.timestamp - a.timestamp)

    return userEvents.length > 0 ? userEvents[0].pathname : null
  }

  public getLastEventForViewport(width: number, height: number): NavigationEvent | null {
    // Find events that match the current viewport dimensions
    const matchingEvents = this.navigationHistory
      .filter((event) => Math.abs(event.viewportWidth - width) < 50 && Math.abs(event.viewportHeight - height) < 50)
      .sort((a, b) => b.timestamp - a.timestamp)

    return matchingEvents.length > 0 ? matchingEvents[0] : null
  }

  public enableDebugMode(enable: boolean): void {
    this.isDebugMode = enable
    try {
      if (enable) {
        localStorage.setItem("navDebug", "true")
      } else {
        localStorage.removeItem("navDebug")
      }
    } catch (e) {
      console.error("Failed to set debug mode:", e)
    }
  }

  public clearHistory(): void {
    this.navigationHistory = []
    try {
      sessionStorage.removeItem("navigationHistory")
    } catch (e) {
      console.error("Failed to clear navigation history:", e)
    }
  }
}

export const navigationTracker = NavigationTracker.getInstance()
