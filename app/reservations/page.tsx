"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ImageModal } from "@/components/ui/image-modal"
import { PageHeader } from "@/components/page-header"

export default function ReservationsPage() {
  const [date, setDate] = useState<Date>()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState("regular")
  const [reservationType, setReservationType] = useState<"regular" | "kids">("regular")

  // Orange theme color from the provided image
  const kidsThemeColor = "#F9A825" // Bright orange color

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission here
    setFormSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  // Handle scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className={`container py-12 relative ${reservationType === "kids" ? "kids-theme" : ""}`}>
      {/* Add CSS for the kids theme */}
      {reservationType === "kids" && (
        <style jsx global>{`
          .kids-theme .bg-primary {
            background-color: ${kidsThemeColor} !important;
          }
          .kids-theme .text-primary {
            color: ${kidsThemeColor} !important;
          }
          .kids-theme .border-primary {
            border-color: ${kidsThemeColor} !important;
          }
          .kids-theme button:not(.text-white) {
            transition: all 0.2s;
          }
          .kids-theme button.bg-primary {
            background-color: ${kidsThemeColor} !important;
          }
          /* Add scroll margin to section elements */
          #regular, #pair-spare, #vip-suites, #info {
            scroll-margin-top: 100px;
          }
        `}</style>
      )}
      
      <PageHeader
        title={reservationType === "regular" ? "Reservations" : "Kids Party Packages"}
        description={reservationType === "regular" 
          ? "Reserve your lanes, plan a party, or book a special event. We have options for groups of all sizes."
          : "Celebrate your child's special day with a fun-filled bowling party package."}
        centered
      />

      {reservationType === "regular" ? (
        <>
          {/* Reservation Path Navigation */}
          <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-10">
            <div className="flex flex-col items-center space-y-1">
              <div className="bg-white rounded-xl p-4 shadow-md border border-muted">
                <h3 className="text-sm font-medium mb-3">Reservation Options</h3>
                <div className="flex flex-col space-y-4">
                  {/* Navigation items with connecting lines */}
                  <div className="relative">
                    <button 
                      onClick={() => scrollToSection("regular")}
                      className={`flex items-center space-x-2 text-sm transition-colors ${activeSection === "regular" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeSection === "regular" ? "bg-primary text-white" : "bg-muted"}`}>1</div>
                      <span>Regular Lanes</span>
                    </button>
                    <div className="absolute left-3 top-6 w-0.5 h-10 bg-muted"></div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => scrollToSection("pair-spare")}
                      className={`flex items-center space-x-2 text-sm transition-colors ${activeSection === "pair-spare" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeSection === "pair-spare" ? "bg-primary text-white" : "bg-muted"}`}>2</div>
                      <span>Pair & Spare</span>
                    </button>
                    <div className="absolute left-3 top-6 w-0.5 h-10 bg-muted"></div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => scrollToSection("vip-suites")}
                      className={`flex items-center space-x-2 text-sm transition-colors ${activeSection === "vip-suites" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeSection === "vip-suites" ? "bg-primary text-white" : "bg-muted"}`}>3</div>
                      <span>VIP Suites</span>
                    </button>
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => scrollToSection("info")}
                      className={`flex items-center space-x-2 text-sm transition-colors ${activeSection === "info" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeSection === "info" ? "bg-primary text-white" : "bg-muted"}`}>4</div>
                      <span>Contact Us</span>
                    </button>
                  </div>
                  
                  {/* Kids Parties Option with orange styling */}
                  <div className="mt-6 pt-6 border-t border-muted">
                    <button 
                      onClick={() => setReservationType("kids")}
                      className="flex items-center space-x-2 text-sm font-bold text-[#F9A825] hover:text-[#F57F17] transition-colors w-full"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#F9A825] text-white">
                        <span className="text-xs">→</span>
                      </div>
                      <span>Kids Parties</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Lane Reservations - Visual Introduction */}
          <div id="regular" className="mb-16 grid gap-8 md:grid-cols-2 scroll-mt-24">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=600&width=800" alt="Bowling lanes" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Regular Lane Reservations</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>
              </div>
              <p className="mb-6">
                Reserve individual lanes for casual bowling with friends and family. Our standard reservations give you 
                dedicated lanes without the wait, perfect for a fun night out or casual gatherings.
              </p>
              <div className="space-y-4">
                <p>
                  <strong>What's Included:</strong>
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
          <div className="mb-16">
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
                President's Day, Martin Luther King Day, Memorial Day, Veterans Day, Labor Day, Juneteenth, Independence
                Day, Day After Christmas, New Year's Day
              </p>
            </div>
          </div>

          {/* Group Reservations */}
          {/*  */}

          {/* Pair & Spare Package */}
          <div id="pair-spare" className="mb-16 grid gap-8 md:grid-cols-2 scroll-mt-24">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Pair & Spare Package</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>
              </div>
              <p className="mb-6">
                Our popular Pair & Spare Package is perfect for small to medium-sized groups looking for a complete bowling experience.
              </p>
              <div className="space-y-4">
                <p>
                  <strong>What's Included:</strong>
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>2 Bowling Lanes</li>
                  <li>2 Hours of Bowling</li>
                  <li>10 Pairs of Shoes</li>
                  <li>2 Pizzas</li>
                  <li>Unlimited Sodas for 10 Guests</li>
                  <li>10 $5 Arcade Cards</li>
                </ul>
                <p className="mt-4"><em>Package does not come with a server</em></p>
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

          {/* VIP Suites Section - Most Elaborate Option */}
          <div id="vip-suites" className="mb-16 bg-black text-white py-8 px-4 rounded-lg scroll-mt-24">
            <h2 className="mb-6 text-4xl font-extrabold text-center text-white gold-shimmer relative">
              <span className="relative z-10">Premium VIP Suites</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-400/20 to-yellow-500/10 rounded blur-md"></span>
            </h2>
            <p className="text-center mb-8 max-w-3xl mx-auto text-gray-300">
              Experience the ultimate in bowling luxury with our premium VIP suites. Perfect for corporate events, large parties, and special celebrations.
            </p>
            
            {/* Strike Zone VIP Suite */}
            <Card className="mb-8 bg-gray-900 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-2xl text-white">STRIKE ZONE VIP SUITE (4 LANE AREA)</CardTitle>
                <CardDescription className="text-gray-400">
                  Minimum 20 bowlers; Maximum 32 bowlers
                </CardDescription>
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
                        Check out our catering packages{' '}
                        <ImageModal 
                          trigger={<span className="text-white font-semibold hover:underline cursor-pointer hover:text-primary-200">SEE HERE</span>}
                          imageSrc="/branding/catering-2025.jpg"
                          imageAlt="Catering Packages 2025"
                          title="Catering Packages 2025"
                        />
                      </p>
                    </div>
                    <p className="mt-2 text-gray-300">2 Hour Minimum</p>
                    <Button className="mt-6 bg-white text-black hover:bg-gray-200">
                      Request Info
                    </Button>
                    <p className="mt-2 text-sm text-gray-400">Or Call <span className="font-medium text-gray-300">714-666-2695 ex238</span> for Pricing & Availability</p>
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
                <CardTitle className="text-2xl text-white">KINGPIN VIP SUITE (8 LANE SUITE)</CardTitle>
                <CardDescription className="text-gray-400">
                  Minimum 40 bowlers; Maximum 64 bowlers
                </CardDescription>
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
                        Check out our catering packages{' '}
                        <ImageModal 
                          trigger={<span className="text-white font-semibold hover:underline cursor-pointer hover:text-primary-200">SEE HERE</span>}
                          imageSrc="/branding/catering-2025.jpg"
                          imageAlt="Catering Packages 2025"
                          title="Catering Packages 2025"
                        />
                      </p>
                    </div>
                    <p className="mt-2 text-gray-300">3 Hour Minimum</p>
                    <Button className="mt-6 bg-white text-black hover:bg-gray-200">
                      Request Info
                    </Button>
                    <p className="mt-2 text-sm text-gray-400">Or Call <span className="font-medium text-gray-300">714-666-2695 ex238</span> for Pricing & Availability</p>
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
                <CardTitle className="text-2xl text-white">LARGER SUITES & EVENTS</CardTitle>
                <CardDescription className="text-gray-400">
                  For our most spectacular events and largest groups
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-4">Thinking big?</p>
                    <p className="mb-4 text-gray-300">12 lanes? 20 lanes? All 40 lanes? We can accommodate events of up to 320 bowlers!</p>
                    <p className="mb-4 font-bold">Don't hesitate!</p>
                    <Button className="mt-2 bg-white text-black hover:bg-gray-200">
                      Request Info
                    </Button>
                    <p className="mt-2 text-sm text-gray-400">Or Call <span className="font-medium text-gray-300">714-666-2695 ex238</span> for Pricing & Availability</p>
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src="/images/events/Large Events.jpg" alt="Large Event Space" fill className="object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // Kids Party Packages
        <>
          {/* Return to Regular Reservations Button */}
          <div className="mb-6 flex justify-start">
            <button 
              onClick={() => setReservationType("regular")} 
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
            >
              <span>← Back to Regular Reservations</span>
            </button>
          </div>

          <div className="mb-16">
            {/* Supercharge Kids Party */}
            <div className="mb-16 border-4 border-[#F9A825] rounded-lg overflow-hidden">
              <div className="bg-[#F9A825] text-white py-4 px-6">
                <h2 className="text-3xl font-bold text-center">Supercharge Kids Party at Concourse Bowling!</h2>
                <p className="text-center mt-2 italic">
                  Please note that this party package is for children only 16 and younger. Adults welcome to supervise.
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 p-8">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image src="/placeholder.svg?height=600&width=800" alt="Kids Bowling Party" fill className="object-cover" />
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="mb-6 text-center md:text-left">
                    <p className="text-4xl font-bold text-[#F9A825]">$850</p>
                    <p className="mt-1 font-medium">Starting with 20 kids!</p>
                    <p className="mt-1">$43.00 per Additional Kid (up to 32)</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="font-bold text-lg">What's Included:</p>
                    <ul className="list-inside list-disc space-y-2">
                      <li>4 Lane Suite decorated with red curtains</li>
                      <li>3 Hours of Party Time - 2.5 Hours of Bowling</li>
                      <li>Two Slices of Pizza per bowler - 1 French Fry Platter</li>
                      <li>Unlimited Soda</li>
                      <li>1 $10 Arcade Card per bowler</li>
                      <li>A dedicated party planner will assist you with all your party details</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <p className="font-medium mb-2">
                      To book, please call <span className="font-bold">(714) 666-2695 ext. 238</span>
                    </p>
                    <Button size="lg" className="px-8 bg-[#F9A825] hover:bg-[#F57F17] transition-colors">
                      Book Your Kids Party
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-lg font-bold mb-4">Why Choose Our Supercharge Kids Party Package?</h3>
                  <p className="mb-4">
                    Our Supercharge Kids Party package offers the perfect combination of bowling fun, delicious food, and arcade excitement. Your child and their friends will have a blast while our dedicated party planner takes care of all the details!
                  </p>
                  <p>
                    Call us at <strong>(714) 666-2695 ext. 238</strong> or email us at <strong>events@concoursebowling.com</strong> to book your child's unforgettable bowling party today!
                  </p>
                </div>
              </div>
            </div>
            
            {/* End of Season Sports Team Parties */}
            <div className="mb-16 border-4 border-[#4CAF50] rounded-lg overflow-hidden">
              <div className="bg-[#4CAF50] text-white py-4 px-6">
                <h2 className="text-3xl font-bold text-center">END OF SEASON SPORTS TEAM PARTIES</h2>
                <p className="text-center mt-2 text-xl font-bold">
                  Celebrate your team's season with a memorable bowling party!
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 p-8">
                <div className="flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-4xl font-black text-[#4CAF50] block mb-2">$200</span>
                    <div className="bg-[#edf7ed] p-4 rounded-md border-l-4 border-[#4CAF50] font-bold">
                      <p>2 LANES FOR 90 MINS</p>
                      <p>12 BOWLERS WITH SHOES</p>
                      <p>PIZZA • SODA & AWARDS AREA</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-[#4CAF50]">Team Party Package Includes:</h3>
                  <div className="space-y-4">
                    <ul className="list-inside list-disc space-y-2">
                      <li>Two adjacent bowling lanes for 90 minutes</li>
                      <li>Shoes for up to 12 bowlers</li>
                      <li>2 large pizzas</li>
                      <li>Unlimited soda for all participants</li>
                      <li>Dedicated space for trophy presentations and team celebrations</li>
                      <li>Special coach recognition opportunities</li>
                    </ul>
                    
                    <div className="mt-4">
                      <p className="font-medium">Perfect for baseball, softball, soccer, basketball teams and more!</p>
                      <p className="text-sm mt-1">Additional bowlers or time can be added for an extra charge.</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-bold text-[#4CAF50]">Reservations required!</p>
                      <p className="mt-1">Please call <span className="font-bold">(714) 666-2695 ext. 238</span> to book your team party.</p>
                      <Button size="lg" className="mt-4 px-8 bg-[#4CAF50] hover:bg-[#388E3C] transition-colors">
                        Contact for Team Party
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image src="/placeholder.svg?height=600&width=800" alt="Sports Team Party" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div id="info" className={`mb-16 ${reservationType === "kids" ? "bg-orange-50 p-8 rounded-lg" : ""} scroll-mt-24`}>
        <h2 className={`mb-6 text-2xl font-bold ${reservationType === "kids" ? "text-[#F9A825]" : ""}`}>
          General Reservation Information
        </h2>
        <p className="text-lg mb-4">
          Call us at <strong>(714) 666-2695</strong> email us at <strong>events@concoursebowling.com</strong> or visit our center during business hours.
        </p>
        <p className="text-lg mb-4">
          We recommend booking at least 1-2 weeks in advance for weekend reservations and special events.
        </p>
        <Button 
          asChild 
          size="lg" 
          className={`mt-4 ${reservationType === "kids" ? "bg-[#F9A825] hover:bg-[#F57F17]" : ""}`}
        >
          <Link href="/contact">Contact Us for Reservations</Link>
        </Button>
      </div>
    </div>
  )
}

