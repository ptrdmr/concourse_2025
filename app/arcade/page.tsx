"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad, Trophy, Users, Zap } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function ArcadePage() {
  return (
    <div className="container py-12">
      <PageHeader
        title="Arcade Games"
        description="Take a break from bowling and enjoy our selection of exciting arcade games for all ages."
        centered
      />

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Arcade area with games"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold">Fun For Everyone</h2>
          <p className="mb-6">
            Our arcade features a variety of games suitable for all ages and skill levels. From classic arcade cabinets
            to the latest video games, there's something for everyone to enjoy.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <Gamepad className="mb-2 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-bold">Latest Games</h3>
              <p className="text-sm text-muted-foreground">
                We regularly update our game selection to include the newest and most popular titles.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <Trophy className="mb-2 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-bold">Win Prizes</h3>
              <p className="text-sm text-muted-foreground">
                Many of our games award tickets that can be redeemed for exciting prizes at our redemption counter.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Featured Games</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=200&width=400" alt="Racing game" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Racing Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Experience the thrill of high-speed racing with our selection of driving games. Compete against friends
                or try to beat the high score!
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=200&width=400" alt="Pinball machine" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Pinball Machines</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Test your skills on our collection of classic and themed pinball machines. A timeless arcade favorite
                for all ages.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=200&width=400" alt="Redemption games" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Redemption Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Win tickets and redeem them for awesome prizes! Our redemption games are fun for the whole family.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Basketball arcade game"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Sports Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Show off your athletic skills with our basketball, football, and other sports-themed arcade games.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=200&width=400" alt="Dance game" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Dance & Music Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get moving with our interactive dance and music games. Perfect for showing off your rhythm and
                coordination.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=200&width=400" alt="Claw machine" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Prize Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Try your luck at our claw machines and other prize games for a chance to win plush toys and other cool
                items.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <Zap className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Load Your Card</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Purchase a game card at our kiosk and load it with credits. The more you add, the more bonus credits you
                receive!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <Gamepad className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Play & Win</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Swipe your card at any game to play. Win tickets on redemption games that are stored directly on your
                card.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <Trophy className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Redeem Prizes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visit our prize counter to redeem your tickets for a wide selection of toys, games, electronics, and
                more!
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Arcade Pricing</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Game Card Packages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Starter Package</span>
                <span>$10 (40 credits)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Value Package</span>
                <span>$20 (85 credits)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Super Package</span>
                <span>$30 (130 credits)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Mega Package</span>
                <span>$50 (225 credits)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Ultimate Package</span>
                <span>$100 (500 credits)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Offers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Weekday Special (Mon-Thu)</span>
                <span>Half-price game card reload</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Birthday Package</span>
                <span>$5 game card for the birthday person</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Group Discount</span>
                <span>10% off for groups of 10+</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Unlimited Play Pass</span>
                <span>$24.99 (2 hours, non-redemption games)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Arcade Events & Tournaments</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=600&width=800" alt="Arcade tournament" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-6">
              We regularly host exciting tournaments and special events in our arcade. Test your skills against other
              players and compete for prizes and bragging rights!
            </p>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-bold">Monthly High Score Challenge</h3>
                <p className="text-sm text-muted-foreground">
                  Every month we feature a different game for our high score challenge. The player with the highest
                  score at the end of the month wins a prize package!
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-bold">Tournament Tuesdays</h3>
                <p className="text-sm text-muted-foreground">
                  Join us every Tuesday evening for head-to-head competition on a featured game. Entry fee: $5, with
                  cash prizes for the winners!
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-bold">Ticket Blitz</h3>
                <p className="text-sm text-muted-foreground">
                  First Sunday of each month: all redemption games award double tickets from 12PM to 4PM!
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Birthday Parties & Group Events</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="mb-6">
              Make your next birthday party or group event unforgettable with our arcade packages. We offer special
              packages that include bowling, arcade play, food, and more!
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium">Arcade Party Package</h3>
                  <p className="text-sm text-muted-foreground">
                    Includes game cards for each guest, reserved party area, and a dedicated party host.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium">Combo Package</h3>
                  <p className="text-sm text-muted-foreground">
                    Combine bowling and arcade play for the ultimate party experience. Includes food and drink options.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium">Corporate Team Building</h3>
                  <p className="text-sm text-muted-foreground">
                    Special packages for corporate groups looking for a fun team-building activity.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/reservations">Book a Party</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Birthday party in arcade"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Ready to Play?</h2>
            <p className="mb-6">
              Visit our arcade today and experience the excitement for yourself. With games for all ages and skill
              levels, it's the perfect addition to your bowling experience!
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

