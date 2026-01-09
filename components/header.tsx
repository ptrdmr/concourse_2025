"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  Menu, 
  Trophy,
  Info,
  MapPin,
  CalendarIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

// Updated navigation structure with dropdown groups
const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Play",
    items: [
      { name: "Walk-in Rates", href: "/bowling" },
      { name: "League Bowling", href: "/league-bowling" },
      { name: "Arcade", href: "/arcade" },
    ],
    icon: Trophy
  },
  {
    name: "Plan Ahead",
    items: [
      { name: "Reservations & Parties", href: "/reservations" },
      { name: "Events & Specials", href: "/events" },
      { name: "Menu", href: "/menu" },
    ],
    icon: CalendarIcon
  },
  {
    name: "About",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "https://www2.appone.com/Search/Search.aspx?ServerVar=concoursebowl.appone.com" },
    ],
    icon: Info
  },
]

// Flattened navigation for mobile view
const mobileNavigation = [
  { name: "Home", href: "/" },
  { name: "Walk-in Rates", href: "/bowling" },
  { name: "League Bowling", href: "/league-bowling" },
  { name: "Arcade", href: "/arcade" },
  { name: "Reservations & Parties", href: "/reservations" },
  { name: "Events & Specials", href: "/events" },
  { name: "Menu", href: "/menu" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "https://www2.appone.com/Search/Search.aspx?ServerVar=concoursebowl.appone.com" },
]

// Smart navigation function
const getDirections = () => {
  const address = "3364 E La Palmera Ave, Anaheim, CA 92806"
  const encodedAddress = encodeURIComponent(address)
  
  // Detect user's device/platform
  const userAgent = navigator.userAgent.toLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(userAgent)
  const isAndroid = /android/.test(userAgent)
  const isMobile = isIOS || isAndroid
  
  let mapUrl = ""
  
  if (isIOS) {
    // Try Apple Maps first, fallback to Google Maps
    mapUrl = `maps://maps.apple.com/?q=${encodedAddress}`
    // Test if Apple Maps is available
    const testLink = document.createElement('a')
    testLink.href = mapUrl
    testLink.click()
    
    // Fallback to Google Maps if Apple Maps doesn't open
    setTimeout(() => {
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')
    }, 500)
    return
  } else if (isAndroid) {
    // Use Google Maps intent for Android
    mapUrl = `https://maps.google.com/maps?q=${encodedAddress}`
  } else {
    // Desktop - use Google Maps with directions
    mapUrl = `https://www.google.com/maps/dir//${encodedAddress}`
  }
  
  // Open the map
  if (isMobile) {
    window.location.href = mapUrl
  } else {
    window.open(mapUrl, '_blank')
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top row - Logo, Center Branding, Action Buttons */}
      <div className="border-b border-border/40">
        <div className="container flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Left - Empty space for balance on desktop, Logo on mobile */}
          <div className="hidden md:flex flex-1"></div>
          
          {/* Mobile Logo (left aligned) */}
          <Link href="/" className="flex items-center md:hidden">
            <Image src="/branding/logo.png" alt="Concourse Bowling Logo" width={180} height={75} className="h-auto" />
          </Link>

          {/* Center - Logo (desktop only) */}
          <Link href="/" className="hidden md:flex items-center">
            <Image src="/branding/logo.png" alt="Concourse Bowling Logo" width={240} height={100} className="h-auto" />
          </Link>

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Desktop buttons */}
            <Button 
              onClick={getDirections}
              className="hidden sm:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg font-medium items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </Button>
            <Button asChild className="group hidden overflow-hidden rounded-xl px-6 py-5 shadow-md text-base transition-all duration-300 hover:shadow-lg hover:scale-105 sm:flex">
              <Link href="/reservations" className="relative z-10 flex items-center justify-center">
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary to-primary-600 opacity-100 transition-opacity duration-300"></span>
                <span className="z-10 font-bold tracking-wide">Reserve Now</span>
              </Link>
            </Button>

            {/* Mobile directions icon */}
            <Button
              onClick={getDirections}
              variant="outline"
              size="icon"
              className="touch-button md:hidden"
            >
              <MapPin className="h-5 w-5" />
              <span className="sr-only">Get Directions</span>
            </Button>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="touch-button md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[320px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src="/branding/logo.png"
                      alt="Concourse Bowling Logo"
                      width={100}
                      height={40}
                      className="h-auto"
                    />
                  </Link>
                  <div className="grid gap-3">
                    {mobileNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center rounded-lg p-3 text-base font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-600 touch-button"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Button 
                    onClick={() => {
                      setIsOpen(false)
                      getDirections()
                    }}
                    className="relative mt-2 overflow-hidden rounded-xl py-6 shadow-md text-lg touch-button flex items-center justify-center gap-2"
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="font-bold">Get Directions</span>
                  </Button>
                  <Button asChild className="relative mt-2 overflow-hidden rounded-xl py-6 shadow-md text-lg touch-button">
                    <Link 
                      href="/reservations" 
                      onClick={() => setIsOpen(false)}
                      className="relative z-10 flex items-center justify-center"
                    >
                      <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      <span className="z-10 font-bold">Reserve Now</span>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Bottom row - Navigation */}
      <div className="hidden md:block">
        <div className="container px-4 md:px-6 lg:px-8">
          <nav className="flex h-14 items-center justify-center gap-6 lg:gap-8">
            {navigation.map((item) => (
              item.items ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="group flex items-center text-sm font-medium transition-all duration-200 hover:text-red-600 hover:scale-105">
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <div className="relative ml-2 flex h-6 w-6 items-center justify-center">
                      <div className="relative w-5 h-5 overflow-hidden rounded-full">
                        <Image 
                          src="/branding/ball_thumbnail.jpg" 
                          alt="" 
                          width={20} 
                          height={20} 
                          className="w-full h-full rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-180" 
                        />
                        <div className="absolute -inset-0.5 rounded-full transition-all duration-300 bg-red-600 mix-blend-multiply translate-y-full group-hover:translate-y-0 scale-110"></div>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 rounded-xl border-primary bg-background p-3 shadow-md">
                    <DropdownMenuLabel className="text-lg font-bold text-primary">{item.name}</DropdownMenuLabel>
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild className="rounded-lg p-2.5 focus:bg-red-50 focus:text-red-600 focus:font-bold">
                        <Link href={subItem.href} className="w-full text-base transition-all duration-200 hover:translate-x-1 hover:font-bold">
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="group relative text-sm font-medium transition-all duration-200 hover:text-red-600 hover:scale-105"
                >
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

