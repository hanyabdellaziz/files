"use client"

import { useState } from "react"
import QRCodeScanner from "../components/QRCodeScanner"
import AnimatedButton from "../components/AnimatedButton"
import { QrCode } from "lucide-react"

export default function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<string | null>(null)

  const handleScan = (data: string) => {
    setScannedData(data)
    setIsScanning(false)
  }

  const handleStartScan = () => {
    setIsScanning(true)
    setScannedData(null)
  }

  return (
    <div className="min-h-screen bg-mesh-gradient py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-mawwany-gold">
          QR Code <span className="mawwany-text">Scanner</span>
        </h1>
        <div className="max-w-md mx-auto bg-gold-mesh p-6 rounded-frame shadow-lg">
          <p className="text-gray-300 mb-4">Click the button below to scan a QR code using your device's camera.</p>
          <div className="flex justify-center mb-4">
            <AnimatedButton
              onClick={handleStartScan}
              className="bg-mawwany-gold hover:bg-mawwany-gold/80 text-black font-bold py-2 px-4 rounded-full inline-flex items-center"
            >
              <QrCode className="mr-2" />
              Scan QR Code
            </AnimatedButton>
          </div>
          {scannedData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-mawwany-gold">Scanned Data:</h2>
              <p className="text-gray-300 break-all">{scannedData}</p>
            </div>
          )}
        </div>
      </div>
      {isScanning && <QRCodeScanner onScan={handleScan} onClose={() => setIsScanning(false)} />}
    </div>
  )
}
