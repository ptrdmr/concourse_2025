"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Sparkles,
  Star,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/components/ui/use-mobile"
import { cn } from "@/lib/utils"
import {
  getDateInfo,
  getDayBadgeSummary,
  type DateInfo,
  type DayBadgeKind,
  type ScheduleEntry,
} from "@/lib/schedule"

const BADGE_DOT: Record<DayBadgeKind, string> = {
  holiday: "bg-amber-500",
  cosmic: "bg-purple-500",
  special: "bg-red-500",
  event: "bg-blue-500",
}

const BADGE_LABEL: Record<DayBadgeKind, string> = {
  holiday: "Holiday",
  cosmic: "Cosmic",
  special: "Special",
  event: "Event",
}

function EntryBlock({ entry }: { entry: ScheduleEntry }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="font-semibold">{entry.title}</h4>
        {entry.timeWindow ? (
          <Badge variant="outline" className="shrink-0">
            {entry.timeWindow}
          </Badge>
        ) : null}
      </div>
      {entry.lines?.length ? (
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {entry.lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : null}
      {entry.cta ? (
        <Button size="sm" className="mt-3" asChild>
          {entry.cta.href.startsWith("/") ? (
            <Link href={entry.cta.href}>{entry.cta.label}</Link>
          ) : (
            <a href={entry.cta.href} target="_blank" rel="noopener noreferrer">
              {entry.cta.label}
            </a>
          )}
        </Button>
      ) : null}
    </div>
  )
}

function RateTable({
  title,
  rows,
}: {
  title: string
  rows: { label: string; rate: string; period: string }[]
}) {
  return (
    <div>
      <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <DollarSign className="h-4 w-4 text-primary" />
        {title}
      </h4>
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span>
              <span className="font-semibold">{row.rate}</span>
              <span className="ml-2 text-muted-foreground">{row.period}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DayDetailPanel({ info }: { info: DateInfo }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{info.weekday}</p>
        <h3 className="text-xl font-bold">{format(info.date, "MMMM d, yyyy")}</h3>
      </div>

      {info.isHoliday ? (
        <div
          className={cn(
            "rounded-lg border p-4",
            info.isClosed
              ? "border-destructive/30 bg-destructive/10"
              : "border-amber-500/30 bg-amber-500/10",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 font-semibold",
              info.isClosed
                ? "text-destructive"
                : "text-amber-700 dark:text-amber-400",
            )}
          >
            <CalendarDays className="h-4 w-4" />
            {info.holidayName}
            {info.isClosed ? " — Closed" : null}
          </div>
          {info.holidayNote ? (
            <p className="mt-2 text-sm text-muted-foreground">{info.holidayNote}</p>
          ) : null}
        </div>
      ) : null}

      <div>
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Clock className="h-4 w-4 text-primary" />
          Hours
        </h4>
        <p className={cn("text-sm", info.isClosed && "font-semibold text-destructive")}>
          {info.hours}
        </p>
      </div>

      {!info.isClosed ? (
        <div className="space-y-4 rounded-lg border p-4">
          <RateTable title="Walk-in — Bowl by Hour" rows={info.rates.bowlByHour} />
          <RateTable title="Walk-in — Bowl by Game" rows={info.rates.bowlByGame} />
          <RateTable title="Shoe Rental" rows={info.rates.shoeRental} />
        </div>
      ) : null}

      {info.specials.length > 0 ? (
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Star className="h-4 w-4 text-red-500" />
            Specials
          </h4>
          <div className="space-y-3">
            {info.specials.map((entry) => (
              <EntryBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ) : null}

      {info.cosmic.length > 0 ? (
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Cosmic Bowling
          </h4>
          <div className="space-y-3">
            {info.cosmic.map((entry) => (
              <EntryBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ) : null}

      {info.events.length > 0 ? (
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            Events
          </h4>
          <div className="space-y-3">
            {info.events.map((entry) => (
              <EntryBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ) : null}

      {!info.hasActivity && !info.isClosed ? (
        <p className="text-sm text-muted-foreground">
          No specials or events scheduled for this date — standard hours and walk-in rates apply.
        </p>
      ) : null}
    </div>
  )
}

export function BusinessCalendar() {
  const isMobile = useIsMobile()
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())
  const [drawerOpen, setDrawerOpen] = useState(false)

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const gridStart = startOfWeek(monthStart)
    const gridEnd = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: gridStart, end: gridEnd })
  }, [currentMonth])

  const calendarWeeks = useMemo(() => {
    const weeks: Date[][] = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7))
    }
    return weeks
  }, [calendarDays])

  const selectedInfo = useMemo(() => getDateInfo(selectedDate), [selectedDate])

  const handleSelectDay = (day: Date) => {
    setSelectedDate(day)
    if (isMobile) setDrawerOpen(true)
  }

  const legend: { kind: DayBadgeKind; label: string }[] = [
    { kind: "special", label: "Special" },
    { kind: "cosmic", label: "Cosmic" },
    { kind: "event", label: "Event" },
    { kind: "holiday", label: "Holiday" },
  ]

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-stretch">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => {
                const today = new Date()
                setCurrentMonth(startOfMonth(today))
                setSelectedDate(today)
              }}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="py-2 text-center text-xs font-medium text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            {calendarWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid flex-1 grid-cols-7 gap-1">
                {week.map((day) => {
              const inMonth = isSameMonth(day, currentMonth)
              const selected = isSameDay(day, selectedDate)
              const today = isToday(day)
              const { kinds } = getDayBadgeSummary(day)

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "relative flex h-full min-h-[3.25rem] flex-col items-center justify-start rounded-lg border p-1 text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    !inMonth && "text-muted-foreground/40",
                    selected && "border-primary bg-primary/5 ring-1 ring-primary",
                    today && !selected && "border-primary/40 bg-accent/50",
                  )}
                  aria-label={format(day, "EEEE, MMMM d, yyyy")}
                  aria-pressed={selected}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                      today && "bg-primary text-primary-foreground",
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  {kinds.length > 0 ? (
                    <span className="mt-0.5 flex gap-0.5">
                      {kinds.slice(0, 3).map((kind) => (
                        <span
                          key={kind}
                          className={cn("h-1.5 w-1.5 rounded-full", BADGE_DOT[kind])}
                          title={BADGE_LABEL[kind]}
                        />
                      ))}
                    </span>
                  ) : (
                    <span className="mt-0.5 h-1.5" aria-hidden />
                  )}
                </button>
              )
                })}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t pt-4">
            {legend.map(({ kind, label }) => (
              <span key={kind} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={cn("h-2 w-2 rounded-full", BADGE_DOT[kind])} />
                {label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {!isMobile ? (
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Day details</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <DayDetailPanel info={selectedInfo} />
          </CardContent>
        </Card>
      ) : null}

      {isMobile ? (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>{selectedInfo.dateLabel}</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-8">
              <DayDetailPanel info={selectedInfo} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : null}
    </div>
  )
}
