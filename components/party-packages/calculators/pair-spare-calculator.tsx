"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FlatPackage } from "@/lib/party-packages"
import { CostRow, EstimatePanel, formatCurrency } from "./shared"

const MAX_PACKAGES = 4

export function PairSpareCalculator({ pkg }: { pkg: FlatPackage }) {
  const pricing = pkg.pricing
  const [isWeekend, setIsWeekend] = useState(false)
  const [packages, setPackages] = useState(1)

  const costs = useMemo(() => {
    const unitPrice = isWeekend ? pricing.weekendPrice : pricing.weekdayPrice
    const total = packages * unitPrice
    const guests = packages * pricing.guestsPerPackage
    const lanes = packages * 2
    return { unitPrice, total, guests, lanes }
  }, [isWeekend, packages, pricing])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Each package covers {pricing.guestsPerPackage} guests on 2 lanes. Monday–Thursday{" "}
          {formatCurrency(pricing.weekdayPrice)}, Friday–Sunday {formatCurrency(pricing.weekendPrice)}.
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
          <Label htmlFor={`${pkg.id}-packages`}>Number of Packages</Label>
          <Input
            id={`${pkg.id}-packages`}
            type="number"
            min={1}
            max={MAX_PACKAGES}
            value={packages}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10) || 1
              setPackages(Math.min(Math.max(val, 1), MAX_PACKAGES))
            }}
            className="w-24"
          />
          <p className="text-xs text-muted-foreground">
            Each package covers {pricing.guestsPerPackage} guests on 2 lanes.
          </p>
        </div>
      </div>

      <EstimatePanel total={costs.total} mailtoSubject={pkg.mailtoSubject}>
        <CostRow
          label={`${packages} package${packages === 1 ? "" : "s"} × ${formatCurrency(costs.unitPrice)}`}
          amount={costs.total}
        />
        <p className="text-xs text-muted-foreground">
          Covers {costs.guests} guests on {costs.lanes} lanes
        </p>
      </EstimatePanel>
    </div>
  )
}
