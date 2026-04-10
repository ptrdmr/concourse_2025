import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, DollarSign } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function EventsPage() {

  return (
    <div className="container py-12">
      <PageHeader
        title="Events & Specials"
        description="Spring Break lane deals and weekly specials through May 31, plus tournaments and holiday hours. Check back often — we update promotions throughout the year."
        centered
      />

      {/* Weekly Specials */}
      <div className="mb-16 rounded-2xl bg-[#FAF9F6] dark:bg-muted/30 p-6 md:p-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Weekly Specials
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1 w-16 bg-primary rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">Now – May 31</p>
          </div>
        </div>

        {/* Mobile: Horizontal scroll carousel | Desktop: 2-column grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* Tuesday Card - Red tinted */}
          <div className="group flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-red-50 dark:bg-red-950/20">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/bowling/Facility Shot.jpg"
                alt="Tuesday bowling special"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">Tuesday</p>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Game Special</h3>
                <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full mb-1">
                  3 Games for $14
                </span>
                <p className="text-sm text-muted-foreground">Open - 3PM • 1 per person per day</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">Tuesday Unlimited</h4>
                <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full mb-1">
                  $18/person
                </span>
                <p className="text-sm text-muted-foreground">2 Hours + Shoes • 8PM - Close</p>
              </div>
            </div>
          </div>

          {/* Wednesday Card - Cream/Yellow tinted */}
          <div className="group flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#FFFACD] dark:bg-yellow-950/20">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/food/happy hour.jpg"
                alt="Wednesday happy hour"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 uppercase tracking-wide mb-2">Wednesday</p>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Game Special</h3>
                <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full mb-1">
                  3 Games for $14
                </span>
                <p className="text-sm text-muted-foreground">Open - 3PM • 1 per person per day</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-1">Late Night Happy Hour</h4>
                <p className="text-sm text-muted-foreground">9PM - Close</p>
              </div>
            </div>
          </div>

          {/* Thursday Card - Dark theme like flyer */}
          <div className="group flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#1A1A1A] text-white">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/bowling/concourse vintage.jpg"
                alt="Thursday bowling special"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Thursday</p>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Game Special</h3>
                <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full mb-1">
                  3 Games for $14
                </span>
                <p className="text-sm text-gray-400">Open - 3PM • 1 per person per day</p>
              </div>
            </div>
          </div>

          {/* Friday Card - Dark theme */}
          <div className="group flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#1A1A1A] text-white">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/bowling/dark lanes.jpg"
                alt="Friday night cosmic bowling"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Friday</p>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Pre-Game Special</h3>
                <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full mb-1">
                  3 Games for $16
                </span>
                <p className="text-sm text-gray-400">Open - 3PM</p>
              </div>

              <div className="mb-4">
                <h4 className="text-xl font-bold mb-1">Cosmic Bowling</h4>
                <p className="text-sm text-gray-400">5:00PM - Close</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-1">Live DJ</h4>
                <p className="text-sm text-gray-400">8:00PM - Close</p>
              </div>
            </div>
          </div>

          {/* Sunday Card - Cream/Yellow tinted */}
          <div className="group flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#FFFACD] dark:bg-yellow-950/20">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/bowling/exterior.png"
                alt="Sunday bowling specials"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 uppercase tracking-wide mb-2">Sunday</p>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">Cosmic Bowling</h3>
                <p className="text-sm text-muted-foreground">Open - 5:00PM</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">Late Night Specials</h4>
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full">
                    $5 Games
                  </span>
                  <span className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full">
                    $5 Shoes
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Bar Happy Hour • 8PM - Close</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <span className="text-xs text-muted-foreground">Swipe for more</span>
          <span className="text-muted-foreground">→</span>
        </div>
      </div>

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
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
            {[
              "New Year's Day",
              "Martin Luther King Day",
              "President's Day",
              "Memorial Day",
              "Juneteenth",
              "Independence Day",
              "Labor Day",
              "Veterans Day",
              "Day After Christmas",
            ].map((holiday) => (
              <div key={holiday} className="flex items-center gap-2 py-1">
                <CalendarIcon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{holiday}</span>
              </div>
            ))}
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
                <li>• Friday: 5:00PM - Close</li>
                <li>• Sunday: Open - 5:00PM</li>
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

