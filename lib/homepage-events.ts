/**
 * Homepage Events & Specials carousel. Add or remove slides here when promos change.
 * Spring Break row colors: cyan #00BCD4 / #0097A7, orange #FF7043 / #E64A19, navy #283593 / #111836, yellow #FFD54F, header #1A237E.
 */

export type SpringRowVariant = "cyan" | "orange" | "navy"

export type SpringBreakDeal = {
  title?: string
  lines: string[]
}

export type HomepageSpringSlide = {
  kind: "spring-break"
  id: string
  variant: SpringRowVariant
  dayLabel: string
  deals: SpringBreakDeal[]
  /** Right-side photo. Use placeholder path until real photos are supplied. */
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

export type HomepageCarouselSlide = HomepageSpringSlide | HomepageTournamentSlide

export const JR_SHOOTOUT_REGISTER_URL =
  "https://lp.constantcontactpages.com/ev/reg/bpd227s/lp/08ad52a8-f74a-450c-ac33-7b84b7cf6ad3"

export const homepageEventsCarousel: HomepageCarouselSlide[] = [
  {
    kind: "spring-break",
    id: "arcade-happy-hour",
    variant: "navy",
    dayLabel: "Arcade Happy Hour",
    deals: [
      { lines: ["Open – 3:00PM", "Tuesday – Friday"] },
    ],
    image: "/images/arcade/homepage_arcade.jpg",
    imageAlt: "Space Invaders Frenzy arcade cabinet at Concourse",
  },
  {
    kind: "spring-break",
    id: "tuesday",
    variant: "cyan",
    dayLabel: "Tuesday",
    deals: [
      { title: "Game Special", lines: ["3 Games for $14", "Open – 3PM", "1 per person per day"] },
      { title: "Tuesday Unlimited", lines: ["2 Hours + Shoes · $18/person", "8PM – Close", "1 per person per day"] },
    ],
    image: "/images/bowling/walk_in.jpg",
    imageAlt: "Bowling lanes at Concourse",
  },
  {
    kind: "spring-break",
    id: "wednesday",
    variant: "orange",
    dayLabel: "Wednesday",
    deals: [
      { title: "Game Special", lines: ["3 Games for $14", "Open – 3PM", "1 per person per day"] },
      { title: "Late Night Happy Hour", lines: ["9PM – Close"] },
    ],
    image: "/images/food/homepage_bar_cafe.jpg",
    imageAlt: "Margarita and chips at Concourse Bar & Cafe",
  },
  {
    kind: "spring-break",
    id: "thursday",
    variant: "navy",
    dayLabel: "Thursday",
    deals: [
      { title: "Game Special", lines: ["3 Games for $14", "Open – 3PM", "1 per person per day"] },
    ],
    image: "/images/bowling/league.jpg",
    imageAlt: "Bowling at Concourse",
  },
  {
    kind: "spring-break",
    id: "friday",
    variant: "cyan",
    dayLabel: "Friday",
    deals: [
      { title: "Pre-Game Special", lines: ["3 Games for $16", "Open – 3PM"] },
      { title: "Cosmic Bowling", lines: ["3:00PM – Close"] },
      { title: "Live DJ", lines: ["8:00PM – Close"] },
    ],
    image: "/images/bowling/friday_cosmic.jpg",
    imageAlt: "Cosmic bowling at Concourse on Friday night",
  },
  {
    kind: "spring-break",
    id: "sunday",
    variant: "orange",
    dayLabel: "Sunday",
    deals: [
      { title: "Cosmic Bowling", lines: ["Open – 5:00PM"] },
      { title: "Late Night Specials", lines: ["$5 Games · $5 Shoes", "Bar Happy Hour · 8PM – Close"] },
    ],
    image: "/images/bowling/kids_party.png",
    imageAlt: "Fun at Concourse",
  },
  {
    kind: "tournament",
    id: "jr-shootout",
    title: "Southern California $30,000 Junior Shootout",
    description: "Join us May 30, 2026 — four divisions. Presented by BCSC and Storm. Register online to secure your spot.",
    image: "/images/events/jr-shootout.png",
    imageAlt: "Southern California Junior Shootout tournament flyer",
    registerUrl: JR_SHOOTOUT_REGISTER_URL,
    registerLabel: "Register",
  },
]
