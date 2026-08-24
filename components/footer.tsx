import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react"
import { getGroupedWeeklyHours } from "@/lib/schedule"
import { PHONE_DISPLAY, PHONE_TEL, EVENTS_EMAIL } from "@/lib/booking"

export default function Footer() {
  const groupedHours = getGroupedWeeklyHours()

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
                  Bowling
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
                  Bar & Cafe
                </Link>
              </li>
              <li>
                <Link href="/arcade" className="hover:underline">
                  Arcade
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:underline">
                  Events & Specials
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Our History
                </Link>
              </li>
              <li>
                <Link href="/community-partnerships" className="hover:underline">
                  Community Partnerships
                </Link>
              </li>
              <li>
                <Link
                  href="https://www2.appone.com/Search/Search.aspx?ServerVar=concoursebowl.appone.com"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>3364 E La Palma Ave, Anaheim, CA 92806</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={PHONE_TEL} className="hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${EVENTS_EMAIL}`} className="hover:underline">
                  {EVENTS_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Hours</h3>
            <ul className="space-y-2 text-sm">
              {groupedHours.map((group) => (
                <li key={group.label}>
                  {group.label}: {group.hours}
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://www.facebook.com/concoursebowl"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/concoursebowling/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
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

