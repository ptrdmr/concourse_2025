"use client"

import { Suspense, useEffect, useState, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { isPartyPackageId } from "@/lib/party-packages"
// Sports Team Party package temporarily disabled — to re-enable, add a section with
// <SportsTeamPartyFlyer variant="full" ctaHref={EVENTS_PHONE_TEL} /> inside the parties track.

const PartyPackageGrid = dynamic(
  () => import("@/components/party-packages/package-grid").then((mod) => mod.PartyPackageGrid),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse rounded-lg bg-muted" />,
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

function getInitialTrack(searchParams: URLSearchParams): Track {
  const packageParam = searchParams.get("package")
  if (packageParam && isPartyPackageId(packageParam)) return "parties"
  const trackParam = searchParams.get("track")
  if (trackParam === "lanes" || trackParam === "parties") return trackParam
  const legacyTab = searchParams.get("tab")
  if (legacyTab && legacyTab in legacyTabToTrack) return legacyTabToTrack[legacyTab]
  return "lanes"
}

function ReservationsPageContent() {
  const searchParams = useSearchParams()
  const [track, setTrack] = useState<Track>(() => getInitialTrack(searchParams))

  useEffect(() => {
    setTrack(getInitialTrack(searchParams))
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
        <div className="space-y-10">
          {/* Planner strip — every party path offers a human */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/50 p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-xl font-bold">Contact our Party Planners today!</h2>
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

          <PartyPackageGrid />
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
