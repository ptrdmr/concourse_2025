"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
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
    if (typeof window !== 'undefined') {
      // Initial state - invisible
      gsap.set(headerRef.current, { 
        autoAlpha: 0, 
        y: -30,
        scale: 0.8
      })
      
      // Animation with elastic bounce
      gsap.to(headerRef.current, {
        duration: 0.8,
        autoAlpha: 1, // fade in
        y: 0, // move to final position
        scale: 1, // normal size
        ease: "elastic.out(1.2, 0.5)", // elastic bounce
        delay: delay, // optional delay
      })
    }
  }, [delay])

  return (
    <Component ref={headerRef} className={cn(className)}>
      {text}
    </Component>
  )
} 