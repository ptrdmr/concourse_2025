/**
 * Party packages — single source of truth for tiles, modals, and calculators.
 * Prices and inclusions are carried over from the reservations page and VIP calculator.
 */

export type SuiteOption = {
  name: string
  lanes: number
  minGuests: number
  maxGuests: number
  minHours: number
  weekdayRate: number
  weekendRate: number
}

export type SuitesPricing = {
  kind: "suites"
}

export type PerGuestPricing = {
  kind: "perGuest"
  basePrice: number
  baseGuests: number
  additionalGuestPrice: number
  maxGuests: number
}

export type FlatPricing = {
  kind: "flat"
  baseLanes: number
  maxLanes: number
  weekdayPerLane: number
  weekendPerLane: number
  guestsForBase: number
}

export type QuotePricing = {
  kind: "quote"
}

export type Pricing = SuitesPricing | PerGuestPricing | FlatPricing | QuotePricing

export interface PartyPackage {
  id: string
  name: string
  tagline: string
  image: string
  imageAlt: string
  priceHeadline: string
  capacity: string
  highlights: string[]
  inclusions: string[]
  notes?: string[]
  mailtoSubject: string
  pricing: Pricing
}

export type SuitesPackage = PartyPackage & { pricing: SuitesPricing }
export type PerGuestPackage = PartyPackage & { pricing: PerGuestPricing }
export type FlatPackage = PartyPackage & { pricing: FlatPricing }

export const VIP_SUITES = {
  strikeZone: {
    name: "Strike Zone (4 Lanes)",
    lanes: 4,
    minGuests: 20,
    maxGuests: 32,
    minHours: 2,
    weekdayRate: 450,
    weekendRate: 550,
  },
  kingpin: {
    name: "Kingpin (8 Lanes)",
    lanes: 8,
    minGuests: 40,
    maxGuests: 64,
    minHours: 3,
    weekdayRate: 699,
    weekendRate: 799,
  },
  powerhouse: {
    name: "Powerhouse (12 Lanes)",
    lanes: 12,
    minGuests: 80,
    maxGuests: 96,
    minHours: 3,
    weekdayRate: 999,
    weekendRate: 1299,
  },
} as const satisfies Record<string, SuiteOption>

export type SuiteKey = keyof typeof VIP_SUITES

export const CATERING_PACKAGES = {
  pizza: { name: "Pizza, Salad & Soda Package", pricePerPerson: 36 },
  taco: { name: "Taco Bar Package", pricePerPerson: 40 },
  buildYourOwn: { name: "Build Your Own", pricePerPerson: 44 },
} as const

export type CateringKey = keyof typeof CATERING_PACKAGES

export const DRINK_PRICING = {
  unlimitedSoftDrinks: 6,
  premiumTicket: 12,
  beerWineTicket: 9,
} as const

export const CATERING_MENU_URL = "/branding/catering-2025.jpg"

export const SUITE_MAX_HOURS = 8

export const PARTY_PACKAGES: PartyPackage[] = [
  {
    id: "kids",
    name: "Supercharge Kids Party",
    tagline: "Birthday bowling for kids 16 and under",
    image: "/images/bowling/kids_party.jpg",
    imageAlt: "Kids bowling party at Concourse",
    priceHeadline: "From $850",
    capacity: "20–32 kids",
    highlights: [
      "4-lane suite, 3 hours of party time",
      "Pizza, fries & unlimited soda",
      "$10 arcade card per kid",
    ],
    inclusions: [
      "4 Lane Suite decorated with red curtains",
      "3 Hours of Party Time — 2.5 Hours of Bowling",
      "Two slices of pizza per bowler and 1 French fry platter",
      "Unlimited soda",
      "1 $10 arcade card per bowler",
      "A dedicated party planner to assist with all your party details",
    ],
    notes: [
      "This party package is for children only 16 and younger. Adults are welcome to supervise.",
    ],
    mailtoSubject: "Kids Birthday Party Inquiry",
    pricing: {
      kind: "perGuest",
      basePrice: 850,
      baseGuests: 20,
      additionalGuestPrice: 43,
      maxGuests: 32,
    },
  },
  {
    id: "pair-spare",
    name: "Build Your Own Package",
    tagline: "Start with two lanes, then add more as your group grows",
    image: "/images/food/pizza.jpg",
    imageAlt: "Fresh pizza from the Concourse Bar & Cafe",
    priceHeadline: "From $360",
    capacity: "2–8 lanes",
    highlights: [
      "Starts with 2 lanes for 2 hours",
      "Add lanes up to 8 total",
      "Mon–Thu $180/lane · Fri–Sun $195/lane",
    ],
    inclusions: [
      "First pair: 2 bowling lanes for 2 hours",
      "10 pairs of shoes",
      "2 pizzas and unlimited sodas for 10 guests",
      "10 $5 arcade cards",
      "Additional lanes $180 Mon–Thu or $195 Fri–Sun, up to 8 lanes total",
    ],
    notes: [
      "Package does not come with a server.",
      "The first pair is 2 lanes. Extra lanes after that are billed per lane.",
    ],
    mailtoSubject: "Build Your Own Package Inquiry",
    pricing: {
      kind: "flat",
      baseLanes: 2,
      maxLanes: 8,
      weekdayPerLane: 180,
      weekendPerLane: 195,
      guestsForBase: 10,
    },
  },
  {
    id: "vip-suites",
    name: "VIP Suites",
    tagline: "Private suites for parties, corporate events, and big groups",
    image: "/images/events/4 Lane Suite.jpg",
    imageAlt: "VIP suite at Concourse Bowling",
    priceHeadline: "From $450/hr",
    capacity: "20–96 bowlers",
    highlights: [
      "4, 8, or 12 private lanes",
      "Catering packages required",
      "Dedicated event staff",
    ],
    inclusions: [
      "Private suite with dedicated event staff",
      "Hourly rental — 2-hour minimum for 4 lanes, 3-hour minimum for 8 and 12 lanes",
      "Buffet catering packages (required)",
      "Optional drink add-ons",
    ],
    notes: ["All suites require a catering package."],
    mailtoSubject: "VIP Suite Inquiry",
    pricing: { kind: "suites" },
  },
  {
    id: "larger-suites",
    name: "Larger Suites & Events",
    tagline: "12 to 40 lanes for spectacular events",
    image: "/images/events/Large Events.jpg",
    imageAlt: "Large event space at Concourse",
    priceHeadline: "Custom quote",
    capacity: "Up to 320 bowlers",
    highlights: [
      "12 to 40 lanes",
      "Up to 320 bowlers",
      "Custom quotes for corporate events",
    ],
    inclusions: [
      "12 lanes, 20 lanes, or all 40 lanes",
      "Events of up to 320 bowlers",
      "Custom catering and staffing",
      "A dedicated event planner",
    ],
    notes: ["Call or email for pricing and availability — we will put together a custom quote."],
    mailtoSubject: "Large Event Inquiry (12+ lanes)",
    pricing: { kind: "quote" },
  },
]

const packagesById = new Map(PARTY_PACKAGES.map((pkg) => [pkg.id, pkg]))

/** Old suite-specific deep links land on the combined VIP Suites modal. */
const PACKAGE_ALIASES: Record<string, string> = {
  "strike-zone": "vip-suites",
  kingpin: "vip-suites",
  powerhouse: "vip-suites",
}

export function resolvePackageId(id: string): string {
  return PACKAGE_ALIASES[id] ?? id
}

export function isPartyPackageId(id: string): boolean {
  return packagesById.has(resolvePackageId(id))
}

export function getPartyPackage(id: string | null | undefined): PartyPackage | undefined {
  if (!id) return undefined
  return packagesById.get(resolvePackageId(id))
}

export function isSuitesPackage(pkg: PartyPackage): pkg is SuitesPackage {
  return pkg.pricing.kind === "suites"
}

export function isPerGuestPackage(pkg: PartyPackage): pkg is PerGuestPackage {
  return pkg.pricing.kind === "perGuest"
}

export function isFlatPackage(pkg: PartyPackage): pkg is FlatPackage {
  return pkg.pricing.kind === "flat"
}

/** Legacy ?tab= values that should open a specific package modal. */
export const LEGACY_TAB_TO_PACKAGE: Record<string, string> = {
  kids: "kids",
  "pair-spare": "pair-spare",
  "vip-suites": "vip-suites",
}
