"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { PerGuestPackage } from "@/lib/party-packages"
import { CostRow, EstimatePanel, formatCurrency } from "./shared"

export function KidsPartyCalculator({ pkg }: { pkg: PerGuestPackage }) {
  const pricing = pkg.pricing
  const [kids, setKids] = useState(pricing.baseGuests)

  const costs = useMemo(() => {
    const extraKids = Math.max(0, kids - pricing.baseGuests)
    const extraCost = extraKids * pricing.additionalGuestPrice
    const total = pricing.basePrice + extraCost
    const perKid = total / kids
    return { extraKids, extraCost, total, perKid }
  }, [kids, pricing])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Starting at {formatCurrency(pricing.basePrice)} for {pricing.baseGuests} kids. Additional kids are{" "}
          {formatCurrency(pricing.additionalGuestPrice)} each, up to {pricing.maxGuests}.
        </p>

        <div className="space-y-2">
          <Label htmlFor={`${pkg.id}-kids`}>Number of Kids</Label>
          <Input
            id={`${pkg.id}-kids`}
            type="number"
            min={pricing.baseGuests}
            max={pricing.maxGuests}
            value={kids}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10) || pricing.baseGuests
              setKids(Math.min(Math.max(val, pricing.baseGuests), pricing.maxGuests))
            }}
            className="w-24"
          />
          <p className="text-xs text-muted-foreground">
            Min {pricing.baseGuests}, Max {pricing.maxGuests}
          </p>
        </div>
      </div>

      <EstimatePanel total={costs.total} mailtoSubject={pkg.mailtoSubject}>
        <CostRow label={`Base package (${pricing.baseGuests} kids)`} amount={pricing.basePrice} />
        {costs.extraKids > 0 && (
          <CostRow
            label={`Additional kids (${costs.extraKids} × ${formatCurrency(pricing.additionalGuestPrice)})`}
            amount={costs.extraCost}
          />
        )}
        <p className="text-xs text-muted-foreground">
          {formatCurrency(costs.perKid)} per kid at this headcount
        </p>
      </EstimatePanel>
    </div>
  )
}
