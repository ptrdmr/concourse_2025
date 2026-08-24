/**
 * Homepage Events & Specials carousel — weekly summer specials (June 1 – Aug 31, 2026).
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
        title: "Monday Roll Call",
        timeWindow: "2PM – 5PM",
        lines: ["3 games + shoes", "$11/person", "Opens at 2PM starting June 1"],
      },
      {
        title: "Happy Hour",
        timeWindow: "Open – Close",
        lines: ["Bar specials", "All day"],
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
        title: "Summer Triple Play",
        timeWindow: "Open – 5PM",
        lines: ["2 games + shoes + $10 arcade card", "$17/person"],
      },
      {
        title: "All You Can Bowl",
        timeWindow: "8PM – Close",
        lines: ["2 hrs unlimited bowling + shoes", "$18/person"],
      },
      {
        title: "Late Night Happy Hour",
        timeWindow: "9PM – Close",
        lines: ["Bar specials", "All night"],
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
        title: "First Roll",
        timeWindow: "Open – 2PM",
        lines: ["3 games · shoes not included", "$13/person"],
      },
      {
        title: "Cosmic Bowling",
        timeWindow: "3PM – Close",
        lines: ["Lights down, music up"],
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
        title: "Group Party Pack",
        timeWindow: "Open – 2PM",
        lines: [
          "4 bowlers + shoes · 1 hr bowling · pizza · soda pitcher",
          "Online only",
          "$100/group",
        ],
      },
      {
        title: "Cosmic Bowling",
        timeWindow: "All Day",
        lines: ["Lights down, music up"],
      },
    ],
    image: "/images/bowling/kids_party.jpg",
    imageAlt: "Group party bowling at Concourse",
  },
  {
    kind: "daily-deal",
    id: "sunday",
    variant: "orange",
    dayLabel: "Sunday",
    deals: [
      {
        title: "Group Party Pack",
        timeWindow: "Open – 2PM",
        lines: [
          "4 bowlers + shoes · 1 hr bowling · pizza · soda pitcher",
          "Online only",
          "$100/group",
        ],
      },
      {
        title: "Sunday After Dark",
        timeWindow: "7PM – Close",
        lines: ["Pay per game, no package needed", "$5 games · $5 shoes"],
      },
      {
        title: "Cosmic Bowling",
        timeWindow: "Open – 5PM",
        lines: ["Lights down, music up"],
      },
    ],
    image: "/images/bowling/exterior.jpg",
    imageAlt: "Sunday at Concourse Bowling",
  },
]

export const homepageEventsCarousel: HomepageCarouselSlide[] = [
  ...summerDailyDeals,
 
]

/** Slides used for the /events weekly specials grid (excludes tournament & featured package) */
export function getDailyDealSlides(): HomepageDailyDealSlide[] {
  return homepageEventsCarousel.filter((s): s is HomepageDailyDealSlide => s.kind === "daily-deal")
}
