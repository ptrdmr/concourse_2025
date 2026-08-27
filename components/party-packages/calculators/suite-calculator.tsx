"use client"

import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CATERING_MENU_URL,
  CATERING_PACKAGES,
  DRINK_PRICING,
  SUITE_MAX_HOURS,
  VIP_SUITES,
  type CateringKey,
  type SuiteKey,
} from "@/lib/party-packages"
import { CostRow, EstimatePanel, formatCurrency } from "./shared"

export function SuiteCalculator({ mailtoSubject }: { mailtoSubject: string }) {
  const [suite, setSuite] = useState<SuiteKey>("strikeZone")
  const [isWeekend, setIsWeekend] = useState(false)
  const [hours, setHours] = useState(VIP_SUITES.strikeZone.minHours)
  const [guests, setGuests] = useState(VIP_SUITES.strikeZone.minGuests)
  const [catering, setCatering] = useState<CateringKey>("pizza")
  const [unlimitedSoftDrinks, setUnlimitedSoftDrinks] = useState(false)
  const [premiumTickets, setPremiumTickets] = useState(0)
  const [beerWineTickets, setBeerWineTickets] = useState(0)

  const selectedSuite = VIP_SUITES[suite]
  const selectedCatering = CATERING_PACKAGES[catering]

  const handleSuiteChange = (newSuite: SuiteKey) => {
    setSuite(newSuite)
    const config = VIP_SUITES[newSuite]
    setGuests(config.minGuests)
    setHours(config.minHours)
  }

  const costs = useMemo(() => {
    const hourlyRate = isWeekend ? selectedSuite.weekendRate : selectedSuite.weekdayRate
    const suiteCost = hours * hourlyRate
    const cateringCost = guests * selectedCatering.pricePerPerson
    const softDrinksCost = unlimitedSoftDrinks ? guests * DRINK_PRICING.unlimitedSoftDrinks : 0
    const premiumTicketsCost = premiumTickets * DRINK_PRICING.premiumTicket
    const beerWineTicketsCost = beerWineTickets * DRINK_PRICING.beerWineTicket
    const drinksCost = softDrinksCost + premiumTicketsCost + beerWineTicketsCost
    const total = suiteCost + cateringCost + drinksCost

    return {
      suiteCost,
      cateringCost,
      softDrinksCost,
      premiumTicketsCost,
      beerWineTicketsCost,
      drinksCost,
      total,
      hourlyRate,
    }
  }, [
    isWeekend,
    hours,
    guests,
    unlimitedSoftDrinks,
    premiumTickets,
    beerWineTickets,
    selectedCatering,
    selectedSuite,
  ])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          All suites require a catering package.{" "}
          <a
            href={CATERING_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            View catering menu
          </a>
        </p>

        <div className="space-y-2">
          <Label htmlFor="vip-suite">Suite Size</Label>
          <Select value={suite} onValueChange={(v) => handleSuiteChange(v as SuiteKey)}>
            <SelectTrigger id="vip-suite">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(VIP_SUITES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {selectedSuite.minGuests}–{selectedSuite.maxGuests} guests, {selectedSuite.minHours} hour minimum
          </p>
        </div>

        <div className="space-y-2">
          <Label>Day of Week</Label>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="vip-dayType"
                checked={!isWeekend}
                onChange={() => setIsWeekend(false)}
                className="h-4 w-4 text-primary"
              />
              <span>Mon – Thu</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="vip-dayType"
                checked={isWeekend}
                onChange={() => setIsWeekend(true)}
                className="h-4 w-4 text-primary"
              />
              <span>Fri – Sun</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vip-hours">Hours</Label>
          <Input
            id="vip-hours"
            type="number"
            min={selectedSuite.minHours}
            max={SUITE_MAX_HOURS}
            value={hours}
            onChange={(e) =>
              setHours(
                Math.max(selectedSuite.minHours, Number.parseInt(e.target.value, 10) || selectedSuite.minHours),
              )
            }
            className="w-24"
          />
          <p className="text-xs text-muted-foreground">{formatCurrency(costs.hourlyRate)}/hour</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vip-guests">Number of Guests</Label>
          <Input
            id="vip-guests"
            type="number"
            min={selectedSuite.minGuests}
            max={selectedSuite.maxGuests}
            value={guests}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10) || selectedSuite.minGuests
              setGuests(Math.min(Math.max(val, selectedSuite.minGuests), selectedSuite.maxGuests))
            }}
            className="w-24"
          />
          <p className="text-xs text-muted-foreground">
            Min {selectedSuite.minGuests}, Max {selectedSuite.maxGuests}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vip-catering">Catering Package (Required)</Label>
          <Select value={catering} onValueChange={(v) => setCatering(v as CateringKey)}>
            <SelectTrigger id="vip-catering">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CATERING_PACKAGES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name} — {formatCurrency(value.pricePerPerson)}/person
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Drink Add-ons</Label>

          <div className="flex items-center gap-3">
            <Checkbox
              id="vip-softDrinks"
              checked={unlimitedSoftDrinks}
              onCheckedChange={(checked) => setUnlimitedSoftDrinks(checked === true)}
            />
            <label htmlFor="vip-softDrinks" className="cursor-pointer text-sm">
              Unlimited Soft Drinks ({formatCurrency(DRINK_PRICING.unlimitedSoftDrinks)}/person)
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="vip-premiumTickets" className="text-sm font-normal">
                Premium Drink Tickets
              </Label>
              <Input
                id="vip-premiumTickets"
                type="number"
                min={0}
                value={premiumTickets}
                onChange={(e) => setPremiumTickets(Math.max(0, Number.parseInt(e.target.value, 10) || 0))}
              />
              <p className="text-xs text-muted-foreground">{formatCurrency(DRINK_PRICING.premiumTicket)}/ticket</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="vip-beerWineTickets" className="text-sm font-normal">
                Beer &amp; Wine Tickets
              </Label>
              <Input
                id="vip-beerWineTickets"
                type="number"
                min={0}
                value={beerWineTickets}
                onChange={(e) => setBeerWineTickets(Math.max(0, Number.parseInt(e.target.value, 10) || 0))}
              />
              <p className="text-xs text-muted-foreground">{formatCurrency(DRINK_PRICING.beerWineTicket)}/ticket</p>
            </div>
          </div>
        </div>
      </div>

      <EstimatePanel total={costs.total} mailtoSubject={mailtoSubject}>
        <CostRow
          label={`Suite (${hours} hrs × ${formatCurrency(costs.hourlyRate)})`}
          amount={costs.suiteCost}
        />
        <CostRow
          label={`Catering (${guests} guests × ${formatCurrency(selectedCatering.pricePerPerson)})`}
          amount={costs.cateringCost}
        />
        {costs.drinksCost > 0 && (
          <>
            <p className="border-t pt-2 text-sm text-muted-foreground">Drink Add-ons:</p>
            {costs.softDrinksCost > 0 && (
              <CostRow label="Unlimited Soft Drinks" amount={costs.softDrinksCost} indent />
            )}
            {costs.premiumTicketsCost > 0 && (
              <CostRow label={`Premium Tickets (${premiumTickets})`} amount={costs.premiumTicketsCost} indent />
            )}
            {costs.beerWineTicketsCost > 0 && (
              <CostRow
                label={`Beer & Wine Tickets (${beerWineTickets})`}
                amount={costs.beerWineTicketsCost}
                indent
              />
            )}
          </>
        )}
      </EstimatePanel>
    </div>
  )
}
