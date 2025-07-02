"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=120&width=320&text=MAWWANY",
  ...rest
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  return (
    <Image
      {...rest}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        setHasError(true)
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
