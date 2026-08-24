"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  CheckCircle,
  Download,
  Handshake,
  MapPin,
  Megaphone,
  Phone,
  PartyPopper,
  Ticket,
  Trophy,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"

const impactStats = [
  { label: "Years in Anaheim", value: "35+" },
  { label: "Bowling Lanes", value: "32" },
  { label: "Community Events Hosted", value: "100+" },
  { label: "Cities We Serve", value: "6+" },
]

const donationOpportunities = [
  {
    icon: Ticket,
    title: "Auction & Raffle Packages",
    description:
      "Running a school auction or charity raffle? We'll put together a bowling party package, gift cards, or game passes to help you raise more.",
  },
  {
    icon: PartyPopper,
    title: "Fundraiser Nights",
    description:
      "Bring your group in for a night of bowling and we'll donate a percentage of the proceeds back to your organization. Easy to plan, fun for everyone.",
  },
  {
    icon: Building2,
    title: "Venue Space",
    description:
      "Need a space for a nonprofit meeting, kickoff, or celebration? We offer discounted (and sometimes donated) lane and party room space for qualifying organizations.",
  },
  {
    icon: Trophy,
    title: "Sponsorships",
    description:
      "From youth leagues to Special Olympics to local school teams, we love putting our name behind causes that bring the community together.",
  },
]

const partnershipBenefits = [
  {
    title: "Face Time With Our Regulars",
    description: "Get your name in front of the leagues, families, and groups who bowl with us every single week.",
  },
  {
    title: "Logo & Shoutouts",
    description: "We'll feature your organization on in-house signage, our website, and social media.",
  },
  {
    title: "Social Media Love",
    description: "Expect posts, tags, and stories celebrating our partnership across our channels.",
  },
  {
    title: "Perks For Your People",
    description: "We'll set up exclusive discounts for your members, employees, or team.",
  },
  {
    title: "Custom Event Packages",
    description: "Need something specific? We'll build a package around what actually works for your group.",
  },
]

const partnershipTypes = [
  { value: "donation", label: "Donation Request" },
  { value: "fundraiser", label: "Fundraiser Night" },
  { value: "venue", label: "Venue Space" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "other", label: "Other" },
]

export default function CommunityPartnershipsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission here
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="container py-12">
      <PageHeader
        title="Let's Team Up!"
        description="We love being part of the Anaheim community. Whether you're a school, nonprofit, or local business — let's find a way to knock down some pins together."
        centered
      />

      {/* Why Partner With Us */}
      <div className="mb-16">
        <div className="mb-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Why Partner With Us?</h2>
            <p className="mb-4">
              Concourse Bowling Center has been a fixture in Anaheim since 1990, and we know that a business is only
              as strong as the community around it. Over the decades we've hosted fundraisers, sponsored teams, and
              opened our lanes to causes big and small — and we're always looking for new friends to team up with.
            </p>
            <p>
              If you're a school, nonprofit, youth league, or local organization, we want to hear from you. Let's
              figure out how we can support what you're doing.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/branding/special olympics.jpg"
              alt="Concourse Bowling supporting a Special Olympics community event"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Donation Opportunities */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Donation Opportunities</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Here are a few of the ways we love giving back — but if you have something else in mind, just ask.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {donationOpportunities.map((opportunity) => (
            <Card key={opportunity.title} className="flex flex-col items-center text-center">
              <CardHeader>
                <opportunity.icon className="mb-2 h-12 w-12 text-primary" />
                <CardTitle>{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{opportunity.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partnership Benefits */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-video overflow-hidden rounded-lg md:order-2">
          <Image
            src="/images/bowling/league.jpg"
            alt="Community members enjoying league bowling at Concourse"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center md:order-1">
          <h2 className="mb-4 text-2xl font-bold">What's In It For You?</h2>
          <p className="mb-6 text-muted-foreground">
            Partnering with us isn't a one-way street. Here's what our partners get in return.
          </p>
          <div className="space-y-4">
            {partnershipBenefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="rounded-full bg-primary p-1 text-primary-foreground">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current & Past Partners */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Our Community MVPs</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A huge thank you to the schools, teams, and organizations we've partnered with over the years. This
            lineup is growing — check back soon to see who's joined the team.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[3/2] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-6 text-center"
            >
              <Handshake className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Partner spotlight coming soon</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Inquiry Form */}
      <div id="inquiry-form" className="mb-16 grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Start a Conversation</CardTitle>
            <CardDescription>
              Tell us a bit about your organization and what you have in mind. We review every request personally and
              try to respond within a few business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-bold">Thanks for Reaching Out!</h3>
                <p className="text-muted-foreground">
                  We've received your partnership inquiry and will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" placeholder="Anaheim Youth Sports League" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Jane Doe" required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnership-type">Type of Partnership</Label>
                  <Select>
                    <SelectTrigger id="partnership-type">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {partnershipTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Tell Us More</Label>
                  <Textarea
                    id="message"
                    placeholder="What's your event or organization about, and how can we help?"
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Grab the Details</CardTitle>
              <CardDescription>
                Download our partnership packet for a full rundown of donation options, benefits, and how it all
                works.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/partnership-packet.pdf" download>
                  <Download className="h-4 w-4" />
                  Download Partnership Packet
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prefer to Talk It Through?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-muted-foreground">(714) 666-2695</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Megaphone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-muted-foreground">events@concoursebowling.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-muted-foreground">3364 E La Palma Ave, Anaheim, CA 92806</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Ready to Make an Impact Together?</h2>
            <p className="mb-6">
              We're right up your alley. Reach out and let's start building a partnership that's good for your
              organization and good for the community.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <Button size="lg" variant="secondary" asChild>
              <Link href="#inquiry-form">Start a Conversation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <a href="tel:+17146662695">Call (714) 666-2695</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
