"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

// Pricing configuration
const SUITES = {
  strikeZone: {
    name: "Strike Zone (4 Lanes)",
    minGuests: 20,
    maxGuests: 32,
    minHours: 2,
    weekdayRate: 450,
    weekendRate: 550,
  },
  kingpin: {
    name: "Kingpin (8 Lanes)",
    minGuests: 40,
    maxGuests: 64,
    minHours: 3,
    weekdayRate: 699,
    weekendRate: 799,
  },
  powerhouse: {
    name: "Powerhouse (12 Lanes)",
    minGuests: 80,
    maxGuests: 96,
    minHours: 3,
    weekdayRate: 999,
    weekendRate: 1299,
  },
} as const

const CATERING_PACKAGES = {
  pizza: { name: "Pizza, Salad & Soda Package", pricePerPerson: 36 },
  taco: { name: "Taco Bar Package", pricePerPerson: 40 },
  buildYourOwn: { name: "Build Your Own", pricePerPerson: 44 },
} as const

const DRINK_PRICING = {
  unlimitedSoftDrinks: 6, // per person
  premiumTicket: 12,      // per ticket
  beerWineTicket: 9,      // per ticket
} as const

type SuiteKey = keyof typeof SUITES
type CateringKey = keyof typeof CATERING_PACKAGES

interface VipCalculatorProps {
  id?: string
}

export function VipCalculator({ id }: VipCalculatorProps) {
  const [suite, setSuite] = useState<SuiteKey>("strikeZone")
  const [isWeekend, setIsWeekend] = useState(false)
  const [hours, setHours] = useState(2)
  const [guests, setGuests] = useState(20)
  const [catering, setCatering] = useState<CateringKey>("pizza")
  const [unlimitedSoftDrinks, setUnlimitedSoftDrinks] = useState(false)
  const [premiumTickets, setPremiumTickets] = useState(0)
  const [beerWineTickets, setBeerWineTickets] = useState(0)

  const selectedSuite = SUITES[suite]
  const selectedCatering = CATERING_PACKAGES[catering]

  // Update guests and hours when suite changes
  const handleSuiteChange = (newSuite: SuiteKey) => {
    setSuite(newSuite)
    const suiteConfig = SUITES[newSuite]
    setGuests(suiteConfig.minGuests)
    setHours(suiteConfig.minHours)
  }

  // Calculate costs
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
  }, [suite, isWeekend, hours, guests, catering, unlimitedSoftDrinks, premiumTickets, beerWineTickets, selectedSuite, selectedCatering])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card id={id} className="mt-8 bg-gray-900 border-gray-700 scroll-mt-4">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl text-white text-center">
          VIP Suite Cost Estimator
        </CardTitle>
        <p className="text-center text-gray-400 text-sm">
          Get an instant estimate for your VIP party. All suites require a catering package.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Suite Selection */}
            <div className="space-y-2">
              <Label htmlFor="suite" className="text-white font-medium">
                Select Suite
              </Label>
              <Select value={suite} onValueChange={(v) => handleSuiteChange(v as SuiteKey)}>
                <SelectTrigger id="suite" className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {Object.entries(SUITES).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-gray-600">
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">
                {selectedSuite.minGuests}-{selectedSuite.maxGuests} guests, {selectedSuite.minHours} hour minimum
              </p>
            </div>

            {/* Day Type */}
            <div className="space-y-2">
              <Label className="text-white font-medium">Day of Week</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dayType"
                    checked={!isWeekend}
                    onChange={() => setIsWeekend(false)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-300">Mon - Thu</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dayType"
                    checked={isWeekend}
                    onChange={() => setIsWeekend(true)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-300">Fri - Sun</span>
                </label>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-2">
              <Label htmlFor="hours" className="text-white font-medium">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                min={selectedSuite.minHours}
                max={8}
                value={hours}
                onChange={(e) => setHours(Math.max(selectedSuite.minHours, parseInt(e.target.value) || selectedSuite.minHours))}
                className="bg-gray-700 border-gray-600 text-white w-24"
              />
              <p className="text-xs text-gray-400">
                {formatCurrency(costs.hourlyRate)}/hour
              </p>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-white font-medium">
                Number of Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min={selectedSuite.minGuests}
                max={selectedSuite.maxGuests}
                value={guests}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || selectedSuite.minGuests
                  setGuests(Math.min(Math.max(val, selectedSuite.minGuests), selectedSuite.maxGuests))
                }}
                className="bg-gray-700 border-gray-600 text-white w-24"
              />
              <p className="text-xs text-gray-400">
                Min {selectedSuite.minGuests}, Max {selectedSuite.maxGuests}
              </p>
            </div>

            {/* Catering Package */}
            <div className="space-y-2">
              <Label htmlFor="catering" className="text-white font-medium">
                Catering Package (Required)
              </Label>
              <Select value={catering} onValueChange={(v) => setCatering(v as CateringKey)}>
                <SelectTrigger id="catering" className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {Object.entries(CATERING_PACKAGES).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-gray-600">
                      {value.name} - {formatCurrency(value.pricePerPerson)}/person
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Drink Add-ons */}
            <div className="space-y-4">
              <Label className="text-white font-medium">Drink Add-ons</Label>
              
              <div className="flex items-center gap-3">
                <Checkbox
                  id="softDrinks"
                  checked={unlimitedSoftDrinks}
                  onCheckedChange={(checked) => setUnlimitedSoftDrinks(checked === true)}
                  className="border-gray-500"
                />
                <label htmlFor="softDrinks" className="text-gray-300 cursor-pointer">
                  Unlimited Soft Drinks ({formatCurrency(DRINK_PRICING.unlimitedSoftDrinks)}/person)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="premiumTickets" className="text-gray-300 text-sm">
                    Premium Drink Tickets
                  </Label>
                  <Input
                    id="premiumTickets"
                    type="number"
                    min={0}
                    value={premiumTickets}
                    onChange={(e) => setPremiumTickets(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-gray-700 border-gray-600 text-white w-full"
                  />
                  <p className="text-xs text-gray-400">{formatCurrency(DRINK_PRICING.premiumTicket)}/ticket</p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="beerWineTickets" className="text-gray-300 text-sm">
                    Beer & Wine Tickets
                  </Label>
                  <Input
                    id="beerWineTickets"
                    type="number"
                    min={0}
                    value={beerWineTickets}
                    onChange={(e) => setBeerWineTickets(Math.max(0, parseInt(e.target.value) || 0))}
                    className="bg-gray-700 border-gray-600 text-white w-full"
                  />
                  <p className="text-xs text-gray-400">{formatCurrency(DRINK_PRICING.beerWineTicket)}/ticket</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cost Breakdown */}
          <div className="bg-gray-950 border border-gray-700 rounded-lg p-6 h-fit lg:sticky lg:top-4">
            <h3 className="text-xl font-bold text-white mb-4">Cost Breakdown</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Suite ({hours} hrs × {formatCurrency(costs.hourlyRate)})</span>
                <span className="font-medium">{formatCurrency(costs.suiteCost)}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Catering ({guests} guests × {formatCurrency(selectedCatering.pricePerPerson)})</span>
                <span className="font-medium">{formatCurrency(costs.cateringCost)}</span>
              </div>

              {costs.drinksCost > 0 && (
                <>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <span className="text-gray-400 text-sm">Drink Add-ons:</span>
                  </div>
                  {costs.softDrinksCost > 0 && (
                    <div className="flex justify-between text-gray-300 pl-4">
                      <span>Unlimited Soft Drinks</span>
                      <span>{formatCurrency(costs.softDrinksCost)}</span>
                    </div>
                  )}
                  {costs.premiumTicketsCost > 0 && (
                    <div className="flex justify-between text-gray-300 pl-4">
                      <span>Premium Tickets ({premiumTickets})</span>
                      <span>{formatCurrency(costs.premiumTicketsCost)}</span>
                    </div>
                  )}
                  {costs.beerWineTicketsCost > 0 && (
                    <div className="flex justify-between text-gray-300 pl-4">
                      <span>Beer & Wine Tickets ({beerWineTickets})</span>
                      <span>{formatCurrency(costs.beerWineTicketsCost)}</span>
                    </div>
                  )}
                </>
              )}

              <div className="border-t-2 border-primary/50 pt-4 mt-4 bg-primary/10 -mx-6 px-6 -mb-6 pb-6 rounded-b-lg">
                <div className="flex justify-between items-center text-white">
                  <span className="text-xl font-bold">Estimated Total</span>
                  <span className="text-3xl font-bold text-primary">{formatCurrency(costs.total)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              * Estimate only. Does not include tax and fees. Contact us at (714) 666-2695 ext. 238 for exact quotes and availability.
            </p>

            <Button asChild className="w-full mt-4" size="lg">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Request Info
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
