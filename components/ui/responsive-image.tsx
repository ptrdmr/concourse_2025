"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

type ResponsiveImageProps = {
  src: string
  alt: string
  mobileSrc?: string
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

export function ResponsiveImage({
  src,
  alt,
  mobileSrc,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fill = false,
  width,
  height
}: ResponsiveImageProps) {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [imgSrc, setImgSrc] = useState(src)
  
  // Update image source based on screen size
  useEffect(() => {
    if (isMobile && mobileSrc) {
      setImgSrc(mobileSrc)
    } else {
      setImgSrc(src)
    }
  }, [isMobile, mobileSrc, src])

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
    />
  )
} 