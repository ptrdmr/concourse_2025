import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or removed.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            Return to Home
          </Link>
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