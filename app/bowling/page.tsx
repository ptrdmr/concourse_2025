"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHeader } from "@/components/page-header"
import { TodayHours } from "@/components/today-hours"
import { LANE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/booking"

export default function BowlingPage() {
  return (
    <div className="container py-12">
      <PageHeader
        title="Walk-in Rates"
        description="Enjoy our state-of-the-art lanes with friends and family. Check out our competitive rates and special offers."
        centered
      />
      <p className="mx-auto -mt-4 mb-10 max-w-xl text-center text-muted-foreground">
        <TodayHours className="font-semibold text-foreground" />
        {" · "}First come, first served{" · "}
        <a href={PHONE_TEL} className="font-semibold text-primary hover:underline">
          {PHONE_DISPLAY}
        </a>
      </p>

      <div className="mb-16 grid gap-8 md:grid-cols-2">
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
          <h2 className="mb-4 text-2xl font-bold">Walk-in Bowling</h2>
          <p className="mb-6">
            We operate on a first come, first serve basis for non-reservation bowling.
          </p>
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              Outside food and drinks are not permitted. Birthday cakes and desserts are welcome.
            </AlertDescription>
          </Alert>
          <p className="mb-6">
            If you have a group of 8 or more, a reservation is recommended — book online to guarantee your lanes.
          </p>
          <Button asChild>
            <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Reserve a Lane Online
            </a>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Bowl by the Hour</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Time Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mon-Thu</TableCell>
                <TableCell>$36/hr</TableCell>
                <TableCell>Open-Close</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fri</TableCell>
                <TableCell>$43/hr</TableCell>
                <TableCell>Open-5pm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fri</TableCell>
                <TableCell>$49/hr</TableCell>
                <TableCell>5pm-Close</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sat</TableCell>
                <TableCell>$43/hr</TableCell>
                <TableCell>Open-5pm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sat</TableCell>
                <TableCell>$49/hr</TableCell>
                <TableCell>5pm-Close</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sun</TableCell>
                <TableCell>$43/hr</TableCell>
                <TableCell>Open-Close</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Holidays</TableCell>
                <TableCell>$45/hr</TableCell>
                <TableCell>All Day</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Bowl by the Game</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Time Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mon</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>4pm-Close</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tue-Thu</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>Open-5pm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fri</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>Open-5pm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sat-Sun</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Holidays</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>All Day</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Rent Shoes Rates</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Time Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mon-Thu</TableCell>
                <TableCell>$5.50</TableCell>
                <TableCell>All Day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fri</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>All Day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sat-Sun</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>All Day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Holidays</TableCell>
                <TableCell>$6.00</TableCell>
                <TableCell>All Day</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Special Date Pricing</h2>
        <p className="mb-4">Special pricing applies during the following times:</p>
        <ul className="mb-6 list-inside list-disc space-y-2">
          <li>Friday 3:00pm-Close</li>
          <li>Saturday All Day</li>
          <li>Sunday Open-5:00pm</li>
        </ul>
        <p>
          Please{" "}
          <a href={PHONE_TEL} className="font-medium text-primary hover:underline">
            call us at {PHONE_DISPLAY}
          </a>{" "}
          for current special pricing or check our promotions page.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Cosmic Bowling</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/images/bowling/friday_cosmic.jpg"
              alt="Cosmic bowling with neon lights"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4">
              Experience the ultimate bowling party with our Cosmic Bowling! Featuring special lighting effects, music,
              and a fun atmosphere.
            </p>
            <p className="mb-6">
              <strong>Available Times:</strong>
              <br />
              Friday 3:00pm - Midnight - Saturday All Day - Sunday 11:00am - 5:00pm
            </p>
            <Button asChild>
              <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Reserve for Cosmic Bowling
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-8">
        <h2 className="mb-4 text-2xl font-bold">Group Reservations</h2>
        <p className="mb-6">
          Planning a birthday party, corporate event, or group outing? We offer special packages for groups of all
          sizes.
        </p>
        <Button asChild>
          <Link href="/reservations?track=parties">View Party & Group Options</Link>
        </Button>
      </div>
    </div>
  )
}

