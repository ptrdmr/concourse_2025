'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// next-themes injects a blocking script that sets the correct class on <html>
// before first paint, and the root layout sets `suppressHydrationWarning`, so
// there's no need to hide the whole app behind a "mounted" gate here — doing
// so was hiding all content (and hurting FCP/LCP) until client JS hydrated.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
