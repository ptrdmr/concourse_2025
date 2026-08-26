"use client"

import Link from "next/link"
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LANE_BOOKING_URL } from "@/lib/booking"
import { cn } from "@/lib/utils"
import styles from "./hero-section.module.css"

/**
 * Homepage hero: a permanent "ROLL WITH US!" headline over an auto-rotating
 * stack of slides. Each slide swaps the background media, info text, and
 * buttons together; the headline never moves — only its color class changes
 * per slide so it stays readable against each background.
 *
 * Isolated as a client island so the rest of the homepage can render as a
 * Server Component — GSAP is only loaded here, on demand.
 *
 * TO ADD A SLIDE: append an entry to `heroSlides`. Background media, overlay
 * strength, headline color, info content, and buttons are all per slide.
 */

type HeroButton = {
  label: ReactNode
  href: string
  external?: boolean
  variant?: "default" | "outline"
  /** Render the link bare (className carries ALL styling) instead of inside the shared Button. */
  unstyled?: boolean
  className?: string
}

type HeroSlide = {
  id: string
  /** Applied to the headline while this slide is active — tune for contrast against the background. */
  headlineClassName: string
  /** Darkening layer over the background media. */
  overlayClassName: string
  background: { type: "video" } | { type: "image"; src: string }
  info: ReactNode
  buttons: HeroButton[]
}

const heroSlides: HeroSlide[] = [
  {
    id: "main",
    headlineClassName: "text-white",
    overlayClassName: "bg-black/25 dark:bg-black/75",
    background: { type: "video" },
    info: (
      <p className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
        Food, fun, and competition
        <br />
        ALL UNDER ONE ROOF.
        <br />
        <span className="mt-2 inline-block text-sm font-normal leading-snug text-white/90 sm:text-base md:text-lg lg:text-xl">
          Walk-ins welcome · Reserve lanes online · Parties for 8 to 320
        </span>
      </p>
    ),
    buttons: [
      { label: "Reserve a Lane", href: LANE_BOOKING_URL, external: true },
      { label: "Plan a Party", href: "/reservations?track=parties", variant: "outline" },
      { label: "Walk-in Rates & Hours", href: "/bowling", variant: "outline" },
    ],
  },
  {
    id: "summer-deals",
    headlineClassName: "text-[#ffd54f] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]",
    overlayClassName:
      "bg-[linear-gradient(135deg,rgba(26,26,26,0.82)_0%,rgba(194,24,91,0.25)_75%,rgba(26,26,26,0.88)_100%)]",
    background: { type: "image", src: "/images/summer/summer-bg.jpg" },
    info: (
      <div className="flex flex-col items-center gap-2.5">
        <span className={styles.badge}>★ New This Summer</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/summer/summer-logo.png" alt="Concourse Summer 2026" className={styles.summerLogo} />
        <hr className={styles.summerRule} />
        <div className={styles.summerDates}>May 26 – August 31</div>
        <div className={styles.summerTagline}>
          Weekly deals on bowling, drinks &amp; family fun — every day, all summer long.
        </div>
      </div>
    ),
    buttons: [
      {
        label: (
          <>
            View Deals <span className={styles.ctaArrow}>→</span>
          </>
        ),
        href: "/events",
        unstyled: true,
        className: styles.cta,
      },
    ],
  },
]

const ROTATE_MS = 6000

export function HeroSection() {
  const rRef = useRef(null)
  const oRef = useRef(null)
  const llRef = useRef(null)
  const restOfTextRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const slideCount = heroSlides.length
  const goTo = useCallback(
    (index: number) => setActiveIndex((index + slideCount) % slideCount),
    [slideCount],
  )

  useEffect(() => {
    // Defer the ~3.5MB hero video until after first paint so it never competes
    // with critical above-the-fold resources for bandwidth. Skip it entirely
    // for users on constrained connections or with reduced-motion preference.
    const connection = (navigator as any).connection
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = connection?.saveData
    const slowConnection = connection && ["slow-2g", "2g"].includes(connection.effectiveType)

    if (prefersReducedMotion || saveData || slowConnection) return

    const schedule = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    const handle = schedule(() => setShowVideo(true))

    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle as unknown as number)
      }
    }
  }, [])

  useEffect(() => {
    // One-time headline entrance on page load. Slide changes never re-run this —
    // the headline is the permanent fixture.
    let cancelled = false

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      gsap.set(rRef.current, { autoAlpha: 0, y: -50 })
      gsap.set(oRef.current, { autoAlpha: 0, x: -100, rotation: -720 })
      gsap.set(llRef.current, { autoAlpha: 0, y: -50 })
      gsap.set(restOfTextRef.current, { autoAlpha: 0, y: -50 })

      tl.to(rRef.current, { duration: 0.5, autoAlpha: 1, y: 0, ease: "back.out(1.7)" })
        .to(oRef.current, { duration: 1.2, autoAlpha: 1, x: 0, rotation: 0, ease: "bounce.out" }, "-=0.3")
        .to(llRef.current, { duration: 0.5, autoAlpha: 1, y: 0, ease: "back.out(1.7)" }, "-=0.6")
        .to(restOfTextRef.current, { duration: 0.6, autoAlpha: 1, y: 0, ease: "back.out(1.7)" }, "-=0.4")
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    // Auto-rotate. Disabled for reduced-motion users, while the pointer is over
    // the hero, or while keyboard focus is inside it.
    if (isPaused || slideCount < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % slideCount), ROTATE_MS)
    return () => window.clearInterval(id)
  }, [isPaused, slideCount])

  useEffect(() => {
    // Keep the hidden video from burning CPU while another slide is active.
    const video = videoRef.current
    if (!video) return
    if (activeIndex === 0) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [activeIndex, showVideo])

  const activeSlide = heroSlides[activeIndex]

  return (
    <section
      className="relative flex h-[calc(100svh-5rem)] w-full flex-col overflow-hidden md:h-[calc(100svh-9rem)]"
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Background stack — cross-fades between slides */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== activeIndex}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            {slide.background.type === "video" ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pins_small_poster.jpg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {showVideo && (
                  <video
                    ref={videoRef}
                    src="/pins_small.mp4"
                    poster="/pins_small_poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={slide.background.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className={cn("absolute inset-0", slide.overlayClassName)} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 flex-col items-center justify-center px-4 py-6 text-center sm:px-6 md:py-8 lg:px-10 lg:py-10 xl:px-14">
        <h1
          className={cn(
            "mb-3 flex flex-wrap items-baseline justify-center whitespace-nowrap text-5xl font-bold tracking-tight transition-colors duration-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
            activeSlide.headlineClassName,
          )}
        >
          <span ref={rRef}>R</span>
          <span ref={oRef} className="inline-block">
            O
          </span>
          <span ref={llRef}>LL</span>
          <span ref={restOfTextRef} className="ml-1 inline-flex whitespace-nowrap sm:ml-2 md:ml-4">
            WITH US!
          </span>
        </h1>

        {/* Slide info + buttons — grid-stacked so the tallest slide sets the height (no layout
            shift). Shorter slides center within that shared height instead of hanging from the
            top, which would leave dead space above the dots. */}
        <div className="grid w-full min-h-0 max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              inert={i !== activeIndex}
              aria-hidden={i !== activeIndex}
              className={cn(
                "col-start-1 row-start-1 flex min-h-0 flex-col items-center justify-center transition-all duration-700",
                i === activeIndex ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <div className="mb-4 text-base text-white sm:text-lg md:text-xl">{slide.info}</div>
              <div className="flex w-full flex-wrap items-center justify-center gap-3">
                {slide.buttons.map((button) => {
                  const link = button.external ? (
                    <a
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={button.unstyled ? button.className : undefined}
                    >
                      {button.label}
                    </a>
                  ) : (
                    <Link href={button.href} className={button.unstyled ? button.className : undefined}>
                      {button.label}
                    </Link>
                  )
                  if (button.unstyled) {
                    return <Fragment key={button.href}>{link}</Fragment>
                  }
                  return (
                    <Button
                      key={button.href}
                      size="lg"
                      variant={button.variant ?? "default"}
                      className={cn(
                        "w-full sm:w-auto lg:h-12 lg:px-8 lg:text-lg",
                        button.variant === "outline" && "bg-white/10 text-white hover:bg-white/20",
                        button.className,
                      )}
                      asChild
                    >
                      {link}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {slideCount > 1 && (
          <div className="mt-4 flex shrink-0 items-center justify-center gap-3 pb-1">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous slide"
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next slide"
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
