"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeagueTable } from "@/components/league-table"
import { PageHeader } from "@/components/page-header"

export default function LeagueBowlingPage() {
  // Monday leagues data
  const mondayLeagues = [
    {
      name: "Monday No Tap",
      weeklyFee: "$26",
      startDate: "June 2, 2025",
      endDate: "September 29, 2025",
      teamComposition: "Not specified",
      sanctioned: "Yes",
      notes: ""
    },
    {
      name: "Monday Night Out",
      weeklyFee: "$27",
      startDate: "October 6, 2025",
      endDate: "February 9, 2026",
      teamComposition: "Any combo of 4",
      sanctioned: "No",
      notes: "Non-Sanction"
    },
    {
      name: "Ebowla",
      weeklyFee: "$22",
      startDate: "February 24, 2025",
      endDate: "May 19, 2025",
      teamComposition: "Any combo of 4",
      sanctioned: "No",
      notes: "Meeting at 6:15pm"
    }
  ]

  // Tuesday leagues data
  const tuesdayLeagues = [
    {
      name: "Pins 'n Needles",
      bowlTime: "11:00am",
      weeklyFee: "$17",
      startDate: "September 24, 2024",
      endDate: "Sweeps May 20, 2025",
      teamComposition: "Female Teams of 3",
      notes: ""
    },
    {
      name: "Silver Striking Seniors",
      bowlTime: "11:00am",
      weeklyFee: "$20",
      startDate: "September 3, 2024",
      endDate: "May 2025",
      teamComposition: "Any combo of 4",
      notes: "55 Years and Older ONLY"
    },
    {
      name: "Vegas or Bust",
      bowlTime: "6:15pm",
      weeklyFee: "$30",
      startDate: "March 18, 2025",
      endDate: "Sweeps: September 6, 2025 in Las Vegas At Southpoint",
      teamComposition: "Mixed 5's",
      notes: ""
    }
  ]

  return (
    <div className="container py-12">
      <PageHeader
        title="League Bowling"
        description="Join one of our exciting bowling leagues for regular competitive play, camaraderie, and prizes."
        centered
      />

      <div className="mb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=600&width=800" alt="League bowling in action" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-2xl font-bold">Why Join a League?</h2>
            <p className="mb-6">
              Our leagues are perfect for bowlers of all skill levels. Whether you're a seasoned pro or just starting out,
              we have a league that's right for you. Enjoy weekly competition, make new friends, and improve your game!
            </p>
            <div className="space-y-4">
              <p>
                <strong>Benefits of League Bowling:</strong>
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>Regular scheduled bowling</li>
                <li>Improve your skills with consistent play</li>
                <li>Meet new people and socialize</li>
                <li>Compete for prizes and awards</li>
                <li>Special league member discounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">League Schedule</h2>
        <Tabs defaultValue="monday" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex w-auto min-w-full md:grid md:grid-cols-7 md:w-full">
              <TabsTrigger value="monday" className="flex-1 min-w-[100px]">Monday</TabsTrigger>
              <TabsTrigger value="tuesday" className="flex-1 min-w-[100px]">Tuesday</TabsTrigger>
              <TabsTrigger value="wednesday" className="flex-1 min-w-[100px]">Wednesday</TabsTrigger>
              <TabsTrigger value="thursday" className="flex-1 min-w-[100px]">Thursday</TabsTrigger>
              <TabsTrigger value="friday" className="flex-1 min-w-[100px]">Friday</TabsTrigger>
              <TabsTrigger value="saturday" className="flex-1 min-w-[100px]">Saturday</TabsTrigger>
              <TabsTrigger value="sunday" className="flex-1 min-w-[100px]">Sunday</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="monday">
            <h3 className="mb-4 text-xl font-bold">Monday Leagues</h3>
            <LeagueTable leagues={mondayLeagues} />
          </TabsContent>
          <TabsContent value="tuesday">
            <h3 className="mb-4 text-xl font-bold">Tuesday Leagues</h3>
            <LeagueTable leagues={tuesdayLeagues} showBowlTime={true} showSanctioned={false} />
          </TabsContent>
          <TabsContent value="wednesday">
            <h3 className="mb-4 text-xl font-bold">Wednesday Leagues</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>League Name</TableHead>
                  <TableHead>Bowl Time</TableHead>
                  <TableHead>Weekly Fee</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date/Sweeps</TableHead>
                  <TableHead>Team Composition</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Renegades</TableCell>
                  <TableCell>11:00am</TableCell>
                  <TableCell>$17</TableCell>
                  <TableCell>September 25, 2024</TableCell>
                  <TableCell>Sweeps: May 21, 2025</TableCell>
                  <TableCell>Female Teams of 4</TableCell>
                  <TableCell>Sanctioned</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cerra Villa - No Tap</TableCell>
                  <TableCell>11:00am</TableCell>
                  <TableCell>$18</TableCell>
                  <TableCell>September 25, 2024</TableCell>
                  <TableCell>Sweeps: May 14, 2025</TableCell>
                  <TableCell>Female Teams of 3</TableCell>
                  <TableCell>Unsanctioned</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alley Cats/River Rats</TableCell>
                  <TableCell>6:15pm</TableCell>
                  <TableCell>$28</TableCell>
                  <TableCell>October 9, 2024</TableCell>
                  <TableCell>Sweeps: April 11-13th 2025 at Riversidelanes in Laughlin</TableCell>
                  <TableCell>Any Combo of 5</TableCell>
                  <TableCell>Sanctioned</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Vegas Bound</TableCell>
                  <TableCell>6:30pm</TableCell>
                  <TableCell>$28</TableCell>
                  <TableCell>October 2, 2024</TableCell>
                  <TableCell>Sweeps: April 11-13th 2025 in Vegas at Southpoint</TableCell>
                  <TableCell>Any Combo of 5's</TableCell>
                  <TableCell>Sanctioned</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="thursday">
            <h3 className="mb-4 text-xl font-bold">Thursday Leagues</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>League Name</TableHead>
                  <TableHead>Bowl Time</TableHead>
                  <TableHead>Weekly Fee</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date/Sweeps</TableHead>
                  <TableHead>Team Composition</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Silver & Gold</TableCell>
                  <TableCell>11:00am</TableCell>
                  <TableCell>$20</TableCell>
                  <TableCell>September 5, 2024</TableCell>
                  <TableCell>May 2025</TableCell>
                  <TableCell>Any combo of 4</TableCell>
                  <TableCell>50 Years and Older ONLY, Match Play Rules</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>River Magic</TableCell>
                  <TableCell>6:15pm</TableCell>
                  <TableCell>$27</TableCell>
                  <TableCell>October 10, 2024</TableCell>
                  <TableCell>Sweeps: April 11-13, 2025 in Laughlin at the riverside</TableCell>
                  <TableCell>Any Combo of 5</TableCell>
                  <TableCell>Sanctioned</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="friday">
            <h3 className="mb-4 text-xl font-bold">Friday Leagues</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>League Name</TableHead>
                  <TableHead>Bowl Time</TableHead>
                  <TableHead>Weekly Fee</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date/Sweeps</TableHead>
                  <TableHead>Team Composition</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Lucky Ladies & Gents</TableCell>
                  <TableCell>11:00am</TableCell>
                  <TableCell>$27</TableCell>
                  <TableCell>September 12, 2025</TableCell>
                  <TableCell>Sweeps: May 18, 2026 at Southpoint in Vegas</TableCell>
                  <TableCell>Mixed Combo of 4</TableCell>
                  <TableCell>Non-sanctioned</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="saturday">
            <h3 className="mb-4 text-xl font-bold">Saturday Leagues</h3>
            <p>
              We currently don't have any regular leagues scheduled for Saturday. Please check back later or contact
              us for information about upcoming Saturday leagues.
            </p>
          </TabsContent>
          <TabsContent value="sunday">
            <h3 className="mb-4 text-xl font-bold">Sunday Leagues</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>League Name</TableHead>
                  <TableHead>Bowl Time</TableHead>
                  <TableHead>Weekly Fee</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date/Sweeps</TableHead>
                  <TableHead>Team Composition</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Vegas Bowling 4 $'s</TableCell>
                  <TableCell>6:30pm</TableCell>
                  <TableCell>$30</TableCell>
                  <TableCell>August 4, 2024</TableCell>
                  <TableCell>Sweeps: May 3, 2025 at South Point</TableCell>
                  <TableCell>Any combo of 4</TableCell>
                  <TableCell>Meeting at 6pm, Sanctioned</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">How to Register</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p>Joining a league is easy! Here's how to get started:</p>
            <ol className="list-inside list-decimal space-y-2">
              <li>Choose a league that fits your schedule and skill level</li>
              <li>Contact us to check for availability</li>
              <li>Complete the registration form</li>
              <li>Pay the registration fee</li>
              <li>Show up on the start date and have fun!</li>
            </ol>
            <p className="mt-4">
              Not sure which league is right for you? Contact us and we'll help you find the perfect fit.
            </p>
          </div>
          <div className="rounded-lg bg-muted p-6">
            <h3 className="mb-4 text-xl font-bold">League Sign-Up Form</h3>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="league" className="text-sm font-medium">
                    Preferred League
                  </label>
                  <select
                    id="league"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a league</option>
                    <option value="monday-no-tap">Monday No Tap</option>
                    <option value="monday-night-out">Monday Night Out</option>
                    <option value="ebowla">Ebowla</option>
                    <option value="vegas-or-bust">Vegas or Bust</option>
                    <option value="vegas-bowling">Vegas Bowling 4 $'s</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="experience" className="text-sm font-medium">
                  Bowling Experience
                </label>
                <select
                  id="experience"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (under 100 average)</option>
                  <option value="intermediate">Intermediate (100-150 average)</option>
                  <option value="advanced">Advanced (150-200 average)</option>
                  <option value="expert">Expert (200+ average)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Any additional information you'd like us to know"
                  rows={3}
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                Submit Sign-Up Request
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">League Benefits</h2>
        {/* Content for this section */}
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">League FAQs</h2>
        {/* Content for this section */}
      </div>

      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Ready to Join a League?</h2>
            <p className="mb-6">
              Contact our League Coordinator today to sign up for the league of your choice or get more information.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact League Coordinator</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

