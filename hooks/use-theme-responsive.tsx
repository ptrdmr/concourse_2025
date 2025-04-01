"use client"

import { useTheme } from "next-themes"
import { useBreakpoint, Breakpoint } from "./use-media-query"

export function useThemeResponsive(breakpoint: Breakpoint, direction: 'min' | 'max' = 'min') {
  const { theme, systemTheme } = useTheme()
  const matches = useBreakpoint(breakpoint, direction)
  
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  
  return {
    matches,
    isDark,
    activeTheme: currentTheme,
    isSmallScreen: direction === 'max' ? matches : !matches,
  }
} 