"use client"

import React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ImageModalProps {
  trigger: React.ReactNode
  imageSrc: string
  imageAlt: string
  title?: string
}

export function ImageModal({ trigger, imageSrc, imageAlt, title }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 bg-black overflow-auto">
        <DialogHeader className="absolute right-4 top-4 z-10">
          <DialogClose className="rounded-full p-2 bg-black/50 text-white hover:bg-black/70">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {title && (
            <DialogTitle className="sr-only">{title}</DialogTitle>
          )}
        </DialogHeader>
        <div className="w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 