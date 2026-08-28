"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FlatPackage } from "@/lib/party-packages"
import { CostRow, EstimatePanel, formatCurrency } from "./shared"

export function PairSpareCalculator({ pkg }: { pkg: FlatPackage }) {
  const pricing = pkg.pricing
  const [isWeekend, setIsWeekend] = useState(false)
  const [lanes, setLanes] = useState(pricing.baseLanes)

  const costs = useMemo(() => {
    const perLane = isWeekend ? pricing.weekendPerLane : pricing.weekdayPerLane
    const extraLanes = Math.max(0, lanes - pricing.baseLanes)
    const pairCost = pricing.baseLanes * perLane
    const extraCost = extraLanes * perLane
    const total = lanes * perLane
    return { perLane, extraLanes, pairCost, extraCost, total }
  }, [isWeekend, lanes, pricing])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Start with a pair of {pricing.baseLanes} lanes, then add more at {formatCurrency(pricing.weekdayPerLane)}{" "}
          per lane Monday–Thursday or {formatCurrency(pricing.weekendPerLane)} per lane Friday–Sunday. Up to{" "}
          {pricing.maxLanes} lanes.
        </p>

        <div className="space-y-2">
          <Label>Day of Week</Label>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name={`${pkg.id}-dayType`}
                checked={!isWeekend}
                onChange={() => setIsWeekend(false)}
                className="h-4 w-4 text-primary"
              />
              <span>Mon – Thu</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name={`${pkg.id}-dayType`}
                checked={isWeekend}
                onChange={() => setIsWeekend(true)}
                className="h-4 w-4 text-primary"
              />
              <span>Fri – Sun</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${pkg.id}-lanes`}>Number of Lanes</Label>
          <Input
            id={`${pkg.id}-lanes`}
            type="number"
            min={pricing.baseLanes}
            max={pricing.maxLanes}
            value={lanes}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10) || pricing.baseLanes
              setLanes(Math.min(Math.max(val, pricing.baseLanes), pricing.maxLanes))
            }}
            className="w-24"
          />
          <p className="text-xs text-muted-foreground">
            Min {pricing.baseLanes} (first pair), max {pricing.maxLanes}
          </p>
        </div>
      </div>

      <EstimatePanel total={costs.total} mailtoSubject={pkg.mailtoSubject}>
        <CostRow
          label={`First pair (${pricing.baseLanes} lanes × ${formatCurrency(costs.perLane)})`}
          amount={costs.pairCost}
        />
        {costs.extraLanes > 0 && (
          <CostRow
            label={`Additional lanes (${costs.extraLanes} × ${formatCurrency(costs.perLane)})`}
            amount={costs.extraCost}
          />
        )}
        <p className="text-xs text-muted-foreground">
          {lanes} lanes · first pair includes food & arcade for {pricing.guestsForBase} guests
        </p>
      </EstimatePanel>
    </div>
  )
}
