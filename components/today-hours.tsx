"use client"

import { useEffect, useState } from "react"
import { getDateInfo } from "@/lib/schedule"
import { cn } from "@/lib/utils"

/**
 * "Open today: 11AM – 11PM" label, computed on the client after mount so a
 * server in another time zone can't cause a hydration mismatch.
 */
export function TodayHours({ className }: { className?: string }) {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const info = getDateInfo(new Date())
    setLabel(info.isClosed ? "Closed today" : `Open today: ${info.hours}`)
  }, [])

  if (!label) return null
  return <span className={cn("whitespace-nowrap", className)}>{label}</span>
}
