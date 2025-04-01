"use client"

import * as React from "react"

// Tailwind CSS breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export type Breakpoint = keyof typeof breakpoints

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    const updateMatches = () => setMatches(media.matches)
    
    // Set initial value
    updateMatches()
    
    // Listen for changes
    media.addEventListener("change", updateMatches)
    
    // Cleanup
    return () => {
      media.removeEventListener("change", updateMatches)
    }
  }, [query])

  return matches
}

export function useBreakpoint(breakpoint: Breakpoint, direction: 'min' | 'max' = 'min'): boolean {
  const query = direction === 'min' 
    ? `(min-width: ${breakpoints[breakpoint]}px)`
    : `(max-width: ${breakpoints[breakpoint] - 1}px)`
  
  return useMediaQuery(query)
}

// Backward compatibility
export function useIsMobile(): boolean {
  return useBreakpoint('md', 'max')
}
