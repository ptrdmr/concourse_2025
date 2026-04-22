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
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { AnimatedHeader } from "@/components/animated-header"
import {
  homepageEventsCarousel,
  type HomepageDailyDealSlide,
  type HomepageFeaturedPackageSlide,
  type HomepageTournamentSlide,
  type DealRowVariant,
} from "@/lib/homepage-events"
import { SportsTeamPartyFlyer } from "@/components/sports-team-party-flyer"
import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import AutoHeight from "embla-carousel-auto-height"

const variantStyles: Record<DealRowVariant, { bg: string; title: string; line: string }> = {
  cyan:   { bg: "bg-[#00BCD4]", title: "text-[#1A237E]",  line: "text-[#1A237E]" },
  orange: { bg: "bg-[#FF7043]", title: "text-[#FFD54F]",  line: "text-white" },
  navy:   { bg: "bg-[#283593]", title: "text-[#00BCD4]",  line: "text-white" },
}

/** Semi-transparent grey “balls” for the walk-in rates banner (pure CSS, decorative only). */
function RateBannerBowlingBalls() {
  const Ball = ({ className }: { className: string }) => (
    <div
      className={cn(
        "absolute rounded-full bg-gradient-to-br from-zinc-200/20 via-zinc-400/14 to-zinc-700/24 shadow-[inset_-6px_-10px_18px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/[0.07]",
        className,
      )}
    >
      <span className="absolute left-[38%] top-[30%] block h-2 w-2 rounded-full bg-black/20" />
      <span className="absolute left-[54%] top-[32%] block h-1.5 w-1.5 rounded-full bg-black/20" />
      <span className="absolute left-[44%] top-[46%] block h-2 w-2 rounded-full bg-black/20" />
    </div>
  )

  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden rounded-2xl"
      aria-hidden
    >
      <Ball className="-left-5 top-1/2 h-[4.25rem] w-[4.25rem] -translate-y-1/2 sm:-left-3 sm:h-[5.25rem] sm:w-[5.25rem]" />
      <Ball className="bottom-0 left-[6%] h-12 w-12 opacity-90 sm:left-[12%] sm:h-14 sm:w-14" />
      <Ball className="-right-5 top-1/2 h-[4.75rem] w-[4.75rem] -translate-y-1/2 sm:-right-3 sm:h-[5.5rem] sm:w-[5.5rem]" />
      <Ball className="right-[5%] top-1 h-11 w-11 opacity-85 sm:right-[11%] sm:h-14 sm:w-14" />
    </div>
  )
}

function DailyDealSlide({ slide }: { slide: HomepageDailyDealSlide }) {
  const s = variantStyles[slide.variant]
  return (
    <div className={cn("relative w-full", s.bg)}>
      <div className="container mx-auto flex min-h-0 flex-col md:flex-row md:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col justify-start px-4 py-5 md:px-6 md:py-6">
          <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-0">
            <span className="text-[11px] font-black uppercase tracking-widest text-white/70 sm:text-xs">
              Summer Specials
            </span>
            <span className="text-[11px] font-bold italic text-[#FFD54F] sm:text-xs">All Summer 2026</span>
          </div>

          <h3 className="mb-2 text-2xl font-black uppercase leading-none tracking-tight text-white drop-shadow-sm sm:text-3xl md:mb-2.5 md:text-4xl">
            {slide.dayLabel}
          </h3>

          <div
            className={cn(
              "flex min-h-0 flex-col gap-2.5 md:gap-3",
              slide.deals.length > 1 && "md:flex-row md:flex-wrap md:content-start",
            )}
          >
            {slide.deals.map((deal, i) => (
              <div key={i} className="min-w-0 md:max-w-[48%] lg:max-w-[46%]">
                {deal.title ? (
                  <h4
                    className={cn(
                      "mb-1 text-xs font-black uppercase leading-tight tracking-tight sm:text-sm md:text-base",
                      s.title,
                    )}
                  >
                    {deal.title}
                  </h4>
                ) : null}
                {deal.timeWindow ? (
                  <p
                    className={cn(
                      "mb-1 text-[11px] font-bold uppercase tracking-wide opacity-95 sm:text-xs md:text-sm",
                      s.line,
                    )}
                  >
                    {deal.timeWindow}
                  </p>
                ) : null}
                <ul className="space-y-0.5">
                  {deal.lines.map((line, j) => (
                    <li
                      key={j}
                      className={cn(
                        "break-words font-bold uppercase leading-snug tracking-tight",
                        j === 0
                          ? "text-xs sm:text-sm md:text-base"
                          : "text-[11px] opacity-90 sm:text-xs md:text-sm",
                        s.line,
                      )}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2.5">
            <Button
              size="sm"
              asChild
              className="h-9 bg-[#1A237E] px-4 text-sm font-bold text-white hover:bg-[#111836]"
            >
              <Link href="/reservations">Reserve a lane</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="h-9 border-white/50 px-4 text-sm font-bold text-white hover:bg-white/10"
            >
              <Link href="/events">All specials</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden min-h-[200px] w-[38%] max-w-[380px] shrink-0 self-stretch md:block">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 0px, 32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-current/20 to-transparent" style={{ color: "inherit" }} />
        </div>
      </div>
    </div>
  )
}

function FeaturedPackageSlide({ slide }: { slide: HomepageFeaturedPackageSlide }) {
  if (slide.id === "sports-team-party") {
    return (
      <div className="relative w-full bg-team-flyer-canvas">
        <div className="w-full px-4 py-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <SportsTeamPartyFlyer variant="carousel" ctaHref={slide.ctaHref} className="w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full bg-[#283593]">
      <div className="container mx-auto flex min-h-0 flex-col md:flex-row md:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col justify-start px-4 py-5 md:px-6 md:py-6">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#00BCD4] sm:text-xs">
            Featured package
          </span>
          <h3 className="mt-1 text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
            {slide.title}
          </h3>
          <p className="mt-1 text-sm font-semibold text-white/90 md:text-base">{slide.subtitle}</p>
          <p className="mt-1.5 text-lg font-black text-[#FFD54F] md:text-xl">{slide.priceFrom}</p>
          {slide.blurb ? <p className="mt-1.5 max-w-xl text-xs text-white/80 md:text-sm">{slide.blurb}</p> : null}
          <ul className="mt-2 max-w-xl space-y-1 text-xs font-semibold text-white/90 md:text-sm">
            {slide.includes.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00BCD4]" aria-hidden>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <Button size="sm" asChild className="h-9 bg-[#FF7043] px-4 text-sm font-bold text-white hover:bg-[#E64A19]">
              <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="h-9 border-white/50 px-4 text-sm font-bold text-white hover:bg-white/10"
            >
              <Link href="/events">All specials</Link>
            </Button>
          </div>
        </div>
        <div className="relative hidden min-h-[200px] w-[38%] max-w-[380px] shrink-0 self-stretch md:block">
          <Image src={slide.image} alt={slide.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 0px, 32vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#283593]/40 to-transparent" />
        </div>
      </div>
    </div>
  )
}

function EventsTournamentSlide({ slide }: { slide: HomepageTournamentSlide }) {
  return (
    <div className="relative w-full bg-[#1A237E]">
      <div className="container mx-auto flex min-h-0 flex-col md:flex-row md:items-stretch">
        <div className="order-2 flex min-w-0 flex-1 flex-col justify-start px-4 py-5 md:order-1 md:px-6 md:py-6">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#00BCD4] sm:text-xs">Tournament</span>
          <h3 className="mt-1.5 text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
            {slide.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-snug text-white/85 sm:text-base">{slide.description}</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Button size="sm" asChild className="h-9 bg-red-600 px-4 text-sm font-bold hover:bg-red-700">
              <a href={slide.registerUrl} target="_blank" rel="noopener noreferrer">
                {slide.registerLabel}
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="h-9 border-white/50 px-4 text-sm font-bold text-white hover:bg-white/10"
            >
              <Link href="/events">All events</Link>
            </Button>
          </div>
        </div>
        <div className="relative order-1 h-52 w-full shrink-0 border-b border-white/10 md:order-2 md:h-auto md:min-h-[240px] md:w-[38%] md:max-w-[420px] md:border-b-0 md:border-l md:border-white/10 md:self-stretch">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-contain object-center p-4 drop-shadow-xl md:p-6"
            sizes="(max-width: 768px) 100vw, 36vw"
          />
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
    <section className="relative w-full overflow-hidden pb-10">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        plugins={[Autoplay({ delay: 7000, stopOnInteraction: true }), AutoHeight()]}
        className="w-full"
      >
        <CarouselContent className="ml-0 items-stretch">
          {homepageEventsCarousel.map((slide) => (
            <CarouselItem key={slide.id} className="basis-full pl-0">
              {slide.kind === "daily-deal" ? (
                <DailyDealSlide slide={slide} />
              ) : slide.kind === "featured-package" ? (
                <FeaturedPackageSlide slide={slide} />
              ) : (
                <EventsTournamentSlide slide={slide} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2">
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

function SportsTeamPartyFeaturedStrip() {
  return (
    <section className="border-b border-border/40 bg-muted/20 py-3 md:py-4">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SportsTeamPartyFlyer variant="strip" className="w-full" />
      </div>
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

      {/* Summer specials — full-bleed rotating carousel */}
      <EventsCarousel />

      <SportsTeamPartyFeaturedStrip />

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
          <div className="relative mt-10 overflow-hidden rounded-2xl bg-zinc-950 px-6 py-6 text-center shadow-lg md:px-10 md:py-8">
            <RateBannerBowlingBalls />
            <p className="relative z-10 font-display flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:gap-x-3 md:text-4xl">
              <span className="text-white">Just walking in?</span>
              <Link
                href="/bowling"
                className="text-red-600 underline-offset-4 transition-colors hover:text-red-500 hover:underline"
              >
                See Rates!
              </Link>
            </p>
          </div>
        </div>
      </section>

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
              <Button
                className="w-full !bg-white !text-black hover:!bg-white/90 hover:!text-black sm:w-auto"
                asChild
              >
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
                    <span>2PM - 10PM</span>
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
