"use client"

import { Suspense, useEffect, useState, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageModal } from "@/components/ui/image-modal"
import { PageHeader } from "@/components/page-header"
import {
  LANE_BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EVENTS_EMAIL,
  EVENTS_PHONE_DISPLAY,
  EVENTS_PHONE_TEL,
  eventsMailto,
} from "@/lib/booking"
// Sports Team Party package temporarily disabled — to re-enable, add a section with
// <SportsTeamPartyFlyer variant="full" ctaHref={EVENTS_PHONE_TEL} /> inside the parties track.

const VipCalculator = dynamic(
  () => import("@/components/vip-calculator").then((mod) => mod.VipCalculator),
  {
    ssr: false,
    loading: () => <div id="vip-calculator" className="h-[400px] w-full animate-pulse rounded-lg bg-muted" />,
  },
)

type Track = "lanes" | "parties"

const trackOptions = [
  { id: "lanes", label: "Reserve a Lane" },
  { id: "parties", label: "Parties & Group Events" },
] as const

/** Legacy ?tab= deep links land on the track that now holds that content. */
const legacyTabToTrack: Record<string, Track> = {
  regular: "lanes",
  contact: "lanes",
  "pair-spare": "parties",
  "vip-suites": "parties",
  kids: "parties",
  "team-parties": "parties",
}

function BookOnlineButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Button asChild className={className}>
      <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  )
}

function ReservationsPageContent() {
  const searchParams = useSearchParams()
  const [track, setTrack] = useState<Track>("lanes")

  useEffect(() => {
    const trackParam = searchParams.get("track")
    if (trackParam === "lanes" || trackParam === "parties") {
      setTrack(trackParam)
      return
    }
    const legacyTab = searchParams.get("tab")
    if (legacyTab && legacyTab in legacyTabToTrack) {
      setTrack(legacyTabToTrack[legacyTab])
    }
  }, [searchParams])

  return (
    <div className="container py-12">
      <PageHeader
        title="Reserve Lanes & Parties"
        description="Book a lane online in minutes, or let our party planners handle birthdays, corporate events, and everything in between."
        centered
      />

      {/* Track switcher */}
      <div className="mb-8">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2 rounded-xl bg-muted p-1.5">
          {trackOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTrack(option.id)}
              aria-pressed={track === option.id}
              className={`rounded-lg px-4 py-3 text-sm font-bold transition-colors sm:text-base ${
                track === option.id
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          {track === "lanes"
            ? "Casual bowling for up to 8 per lane — shoes included, booked online."
            : "Kids birthdays, group packages, VIP suites, and corporate events for up to 320 bowlers."}
        </p>
      </div>

      {track === "lanes" && (
        <div className="space-y-16">
          {/* Lane Reservations - Visual Introduction */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/images/bowling/walk_in.jpg"
                alt="Bowling lanes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Lane Reservations</h2>
                <BookOnlineButton className="bg-blue-600 hover:bg-blue-700">Book Now</BookOnlineButton>
              </div>
              <p className="mb-6">
                Reserve individual lanes for casual bowling with friends and family. Our standard reservations give
                you dedicated lanes without the wait, perfect for a fun night out or casual gatherings.
              </p>
              <div className="space-y-4">
                <p>
                  <strong>What&apos;s Included:</strong>
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Reserved lanes for your group</li>
                  <li>Bowling shoes for all participants</li>
                  <li>Scoring system with fun animations</li>
                  <li>Access to our full-service bar and restaurant</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Standard Lane Pricing */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Standard Bowling Lane Reservation Pricing</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day & Time</TableHead>
                    <TableHead>Price Per Lane</TableHead>
                    <TableHead>Duration (Single Lane)</TableHead>
                    <TableHead>Duration (2+ Lanes)</TableHead>
                    <TableHead>Max Bowlers per Lane</TableHead>
                    <TableHead>Shoes Included</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Monday - Thursday</TableCell>
                    <TableCell>$99</TableCell>
                    <TableCell>1 hr 20 mins</TableCell>
                    <TableCell>1 hr 50 mins</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Friday & Saturday Before 5:00pm</TableCell>
                    <TableCell>$119</TableCell>
                    <TableCell>1 hr 20 mins</TableCell>
                    <TableCell>1 hr 50 mins</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Friday & Saturday After 5:00pm</TableCell>
                    <TableCell>$149</TableCell>
                    <TableCell>1 hr 20 mins</TableCell>
                    <TableCell>1 hr 50 mins</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sunday</TableCell>
                    <TableCell>$119</TableCell>
                    <TableCell>1 hr 20 mins</TableCell>
                    <TableCell>1 hr 50 mins</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Holidays</TableCell>
                    <TableCell>$119</TableCell>
                    <TableCell>1 hr 20 mins</TableCell>
                    <TableCell>1 hr 50 mins</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-6">
              <p className="font-medium">Observed Holidays:</p>
              <p className="text-muted-foreground">
                President&apos;s Day, Martin Luther King Day, Memorial Day, Veterans Day, Labor Day, Juneteenth,
                Independence Day, Day After Christmas, New Year&apos;s Day
              </p>
            </div>
            <div className="mt-8 text-center">
              <BookOnlineButton className="px-8">Book Your Lane Online</BookOnlineButton>
            </div>
          </div>
        </div>
      )}

      {track === "parties" && (
        <div className="space-y-16">
          {/* Planner strip — every party path offers a human */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/50 p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-xl font-bold">Every party gets a dedicated planner</h2>
              <p className="mt-1 text-muted-foreground">
                Tell us the date and headcount — we handle the lanes, food, and decorations.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <a href={EVENTS_PHONE_TEL}>Call {EVENTS_PHONE_DISPLAY}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={eventsMailto("Party Inquiry")}>Email Our Planners</a>
              </Button>
            </div>
          </div>

          {/* Audience quick nav */}
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="#kids-parties"
              className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              Kids Birthdays
            </a>
            <a
              href="#group-packages"
              className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              Group Packages
            </a>
            <a
              href="#vip-suites"
              className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              VIP Suites & Corporate
            </a>
          </div>

          {/* Kids Birthday Parties */}
          <div id="kids-parties" className="scroll-mt-24">
            <div className="overflow-hidden rounded-lg border-4 border-[#F9A825] bg-white dark:bg-gray-900">
              <div className="bg-[#F9A825] px-6 py-4 text-white">
                <h2 className="text-center text-3xl font-bold">Supercharge Kids Party at Concourse Bowling!</h2>
                <p className="mt-2 text-center italic">
                  Please note that this party package is for children only 16 and younger. Adults welcome to
                  supervise.
                </p>
              </div>

              <div className="grid gap-8 bg-white p-8 dark:bg-gray-800 md:grid-cols-2">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                  <Image
                    src="/images/bowling/kids_party.jpg"
                    alt="Kids Bowling Party"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="mb-6 text-center md:text-left">
                    <p className="text-4xl font-bold text-[#F9A825]">$850</p>
                    <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">Starting with 20 kids!</p>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">$43.00 per Additional Kid (up to 32)</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">What&apos;s Included:</p>
                    <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                      <li>4 Lane Suite decorated with red curtains</li>
                      <li>3 Hours of Party Time - 2.5 Hours of Bowling</li>
                      <li>Two Slices of Pizza per bowler - 1 French Fry Platter</li>
                      <li>Unlimited Soda</li>
                      <li>1 $10 Arcade Card per bowler</li>
                      <li>A dedicated party planner will assist you with all your party details</li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <p className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                      To book, call{" "}
                      <a href={EVENTS_PHONE_TEL} className="font-bold hover:underline">
                        {EVENTS_PHONE_DISPLAY}
                      </a>{" "}
                      or email{" "}
                      <a href={eventsMailto("Kids Birthday Party Inquiry")} className="font-bold hover:underline">
                        {EVENTS_EMAIL}
                      </a>
                    </p>
                    <Button
                      size="lg"
                      className="bg-[#F9A825] px-8 text-white transition-colors hover:bg-[#F57F17]"
                      asChild
                    >
                      <a href={EVENTS_PHONE_TEL}>Book Your Kids Party</a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-orange-100 bg-orange-50 p-6 dark:border-orange-800 dark:bg-orange-900/20">
                <div className="mx-auto max-w-3xl">
                  <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                    Why Choose Our Supercharge Kids Party Package?
                  </h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Our Supercharge Kids Party package offers the perfect combination of bowling fun, delicious food,
                    and arcade excitement. Your child and their friends will have a blast while our dedicated party
                    planner takes care of all the details!
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Call us at{" "}
                    <a
                      href={EVENTS_PHONE_TEL}
                      className="font-bold text-gray-900 hover:underline dark:text-gray-100"
                    >
                      {EVENTS_PHONE_DISPLAY}
                    </a>{" "}
                    or email us at{" "}
                    <a
                      href={eventsMailto("Kids Birthday Party Inquiry")}
                      className="font-bold text-gray-900 hover:underline dark:text-gray-100"
                    >
                      {EVENTS_EMAIL}
                    </a>{" "}
                    to book your child&apos;s unforgettable bowling party today!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Group Packages */}
          <div id="group-packages" className="scroll-mt-24">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Pair & Spare Package</h2>
                  <BookOnlineButton className="bg-blue-600 hover:bg-blue-700">Book Now</BookOnlineButton>
                </div>
                <p className="mb-6">
                  Our popular Pair & Spare Package is perfect for small to medium-sized groups looking for a complete
                  bowling experience.
                </p>
                <div className="space-y-4">
                  <p>
                    <strong>What&apos;s Included:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-2">
                    <li>2 Bowling Lanes</li>
                    <li>2 Hours of Bowling</li>
                    <li>10 Pairs of Shoes</li>
                    <li>2 Pizzas</li>
                    <li>Unlimited Sodas for 10 Guests</li>
                    <li>10 $5 Arcade Cards</li>
                  </ul>
                  <p className="mt-4">
                    <em>Package does not come with a server</em>
                  </p>
                  <div className="mt-4 rounded-md bg-muted p-4">
                    <p className="font-bold">Pricing:</p>
                    <p>Monday-Thursday: $360</p>
                    <p>Friday-Sunday: $390</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/images/food/pizza.jpg"
                  alt="Fresh pizza from the Concourse Bar & Cafe"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* VIP Suites & Corporate */}
          <div id="vip-suites" className="scroll-mt-24">
            <div className="rounded-lg bg-black px-4 py-8 text-white">
              <h2 className="mb-6 text-center text-4xl font-extrabold text-white">VIP SUITES</h2>
              <p className="mx-auto mb-8 max-w-3xl text-center text-gray-300">
                Experience the ultimate in bowling luxury with our premium VIP suites. Perfect for corporate events,
                large parties, and special celebrations.
              </p>

              {/* Strike Zone VIP Suite */}
              <Card className="mb-8 border-gray-700 bg-gray-900">
                <CardHeader className="border-b border-gray-700">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-2xl text-white">STRIKE ZONE VIP SUITE (4 LANE AREA)</CardTitle>
                    <Button asChild size="sm" className="w-fit bg-primary hover:bg-primary/90">
                      <a href="#vip-calculator">Estimate Your Cost</a>
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400">Minimum 20 bowlers; Maximum 32 bowlers</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 text-white">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-4">4 Lane Private Suite</p>
                      <p className="mb-2 font-bold text-white">Hourly Rate - *2 Hour Minimum*</p>
                      <ul className="list-inside space-y-1 text-gray-300">
                        <li>Monday - Thursday: $450 Per Hour</li>
                        <li>Friday - Sunday: $550 Per Hour</li>
                      </ul>
                      <div className="mt-6">
                        <h3 className="mb-2 text-lg font-bold">BUFFET PACKAGES</h3>
                        <p className="mb-4">
                          Check out our catering packages{" "}
                          <ImageModal
                            trigger={
                              <span className="cursor-pointer font-semibold text-white hover:text-primary-200 hover:underline">
                                SEE HERE
                              </span>
                            }
                            imageSrc="/branding/catering-2025.jpg"
                            imageAlt="Catering Packages 2025"
                            title="Catering Packages 2025"
                          />
                        </p>
                      </div>
                      <p className="mt-2 text-gray-300">2 Hour Minimum</p>
                      <Button asChild className="mt-6 bg-white text-black hover:bg-gray-200">
                        <a href={eventsMailto("VIP Suite Inquiry — Strike Zone (4-Lane)")}>Request Info</a>
                      </Button>
                      <p className="mt-2 text-sm text-gray-400">
                        Or call{" "}
                        <a href={EVENTS_PHONE_TEL} className="font-medium text-gray-300 hover:underline">
                          {EVENTS_PHONE_DISPLAY}
                        </a>{" "}
                        for Pricing & Availability
                      </p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src="/images/events/4 Lane Suite.jpg"
                        alt="Strike Zone VIP Suite"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kingpin VIP Suite */}
              <Card className="mb-8 border-gray-700 bg-gray-900">
                <CardHeader className="border-b border-gray-700">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-2xl text-white">KINGPIN VIP SUITE (8 LANE SUITE)</CardTitle>
                    <Button asChild size="sm" className="w-fit bg-primary hover:bg-primary/90">
                      <a href="#vip-calculator">Estimate Your Cost</a>
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400">Minimum 40 bowlers; Maximum 64 bowlers</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 text-white">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-4">8 Lane Private Suite</p>
                      <p className="mb-2 font-bold">Hourly Rate - *3 Hour Minimum*</p>
                      <ul className="list-inside space-y-1 text-gray-300">
                        <li>Monday - Thursday: $699 Per Hour</li>
                        <li>Friday - Sunday: $799 Per Hour</li>
                      </ul>
                      <div className="mt-6">
                        <h3 className="mb-2 text-lg font-bold">BUFFET PACKAGES</h3>
                        <p className="mb-4">
                          Check out our catering packages{" "}
                          <ImageModal
                            trigger={
                              <span className="cursor-pointer font-semibold text-white hover:text-primary-200 hover:underline">
                                SEE HERE
                              </span>
                            }
                            imageSrc="/branding/catering-2025.jpg"
                            imageAlt="Catering Packages 2025"
                            title="Catering Packages 2025"
                          />
                        </p>
                      </div>
                      <p className="mt-2 text-gray-300">3 Hour Minimum</p>
                      <Button asChild className="mt-6 bg-white text-black hover:bg-gray-200">
                        <a href={eventsMailto("VIP Suite Inquiry — Kingpin (8-Lane)")}>Request Info</a>
                      </Button>
                      <p className="mt-2 text-sm text-gray-400">
                        Or call{" "}
                        <a href={EVENTS_PHONE_TEL} className="font-medium text-gray-300 hover:underline">
                          {EVENTS_PHONE_DISPLAY}
                        </a>{" "}
                        for Pricing & Availability
                      </p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src="/images/events/8 lane Suite.jpg"
                        alt="Kingpin VIP Suite"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Larger Suites */}
              <Card className="border-gray-700 bg-gray-900">
                <CardHeader className="border-b border-gray-700">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-2xl text-white">LARGER SUITES & EVENTS</CardTitle>
                    <Button asChild size="sm" className="w-fit bg-primary hover:bg-primary/90">
                      <a href="#vip-calculator">Estimate Your Cost</a>
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400">
                    For our most spectacular events and largest groups
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 text-white">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-4">Thinking big?</p>
                      <p className="mb-4 text-gray-300">
                        12 lanes? 20 lanes? All 40 lanes? We can accommodate events of up to 320 bowlers!
                      </p>
                      <p className="mb-4 font-bold">Don&apos;t hesitate!</p>
                      <Button asChild className="mt-2 bg-white text-black hover:bg-gray-200">
                        <a href={eventsMailto("Large Event Inquiry (12+ lanes)")}>Request Info</a>
                      </Button>
                      <p className="mt-2 text-sm text-gray-400">
                        Or call{" "}
                        <a href={EVENTS_PHONE_TEL} className="font-medium text-gray-300 hover:underline">
                          {EVENTS_PHONE_DISPLAY}
                        </a>{" "}
                        for Pricing & Availability
                      </p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src="/images/events/Large Events.jpg"
                        alt="Large Event Space"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* VIP Cost Calculator */}
              <VipCalculator id="vip-calculator" />
            </div>
          </div>
        </div>
      )}

      {/* General reservation info — visible from both tracks */}
      <div className="mt-16 rounded-2xl border border-border p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold">General Reservation Information</h2>
        <p className="mb-2 text-lg">
          Call us at{" "}
          <a href={PHONE_TEL} className="font-bold hover:underline">
            {PHONE_DISPLAY}
          </a>
          , email{" "}
          <a href={`mailto:${EVENTS_EMAIL}`} className="font-bold hover:underline">
            {EVENTS_EMAIL}
          </a>
          , or visit our center during business hours.
        </p>
        <p className="mb-4 text-lg">
          We recommend booking at least 1-2 weeks in advance for weekend reservations and special events.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/contact">Contact Us for Reservations</Link>
        </Button>
      </div>
    </div>
  )
}

export default function ReservationsPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-24 text-center text-muted-foreground" aria-live="polite">
          Loading reservations…
        </div>
      }
    >
      <ReservationsPageContent />
    </Suspense>
  )
}
