"use client"

import Link from "next/link"
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import styles from "./hero-section.module.css"

/**
 * Homepage hero: a permanent "ROLL WITH US!" headline over an auto-rotating
 * stack of slides. Each slide swaps the background media, info text, and
 * buttons together. The headline stays put; its color (and on the summer
 * slide, its size) change so it stays readable without crowding the flyer.
 *
 * Overlay type scales from the hero box itself (container queries in
 * hero-section.module.css) so phones, laptops, and 4K share the same framing.
 *
 * Isolated as a client island so the rest of the homepage can render as a
 * Server Component — GSAP is only loaded here, on demand.
 *
 * TO ADD A SLIDE: append an entry to `heroSlides`. Background media, overlay
 * strength, headline color, info content, and buttons are all per slide.
 * Optional `objectPosition` on the background tweaks photo framing.
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

type HeroBackground =
  | { type: "video"; objectPosition?: string }
  | { type: "image"; src: string; objectPosition?: string }

type HeroSlide = {
  id: string
  /** Applied to the headline while this slide is active — tune for contrast against the background. */
  headlineClassName: string
  /** Darkening layer over the background media. */
  overlayClassName: string
  background: HeroBackground
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
      <p className={styles.mainInfo}>
        Food, fun, and competition
        <br />
        ALL UNDER ONE ROOF.
        <br />
        <span className={styles.mainTagline}>
          Walk-ins welcome · Reserve lanes online · Parties for 8 to 320
        </span>
      </p>
    ),
    buttons: [
      { label: "Reserve a Lane or Plan a Party", href: "/reservations" },
      { label: "Walk-in Rates & Hours", href: "/bowling", variant: "outline" },
    ],
  },
  {
    id: "summer-deals",
    headlineClassName: "text-[#ffd54f] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]",
    overlayClassName:
      "bg-[linear-gradient(135deg,rgba(26,26,26,0.82)_0%,rgba(194,24,91,0.25)_75%,rgba(26,26,26,0.88)_100%)]",
    background: { type: "image", src: "/images/summer/summer-bg.jpg", objectPosition: "center 42%" },
    info: (
      <div className={styles.summerStack}>
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
      className={styles.hero}
      data-slide={activeSlide.id}
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
                  style={slide.background.objectPosition ? { objectPosition: slide.background.objectPosition } : undefined}
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
                    style={slide.background.objectPosition ? { objectPosition: slide.background.objectPosition } : undefined}
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
                style={slide.background.objectPosition ? { objectPosition: slide.background.objectPosition } : undefined}
              />
            )}
            <div className={cn("absolute inset-0", slide.overlayClassName)} />
          </div>
        ))}
      </div>

      <div className={styles.overlay}>
        <h1 className={cn(styles.headline, activeSlide.headlineClassName)}>
          <span ref={rRef}>R</span>
          <span ref={oRef} className="inline-block">
            O
          </span>
          <span ref={llRef}>LL</span>
          <span ref={restOfTextRef} className="ml-1 inline-flex whitespace-nowrap sm:ml-2 md:ml-4">
            WITH US!
          </span>
        </h1>

        {/* Fixed-height stage: both slides share the same band so the photo framing
            (and the dots) never jump. Copy scales inside this box via container queries. */}
        <div className={styles.stage}>
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              inert={i !== activeIndex}
              aria-hidden={i !== activeIndex}
              className={cn(styles.slide, i === activeIndex ? styles.slideActive : styles.slideInactive)}
            >
              {slide.info}
              <div className={styles.buttons}>
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
          <div className={styles.dots}>
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
