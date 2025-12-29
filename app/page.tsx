"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Calendar, Users, Trophy, Pizza, Gamepad } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { AnimatedHeader } from "@/components/animated-header"

export default function Home() {
  const rRef = useRef(null);
  const oRef = useRef(null);
  const llRef = useRef(null);
  const restOfTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window !== 'undefined') {
      // Create a timeline for more control
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // Initial states
      gsap.set(rRef.current, { 
        autoAlpha: 0,
        y: -50,
      });
      
      gsap.set(oRef.current, { 
        autoAlpha: 0,
        x: -100, // Start off-screen to the left
        rotation: -720, // Will make 2 full rotations
      });
      
      gsap.set(llRef.current, { 
        autoAlpha: 0,
        y: -50,
      });
      
      gsap.set(restOfTextRef.current, { 
        autoAlpha: 0, 
        y: -50,
      });
      
      gsap.set(subtitleRef.current, { 
        autoAlpha: 0, 
        y: 20
      });
      
      gsap.set(buttonsRef.current, { 
        autoAlpha: 0, 
        y: 20
      });
      
      // Animation sequence
      tl.to(rRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "back.out(1.7)"
      })
      .to(oRef.current, {
        duration: 1.2,
        autoAlpha: 1,
        x: 0,
        rotation: 0,
        ease: "bounce.out", // Bouncy effect to simulate rolling
      }, "-=0.3")
      .to(llRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to(restOfTextRef.current, {
        duration: 0.6,
        autoAlpha: 1,
        y: 0,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to(subtitleRef.current, {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        ease: "power2.out"
      }, "-=0.3")
      .to(buttonsRef.current, {
        duration: 0.6,
        autoAlpha: 1,
        y: 0,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full border-2 border-red-500">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bowling/exterior.png"
            alt="Bowling lanes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-25 dark:opacity-75"></div>
        </div>
        <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-16 text-center text-white md:px-6 md:py-24 lg:px-8 lg:py-40">
          <h1 className="mb-4 text-6xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl flex flex-wrap justify-center items-baseline whitespace-nowrap">
            <span ref={rRef}>R</span>
            <span ref={oRef} className="inline-block">O</span>
            <span ref={llRef}>LL</span>
            <span ref={restOfTextRef} className="inline-flex whitespace-nowrap ml-1 sm:ml-2 md:ml-4">WITH US!</span>
          </h1>
          <p ref={subtitleRef} className="mb-6 max-w-2xl text-base text-bold sm:text-lg md:text-xl">
           Food, fun, and competition<br/>ALL UNDER ONE ROOF.
          </p>
          <div ref={buttonsRef} className="flex-responsive gap-3 w-full max-w-md mx-auto justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/reservations">Reserve Today!</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/league-bowling">Join a League</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative bg-muted py-12 md:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bowling/concourse vintage.jpg"
            alt="Vintage bowling alley"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-25 dark:opacity-75"></div>
        </div>
        <div className="container-responsive relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeader
              text="Rolling since 1990"
              className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white"
              delay={0.2}
            />
            <p className="mb-6 md:mb-8 text-base md:text-lg text-white">
              Serving Anaheim, Fullerton, Yorba Linda, Orange, Brea, and many more areas with quality entertainment and
              memorable experiences for over three decades.
            </p>
            <Button className="w-full sm:w-auto" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 h-full">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Bowling
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="mb-4 flex-grow">
                  Enjoy our lanes powered by Brunswick SYNC built for casual games or competitive play.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/bowling">View Rates</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  League Bowling
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="mb-4 flex-grow">
                  Join one of our many leagues for regular competitive play and prizes.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/league-bowling">View Leagues</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Pizza className="h-5 w-5 text-primary" />
                  Menus
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="mb-4 flex-grow">
                  Delicious food and drinks to enjoy while you bowl or at our restaurant.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/menu">View Menu</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Gamepad className="h-5 w-5 text-primary" />
                  Arcade
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="mb-4 flex-grow">
                  Enjoy our selection of arcade games for all ages between bowling games.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/arcade">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <AnimatedHeader
                text="Upcoming Events"
                className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
                delay={0.2}
              />
              <p className="mb-6 text-lg text-muted-foreground">
                From cosmic bowling nights to tournaments and special promotions, there's always something happening at
                Concourse Bowling.
              </p>
              <Button className="w-fit" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Featured Events</h3>
              </div>
              <ul className="space-y-4">
                <li className="border-b pb-4">
                  <p className="font-medium">Cosmic Bowling Night</p>
                  <p className="text-sm text-muted-foreground">Every Friday & Saturday, 9PM - 1AM</p>
                </li>
                <li className="border-b pb-4">
                  <p className="font-medium">Family Day Special</p>
                  <p className="text-sm text-muted-foreground">Sundays, 10AM - 2PM</p>
                </li>
                <li>
                  <p className="font-medium">Summer League Sign-ups</p>
                  <p className="text-sm text-muted-foreground">Starting June 1st</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <AnimatedHeader
                text="Contact Us"
                className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
                delay={0.2}
              />
              <ul className="mb-8 space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>3364 E La Palmera Ave, Anaheim, CA 92806</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>(714) 666-2695</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>info@concoursebowling.com</span>
                </li>
              </ul>
              <div className="rounded border p-4">
                <h3 className="mb-2 font-medium">Hours of Operation</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Monday - Thursday:</span>
                    <span>9AM - 11PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday:</span>
                    <span>9AM - 1AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9AM - 1AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>9AM - 11PM</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center md:px-6 lg:px-8">
          <AnimatedHeader
            text="Don't let the line get you down!"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            delay={0.2}
          />
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Reserve your lanes today and skip the wait. Perfect for birthday parties, corporate events, or just a fun
            night out with friends.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/reservations">Reserve Today!</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

