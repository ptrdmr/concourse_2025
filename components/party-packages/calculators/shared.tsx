import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { EVENTS_PHONE_DISPLAY, eventsMailto } from "@/lib/booking"
import { cn } from "@/lib/utils"

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function CostRow({
  label,
  amount,
  indent = false,
}: {
  label: string
  amount: number
  indent?: boolean
}) {
  return (
    <div className={cn("flex justify-between gap-4 text-muted-foreground", indent && "pl-4")}>
      <span>{label}</span>
      <span className="shrink-0 font-medium text-foreground">{formatCurrency(amount)}</span>
    </div>
  )
}

export function EstimatePanel({
  children,
  total,
  mailtoSubject,
}: {
  children: ReactNode
  total: number
  mailtoSubject: string
}) {
  return (
    <div className="h-fit rounded-lg border bg-muted/40 p-6">
      <h3 className="mb-4 text-xl font-bold">Cost Breakdown</h3>
      <div className="space-y-3">{children}</div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t-2 border-primary/50 pt-4">
        <span className="text-lg font-bold sm:text-xl">Estimated Total</span>
        <span className="text-2xl font-bold text-primary sm:text-3xl">{formatCurrency(total)}</span>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        * Estimate only. Does not include tax and fees. Contact us at {EVENTS_PHONE_DISPLAY} for exact quotes
        and availability.
      </p>
      <Button asChild className="mt-4 w-full" size="lg">
        <a href={eventsMailto(mailtoSubject)}>Request Info</a>
      </Button>
    </div>
  )
}
