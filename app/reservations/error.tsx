'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ReservationsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
      <h2 className="text-3xl font-bold mb-4">Reservations Error</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We apologize, but there was an issue loading the reservations page. Please try again or contact us directly.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">
            Contact Us
          </Link>
        </Button>
      </div>
    </div>
  )
} 