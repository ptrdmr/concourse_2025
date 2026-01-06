import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, DollarSign, Sparkles } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function EventsPage() {

  return (
    <div className="container py-12">
      <PageHeader
        title="Events & Specials"
        description="Special holiday hours, rates, and weekly promotions to make your bowling experience even better."
        centered
      />

      {/* Holiday Events & Special Dates */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          Holiday Hours & Special Dates
        </h2>
        <div className="mb-6 rounded-lg bg-muted p-6">
          <h3 className="mb-4 text-xl font-semibold">Observed Holidays</h3>
          <p className="mb-4 text-muted-foreground">
            We observe special hours and rates on the following holidays:
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">President's Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Martin Luther King Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Memorial Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Juneteenth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Independence Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Labor Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Veterans Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Day After Christmas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">New Year's Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Holiday rates apply</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 rounded-md bg-background p-4 border">
            <p className="font-medium mb-2 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Holiday Pricing
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Bowl by Hour: $45/hour all day</li>
              <li>• Bowl by Game: $6.00 per game</li>
              <li>• Shoe Rental: $6.00</li>
              <li>• Reservations: Holiday rates apply (see reservations page)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Weekly Specials */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Weekly Specials
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💵</span>
                Monday
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-bold text-lg text-primary">$2 Game Night</p>
                <p className="text-sm text-muted-foreground">$2 games from 4PM-Close</p>
                <p className="text-sm text-muted-foreground">$2.50 shoe rental</p>
              </div>
              <div className="pt-2 border-t">
                <p className="font-medium">League Night</p>
                <p className="text-sm text-muted-foreground">Monday Night Out & Monday No Tap leagues at 6:45 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">👴</span>
                Tuesday
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-bold text-lg text-primary">Senior Day</p>
                <p className="text-sm text-muted-foreground">Special pricing for seniors 55+</p>
                <p className="text-sm text-muted-foreground">11AM - 5PM</p>
              </div>
              <div className="pt-2 border-t">
                <p className="font-medium">League Night</p>
                <p className="text-sm text-muted-foreground">Vegas or Bust league at 6:15 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎆</span>
                Friday & Saturday
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-bold text-lg text-primary">Cosmic Bowling</p>
                <p className="text-sm text-muted-foreground">Experience bowling with black lights and music!</p>
                <p className="text-sm text-muted-foreground">9PM - Midnight</p>
              </div>
              <div className="pt-2 border-t">
                <p className="font-medium">Happy Hour (Friday)</p>
                <p className="text-sm text-muted-foreground">2PM - 6PM with discounted drinks & appetizers</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                Sunday
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-bold text-lg text-primary">Family Day</p>
                <p className="text-sm text-muted-foreground">Special family packages available</p>
                <p className="text-sm text-muted-foreground">10AM - 2PM</p>
              </div>
              <div className="pt-2 border-t">
                <p className="font-medium">Cosmic Bowling</p>
                <p className="text-sm text-muted-foreground">11AM - 5PM with special lighting</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cosmic Bowling Details */}
      <div className="mb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/images/bowling/dark lanes.jpg"
              alt="Cosmic bowling with special lighting"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">Cosmic Bowling</h2>
            <p className="mb-4 text-lg">
              Experience the ultimate bowling party with our Cosmic Bowling! Featuring special lighting effects, music,
              and a fun atmosphere perfect for all ages.
            </p>
            <div className="rounded-md bg-muted p-4 mb-4">
              <p className="font-bold mb-2">Available Times:</p>
              <ul className="space-y-1 text-sm">
                <li>• Friday: 9PM - Midnight</li>
                <li>• Saturday: 9PM - Midnight</li>
                <li>• Sunday: 11AM - 5PM</li>
              </ul>
            </div>
            <Button asChild size="lg" className="w-fit">
              <Link href="/reservations">Reserve for Cosmic Bowling</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Ready to Bowl?</h2>
            <p className="mb-6">
              Take advantage of our weekly specials or plan your visit around one of our special events. 
              Reservations are recommended for weekend and holiday bowling.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/reservations">Make a Reservation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/bowling">View Rates</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

