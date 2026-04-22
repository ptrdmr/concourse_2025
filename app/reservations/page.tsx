"use client"

import type React from "react"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageModal } from "@/components/ui/image-modal"
import { PageHeader } from "@/components/page-header"
import { VipCalculator } from "@/components/vip-calculator"
import { SportsTeamPartyFlyer } from "@/components/sports-team-party-flyer"

function ReservationsPageContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("regular")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "team-parties") {
      setActiveTab("team-parties")
    }
  }, [searchParams])

  const tabs = [
    { id: "regular", label: "Lane Reservations" },
    { id: "pair-spare", label: "Pair & Spare" },
    { id: "vip-suites", label: "VIP Suites" },
    { id: "team-parties", label: "Team Parties" },
    { id: "kids", label: "Kids Parties" },
    { id: "contact", label: "Contact Info" },
  ]

  return (
    <div className="container py-12">
      <PageHeader
        title="Reserve Today!"
        description="Reserve your lanes, plan a party, or book a special event. We have options for groups of all sizes."
        centered
      />

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "regular" && (
        <div className="space-y-16">
          {/* Lane Reservations - Visual Introduction */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=600&width=800" alt="Bowling lanes" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lane Reservations</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
              </div>
              <p className="mb-6">
                Reserve individual lanes for casual bowling with friends and family. Our standard reservations give you
                dedicated lanes without the wait, perfect for a fun night out or casual gatherings.
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
          </div>
        </div>
      )}

      {activeTab === "pair-spare" && (
        <div>
          {/* Pair & Spare Package */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Pair & Spare Package</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
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
              <Image src="/placeholder.svg?height=600&width=800" alt="Pair & Spare Package" fill className="object-cover" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "vip-suites" && (
        <div>
          {/* VIP Suites Section - Most Elaborate Option */}
          <div className="bg-black text-white py-8 px-4 rounded-lg">
            <h2 className="mb-6 text-4xl font-extrabold text-center text-white">VIP SUITES</h2>
            <p className="text-center mb-8 max-w-3xl mx-auto text-gray-300">
              Experience the ultimate in bowling luxury with our premium VIP suites. Perfect for corporate events, large
              parties, and special celebrations.
            </p>

            {/* Strike Zone VIP Suite */}
            <Card className="mb-8 bg-gray-900 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-2xl text-white">STRIKE ZONE VIP SUITE (4 LANE AREA)</CardTitle>
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90 w-fit">
                    <a href="#vip-calculator">Estimate Your Cost</a>
                  </Button>
                </div>
                <CardDescription className="text-gray-400">Minimum 20 bowlers; Maximum 32 bowlers</CardDescription>
              </CardHeader>
              <CardContent className="text-white pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-4">4 Lane Private Suite</p>
                    <p className="font-bold mb-2 text-white">Hourly Rate - *2 Hour Minimum*</p>
                    <ul className="list-inside space-y-1 text-gray-300">
                      <li>Monday - Thursday: $450 Per Hour</li>
                      <li>Friday - Sunday: $550 Per Hour</li>
                    </ul>
                    <div className="mt-6">
                      <h3 className="font-bold text-lg mb-2">BUFFET PACKAGES</h3>
                      <p className="mb-4">
                        Check out our catering packages{" "}
                        <ImageModal
                          trigger={
                            <span className="text-white font-semibold hover:underline cursor-pointer hover:text-primary-200">
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
                    <Button className="mt-6 bg-white text-black hover:bg-gray-200">Request Info</Button>
                    <p className="mt-2 text-sm text-gray-400">
                      Or Call <span className="font-medium text-gray-300">714-666-2695 ex238</span> for Pricing &
                      Availability
                    </p>
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src="/images/events/4 Lane Suite.jpg" alt="Strike Zone VIP Suite" fill className="object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kingpin VIP Suite */}
            <Card className="mb-8 bg-gray-900 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-2xl text-white">KINGPIN VIP SUITE (8 LANE SUITE)</CardTitle>
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90 w-fit">
                    <a href="#vip-calculator">Estimate Your Cost</a>
                  </Button>
                </div>
                <CardDescription className="text-gray-400">Minimum 40 bowlers; Maximum 64 bowlers</CardDescription>
              </CardHeader>
              <CardContent className="text-white pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-4">8 Lane Private Suite</p>
                    <p className="font-bold mb-2">Hourly Rate - *3 Hour Minimum*</p>
                    <ul className="list-inside space-y-1 text-gray-300">
                      <li>Monday - Thursday: $699 Per Hour</li>
                      <li>Friday - Sunday: $799 Per Hour</li>
                    </ul>
                    <div className="mt-6">
                      <h3 className="font-bold text-lg mb-2">BUFFET PACKAGES</h3>
                      <p className="mb-4">
                        Check out our catering packages{" "}
                        <ImageModal
                          trigger={
                            <span className="text-white font-semibold hover:underline cursor-pointer hover:text-primary-200">
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
                    <Button className="mt-6 bg-white text-black hover:bg-gray-200">Request Info</Button>
                    <p className="mt-2 text-sm text-gray-400">
                      Or Call <span className="font-medium text-gray-300">714-666-2695 ex238</span> for Pricing &
                      Availability
                    </p>
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src="/images/events/8 lane Suite.jpg" alt="Kingpin VIP Suite" fill className="object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Larger Suites */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-2xl text-white">LARGER SUITES & EVENTS</CardTitle>
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90 w-fit">
                    <a href="#vip-calculator">Estimate Your Cost</a>
                  </Button>
                </div>
                <CardDescription className="text-gray-400">For our most spectacular events and largest groups</CardDescription>
              </CardHeader>
              <CardContent className="text-white pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-4">Thinking big?</p>
                    <p className="mb-4 text-gray-300">
                      12 lanes? 20 lanes? All 40 lanes? We can accommodate events of up to 320 bowlers!
                    </p>
                    <p className="mb-4 font-bold">Don&apos;t hesitate!</p>
                    <Button className="mt-2 bg-white text-black hover:bg-gray-200">Request Info</Button>
                    <p className="mt-2 text-sm text-gray-400">
                      Or Call <span className="font-medium text-gray-300">714-666-2695 ex238</span> for Pricing &
                      Availability
                    </p>
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src="/images/events/Large Events.jpg" alt="Large Event Space" fill className="object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VIP Cost Calculator */}
            <VipCalculator id="vip-calculator" />
          </div>
        </div>
      )}

      {activeTab === "team-parties" && (
        <div className="flex flex-col items-center">
          <SportsTeamPartyFlyer variant="full" ctaHref="tel:+17146662695" />
          <p className="mt-6 max-w-lg text-center text-sm text-muted-foreground">
            For parties and extensions, call <strong>(714) 666-2695 ext. 238</strong> or email{" "}
            <strong>events@concoursebowling.com</strong>.
          </p>
        </div>
      )}

      {activeTab === "kids" && (
        <div className="space-y-16">
          {/* Supercharge Kids Party */}
          <div className="border-4 border-[#F9A825] rounded-lg overflow-hidden bg-white dark:bg-gray-900">
            <div className="bg-[#F9A825] text-white py-4 px-6">
              <h2 className="text-3xl font-bold text-center">Supercharge Kids Party at Concourse Bowling!</h2>
              <p className="text-center mt-2 italic">
                Please note that this party package is for children only 16 and younger. Adults welcome to supervise.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 p-8 bg-white dark:bg-gray-800">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <Image src="/images/bowling/kids_party.png" alt="Kids Bowling Party" fill className="object-cover" />
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-6 text-center md:text-left">
                  <p className="text-4xl font-bold text-[#F9A825]">$850</p>
                  <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">Starting with 20 kids!</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">$43.00 per Additional Kid (up to 32)</p>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-lg text-gray-900 dark:text-gray-100">What&apos;s Included:</p>
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
                  <p className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                    To book, please call <span className="font-bold">(714) 666-2695 ext. 238</span>
                  </p>
                  <Button size="lg" className="px-8 bg-[#F9A825] hover:bg-[#F57F17] transition-colors text-white">
                    Book Your Kids Party
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 border-t border-orange-100 dark:border-orange-800">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Why Choose Our Supercharge Kids Party Package?
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Our Supercharge Kids Party package offers the perfect combination of bowling fun, delicious food, and
                  arcade excitement. Your child and their friends will have a blast while our dedicated party planner
                  takes care of all the details!
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Call us at <strong className="text-gray-900 dark:text-gray-100">(714) 666-2695 ext. 238</strong> or email
                  us at <strong className="text-gray-900 dark:text-gray-100">events@concoursebowling.com</strong> to book
                  your child&apos;s unforgettable bowling party today!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div>
          <h2 className="mb-6 text-2xl font-bold">General Reservation Information</h2>
          <p className="text-lg mb-4">
            Call us at <strong>(714) 666-2695</strong> email us at <strong>events@concoursebowling.com</strong> or visit
            our center during business hours.
          </p>
          <p className="text-lg mb-4">
            We recommend booking at least 1-2 weeks in advance for weekend reservations and special events.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/contact">Contact Us for Reservations</Link>
          </Button>
        </div>
      )}
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
