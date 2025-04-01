import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Concourse Bowling</h3>
            <p className="text-sm">
              Providing bowling since 1990 to Anaheim, Fullerton, Yorba Linda, Orange, Brea, and many more areas.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/bowling" className="hover:underline">
                  Bowling Rates
                </Link>
              </li>
              <li>
                <Link href="/league-bowling" className="hover:underline">
                  League Bowling
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:underline">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:underline">
                  Menus
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:underline">
                  Events Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>3364 E La Palmera Ave, Anaheim, CA 92806</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(714) 666-2695</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@concoursebowling.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Monday - Thursday: 9AM - 11PM</li>
              <li>Friday: 9AM - 1AM</li>
              <li>Saturday: 9AM - 1AM</li>
              <li>Sunday: 9AM - 11PM</li>
            </ul>
            <div className="flex gap-4 pt-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Concourse Bowling Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

