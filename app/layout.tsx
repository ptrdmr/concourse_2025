import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bebas_Neue, Barlow_Condensed } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { getOpeningHoursSpecification } from "@/lib/schedule"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
})

const SITE_URL = "https://www.concoursebowling.com"
const SITE_TITLE = "Concourse Bowling Center | Anaheim, CA"
const SITE_DESCRIPTION =
  "Providing bowling since 1990 to Anaheim, Fullerton, Yorba Linda, Orange, Brea, and many more areas."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Concourse Bowling Center",
    images: ["/images/bowling/friday_cosmic.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/bowling/friday_cosmic.jpg"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BowlingAlley",
  name: "Concourse Bowling Center",
  url: SITE_URL,
  telephone: "+1-714-666-2695",
  email: "events@concoursebowling.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3364 E La Palma Ave",
    addressLocality: "Anaheim",
    addressRegion: "CA",
    postalCode: "92806",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.8367,
    longitude: -117.8651,
  },
  openingHoursSpecification: getOpeningHoursSpecification(),
  sameAs: ["https://www.facebook.com/concoursebowl", "https://www.instagram.com/concoursebowling/"],
  priceRange: "$$",
  foundingDate: "1990",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${bebasNeue.variable} ${barlowCondensed.variable}`}
    >
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
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