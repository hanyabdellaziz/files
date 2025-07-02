"use client"

import type React from "react"
import { useState, useRef } from "react"
import { QrReader } from "react-qr-reader"
import { AlertCircle, Camera, X } from "lucide-react"
import AnimatedButton from "./AnimatedButton"

interface QRCodeScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, onClose }) => {
  const [error, setError] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const qrReaderRef = useRef<any>(null)

  const handleScan = (result: string | null) => {
    if (result) {
      // Clean up any potential whitespace or encoding issues
      const cleanResult = result.trim()
      console.log("QR code scanned:", cleanResult)
      onScan(cleanResult)
      setIsCameraActive(false)
    }
  }

  const handleError = (err: Error) => {
    console.error("QR Scanner error:", err)
    if (err.name === "NotAllowedError") {
      setError("Camera access denied. Please grant camera permissions to scan QR codes.")
    } else if (err.name === "NotFoundError") {
      setError("No camera found. Please ensure your device has a camera available.")
    } else if (err.name === "NotReadableError") {
      setError("Camera is in use by another application. Please close other apps using the camera.")
    } else {
      setError("An error occurred while accessing the camera. Please make sure you have granted camera permissions.")
    }
  }

  const startScanning = () => {
    setError(null)
    setIsCameraActive(true)
  }

  const stopScanning = () => {
    setIsCameraActive(false)
    if (qrReaderRef.current) {
      qrReaderRef.current.stopCamera()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-mawwany-navy p-6 rounded-frame shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-mawwany-gold">QR Code Scanner</h2>
          <AnimatedButton onClick={onClose} className="text-mawwany-gold hover:text-white">
            <X size={24} />
          </AnimatedButton>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 p-3 rounded-md mb-4 flex items-center">
            <AlertCircle className="mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {isCameraActive ? (
          <div className="relative">
            <QrReader
              ref={qrReaderRef}
              onResult={handleScan}
              onError={handleError}
              constraints={{ facingMode: "environment" }}
              className="w-full rounded-md overflow-hidden"
              scanDelay={500}
              videoId="qr-video-element"
            />
            <AnimatedButton
              onClick={stopScanning}
              className="absolute top-2 right-2 bg-mawwany-gold text-black p-2 rounded-full"
            >
              <X size={24} />
            </AnimatedButton>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-300 mb-4">Click the button below to start scanning a QR code.</p>
            <AnimatedButton
              onClick={startScanning}
              className="bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-2 px-4 rounded-full inline-flex items-center"
            >
              <Camera className="mr-2" />
              Start Scanning
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeScanner
