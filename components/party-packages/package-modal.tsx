"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  EVENTS_PHONE_DISPLAY,
  EVENTS_PHONE_TEL,
  LANE_BOOKING_URL,
  eventsMailto,
} from "@/lib/booking"
import {
  VIP_SUITES,
  isFlatPackage,
  isPerGuestPackage,
  isSuitesPackage,
  type PartyPackage,
} from "@/lib/party-packages"
import { SuiteCalculator } from "./calculators/suite-calculator"
import { KidsPartyCalculator } from "./calculators/kids-party-calculator"
import { PairSpareCalculator } from "./calculators/pair-spare-calculator"
import { formatCurrency } from "./calculators/shared"

function PackageCalculator({ pkg }: { pkg: PartyPackage }) {
  if (isSuitesPackage(pkg)) {
    return <SuiteCalculator mailtoSubject={pkg.mailtoSubject} />
  }
  if (isPerGuestPackage(pkg)) {
    return <KidsPartyCalculator key={pkg.id} pkg={pkg} />
  }
  if (isFlatPackage(pkg)) {
    return <PairSpareCalculator key={pkg.id} pkg={pkg} />
  }
  return (
    <div className="rounded-lg border bg-muted/40 p-6">
      <h3 className="text-xl font-bold">Custom quote</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        12 lanes? 20 lanes? All 40 lanes? We can accommodate events of up to 320 bowlers. Call or email and we
        will put together a quote for your group.
      </p>
    </div>
  )
}

function SuiteSizeGuide() {
  return (
    <div>
      <p className="mb-3 font-bold">Suite sizes</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {Object.values(VIP_SUITES).map((suite) => (
          <div key={suite.name} className="rounded-lg border bg-muted/30 p-3">
            <p className="font-semibold">{suite.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {suite.minGuests}–{suite.maxGuests} guests
            </p>
            <p className="text-sm text-muted-foreground">{suite.minHours} hour minimum</p>
            <p className="mt-2 text-sm font-medium">
              {formatCurrency(suite.weekdayRate)}/{formatCurrency(suite.weekendRate)} per hour
            </p>
            <p className="text-xs text-muted-foreground">Mon–Thu / Fri–Sun</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PartyPackageModal({
  pkg,
  open,
  onOpenChange,
}: {
  pkg: PartyPackage | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        {pkg && (
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6">
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="text-2xl">{pkg.name}</DialogTitle>
                <DialogDescription>
                  {pkg.tagline} · {pkg.priceHeadline} · {pkg.capacity}
                </DialogDescription>
              </DialogHeader>

              <Image
                src={pkg.image}
                alt={pkg.imageAlt}
                width={1600}
                height={900}
                className="h-48 w-full rounded-lg object-cover sm:h-56"
                sizes="(max-width: 768px) 100vw, 896px"
              />

              <div>
                <p className="mb-2 font-bold">What&apos;s Included:</p>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  {pkg.inclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {pkg.notes?.map((note) => (
                  <p key={note} className="mt-3 text-sm italic text-muted-foreground">
                    {note}
                  </p>
                ))}
              </div>

              {isSuitesPackage(pkg) && <SuiteSizeGuide />}

              <PackageCalculator pkg={pkg} />

              <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row">
                <Button asChild>
                  <a href={EVENTS_PHONE_TEL}>Call {EVENTS_PHONE_DISPLAY}</a>
                </Button>
                <Button asChild variant="outline">
                  <a href={eventsMailto(pkg.mailtoSubject)}>Email Our Planners</a>
                </Button>
                {pkg.id === "pair-spare" && (
                  <Button asChild variant="outline">
                    <a href={LANE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      Book Online
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
