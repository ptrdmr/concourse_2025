"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

interface LazyMapEmbedProps {
  src: string
  title: string
  className?: string
}

/**
 * Google's Maps embed iframe pulls in 300+ KB of its own JS on load. Rather than
 * relying on the browser's native `loading="lazy"` (which still fires well before
 * the user actually scrolls there), we render a lightweight placeholder and only
 * mount the real iframe once it's close to the viewport or the user interacts with it.
 */
export function LazyMapEmbed({ src, title, className }: LazyMapEmbedProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldLoad || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          aria-label={`Load map: ${title}`}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground transition-colors hover:bg-muted/80"
        >
          <MapPin className="h-8 w-8" />
          <span className="text-sm font-medium">Tap to load map</span>
        </button>
      )}
    </div>
  )
}
