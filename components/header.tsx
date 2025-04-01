"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  Menu, 
  Trophy,
  Utensils,
  Info
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
      { name: "Bowling", href: "/bowling" },
      { name: "League Bowling", href: "/league-bowling" },
      { name: "Arcade", href: "/arcade" },
    ],
    icon: Trophy
  },
  {
    name: "Visit",
    items: [
      { name: "Menu", href: "/menu" },
      { name: "Events", href: "/events" },
      { name: "Reservations", href: "/reservations" },
    ],
    icon: Utensils
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
  { name: "Bowling", href: "/bowling" },
  { name: "League Bowling", href: "/league-bowling" },
  { name: "Arcade", href: "/arcade" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  { name: "Reservations", href: "/reservations" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "https://www2.appone.com/Search/Search.aspx?ServerVar=concoursebowl.appone.com" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/branding/logo.png" alt="Concourse Bowling Logo" width={240} height={100} className="h-auto" />
        </Link>

        <nav className="hidden md:flex md:gap-5 lg:gap-6">
          {navigation.map((item) => (
            item.items ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="group flex items-center text-base font-medium transition-all duration-200 hover:text-primary hover:scale-105">
                  <span className="relative">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <div className="relative ml-2 flex h-7 w-7 items-center justify-center">
                    <Image 
                      src="/branding/ball_thumbnail.jpg" 
                      alt="" 
                      width={24} 
                      height={24} 
                      className="rounded-full object-cover transition-all duration-300 group-hover:scale-110" 
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 rounded-xl border-primary bg-background p-3 shadow-md">
                  <DropdownMenuLabel className="text-lg font-bold text-primary">{item.name}</DropdownMenuLabel>
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild className="rounded-lg p-2.5 focus:bg-primary/10 focus:text-primary">
                      <Link href={subItem.href} className="w-full text-base transition-all duration-200 hover:translate-x-1">
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
                className="group relative text-base font-medium transition-all duration-200 hover:text-primary hover:scale-105"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="group hidden overflow-hidden rounded-xl px-6 py-5 shadow-md text-base transition-all duration-300 hover:shadow-lg hover:scale-105 sm:flex">
            <Link href="/reservations" className="relative z-10 flex items-center justify-center">
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary to-primary-600 opacity-100 transition-opacity duration-300"></span>
              <span className="z-10 font-bold tracking-wide">Reserve Now</span>
            </Link>
          </Button>

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
                      className="group flex items-center rounded-lg p-3 text-base font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary touch-button"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  ))}
                </div>
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
    </header>
  )
}

