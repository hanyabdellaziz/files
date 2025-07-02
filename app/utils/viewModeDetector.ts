import type { ViewMode } from "./navigationTracker"

// Thresholds for mobile detection
const MOBILE_WIDTH_THRESHOLD = 768
const TABLET_WIDTH_THRESHOLD = 1024

export class ViewModeDetector {
  private static instance: ViewModeDetector
  private currentViewMode: ViewMode = "desktop"
  private previousViewMode: ViewMode | null = null
  private isFullscreen = false
  private isMinimized = false

  private constructor() {
    // Initialize with the current view mode
    this.detectViewMode()

    // Try to restore from sessionStorage
    try {
      const savedViewMode = sessionStorage.getItem("currentViewMode")
      if (savedViewMode) {
        this.currentViewMode = savedViewMode as ViewMode
      }

      const savedPreviousViewMode = sessionStorage.getItem("previousViewMode")
      if (savedPreviousViewMode) {
        this.previousViewMode = savedPreviousViewMode as ViewMode
      }
    } catch (e) {
      console.error("Failed to restore view mode from sessionStorage:", e)
    }
  }

  public static getInstance(): ViewModeDetector {
    if (!ViewModeDetector.instance) {
      ViewModeDetector.instance = new ViewModeDetector()
    }
    return ViewModeDetector.instance
  }

  public detectViewMode(): ViewMode {
    const width = window.innerWidth
    const height = window.innerHeight

    // Check for fullscreen
    this.isFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    )

    // Determine view mode based on dimensions and state
    let newViewMode: ViewMode

    if (this.isFullscreen) {
      newViewMode = "fullscreen"
    } else if (this.isMinimized) {
      newViewMode = "minimized"
    } else if (width < MOBILE_WIDTH_THRESHOLD) {
      newViewMode = "mobile"
    } else {
      newViewMode = "desktop"
    }

    // If view mode has changed, update previous view mode
    if (newViewMode !== this.currentViewMode) {
      this.previousViewMode = this.currentViewMode
      this.currentViewMode = newViewMode

      // Save to sessionStorage
      try {
        sessionStorage.setItem("currentViewMode", this.currentViewMode)
        if (this.previousViewMode) {
          sessionStorage.setItem("previousViewMode", this.previousViewMode)
        }
      } catch (e) {
        console.error("Failed to save view mode to sessionStorage:", e)
      }
    }

    return this.currentViewMode
  }

  public getCurrentViewMode(): ViewMode {
    return this.currentViewMode
  }

  public getPreviousViewMode(): ViewMode | null {
    return this.previousViewMode
  }

  public setMinimized(isMinimized: boolean): void {
    if (this.isMinimized !== isMinimized) {
      this.isMinimized = isMinimized
      this.detectViewMode() // Re-detect view mode when minimized state changes
    }
  }

  public hasViewModeChanged(): boolean {
    return !!this.previousViewMode && this.previousViewMode !== this.currentViewMode
  }
}

export const viewModeDetector = ViewModeDetector.getInstance()
