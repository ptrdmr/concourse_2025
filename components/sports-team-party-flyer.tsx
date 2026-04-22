import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

function FlyerCtaLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  if (href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function IncludedStat({
  emoji,
  big,
  label,
}: {
  emoji: string
  big: string
  label: string
}) {
  return (
    <div
      className={cn(
        "rounded-[5px] border border-team-flyer-card-border border-l-[3px] border-l-team-flyer-green bg-team-flyer-card",
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="text-[30px] leading-none" aria-hidden>
          {emoji}
        </span>
        <div>
          <p className="font-bebas text-[36px] leading-none text-team-flyer-green">{big}</p>
          <p className="font-barlow text-[13px] font-semibold uppercase tracking-wide text-white/70">{label}</p>
        </div>
      </div>
    </div>
  )
}

function SportsTeamPartyFlyerFull({ ctaHref }: { ctaHref: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[480px] overflow-hidden bg-team-flyer-canvas text-white",
        "bg-flyer-dots bg-flyer-dot [background-size:24px_24px]",
      )}
    >
      {/* Top banner */}
      <div className="bg-team-flyer-green px-5 py-2.5">
        <span className="font-bebas block text-[38px] leading-none tracking-[0.2em] text-team-flyer-canvas">
          Concourse Bowling
        </span>
      </div>
      <div className="h-[3px] bg-team-flyer-green-dark" aria-hidden />

      {/* Hero */}
      <div className="px-6 pt-3">
        <p className="font-barlow text-[11px] font-bold uppercase tracking-[0.35em] text-team-flyer-green">
          🏆 Book Your Team&apos;s Next Celebration
        </p>
        <p className="font-bebas mt-0.5 text-[68px] uppercase leading-[0.9] tracking-wide text-white">Sports Team</p>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-0">
          <span className="font-bebas text-[80px] leading-[0.85] tracking-wide text-team-flyer-green">Party</span>
          <div className="mb-1.5">
            <p className="font-barlow text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">Starting at</p>
            <p className="font-bebas text-[58px] leading-none tracking-tight text-white">
              <span className="align-super text-[26px] text-team-flyer-green">$</span>
              225
            </p>
          </div>
        </div>
        <p className="font-barlow mt-1 text-[13px] font-normal uppercase tracking-[0.15em] text-white/60">
          Everything you need — all in one package!
        </p>
        <p className="font-barlow mt-1 text-xs font-bold uppercase tracking-[0.2em] text-team-flyer-green">
          Available starting May 1st
        </p>
      </div>

      {/* Divider */}
      <div className="px-6 pt-2.5">
        <div className="h-0.5 bg-team-flyer-green" />
      </div>

      {/* What&apos;s included */}
      <div className="px-6 pt-2.5">
        <div className="overflow-hidden rounded-lg border-2 border-team-flyer-green bg-team-flyer-box">
          <div className="border-b-2 border-team-flyer-green px-4 py-2">
            <p className="font-bebas text-2xl uppercase tracking-[0.25em] text-team-flyer-green">★ What&apos;s Included</p>
          </div>

          <div className="p-2.5 pt-2">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
              <IncludedStat emoji="👦" big="12" label="Bowlers" />
              <IncludedStat emoji="🎳" big="2" label="Lanes Reserved" />
              <IncludedStat emoji="⏱️" big="90" label="Minutes of Play" />
              <IncludedStat emoji="🏆" big="FUN" label="Guaranteed!" />
            </div>

            <div className="mt-1.5 rounded-md border border-[#1e3a26] bg-team-flyer-pizza-bg">
              <div className="flex items-center gap-3.5 px-4 py-2.5">
                <span className="text-[34px] leading-none" aria-hidden>
                  🍕
                </span>
                <div>
                  <p className="font-bebas text-2xl tracking-wide text-white">2 Large Pizzas</p>
                  <p className="font-barlow mt-0.5 text-sm font-medium text-white/55">
                    Choice of <span className="font-bold text-team-flyer-green">Cheese</span> or{" "}
                    <span className="font-bold text-team-flyer-green">Pepperoni</span> — mix &amp; match!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-1.5 rounded-md border border-[#1e4a28] bg-team-flyer-soda-bg px-4 py-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <span className="pr-2.5 text-[26px] leading-none" aria-hidden>
                    🥤
                  </span>
                  <span className="font-barlow text-lg font-bold uppercase tracking-wide text-white">
                    1 Soda Per Bowler
                  </span>
                </div>
                <span className="inline-block shrink-0 rounded-sm bg-team-flyer-green px-2.5 py-1 font-barlow text-xs font-black uppercase tracking-wide text-team-flyer-canvas">
                  Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pt-2.5">
        <FlyerCtaLink
          href={ctaHref}
          className="block rounded-md bg-team-flyer-green transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <div>
              <p className="font-bebas text-2xl leading-none tracking-wide text-team-flyer-canvas">
                Book Your Party Today!
              </p>
              <p className="font-barlow mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-black/60">
                Ask a team member or call to reserve
              </p>
            </div>
            <span className="font-bebas text-3xl text-team-flyer-canvas" aria-hidden>
              →
            </span>
          </div>
        </FlyerCtaLink>
      </div>

      {/* Footer */}
      <div className="px-6 pb-3 pt-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-barlow text-[10px] font-medium tracking-wide text-white/30">
            Ages &amp; availability may vary.{" "}
            <strong className="font-semibold text-white/50">Tax not included.</strong>
          </p>
          <span className="font-bebas shrink-0 text-sm tracking-[0.2em] text-team-flyer-green/50">CONCOURSE</span>
        </div>
      </div>
    </div>
  )
}

type SportsTeamPartyFlyerProps = {
  /** Full print-style flyer (reservations Team Parties tab) */
  variant?: "strip" | "carousel" | "full"
  ctaHref?: string
  className?: string
}

/** Sports team party promo: compact strips, carousel card, or full flyer layout. */
export function SportsTeamPartyFlyer({
  variant = "strip",
  ctaHref = "/reservations?tab=team-parties",
  className,
}: SportsTeamPartyFlyerProps) {
  if (variant === "full") {
    return (
      <div className={cn("shadow-lg", className)}>
        <SportsTeamPartyFlyerFull ctaHref={ctaHref} />
      </div>
    )
  }

  const compact = variant === "carousel"

  return (
    <div
      className={cn(
        "border border-white/10 bg-team-flyer-canvas bg-flyer-dots bg-flyer-dot text-white shadow-md",
        compact ? "rounded-md" : "rounded-lg",
        className,
      )}
    >
      <div className="flex h-1.5 bg-team-flyer-green" aria-hidden />
      <div className="h-0.5 bg-team-flyer-green-dark" aria-hidden />

      <div
        className={cn(
          "flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5",
          compact ? "px-4 py-3 sm:py-3" : "px-5 py-4 sm:py-4",
        )}
      >
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "font-barlow font-bold uppercase tracking-widest text-team-flyer-green",
              compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs",
            )}
          >
            Team celebrations
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-0">
            <h2
              className={cn(
                "font-bebas uppercase leading-none tracking-wide text-white",
                compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
              )}
            >
              Sports Team Party
            </h2>
            <span
              className={cn(
                "font-bebas text-team-flyer-green",
                compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl",
              )}
            >
              from <span className="text-white">$225</span>
            </span>
          </div>
          <p
            className={cn(
              "mt-1.5 font-barlow text-white/55",
              compact ? "text-[11px] leading-snug sm:text-xs" : "text-xs sm:text-sm",
            )}
          >
            12 bowlers · 2 lanes · 90 min · 2 large pizzas (cheese or pepperoni) · 1 soda per bowler
          </p>
        </div>

        <FlyerCtaLink
          href={ctaHref}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-md bg-team-flyer-green font-bebas uppercase tracking-wide text-team-flyer-canvas transition-opacity hover:opacity-90",
            compact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-base",
          )}
        >
          Book party
        </FlyerCtaLink>
      </div>

      <div className="border-t border-white/10 px-4 py-2 sm:px-5">
        <p className="font-barlow text-[10px] text-white/35 sm:text-[11px]">
          Tax not included · Ages &amp; availability may vary
        </p>
      </div>
    </div>
  )
}
