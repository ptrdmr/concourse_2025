"use client"

import { AnimatedHeader } from "./animated-header"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  centered?: boolean
}

export function PageHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  centered = false
}: PageHeaderProps) {
  return (
    <div className={cn(
      "pb-8 pt-6 md:pb-12 md:pt-10 lg:pb-16 lg:pt-14",
      centered && "text-center",
      className
    )}>
      <AnimatedHeader
        text={title}
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          titleClassName
        )}
      />
      {description && (
        <p className={cn(
          "mt-4 text-muted-foreground md:text-xl",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  )
} 