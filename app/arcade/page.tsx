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
                Many of our games award tickets that can be redeemed for exciting prizes at our prize hub.
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
                Visit our prize hub to redeem your tickets for a wide selection of toys, games, electronics, and
                more!
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-white">Arcade Pricing</h2>
        <Card className="bg-background/95 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Game Card Packages - Buy More, Get More!</CardTitle>
            <CardDescription className="text-base mt-2">
              <span className="font-semibold">Note:</span> 1 credit = 1 quarter (25¢)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-medium text-lg">Purchase $10</span>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">+ $5 Bonus Play</p>
              </div>
              <span className="text-lg font-bold">$15 Total</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-medium text-lg">Purchase $20</span>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">+ $12 Bonus Play</p>
              </div>
              <span className="text-lg font-bold">$32 Total</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-medium text-lg">Purchase $40</span>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">+ $20 Bonus Play</p>
              </div>
              <span className="text-lg font-bold">$60 Total</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-medium text-lg">Purchase $60</span>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">+ $20 Bonus Play</p>
              </div>
              <span className="text-lg font-bold">$80 Total</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-lg">Purchase $100</span>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">+ $40 Bonus Play</p>
              </div>
              <span className="text-lg font-bold">$140 Total</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-white">Birthday Parties & Group Events</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-gray-200">
              Looking for the ultimate party experience? Our party packages include arcade cards so everyone can enjoy the games!
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium text-lg">Supercharge Kids Party</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Starting at $850 for 20 kids (ages 16 and under)
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 4 Lane Suite with 3 hours of party time</li>
                    <li>• 2.5 hours of bowling</li>
                    <li>• Two slices of pizza per bowler</li>
                    <li>• Unlimited soda</li>
                    <li>• <strong>$10 arcade card per bowler</strong></li>
                    <li>• Dedicated party planner</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium text-lg">Pair & Spare Package</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    $360 (Mon-Thu) / $390 (Fri-Sun) for 10 guests
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 2 bowling lanes for 2 hours</li>
                    <li>• 10 pairs of shoes</li>
                    <li>• 2 pizzas</li>
                    <li>• Unlimited sodas for 10 guests</li>
                    <li>• <strong>$5 arcade card per guest</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild size="lg">
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

