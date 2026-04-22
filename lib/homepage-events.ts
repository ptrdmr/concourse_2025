/**
 * Homepage Events & Specials carousel — single source of truth for weekly specials.
 * Row colors: cyan #00BCD4, orange #FF7043, navy #283593.
 */

export type DealRowVariant = "cyan" | "orange" | "navy"

export type DailyDeal = {
  title?: string
  /** Shown prominently (e.g. Open – 5PM) */
  timeWindow?: string
  lines: string[]
}

export type HomepageDailyDealSlide = {
  kind: "daily-deal"
  id: string
  variant: DealRowVariant
  dayLabel: string
  deals: DailyDeal[]
  image: string
  imageAlt: string
}

export type HomepageFeaturedPackageSlide = {
  kind: "featured-package"
  id: string
  title: string
  subtitle: string
  priceFrom: string
  blurb?: string
  includes: string[]
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
}

export type HomepageTournamentSlide = {
  kind: "tournament"
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  registerUrl: string
  registerLabel: string
}

export type HomepageCarouselSlide =
  | HomepageDailyDealSlide
  | HomepageFeaturedPackageSlide
  | HomepageTournamentSlide

export const JR_SHOOTOUT_REGISTER_URL =
  "https://lp.constantcontactpages.com/ev/reg/bpd227s/lp/08ad52a8-f74a-450c-ac33-7b84b7cf6ad3"

const summerDailyDeals: HomepageDailyDealSlide[] = [
  {
    kind: "daily-deal",
    id: "monday",
    variant: "cyan",
    dayLabel: "Monday",
    deals: [
      {
        title: "League Bowler Meet-Up",
        timeWindow: "2PM – 5PM",
        lines: ["3 games + pair of shoes · $11/person", "Opens at 2PM starting June 1"],
      },
      {
        title: "Happy Hour",
        timeWindow: "Open – Close",
        lines: ["Bar specials open to close", "All day"],
      },
    ],
    image: "/images/bowling/walk_in.jpg",
    imageAlt: "Bowling lanes at Concourse",
  },
  {
    kind: "daily-deal",
    id: "tuesday-thursday",
    variant: "orange",
    dayLabel: "Tues – Thurs",
    deals: [
      {
        title: "Summer Game Special",
        timeWindow: "Open – 5PM",
        lines: ["2 games + shoes + $10 game card", "$17/person"],
      },
      {
        title: "Unlimited Bowling",
        timeWindow: "8PM – Close",
        lines: ["2 hours unlimited bowling + shoes", "$18/person"],
      },
    ],
    image: "/images/bowling/walk_in.jpg",
    imageAlt: "Summer bowling at Concourse",
  },
  {
    kind: "daily-deal",
    id: "friday",
    variant: "navy",
    dayLabel: "Friday",
    deals: [
      {
        title: "Friday Pre-Game",
        timeWindow: "Open – 2PM",
        lines: ["3 games (shoes not included)", "$12/person"],
      },
      {
        title: "Cosmic Bowling",
        timeWindow: "2PM – Close",
        lines: ["Standard rates"],
      },
    ],
    image: "/images/bowling/friday_cosmic.jpg",
    imageAlt: "Cosmic bowling at Concourse on Friday night",
  },
  {
    kind: "daily-deal",
    id: "saturday",
    variant: "cyan",
    dayLabel: "Saturday",
    deals: [
      {
        title: "Family Special",
        timeWindow: "Open – 2PM",
        lines: [
          "4 bowlers + shoes, 1 hr bowling",
          "Large pizza + soda pitcher",
          "$100/group",
        ],
      },
    ],
    image: "/images/bowling/kids_party.png",
    imageAlt: "Family bowling at Concourse",
  },
  {
    kind: "daily-deal",
    id: "sunday",
    variant: "orange",
    dayLabel: "Sunday",
    deals: [
      {
        title: "Family Special",
        timeWindow: "Open – 2PM",
        lines: [
          "4 bowlers + shoes, 1 hr bowling",
          "Large pizza + soda pitcher",
          "$100/group",
        ],
      },
      {
        title: "Late Night Special",
        timeWindow: "8PM – Close",
        lines: ["Pay per game — no package required", "$5 games & $5 shoes"],
      },
    ],
    image: "/images/bowling/exterior.png",
    imageAlt: "Sunday at Concourse Bowling",
  },
]

export const homepageEventsCarousel: HomepageCarouselSlide[] = [
  ...summerDailyDeals,
  {
    kind: "tournament",
    id: "jr-shootout",
    title: "Southern California $30,000 Junior Shootout",
    description:
      "Join us May 30, 2026 — four divisions. Presented by BCSC and Storm. Register online to secure your spot.",
    image: "/images/events/jr-shootout.png",
    imageAlt: "Southern California Junior Shootout tournament flyer",
    registerUrl: JR_SHOOTOUT_REGISTER_URL,
    registerLabel: "Register",
  },
]

/** Slides used for the /events weekly specials grid (excludes tournament & featured package) */
export function getDailyDealSlides(): HomepageDailyDealSlide[] {
  return homepageEventsCarousel.filter((s): s is HomepageDailyDealSlide => s.kind === "daily-deal")
}
