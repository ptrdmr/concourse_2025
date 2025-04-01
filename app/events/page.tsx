"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock } from "lucide-react"
import { PageHeader } from "@/components/page-header"

// Sample events data - in a real application, this would come from a database
const events = [
  {
    id: 1,
    title: "Cosmic Bowling Night",
    description: "Experience bowling with black lights, music, and glowing lanes!",
    date: "2025-04-05",
    time: "9:00 PM - 1:00 AM",
    image: "/placeholder.svg?height=300&width=600",
    category: "special",
    featured: true,
  },
  {
    id: 2,
    title: "Monday Night League Start",
    description: "The start of our popular Monday Night Out league. Last chance to register!",
    date: "2025-04-07",
    time: "6:45 PM",
    image: "/placeholder.svg?height=300&width=600",
    category: "league",
    featured: true,
  },
  {
    id: 3,
    title: "Kids Bowl Free Weekend",
    description: "Kids 12 and under bowl free with paying adult. Limited to 2 kids per adult.",
    date: "2025-04-12",
    time: "10:00 AM - 4:00 PM",
    image: "/placeholder.svg?height=300&width=600",
    category: "promotion",
    featured: true,
  },
  {
    id: 4,
    title: "Pro Shop Demo Day",
    description: "Try out the latest bowling equipment from top manufacturers.",
    date: "2025-04-15",
    time: "12:00 PM - 6:00 PM",
    image: "/placeholder.svg?height=300&width=600",
    category: "special",
    featured: false,
  },
  {
    id: 5,
    title: "Senior Tournament",
    description: "Tournament for bowlers 50+. Cash prizes and trophies!",
    date: "2025-04-20",
    time: "1:00 PM",
    image: "/placeholder.svg?height=300&width=600",
    category: "tournament",
    featured: false,
  },
  {
    id: 6,
    title: "Charity Bowl-A-Thon",
    description: "Bowl to raise money for local children's hospital. Pledges per pin or flat donations.",
    date: "2025-04-25",
    time: "6:00 PM - 9:00 PM",
    image: "/placeholder.svg?height=300&width=600",
    category: "charity",
    featured: true,
  },
  {
    id: 7,
    title: "College Night",
    description: "Special rates for college students with valid ID. $2 games and $2 shoe rental.",
    date: "2025-04-30",
    time: "9:00 PM - 12:00 AM",
    image: "/placeholder.svg?height=300&width=600",
    category: "promotion",
    featured: false,
  },
  {
    id: 8,
    title: "Vegas or Bust League Start",
    description: "First night of our Vegas or Bust league. Sweeps in Las Vegas in September!",
    date: "2025-05-02",
    time: "6:15 PM",
    image: "/placeholder.svg?height=300&width=600",
    category: "league",
    featured: false,
  },
]

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [category, setCategory] = useState<string>("all")

  // Filter events based on selected category
  const filteredEvents = category === "all" ? events : events.filter((event) => event.category === category)

  // Get featured events
  const featuredEvents = events.filter((event) => event.featured)

  return (
    <div className="container py-12">
      <PageHeader
        title="Events Calendar"
        description="Stay up to date with all the exciting events happening at Concourse Bowling Center."
        centered
      />

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Featured Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <Badge className="absolute right-2 top-2">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-2">{event.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Upcoming Events</h2>
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="rounded-md border p-4">
              <h3 className="mb-4 font-medium">Filter by Category</h3>
              <div className="space-y-2">
                <Button
                  variant={category === "all" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCategory("all")}
                >
                  All Events
                </Button>
                <Button
                  variant={category === "league" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCategory("league")}
                >
                  League Events
                </Button>
                <Button
                  variant={category === "tournament" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCategory("tournament")}
                >
                  Tournaments
                </Button>
                <Button
                  variant={category === "special" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCategory("special")}
                >
                  Special Events
                </Button>
                <Button
                  variant={category === "promotion" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCategory("promotion")}
                >
                  Promotions
                </Button>
                <Button
                  variant={category === "charity" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCategory("charity")}
                >
                  Charity Events
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-6">
                <div className="space-y-4">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <Card key={event.id}>
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 w-full sm:h-auto sm:w-48">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <CardHeader className="p-0 pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle>{event.title}</CardTitle>
                                <Badge>{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-0 pb-4">
                              <CardDescription className="mb-2">{event.description}</CardDescription>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                <span>
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="p-0 pt-2">
                              <Button variant="outline">Learn More</Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <p className="text-muted-foreground">No events found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="grid" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="relative aspect-video">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute right-2 top-2">
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle>{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="mb-2">{event.description}</CardDescription>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full rounded-lg border border-dashed p-8 text-center">
                      <p className="text-muted-foreground">No events found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Regular Weekly Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Monday</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">League Night</p>
                <p className="text-sm text-muted-foreground">Monday Night Out & Monday No Tap leagues at 6:45 PM</p>
              </div>
              <div>
                <p className="font-medium">$2 Game Night</p>
                <p className="text-sm text-muted-foreground">$2 games all day with $2.50 shoe rental</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tuesday</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">Senior Day</p>
                <p className="text-sm text-muted-foreground">Special pricing for seniors 55+ from 9 AM - 5 PM</p>
              </div>
              <div>
                <p className="font-medium">League Night</p>
                <p className="text-sm text-muted-foreground">Vegas or Bust league at 6:15 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Friday</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">Cosmic Bowling</p>
                <p className="text-sm text-muted-foreground">
                  9 PM - 1 AM with music, black lights, and glow-in-the-dark lanes
                </p>
              </div>
              <div>
                <p className="font-medium">Happy Hour</p>
                <p className="text-sm text-muted-foreground">3 PM - 6 PM with discounted drinks and appetizers</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saturday</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">Family Day</p>
                <p className="text-sm text-muted-foreground">Special family packages from 10 AM - 2 PM</p>
              </div>
              <div>
                <p className="font-medium">Cosmic Bowling</p>
                <p className="text-sm text-muted-foreground">
                  9 PM - 1 AM with music, black lights, and glow-in-the-dark lanes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Host Your Own Event</h2>
            <p className="mb-6">
              Looking to host a birthday party, corporate event, or fundraiser? We offer special packages for groups of
              all sizes.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/reservations">Book an Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

