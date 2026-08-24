"use client"

import dynamic from "next/dynamic"

// `next/dynamic` with `ssr: false` must live in a Client Component boundary,
// so this thin wrapper lets Server Components (like the homepage) render the
// calendar as a lazily-loaded client island without pulling date-fns/Vaul
// into the initial page bundle.
export const BusinessCalendar = dynamic(
  () => import("@/components/business-calendar").then((mod) => mod.BusinessCalendar),
  {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse rounded-lg bg-muted" />,
  },
)
