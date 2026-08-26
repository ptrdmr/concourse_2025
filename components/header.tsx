"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { LANE_BOOKING_URL } from "@/lib/booking"
import { TodayHours } from "@/components/today-hours"

/** Flat top-level nav — logo links home; no dropdowns */
const navLinks = [
  { name: "Reservations", href: "/reservations" },
  { name: "Bowling", href: "/bowling" },
  { name: "Leagues", href: "/league-bowling" },
  { name: "Bar & Cafe", href: "/menu" },
  { name: "Arcade", href: "/arcade" },
  { name: "Events", href: "/events" },
  { name: "Our History", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const mobileNavigation = [{ name: "Home", href: "/" }, ...navLinks]

const getDirections = () => {
  const address = "3364 E La Palma Ave, Anaheim, CA 92806"
  const encodedAddress = encodeURIComponent(address)

  const userAgent = navigator.userAgent.toLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(userAgent)
  const isAndroid = /android/.test(userAgent)
  const isMobile = isIOS || isAndroid

  let mapUrl = ""

  if (isIOS) {
    mapUrl = `maps://maps.apple.com/?q=${encodedAddress}`
    const testLink = document.createElement("a")
    testLink.href = mapUrl
    testLink.click()
    setTimeout(() => {
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank")
    }, 500)
    return
  } else if (isAndroid) {
    mapUrl = `https://maps.google.com/maps?q=${encodedAddress}`
  } else {
    mapUrl = `https://www.google.com/maps/dir//${encodedAddress}`
  }

  if (isMobile) {
    window.location.href = mapUrl
  } else {
    window.open(mapUrl, "_blank")
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  // Resets on every fresh page load; only clears once the menu is opened during this page view.
  const [showMenuIntro, setShowMenuIntro] = useState(true)

  const handleMenuOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open && showMenuIntro) {
      setShowMenuIntro(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b border-border/40">
        <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 pr-2 md:flex md:pr-4">
            <Link
              href="/"
              className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <span aria-hidden className="text-muted-foreground/40">
              ·
            </span>
            <TodayHours className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80" />
          </div>

          <Link href="/" className="flex shrink-0 items-center md:hidden">
            <Image src="/branding/logo.png" alt="Concourse Bowling Logo" width={180} height={75} className="h-auto w-[150px]" />
          </Link>

          <Link href="/" className="hidden shrink-0 items-center md:flex">
            <Image src="/branding/logo.png" alt="Concourse Bowling Logo" width={240} height={100} className="h-auto" />
          </Link>

          <div className="flex items-center gap-2 flex-1 justify-end sm:gap-3">
            <Button
              onClick={getDirections}
              className="hidden sm:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg font-medium items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </Button>
            <Button
              asChild
              variant="outline"
              className="hidden rounded-xl px-5 py-5 text-base font-bold tracking-wide lg:flex"
            >
              <Link href="/reservations?track=parties">Plan a Party</Link>
            </Button>
            <Button
              asChild
              className="group overflow-hidden rounded-xl px-3 py-2 shadow-md text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 sm:px-6 sm:py-5 sm:text-base"
            >
              <a
                href={LANE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center"
              >
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary to-primary-600 opacity-100 transition-opacity duration-300" />
                <span className="z-10 font-bold tracking-wide">
                  Reserve<span className="hidden sm:inline">&nbsp;Now</span>
                </span>
              </a>
            </Button>

            <Button onClick={getDirections} variant="outline" size="icon" className="touch-button md:hidden">
              <MapPin className="h-5 w-5" />
              <span className="sr-only">Get Directions</span>
            </Button>

            <div className="relative md:hidden">
              <Sheet open={isOpen} onOpenChange={handleMenuOpenChange}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn("touch-button", showMenuIntro && "motion-safe:animate-menu-pulse")}
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-[320px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-6 py-6">
                    <div className="flex items-center justify-between gap-3">
                      <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                        <Image src="/branding/logo.png" alt="Concourse Bowling Logo" width={100} height={40} className="h-auto" />
                      </Link>
                      <TodayHours className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground" />
                    </div>
                    <div className="grid gap-3">
                      {mobileNavigation.map((item) => (
                        <Link
                          key={`${item.name}-${item.href}`}
                          href={item.href}
                          className="group flex items-center rounded-lg p-3 text-base font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-600 touch-button"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative">
                            {item.name}
                            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Button asChild className="relative mt-2 overflow-hidden rounded-xl py-6 shadow-md text-lg touch-button">
                      <a
                        href={LANE_BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="relative z-10 flex items-center justify-center"
                      >
                        <span className="z-10 font-bold">Reserve a Lane</span>
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="relative mt-2 overflow-hidden rounded-xl py-6 shadow-md text-lg touch-button">
                      <Link href="/reservations?track=parties" onClick={() => setIsOpen(false)} className="relative z-10 flex items-center justify-center">
                        <span className="z-10 font-bold">Plan a Party</span>
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpen(false)
                        getDirections()
                      }}
                      variant="secondary"
                      className="relative mt-2 overflow-hidden rounded-xl py-6 shadow-md text-lg touch-button flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="font-bold">Get Directions</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              {showMenuIntro && (
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-red-600 motion-safe:animate-info-glow">
                  Info
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-b border-border/30 bg-muted/30">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <nav
            className="flex min-h-14 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 lg:gap-x-6 xl:gap-x-8"
            aria-label="Main"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative whitespace-nowrap px-1 py-2 text-xs font-medium transition-colors duration-200 hover:text-red-600 lg:text-sm"
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
