"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  getPartyPackage,
  isPartyPackageId,
  LEGACY_TAB_TO_PACKAGE,
  PARTY_PACKAGES,
} from "@/lib/party-packages"
import { PartyPackageModal } from "./package-modal"

function resolveOpenPackageId(packageParam: string | null, tabParam: string | null): string | null {
  if (packageParam && isPartyPackageId(packageParam)) return packageParam
  if (tabParam) {
    const mapped = LEGACY_TAB_TO_PACKAGE[tabParam]
    if (mapped && isPartyPackageId(mapped)) return mapped
  }
  return null
}

export function PartyPackageGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const skipUrlSync = useRef(false)

  const [openPackageId, setOpenPackageIdState] = useState<string | null>(() =>
    resolveOpenPackageId(searchParams.get("package"), searchParams.get("tab")),
  )

  const writeUrl = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("track", "parties")
      params.delete("tab")
      if (id) {
        params.set("package", id)
      } else {
        params.delete("package")
      }
      router.replace(`/reservations?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const setOpenPackageId = useCallback(
    (id: string | null) => {
      skipUrlSync.current = true
      setOpenPackageIdState(id)
      writeUrl(id)
    },
    [writeUrl],
  )

  useEffect(() => {
    if (skipUrlSync.current) {
      skipUrlSync.current = false
      return
    }
    setOpenPackageIdState(resolveOpenPackageId(searchParams.get("package"), searchParams.get("tab")))
  }, [searchParams])

  const openPackage = getPartyPackage(openPackageId)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {PARTY_PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => setOpenPackageId(pkg.id)}
            aria-haspopup="dialog"
            aria-label={`${pkg.name}. ${pkg.priceHeadline}. ${pkg.tagline}`}
            className="group relative min-h-[320px] overflow-hidden rounded-2xl border-2 border-transparent text-left shadow-lg transition-all duration-300 hover:border-red-600/80 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:min-h-[360px]"
          >
            <Image
              src={pkg.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-sm font-semibold text-white/80">
                {pkg.priceHeadline} · {pkg.capacity}
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">{pkg.name}</h3>
              <p className="mt-1 text-sm text-white/80">{pkg.tagline}</p>
              <ul className="mt-3 space-y-1 text-sm text-white/90">
                {pkg.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>

      <PartyPackageModal
        pkg={openPackage ?? null}
        open={!!openPackage}
        onOpenChange={(open) => {
          if (!open) setOpenPackageId(null)
        }}
      />
    </>
  )
}
