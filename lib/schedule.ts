/**
 * =============================================================================
 * CONCOURSE CALENDAR — EDIT THIS FILE TO UPDATE THE HOMEPAGE CALENDAR
 * =============================================================================
 *
 * This is the only file you need to change to manage what customers see when
 * they click a day on the homepage calendar.
 *
 * FIVE LISTS — everything for the calendar lives in this file:
 *
 *   1. weeklyHours            — Base open/close times and walk-in rates for each weekday.
 *   2. seasonalHoursOverrides — Temporary hour changes (e.g. Monday 2PM open in summer).
 *   3. holidays               — Specific dates (open with holiday rates, or closed: true).
 *   4. calendarSpecials       — Weekly/seasonal specials and cosmic bowling.
 *   5. calendarEvents         — One-off tournaments and dated events.
 *
 * No other file controls the calendar. Edit the lists below only.
 *
 * -----------------------------------------------------------------------------
 * HOW TO ADD A SPECIAL (edit calendarSpecials below)
 * -----------------------------------------------------------------------------
 * Add an object to `calendarSpecials` with category "special":
 *
 *   {
 *     id: "my-special-monday",           // unique — any short name
 *     category: "special",
 *     title: "Summer Triple Play",
 *     timeWindow: "Open – 5PM",
 *     lines: ["2 games + shoes + $10 arcade card", "$17/person"],
 *     when: { every: ["Monday"], from: "2026-06-01", to: "2026-08-31" },
 *   },
 *
 * • `every` — which day(s) of the week: "Sunday" … "Saturday"
 * • `from` / `to` — optional date window (YYYY-MM-DD). Omit both = runs forever.
 *
 * -----------------------------------------------------------------------------
 * HOW TO ADD A ONE-OFF EVENT (edit calendarEvents below)
 * -----------------------------------------------------------------------------
 *
 *   {
 *     id: "jr-shootout-2026",
 *     category: "event",
 *     title: "Southern California Junior Shootout",
 *     lines: ["Four divisions — register online"],
 *     when: { on: "2026-05-30" },
 *     cta: { label: "Register", href: "https://..." },
 *   },
 *
 * -----------------------------------------------------------------------------
 * HOW TO ADD COSMIC BOWLING
 * -----------------------------------------------------------------------------
 * Use category "cosmic" in calendarSpecials (same `when` rules):
 *
 *   {
 *     id: "cosmic-friday",
 *     category: "cosmic",
 *     title: "Cosmic Bowling",
 *     timeWindow: "2PM – Close",
 *     lines: ["Special lighting, music, and atmosphere"],
 *     when: { every: ["Friday"] },
 *   },
 *
 * NOTE: Cosmic times on other pages may differ — this file is the calendar source.
 *
 * -----------------------------------------------------------------------------
 * HOW TO ADD A MULTI-DAY SPAN (runs every day in a range)
 * -----------------------------------------------------------------------------
 *
 *   {
 *     id: "winter-promo",
 *     category: "special",
 *     title: "Winter Break Bonanza",
 *     lines: ["Details here"],
 *     when: { from: "2026-12-21", to: "2027-01-02" },
 *   },
 *
 * -----------------------------------------------------------------------------
 * HOW TO ADD / UPDATE A HOLIDAY
 * -----------------------------------------------------------------------------
 * Add to `holidays` with an ISO date (YYYY-MM-DD).
 *
 *   OPEN with holiday pricing (default):
 *   { name: "Memorial Day", date: "2026-05-25" },
 *
 *   CLOSED all day:
 *   { name: "Independence Day", date: "2026-07-04", closed: true },
 *
 *   CLOSED with a custom message:
 *   { name: "Independence Day", date: "2026-07-04", closed: true,
 *     note: "Closed for the holiday. We reopen Sunday." },
 *
 * When `closed: true`, hours show as Closed, rates and specials are hidden,
 * and weekly specials/cosmic do not apply that day.
 *
 * Add a new row each year when dates change.
 *
 * -----------------------------------------------------------------------------
 * HOW TO CHANGE HOURS FOR A DATE RANGE (edit seasonalHoursOverrides below)
 * -----------------------------------------------------------------------------
 * Base hours live in weeklyHours. For seasonal changes, add an override:
 *
 *   {
 *     hours: "2PM – 10PM",
 *     bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "2PM – Close" }],
 *     when: { every: ["Monday"], from: "2026-06-01", to: "2026-08-31" },
 *   },
 *
 * Optional fields bowlByHour / bowlByGame / shoeRental override that day's rates.
 * Omit them to keep the base weekday rates and only change the hours line.
 *
 * -----------------------------------------------------------------------------
 * HOW TO CHANGE BASE HOURS OR WALK-IN RATES
 * -----------------------------------------------------------------------------
 * Edit the matching day in `weeklyHours` (Sunday = 0 … Saturday = 6).
 *
 * -----------------------------------------------------------------------------
 * RECURRENCE CHEAT SHEET
 * -----------------------------------------------------------------------------
 *   Perpetual weekly:     { every: ["Friday"] }
 *   Seasonal weekly:      { every: ["Monday"], from: "2026-06-01", to: "2026-08-31" }
 *   Single day:           { on: "2026-05-30" }
 *   Continuous span:      { from: "2026-12-21", to: "2027-01-02" }
 *
 * Always use ISO dates: YYYY-MM-DD
 * =============================================================================
 */

import { format, getDay, isWithinInterval, parseISO } from "date-fns"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"

export type ISODate = string

export type ScheduleCategory = "special" | "cosmic" | "event"

export type When =
  | { on: ISODate }
  | { every: Weekday[]; from?: ISODate; to?: ISODate }
  | { from: ISODate; to: ISODate }

export type ScheduleEntry = {
  id: string
  category: ScheduleCategory
  title: string
  timeWindow?: string
  lines?: string[]
  cta?: { label: string; href: string }
  when: When
}

export type RateLine = {
  label: string
  rate: string
  period: string
}

export type WeeklyDaySchedule = {
  /** Display label, e.g. "Monday" */
  label: Weekday
  /** e.g. "4PM – 10PM" */
  hours: string
  bowlByHour: RateLine[]
  bowlByGame: RateLine[]
  shoeRental: RateLine[]
}

export type Holiday = {
  name: string
  date: ISODate
  /** When true, the business is closed all day (no hours, rates, or specials). */
  closed?: boolean
  /** Optional message shown in the calendar detail panel. */
  note?: string
}

export type HolidayRateOverride = {
  bowlByHour: RateLine[]
  bowlByGame: RateLine[]
  shoeRental: RateLine[]
  note?: string
}

export type DateInfo = {
  date: Date
  dateLabel: string
  weekday: Weekday
  hours: string
  rates: {
    bowlByHour: RateLine[]
    bowlByGame: RateLine[]
    shoeRental: RateLine[]
  }
  isClosed: boolean
  isHoliday: boolean
  holidayName?: string
  holidayNote?: string
  specials: ScheduleEntry[]
  cosmic: ScheduleEntry[]
  events: ScheduleEntry[]
  /** True if any special, cosmic, event, or holiday applies */
  hasActivity: boolean
}

export type SeasonalHoursOverride = {
  hours: string
  bowlByHour?: RateLine[]
  bowlByGame?: RateLine[]
  shoeRental?: RateLine[]
  when: { every: Weekday[]; from?: ISODate; to?: ISODate }
}

export type DayBadgeKind = "holiday" | "cosmic" | "special" | "event"

export type DayBadgeSummary = {
  kinds: DayBadgeKind[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Use in `when: { from, to }` for seasonal specials (e.g. summer 2026). */
export const SUMMER_2026_FROM: ISODate = "2026-06-01"
export const SUMMER_2026_TO: ISODate = "2026-08-31"

const WEEKDAY_NAMES: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

/** Holiday walk-in pricing (from Events page) */
export const holidayRateOverride: HolidayRateOverride = {
  bowlByHour: [{ label: "Bowl by Hour", rate: "$45/hr", period: "All Day" }],
  bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "All Day" }],
  shoeRental: [{ label: "Shoe Rental", rate: "$6.00", period: "All Day" }],
  note: "Holiday rates apply. Reservations use holiday pricing — see reservations page.",
}

// ---------------------------------------------------------------------------
// 1. weeklyHours — base hours and walk-in rates per weekday
//    (Sunday = index 0 … Saturday = index 6)
// ---------------------------------------------------------------------------

export const weeklyHours: WeeklyDaySchedule[] = [
  {
    label: "Sunday",
    hours: "11AM – 11PM",
    bowlByHour: [{ label: "Bowl by Hour", rate: "$43/hr", period: "Open – Close" }],
    bowlByGame: [{ label: "Bowl by Game", rate: "N/A", period: "—" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$6.00", period: "All Day" }],
  },
  {
    label: "Monday",
    hours: "4PM – 10PM",
    bowlByHour: [{ label: "Bowl by Hour", rate: "$36/hr", period: "Open – Close" }],
    bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "4PM – Close" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$5.50", period: "All Day" }],
  },
  {
    label: "Tuesday",
    hours: "11AM – 11PM",
    bowlByHour: [{ label: "Bowl by Hour", rate: "$36/hr", period: "Open – Close" }],
    bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "Open – 5PM" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$5.50", period: "All Day" }],
  },
  {
    label: "Wednesday",
    hours: "11AM – 11PM",
    bowlByHour: [{ label: "Bowl by Hour", rate: "$36/hr", period: "Open – Close" }],
    bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "Open – 5PM" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$5.50", period: "All Day" }],
  },
  {
    label: "Thursday",
    hours: "11AM – 11PM",
    bowlByHour: [{ label: "Bowl by Hour", rate: "$36/hr", period: "Open – Close" }],
    bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "Open – 5PM" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$5.50", period: "All Day" }],
  },
  {
    label: "Friday",
    hours: "11AM – Midnight",
    bowlByHour: [
      { label: "Bowl by Hour", rate: "$43/hr", period: "Open – 5PM" },
      { label: "Bowl by Hour", rate: "$49/hr", period: "5PM – Close" },
    ],
    bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "Open – 5PM" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$6.00", period: "All Day" }],
  },
  {
    label: "Saturday",
    hours: "11AM – Midnight",
    bowlByHour: [
      { label: "Bowl by Hour", rate: "$43/hr", period: "Open – 5PM" },
      { label: "Bowl by Hour", rate: "$49/hr", period: "5PM – Close" },
    ],
    bowlByGame: [{ label: "Bowl by Game", rate: "N/A", period: "—" }],
    shoeRental: [{ label: "Shoe Rental", rate: "$6.00", period: "All Day" }],
  },
]

// ---------------------------------------------------------------------------
// 2. seasonalHoursOverrides — temporary hours/rate changes (EDIT HERE)
// ---------------------------------------------------------------------------

export const seasonalHoursOverrides: SeasonalHoursOverride[] = [
  {
    hours: "2PM – 10PM",
    bowlByGame: [{ label: "Bowl by Game", rate: "$6.00", period: "2PM – Close" }],
    when: { every: ["Monday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
  // Independence Day weekend: closed Saturday 7/4 (see `holidays` below),
  // reopening Sunday 7/5 on adjusted hours.
  {
    hours: "12PM – 10PM",
    when: { every: ["Sunday"], from: "2026-07-05", to: "2026-07-05" },
  },
]

// ---------------------------------------------------------------------------
// 3. holidays — add a row per observed holiday (include each year's date)
// ---------------------------------------------------------------------------

export const holidays: Holiday[] = [
  { name: "New Year's Day", date: "2026-01-01" },
  { name: "Day After New Year's", date: "2026-01-02" },
  { name: "Martin Luther King Day", date: "2026-01-19" },
  { name: "President's Day", date: "2026-02-16" },
  { name: "Memorial Day", date: "2026-05-25" },
  { name: "Juneteenth", date: "2026-06-19" },
  { name: "Independence Day", date: "2026-07-04", closed: true },
  { name: "Labor Day", date: "2026-09-07" },
  { name: "Veterans Day", date: "2026-11-11" },
  { name: "Thanksgiving Day", date: "2026-11-26", closed: true },
  { name: "Christmas Eve", date: "2026-12-24", closed: true },
  { name: "Christmas Day", date: "2026-12-25", closed: true },
  { name: "Day After Christmas", date: "2026-12-26" },
]

// ---------------------------------------------------------------------------
// 4. calendarSpecials — weekly/seasonal specials & cosmic (EDIT HERE)
// ---------------------------------------------------------------------------

export const calendarSpecials: ScheduleEntry[] = [
  // --- Monday (Summer 2026: June 1 – Aug 31) ---
  {
    id: "summer-monday-roll-call",
    category: "special",
    title: "Monday Roll Call",
    timeWindow: "2PM – 5PM",
    lines: ["3 games + shoes", "$11/person", "Opens at 2PM starting June 1"],
    when: { every: ["Monday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
  {
    id: "summer-monday-happy-hour",
    category: "special",
    title: "Happy Hour",
    timeWindow: "Open – Close",
    lines: ["Bar specials", "All day"],
    when: { every: ["Monday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },

  // --- Tuesday – Thursday (Summer 2026) ---
  {
    id: "summer-tue-thu-triple-play",
    category: "special",
    title: "Summer Triple Play",
    timeWindow: "Open – 5PM",
    lines: ["2 games + shoes + $10 arcade card", "$17/person"],
    when: {
      every: ["Tuesday", "Wednesday", "Thursday"],
      from: SUMMER_2026_FROM,
      to: SUMMER_2026_TO,
    },
  },
  {
    id: "summer-tue-thu-all-you-can-bowl",
    category: "special",
    title: "All You Can Bowl",
    timeWindow: "8PM – Close",
    lines: ["2 hrs unlimited bowling + shoes", "$18/person"],
    when: {
      every: ["Tuesday", "Wednesday", "Thursday"],
      from: SUMMER_2026_FROM,
      to: SUMMER_2026_TO,
    },
  },
  {
    id: "summer-tue-thu-late-night-happy-hour",
    category: "special",
    title: "Late Night Happy Hour",
    timeWindow: "9PM – Close",
    lines: ["Bar specials", "All night"],
    when: {
      every: ["Tuesday", "Wednesday", "Thursday"],
      from: SUMMER_2026_FROM,
      to: SUMMER_2026_TO,
    },
  },

  // --- Friday (Summer 2026) ---
  {
    id: "summer-friday-first-roll",
    category: "special",
    title: "First Roll",
    timeWindow: "Open – 2PM",
    lines: ["3 games · shoes not included", "$13/person"],
    when: { every: ["Friday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
  {
    id: "summer-friday-cosmic",
    category: "cosmic",
    title: "Cosmic Bowling",
    timeWindow: "3PM – Close",
    lines: ["Lights down, music up"],
    when: { every: ["Friday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },

  // --- Saturday (Summer 2026) ---
  {
    id: "summer-saturday-group-party-pack",
    category: "special",
    title: "Group Party Pack",
    timeWindow: "Open – 2PM",
    lines: [
      "4 bowlers + shoes · 1 hr bowling · pizza · soda pitcher",
      "Online only",
      "$100/group",
    ],
    when: { every: ["Saturday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
  {
    id: "summer-saturday-cosmic",
    category: "cosmic",
    title: "Cosmic Bowling",
    timeWindow: "All Day",
    lines: ["Lights down, music up"],
    when: { every: ["Saturday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },

  // --- Sunday (Summer 2026) ---
  {
    id: "summer-sunday-group-party-pack",
    category: "special",
    title: "Group Party Pack",
    timeWindow: "Open – 2PM",
    lines: [
      "4 bowlers + shoes · 1 hr bowling · pizza · soda pitcher",
      "Online only",
      "$100/group",
    ],
    when: { every: ["Sunday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
  {
    id: "summer-sunday-after-dark",
    category: "special",
    title: "Sunday After Dark",
    timeWindow: "7PM – Close",
    lines: ["Pay per game, no package needed", "$5 games · $5 shoes"],
    when: { every: ["Sunday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
  {
    id: "summer-sunday-cosmic",
    category: "cosmic",
    title: "Cosmic Bowling",
    timeWindow: "Open – 5PM",
    lines: ["Lights down, music up"],
    when: { every: ["Sunday"], from: SUMMER_2026_FROM, to: SUMMER_2026_TO },
  },
]

// ---------------------------------------------------------------------------
// 5. calendarEvents — one-off dated events (EDIT HERE)
// ---------------------------------------------------------------------------

export const calendarEvents: ScheduleEntry[] = [
  {
    id: "jr-shootout-2026",
    category: "event",
    title: "Southern California $30,000 Junior Shootout",
    lines: [
      "Four divisions — presented by BCSC and Storm",
      "Register online to secure your spot",
    ],
    when: { on: "2026-05-30" },
    cta: {
      label: "Register",
      href: "https://lp.constantcontactpages.com/ev/reg/bpd227s/lp/08ad52a8-f74a-450c-ac33-7b84b7cf6ad3",
    },
  },
]

/** All calendar entries — specials + events combined for the resolver. */
export const scheduleEntries: ScheduleEntry[] = [...calendarSpecials, ...calendarEvents]

// ---------------------------------------------------------------------------
// Resolver helpers
// ---------------------------------------------------------------------------

export function toISODate(date: Date): ISODate {
  return format(date, "yyyy-MM-dd")
}

export function getWeekdayName(date: Date): Weekday {
  return WEEKDAY_NAMES[getDay(date)]
}

function isInDateWindow(date: Date, from?: ISODate, to?: ISODate): boolean {
  if (!from && !to) return true
  const dateStr = toISODate(date)
  if (from && dateStr < from) return false
  if (to && dateStr > to) return false
  return true
}

/** Order used when displaying the weekly hours grid (Monday first, Sunday last). */
const DISPLAY_ORDER: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

/**
 * Base weekly hours with any active seasonal override applied, per weekday.
 * This is the single source of truth for "what are our hours" displays
 * (footer, contact page, homepage) — it always reflects `seasonalHoursOverrides`
 * so those sections never drift from the calendar.
 */
export function getEffectiveWeeklyHours(
  referenceDate: Date = new Date(),
): { label: Weekday; hours: string }[] {
  return weeklyHours.map((day) => {
    const override = seasonalHoursOverrides.find(
      (o) => o.when.every.includes(day.label) && isInDateWindow(referenceDate, o.when.from, o.when.to),
    )
    return { label: day.label, hours: override?.hours ?? day.hours }
  })
}

/**
 * Effective weekly hours grouped into display-friendly ranges, e.g.
 * "Tuesday - Thursday: 11AM – 11PM". Consecutive days (Monday → Sunday)
 * with identical hours are merged automatically.
 */
export function getGroupedWeeklyHours(
  referenceDate: Date = new Date(),
): { label: string; hours: string }[] {
  const effective = getEffectiveWeeklyHours(referenceDate)
  const byLabel = new Map(effective.map((d) => [d.label, d.hours]))
  const ordered = DISPLAY_ORDER.map((label) => ({ label, hours: byLabel.get(label)! }))

  const groups: { labels: Weekday[]; hours: string }[] = []
  for (const day of ordered) {
    const last = groups[groups.length - 1]
    if (last && last.hours === day.hours) {
      last.labels.push(day.label)
    } else {
      groups.push({ labels: [day.label], hours: day.hours })
    }
  }

  return groups.map((g) => ({
    label: g.labels.length === 1 ? g.labels[0] : `${g.labels[0]} - ${g.labels[g.labels.length - 1]}`,
    hours: g.hours,
  }))
}

export function matchesWhen(when: When, date: Date): boolean {
  const weekday = getWeekdayName(date)
  const dateStr = toISODate(date)

  if ("on" in when) {
    return dateStr === when.on
  }

  if ("every" in when) {
    if (!when.every.includes(weekday)) return false
    return isInDateWindow(date, when.from, when.to)
  }

  return isWithinInterval(date, {
    start: parseISO(when.from),
    end: parseISO(when.to),
  })
}

export function getMatchingEntries(date: Date): ScheduleEntry[] {
  return scheduleEntries.filter((entry) => matchesWhen(entry.when, date))
}

export function getHolidayForDate(date: Date): Holiday | undefined {
  const dateStr = toISODate(date)
  return holidays.find((h) => h.date === dateStr)
}

export function getSeasonalHoursOverride(date: Date): SeasonalHoursOverride | undefined {
  return seasonalHoursOverrides.find((override) => matchesWhen(override.when, date))
}

export function getDateInfo(date: Date): DateInfo {
  const weekday = getWeekdayName(date)
  const dayIndex = getDay(date)
  const base = weeklyHours[dayIndex]
  const holiday = getHolidayForDate(date)
  const isClosed = !!holiday?.closed
  const seasonalHours = !isClosed ? getSeasonalHoursOverride(date) : undefined
  const matching = isClosed ? [] : getMatchingEntries(date)

  const specials = matching.filter((e) => e.category === "special")
  const cosmic = matching.filter((e) => e.category === "cosmic")
  const events = matching.filter((e) => e.category === "event")

  const rates = isClosed
    ? { bowlByHour: [], bowlByGame: [], shoeRental: [] }
    : holiday
      ? {
          bowlByHour: holidayRateOverride.bowlByHour,
          bowlByGame: holidayRateOverride.bowlByGame,
          shoeRental: holidayRateOverride.shoeRental,
        }
      : {
          bowlByHour: seasonalHours?.bowlByHour ?? base.bowlByHour,
          bowlByGame: seasonalHours?.bowlByGame ?? base.bowlByGame,
          shoeRental: seasonalHours?.shoeRental ?? base.shoeRental,
        }

  const holidayNote = holiday
    ? isClosed
      ? (holiday.note ?? `Closed for ${holiday.name}.`)
      : (holiday.note ?? holidayRateOverride.note)
    : undefined

  return {
    date,
    dateLabel: format(date, "EEEE, MMMM d, yyyy"),
    weekday,
    hours: isClosed ? "Closed" : (seasonalHours?.hours ?? base.hours),
    rates,
    isClosed,
    isHoliday: !!holiday,
    holidayName: holiday?.name,
    holidayNote,
    specials,
    cosmic,
    events,
    hasActivity:
      !!holiday || specials.length > 0 || cosmic.length > 0 || events.length > 0,
  }
}

// ---------------------------------------------------------------------------
// Structured data (JSON-LD) helpers
// ---------------------------------------------------------------------------

function hoursPartTo24h(part: string): string {
  const trimmed = part.trim()
  if (/midnight/i.test(trimmed)) return "24:00"
  if (/noon/i.test(trimmed)) return "12:00"
  const match = trimmed.match(/(\d{1,2})\s*(AM|PM)/i)
  if (!match) return "00:00"
  let hour = Number.parseInt(match[1], 10)
  const meridiem = match[2].toUpperCase()
  if (meridiem === "PM" && hour !== 12) hour += 12
  if (meridiem === "AM" && hour === 12) hour = 0
  return `${hour.toString().padStart(2, "0")}:00`
}

/**
 * Converts base weekly hours (e.g. "11AM – Midnight") into schema.org
 * OpeningHoursSpecification entries for LocalBusiness JSON-LD.
 */
export function getOpeningHoursSpecification(): {
  "@type": "OpeningHoursSpecification"
  dayOfWeek: string
  opens: string
  closes: string
}[] {
  return weeklyHours.map((day) => {
    const [openPart, closePart] = day.hours.split(/[–-]/).map((s) => s.trim())
    return {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: `https://schema.org/${day.label}`,
      opens: hoursPartTo24h(openPart ?? ""),
      closes: hoursPartTo24h(closePart ?? ""),
    }
  })
}

export function getDayBadgeSummary(date: Date): DayBadgeSummary {
  const info = getDateInfo(date)
  const kinds: DayBadgeKind[] = []

  if (info.isHoliday) kinds.push("holiday")
  if (info.cosmic.length > 0) kinds.push("cosmic")
  if (info.specials.length > 0) kinds.push("special")
  if (info.events.length > 0) kinds.push("event")

  return { kinds }
}
