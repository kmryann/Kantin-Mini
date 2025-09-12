"use client"

import { useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Utensils, Coffee, Flame, Cookie } from "lucide-react"

type MenuFiltersProps = {
  categories: string[]              // contoh: ["Semua","Paket Nasi","Light Bites","Minuman","Pedas","Dessert"]
  active: string
  onChange: (value: string) => void
  counts?: Record<string, number>   // opsional: { "Paket Nasi": 12, ... }
  className?: string
}

const iconFor = (name: string) => {
  const key = name.toLowerCase()
  if (key.includes("minum")) return <Coffee className="size-4" />
  if (key.includes("pedas")) return <Flame className="size-4" />
  if (key.includes("dessert") || key.includes("snack") || key.includes("bites"))
    return <Cookie className="size-4" />
  return <Utensils className="size-4" />
}

export function MenuFilters({ categories, active, onChange, counts, className }: MenuFiltersProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const items = useMemo(
    () => (categories?.length ? categories : ["Semua"]),
    [categories]
  )

  const scrollBy = (dir: "left" | "right") => {
    const el = trackRef.current
    if (!el) return
    const amount = Math.min(240, el.clientWidth * 0.85)
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0",
        "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="relative">
        {/* panah scroll (opsional) */}
        <button
          aria-label="Scroll kiri"
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden xs:flex items-center justify-center rounded-full p-1 bg-background/90 shadow ring-1 ring-border hover:bg-accent/10"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          ref={trackRef}
          role="tablist"
          aria-label="Kategori menu"
          className={cn(
            "relative flex gap-2 overflow-x-auto scrollbar-hide",
            "snap-x snap-mandatory",
            "px-1 py-2"
          )}
          /* gradient hint di kiri/kanan */
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
          }}
        >
          {items.map((label) => {
            const isActive = label === active
            const count = counts?.[label]
            return (
              <button
                key={label}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(label)}
                className={cn(
                  "snap-start",
                  // tap target besar
                  "min-h-11 h-11 px-3.5 rounded-full inline-flex items-center gap-2",
                  "whitespace-nowrap text-sm font-medium",
                  "transition-all ring-offset-background",
                  isActive
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30 shadow-sm"
                    : "bg-muted text-foreground/80 hover:bg-accent/20"
                )}
              >
                {iconFor(label)}
                <span>{label}</span>
                {typeof count === "number" && (
                  <span
                    className={cn(
                      "ml-1 text-[11px] font-semibold rounded-full px-2 py-0.5",
                      isActive
                        ? "bg-primary-foreground/20"
                        : "bg-foreground/10 text-foreground/70"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <button
          aria-label="Scroll kanan"
          onClick={() => scrollBy("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden xs:flex items-center justify-center rounded-full p-1 bg-background/90 shadow ring-1 ring-border hover:bg-accent/10"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
