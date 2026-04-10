"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { MapPin, Phone, Mail } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { AnimatedHeader } from "@/components/animated-header"
import {
  homepageEventsCarousel,
  type HomepageSpringSlide,
  type HomepageTournamentSlide,
  type SpringRowVariant,
} from "@/lib/homepage-events"
import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"

const variantStyles: Record<SpringRowVariant, { bg: string; title: string; line: string }> = {
  cyan:   { bg: "bg-[#00BCD4]", title: "text-[#1A237E]",  line: "text-[#1A237E]" },
  orange: { bg: "bg-[#FF7043]", title: "text-[#FFD54F]",  line: "text-white" },
  navy:   { bg: "bg-[#283593]", title: "text-[#00BCD4]",  line: "text-white" },
}

function EventsSpringSlide({ slide }: { slide: HomepageSpringSlide }) {
  const s = variantStyles[slide.variant]
  return (
    <div className={cn("relative w-full h-[560px] md:h-[560px]", s.bg)}>
      <div className="container mx-auto flex h-full flex-col md:flex-row md:items-stretch">
        {/* Text content */}
        <div className="flex flex-1 flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:py-14">
          <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-sm font-black uppercase tracking-widest text-white/70">Spring Break</span>
            <span className="text-sm font-bold italic text-[#FFD54F] md:text-base">Now – May 31st</span>
          </div>

          <h3 className="mb-6 text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-md sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
            {slide.dayLabel}
          </h3>

          <div
            className={cn(
              "flex flex-col gap-4 md:gap-5",
              slide.deals.length > 1 && "lg:flex-row lg:flex-wrap"
            )}
          >
            {slide.deals.map((deal, i) => (
              <div key={i} className="lg:min-w-[200px] lg:max-w-sm">
                {deal.title ? (
                  <h4 className={cn("mb-2 text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl", s.title)}>
                    {deal.title}
                  </h4>
                ) : null}
                <ul className="space-y-1">
                  {deal.lines.map((line, j) => (
                    <li
                      key={j}
                      className={cn(
                        "font-bold uppercase leading-snug tracking-tight",
                        j === 0 ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg opacity-90",
                        s.line
                      )}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
            <Button size="lg" asChild className="bg-[#1A237E] font-bold text-white shadow-lg hover:bg-[#111836]">
              <Link href="/reservations">Reserve your lane today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/50 font-bold text-white hover:bg-white/10">
              <Link href="/events">View all specials</Link>
            </Button>
          </div>
        </div>

        {/* Photo — hidden on mobile, right side on md+ */}
        <div className="relative hidden w-[40%] max-w-[480px] shrink-0 md:block">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 0px, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-current/20 to-transparent" style={{ color: "inherit" }} />
        </div>
      </div>
    </div>
  )
}

function EventsTournamentSlide({ slide }: { slide: HomepageTournamentSlide }) {
  return (
    <div className="relative w-full h-[560px] md:h-[560px] bg-[#1A237E]">
      <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:px-10 md:py-12 lg:gap-12 lg:py-14">
        <div className="relative h-[200px] w-[200px] shrink-0 sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px]">
          <Image src={slide.image} alt={slide.imageAlt} fill className="object-contain drop-shadow-2xl" sizes="280px" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="text-sm font-black uppercase tracking-widest text-[#00BCD4]">Tournament</span>
          <h3 className="mt-2 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {slide.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{slide.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button size="lg" asChild className="bg-red-600 font-bold shadow-lg hover:bg-red-700">
              <a href={slide.registerUrl} target="_blank" rel="noopener noreferrer">
                {slide.registerLabel}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/50 font-bold text-white hover:bg-white/10">
              <Link href="/events">View all events</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        plugins={[Autoplay({ delay: 7000, stopOnInteraction: true })]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {homepageEventsCarousel.map((slide) => (
            <CarouselItem key={slide.id} className="basis-full pl-0">
              {slide.kind === "spring-break" ? (
                <EventsSpringSlide slide={slide} />
              ) : (
                <EventsTournamentSlide slide={slide} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2 md:bottom-6">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === current ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </section>
  )
}

const primaryCategoryCards = [
  {
    title: "Reservations & Parties",
    description: "Birthdays, corporate events, and lane reservations for groups of any size.",
    href: "/reservations",
    cta: "Reserve your party",
    image: "/images/bowling/kids_party.png",
    imageAlt: "Kids bowling party at Concourse",
  },
  {
    title: "League Bowling",
    description: "Sanctioned and fun leagues with regular play, camaraderie, and prizes.",
    href: "/league-bowling",
    cta: "Join a league",
    image: "/images/bowling/league.jpg",
    imageAlt: "League bowling at Concourse",
  },
  {
    title: "Bar & Cafe",
    description: "Burgers, pizza, drinks, and happy hour — at your lane or in our restaurant.",
    href: "/menu",
    cta: "View our menu",
    image: "/images/food/homepage_bar_cafe.jpg",
    imageAlt: "Margarita and chips at Concourse Bar & Cafe",
  },
  {
    title: "Arcade",
    description: "Classic cabinets and the latest games for all ages between frames.",
    href: "/arcade",
    cta: "Play now",
    image: "/images/arcade/homepage_arcade.jpg",
    imageAlt: "Space Invaders Frenzy arcade cabinet at Concourse",
  },
] as const

export default function Home() {
  const rRef = useRef(null)
  const oRef = useRef(null)
  const llRef = useRef(null)
  const restOfTextRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      gsap.set(rRef.current, {
        autoAlpha: 0,
        y: -50,
      })

      gsap.set(oRef.current, {
        autoAlpha: 0,
        x: -100,
        rotation: -720,
      })

      gsap.set(llRef.current, {
        autoAlpha: 0,
        y: -50,
      })

      gsap.set(restOfTextRef.current, {
        autoAlpha: 0,
        y: -50,
      })

      gsap.set(subtitleRef.current, {
        autoAlpha: 0,
        y: 20,
      })

      gsap.set(buttonsRef.current, {
        autoAlpha: 0,
        y: 20,
      })

      tl.to(rRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "back.out(1.7)",
      })
        .to(
          oRef.current,
          {
            duration: 1.2,
            autoAlpha: 1,
            x: 0,
            rotation: 0,
            ease: "bounce.out",
          },
          "-=0.3"
        )
        .to(
          llRef.current,
          {
            duration: 0.5,
            autoAlpha: 1,
            y: 0,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          restOfTextRef.current,
          {
            duration: 0.6,
            autoAlpha: 1,
            y: 0,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          subtitleRef.current,
          {
            duration: 0.8,
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          buttonsRef.current,
          {
            duration: 0.6,
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
          },
          "-=0.4"
        )
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 z-0">
          <video
            src="/pins_small.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-25 dark:opacity-75" />
        </div>
        <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-16 text-center text-white md:px-6 md:py-24 lg:px-8 lg:py-40">
          <h1 className="mb-4 flex flex-wrap items-baseline justify-center whitespace-nowrap text-6xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span ref={rRef}>R</span>
            <span ref={oRef} className="inline-block">
              O
            </span>
            <span ref={llRef}>LL</span>
            <span ref={restOfTextRef} className="ml-1 inline-flex whitespace-nowrap sm:ml-2 md:ml-4">
              WITH US!
            </span>
          </h1>
          <p ref={subtitleRef} className="text-bold mb-6 max-w-2xl text-base sm:text-lg md:text-xl">
            Food, fun, and competition
            <br />
            ALL UNDER ONE ROOF.
          </p>
          <div ref={buttonsRef} className="flex-responsive mx-auto w-full max-w-md items-center justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/reservations">Reserve Today!</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20 sm:w-auto" asChild>
              <Link href="/league-bowling">Join a League</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Primary categories — image cards */}
      <section className="border-b border-border/40 bg-muted/40 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Plan your visit</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Everything you need for a great night out — reserve lanes, join a league, eat well, and play.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {primaryCategoryCards.map((card) => (
              <Link
                key={card.href + card.title}
                href={card.href}
                className="group relative block min-h-[280px] overflow-hidden rounded-2xl border-2 border-transparent shadow-lg transition-all duration-300 hover:border-red-600/80 hover:shadow-xl md:min-h-[320px]"
              >
                <Image src={card.image} alt={card.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                  <h3 className="text-2xl font-bold tracking-tight">{card.title}</h3>
                  <p className="mt-2 max-w-lg text-sm text-white/90 md:text-base">{card.description}</p>
                  <span className="mt-4 inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-red-700">
                    {card.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Walk-in bowling and hourly rates?{" "}
            <Link href="/bowling" className="font-medium text-red-600 underline-offset-4 hover:underline">
              See bowling rates
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Events & Specials — full-bleed rotating carousel */}
      <EventsCarousel />

      {/* Our History */}
      <section className="relative bg-muted py-12 md:py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bowling/concourse vintage.jpg"
            alt="Vintage bowling alley"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-25 dark:opacity-75" />
        </div>
        <div className="container-responsive relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeader
              text="Rolling since 1990"
              className="mb-4 text-2xl font-bold tracking-tight text-white md:mb-6 md:text-3xl lg:text-4xl"
              delay={0.2}
            />
            <p className="mb-6 text-base text-white md:mb-8 md:text-lg">
              Serving Anaheim, Fullerton, Yorba Linda, Orange, Brea, and many more areas with quality entertainment and
              memorable experiences for over three decades.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button className="w-full bg-white text-foreground hover:bg-white/90 sm:w-auto" asChild>
                <Link href="/about">Explore our history</Link>
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/reservations">Reserve now</Link>
              </Button>
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
              <div className="mb-6 rounded border p-4">
                <h3 className="mb-2 font-medium">Hours of Operation</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Monday:</span>
                    <span>4PM - 10PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tuesday - Thursday:</span>
                    <span>11AM - 11PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday - Saturday:</span>
                    <span>11AM - Midnight</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>11AM - 11PM</span>
                  </li>
                </ul>
              </div>
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 sm:w-auto" asChild>
                <Link href="/reservations">Reserve now</Link>
              </Button>
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
                />
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
