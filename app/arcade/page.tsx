"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad, Trophy, Users, Zap } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function ArcadePage() {
  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/arcade/space invaders.jpg"
          alt="Arcade background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80 dark:bg-black/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>
      
      <div className="relative z-10 container py-12">
        <PageHeader
          title="Arcade Games"
          description="Take a break from bowling and enjoy our selection of exciting arcade games for all ages."
          centered
        />

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/images/arcade/space invaders.jpg"
            alt="Space Invaders arcade game"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Fun For Everyone</h2>
          <p className="mb-6 text-gray-200">
            Our arcade features a variety of games suitable for all ages and skill levels. From classic arcade cabinets
            to the latest video games, there's something for everyone to enjoy.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-background/95 backdrop-blur-sm p-4 border border-primary/20">
              <Gamepad className="mb-2 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-bold">Latest Games</h3>
              <p className="text-sm text-muted-foreground">
                We regularly update our game selection to include the newest and most popular titles.
              </p>
            </div>
            <div className="rounded-lg bg-background/95 backdrop-blur-sm p-4 border border-primary/20">
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
        <h2 className="mb-6 text-2xl font-bold text-white">Featured Games</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <Card className="bg-background/95 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/images/arcade/racing games.jpg" alt="Racing games" fill className="object-cover" />
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

          <Card className="bg-background/95 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/images/arcade/classic.jpg" alt="Classic arcade games" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Classic Arcade Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Test your skills on our collection of classic arcade cabinets including Space Invaders, Pac-Man, and more timeless favorites.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-background/95 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image
                src="/images/arcade/sports.jpg"
                alt="Sports arcade games"
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

          <Card className="bg-background/95 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image src="/images/arcade/prize.jpg" alt="Prize games and claw machines" fill className="object-cover" />
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
        <h2 className="mb-6 text-2xl font-bold text-white">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center bg-background/95 backdrop-blur-sm">
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

          <Card className="flex flex-col items-center text-center bg-background/95 backdrop-blur-sm">
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

          <Card className="flex flex-col items-center text-center bg-background/95 backdrop-blur-sm">
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
        <h2 className="mb-6 text-2xl font-bold text-white">Arcade Pricing</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-background/95 backdrop-blur-sm">
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

          <Card className="bg-background/95 backdrop-blur-sm">
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
        <h2 className="mb-6 text-2xl font-bold text-white">Birthday Parties & Group Events</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-gray-200">
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
    </div>
  )
}

