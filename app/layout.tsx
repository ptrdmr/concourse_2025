import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Concourse Bowling Center | Anaheim, CA",
  description: "Providing bowling since 1990 to Anaheim, Fullerton, Yorba Linda, Orange, Brea, and many more areas.",
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}