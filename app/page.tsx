import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"
import { AnimatedHeader } from "@/components/animated-header"
// Sports Team Party package temporarily disabled — see SportsTeamPartyFeaturedStrip below.
// import { SportsTeamPartyFlyer } from "@/components/sports-team-party-flyer"
import { HeroSection } from "@/components/hero-section"
import { BusinessCalendar } from "@/components/business-calendar-client"
import { LazyMapEmbed } from "@/components/lazy-map-embed"
import { getGroupedWeeklyHours } from "@/lib/schedule"
import {
  LANE_BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EVENTS_EMAIL,
  EVENTS_PHONE_DISPLAY,
  EVENTS_PHONE_TEL,
} from "@/lib/booking"

// Sports Team Party package temporarily disabled — uncomment to bring back the homepage strip.
// function SportsTeamPartyFeaturedStrip() {
//   return (
//     <section className="border-b border-border/40 bg-muted/20 py-3 md:py-4">
//       <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
//         <SportsTeamPartyFlyer variant="strip" className="w-full" />
//       </div>
//     </section>
//   )
// }

const primaryCategoryCards = [
  {
    title: "Walk-in Bowling",
    description: "First come, first served — hourly and per-game rates, shoe rentals, and cosmic nights.",
    href: "/bowling",
    cta: "See rates & hours",
    image: "/images/bowling/walk_in.jpg",
    imageAlt: "Walk-in bowling at Concourse",
  },
  {
    title: "League Bowling",
    description: "Sanctioned and fun leagues with regular play, camaraderie, and prizes.",
    href: "/league-bowling",
    cta: "Join a league",
    image: "/images/bowling/league.jpg",
    imageAlt: "League bowling at Concourse",
  },
  {
    title: "Bar & Cafe",
    description: "Burgers, pizza, drinks, and happy hour — at your lane or in our restaurant.",
    href: "/menu",
    cta: "View our menu",
    image: "/images/food/homepage_bar_cafe.jpg",
    imageAlt: "Margarita and chips at Concourse Bar & Cafe",
  },
  {
    title: "Arcade",
    description: "Classic cabinets and the latest games for all ages between frames.",
    href: "/arcade",
    cta: "Play now",
    image: "/images/arcade/homepage_arcade.jpg",
    imageAlt: "Space Invaders Frenzy arcade cabinet at Concourse",
  },
] as const

export default function Home() {
  const groupedHours = getGroupedWeeklyHours()

  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Booking tracks — the two main reasons people visit (Lucky Strike-style split) */}
      <section className="border-b border-border/40 py-12 md:py-16">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 md:px-6 lg:px-8">
          <div className="flex flex-col rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Book online</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Reserve a Lane</h2>
            <p className="mt-3 text-white/90">
              Guarantee your lanes before you leave the house. Up to 8 bowlers per lane, shoes included — booked
              online in just a few minutes.
            </p>
            <p className="mt-4 text-sm font-medium text-white/80">Lanes from $99 · Mon–Thu</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="!bg-white !text-black hover:!bg-white/90" asChild>
                <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book Lanes Online
                </a>
              </Button>
              <Link
                href="/reservations?track=parties"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Group of 8+? Plan a party
              </Link>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-zinc-950 p-8 text-white shadow-lg md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Planner-assisted</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Parties & Group Events</h2>
            <p className="mt-3 text-white/80">
              Kids birthdays, group packages, corporate buyouts, and VIP suites for up to 320 bowlers — with a
              dedicated party planner handling the details.
            </p>
            <p className="mt-4 text-sm font-medium text-white/60">Kids parties from $850 · VIP suites from $450/hr</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="!bg-white !text-black hover:!bg-white/90" asChild>
                <Link href="/reservations?track=parties">Explore Party Packages</Link>
              </Button>
              <a
                href={EVENTS_PHONE_TEL}
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                or call {EVENTS_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Team Party package temporarily disabled — uncomment to bring back. */}
      {/* <SportsTeamPartyFeaturedStrip /> */}

      {/* Primary categories — image cards */}
      <section className="border-b border-border/40 bg-muted/40 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Plan your visit</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Everything you need for a great night out — reserve lanes, join a league, eat well, and play.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {primaryCategoryCards.map((card) => (
              <Link
                key={card.href + card.title}
                href={card.href}
                className="group relative block min-h-[280px] overflow-hidden rounded-2xl border-2 border-transparent shadow-lg transition-all duration-300 hover:border-red-600/80 hover:shadow-xl md:min-h-[320px]"
              >
                <Image src={card.image} alt={card.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                  <h3 className="text-2xl font-bold tracking-tight">{card.title}</h3>
                  <p className="mt-2 max-w-lg text-sm text-white/90 md:text-base">{card.description}</p>
                  <span className="mt-4 inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-red-700">
                    {card.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Concourse Calendar */}
      <section id="concourse-calendar" className="border-b border-border/40 py-16 scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Concourse Calendar</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">What&apos;s Happening</p>
          </div>
          <BusinessCalendar />
        </div>
      </section>

      {/* Our History */}
      <section className="relative bg-muted py-12 md:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bowling/concourse vintage.jpg"
            alt="Vintage bowling alley"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-25 dark:opacity-75" />
        </div>
        <div className="container-responsive relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeader
              text="Rolling since 1990"
              className="mb-4 text-2xl font-bold tracking-tight text-white md:mb-6 md:text-3xl lg:text-4xl"
              delay={0.2}
            />
            <p className="mb-6 text-base text-white md:mb-8 md:text-lg">
              Serving Anaheim, Fullerton, Yorba Linda, Orange, Brea, and many more areas with quality entertainment and
              memorable experiences for over three decades.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                className="w-full !bg-white !text-black hover:!bg-white/90 hover:!text-black sm:w-auto"
                asChild
              >
                <Link href="/about">Explore our history</Link>
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto" asChild>
                <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Reserve now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <AnimatedHeader
                text="Contact Us"
                className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
                delay={0.2}
              />
              <ul className="mb-8 space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>3364 E La Palma Ave, Anaheim, CA 92806</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <a href={PHONE_TEL} className="hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <a href={`mailto:${EVENTS_EMAIL}`} className="hover:underline">
                    {EVENTS_EMAIL}
                  </a>
                </li>
              </ul>
              <div className="mb-6 rounded border p-4">
                <h3 className="mb-2 font-medium">Hours of Operation</h3>
                <ul className="space-y-1 text-sm">
                  {groupedHours.map((group) => (
                    <li key={group.label} className="flex justify-between">
                      <span>{group.label}:</span>
                      <span>{group.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 sm:w-auto" asChild>
                <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Reserve now
                </a>
              </Button>
            </div>
            <div className="rounded-lg bg-muted p-6">
              <LazyMapEmbed
                className="aspect-video overflow-hidden rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.0088651367!2d-117.8651!3d33.8367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd5a9b8172a65%3A0x78c9f7713a95e1ba!2s3364%20E%20La%20Palma%20Ave%2C%20Anaheim%2C%20CA%2092806!5e0!3m2!1sen!2sus!4v1710766158!5m2!1sen!2sus"
                title="Concourse Bowling Center Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center md:px-6 lg:px-8">
          <AnimatedHeader
            text="Don't let the line get you down!"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            delay={0.2}
          />
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Reserve your lanes today and skip the wait. Perfect for birthday parties, corporate events, or just a fun
            night out with friends.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Reserve Today!
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
