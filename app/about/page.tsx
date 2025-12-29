"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Trophy, ThumbsUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <PageHeader
        title="About Concourse Bowling"
        description="Providing exceptional bowling experiences to Anaheim and surrounding communities since 1990."
        centered
      />

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/images/bowling/concourse vintage.jpg"
            alt="Concourse Bowling Center vintage photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
          <p className="mb-4">
            Concourse Bowling Center has been a fixture in the Anaheim community since 1990. What started as a small
            family-owned bowling alley has grown into a premier entertainment destination serving Anaheim, Fullerton,
            Yorba Linda, Orange, Brea, and many more areas.
          </p>
          <p className="mb-4">
            Over the years, we've expanded our facilities to include a full-service bar and grill, an exciting arcade,
            and modern bowling lanes while maintaining the friendly, welcoming atmosphere that has made us a favorite
            among locals for over three decades.
          </p>
          <p>
            Our commitment to providing exceptional service, maintaining state-of-the-art equipment, and creating
            memorable experiences for our guests has remained unchanged since day one.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            To provide a fun, welcoming environment where people of all ages and skill levels can enjoy the sport of
            bowling and create lasting memories with friends and family.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <ThumbsUp className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We maintain the highest standards in our facilities, equipment, food, and service to ensure an
                exceptional experience for every guest.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <Users className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We're proud to be a gathering place for the community, hosting leagues, tournaments, fundraisers, and
                special events that bring people together.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <Trophy className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We strive for excellence in everything we do, from the maintenance of our lanes to the preparation of
                our food and the friendliness of our staff.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CalendarDays className="mb-2 h-12 w-12 text-primary" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We continuously update our facilities and offerings to provide the latest in bowling technology,
                entertainment options, and customer conveniences.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Meet Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=300&width=300" alt="John Smith" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>John Smith</CardTitle>
              <CardDescription>Owner & General Manager</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                John has been with Concourse Bowling since its founding in 1990. His passion for bowling and commitment
                to customer service has shaped our center into what it is today.
              </p>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=300&width=300" alt="Sarah Johnson" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Sarah Johnson</CardTitle>
              <CardDescription>League Coordinator</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sarah has been organizing our leagues for over 15 years. Her attention to detail and friendly demeanor
                make her a favorite among our regular bowlers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=300&width=300" alt="Mike Rodriguez" fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>Mike Rodriguez</CardTitle>
              <CardDescription>Head Chef</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mike brings over 20 years of culinary experience to our Bar & Grill. His creative menu items and
                consistent quality keep our customers coming back for more.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Facility</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src="/images/bowling/Facility Shot.jpg" alt="Bowling lanes" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src="/images/food/concourse_nachoes.jpg" alt="Bar area" fill className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src="/images/arcade/space invaders.jpg" alt="Arcade" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-xl font-bold">State-of-the-Art Bowling Center</h3>
            <p className="mb-4">
              Our facility features 32 modern bowling lanes equipped with automatic scoring, bumpers for kids, and
              comfortable seating areas. We regularly update our equipment to ensure the best possible bowling
              experience.
            </p>
            <h3 className="mb-4 text-xl font-bold">Menus</h3>
            <p className="mb-4">
              Enjoy delicious food and beverages at our full-service restaurant and bar. From appetizers to entrees, we
              offer a variety of options that can be enjoyed at your lane or in our dining area.
            </p>
            <h3 className="mb-4 text-xl font-bold">Arcade</h3>
            <p className="mb-4">
              Take a break from bowling and enjoy our selection of arcade games. With options for all ages, our arcade
              is the perfect complement to your bowling experience.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Pro Shop</h2>
        <div className="max-w-3xl mx-auto bg-muted/30 rounded-lg p-6 shadow-sm">
          <div className="text-center mb-6 pb-4 border-b">
            <h3 className="text-2xl font-bold text-primary mb-2">Rolling Balls Pro Shop</h3>
            <p className="text-lg">Your one-stop destination for all your bowling equipment needs</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
              <div className="rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center mb-3">
                <span className="text-primary text-xl">📞</span>
              </div>
              <p className="font-medium">Contact Us:</p>
              <p className="text-lg font-semibold">(949) 872-1627</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
              <div className="rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center mb-3">
                <span className="text-primary text-xl">📍</span>
              </div>
              <p className="font-medium">Location:</p>
              <p>3364 E. La Palma Ave.</p>
              <p>Anaheim CA</p>
              <p className="text-sm text-muted-foreground italic mt-1">Just inside the northern entrance</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
              <div className="rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center mb-3">
                <span className="text-primary text-xl">🕒</span>
              </div>
              <p className="font-medium">Hours:</p>
              <ul className="space-y-1 mt-1">
                <li>Monday: <span className="font-medium">CLOSED</span></li>
                <li>Tue-Fri: <span className="font-medium">1:00-6:00pm</span></li>
                <li>Sat-Sun: <span className="font-medium">4:00-7:00pm</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t text-center">
            <p>
              Our pro shop offers expert drilling services, custom fitting, and a wide selection of bowling balls, bags, shoes, and accessories from top brands.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Community Involvement</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="mb-4">
              At Concourse Bowling, we believe in giving back to the community that has supported us for over 30 years.
              We're proud to be involved in various community initiatives and charitable events.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-bold">Charity Bowling Events</h3>
                <p className="text-sm text-muted-foreground">
                  We regularly host charity bowling tournaments to raise funds for local organizations and causes.
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-bold">School Programs</h3>
                <p className="text-sm text-muted-foreground">
                  We offer special rates and programs for school groups, helping to introduce the sport of bowling to
                  the next generation.
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-bold">Local Sponsorships</h3>
                <p className="text-sm text-muted-foreground">
                  We sponsor local sports teams and community events, helping to foster a sense of community and support
                  local initiatives.
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/branding/special olympics.jpg"
              alt="Special Olympics charity event at Concourse Bowling"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Come Bowl With Us!</h2>
            <p className="mb-6">
              Experience the fun and excitement of Concourse Bowling Center for yourself. Whether you're a seasoned
              bowler or just looking for a fun night out, we've got something for everyone.
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

