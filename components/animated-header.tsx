"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedHeaderProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  delay?: number
}

export function AnimatedHeader({
  text,
  className,
  as: Component = "h1",
  delay = 0
}: AnimatedHeaderProps) {
  const headerRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    // Loaded on demand instead of bundled statically, since this component
    // renders on nearly every page via PageHeader.
    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return

      gsap.set(headerRef.current, {
        autoAlpha: 0,
        y: -30,
        scale: 0.8,
      })

      gsap.to(headerRef.current, {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: "elastic.out(1.2, 0.5)",
        delay,
      })
    })

    return () => {
      cancelled = true
    }
  }, [delay])

  return (
    <Component ref={headerRef} className={cn(className)}>
      {text}
    </Component>
  )
} 