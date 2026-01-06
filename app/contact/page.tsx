"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission here
    setFormSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="container py-12">
      <PageHeader
        title="Contact Us"
        description="Have questions or need more information? We're here to help. Reach out to us using any of the methods below."
        centered
      />

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="reservation">Reservation Question</SelectItem>
                        <SelectItem value="league">League Bowling</SelectItem>
                        <SelectItem value="party">Birthday Party/Event</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">3364 E La Palmera Ave, Anaheim, CA 92806</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">(714) 666-2695</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@concoursebowling.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Hours of Operation</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Monday: 4PM - 10PM</p>
                    <p>Tuesday - Thursday: 11AM - 11PM</p>
                    <p>Friday - Saturday: 11AM - Midnight</p>
                    <p>Sunday: 11AM - 11PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.0088651367!2d-117.8651!3d33.8367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd5a9b8172a65%3A0x78c9f7713a95e1ba!2s3364%20E%20La%20Palma%20Ave%2C%20Anaheim%2C%20CA%2092806!5e0!3m2!1sen!2sus!4v1710766158!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Concourse Bowling Center Location"
                ></iframe>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  We're conveniently located in Anaheim, just minutes from major highways and attractions. Plenty of
                  free parking available.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/reservations">Make a Reservation</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/league-bowling">League Bowling Information</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/events">Events & Specials</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="https://www2.appone.com/Search/Search.aspx?ServerVar=concoursebowl.appone.com">Job Opportunities</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-8">
        <h2 className="mb-6 text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-bold">Do you take reservations?</h3>
            <p className="text-muted-foreground">
              Yes, we accept reservations for lanes, especially for groups. You can make a reservation online or by
              calling us directly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">What are your busiest times?</h3>
            <p className="text-muted-foreground">
              Friday and Saturday evenings are typically our busiest times. We recommend making a reservation or coming
              earlier in the day to avoid waiting.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Do you have bumpers for kids?</h3>
            <p className="text-muted-foreground">
              Yes, we have automatic bumpers that can be set up for specific players in your lane, allowing adults and
              children to play together.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Can we bring our own food and drinks?</h3>
            <p className="text-muted-foreground">
              Outside food and beverages are not permitted, with the exception of birthday cakes and desserts. We have a
              full-service bar and grill with a variety of options.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Do you host birthday parties?</h3>
            <p className="text-muted-foreground">
              Yes, we offer several birthday party packages that include bowling, food, and arcade play. Contact us for
              details and availability.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">How do I join a bowling league?</h3>
            <p className="text-muted-foreground">
              You can sign up for a league by visiting our League Bowling page, calling us, or stopping by in person. We
              have leagues for all skill levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

