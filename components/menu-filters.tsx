"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Utensils, Coffee, Flame, Cookie, Hand } from "lucide-react"

type MenuFiltersProps = {
  categories: string[]
  active: string
  onChange: (value: string) => void
  counts?: Record<string, number>
  className?: string
}

const iconFor = (name: string) => {
  const k = name.toLowerCase()
  if (k.includes("minum")) return <Coffee className="size-4" />
  if (k.includes("pedas")) return <Flame className="size-4" />
  if (k.includes("dessert") || k.includes("snack") || k.includes("bites")) return <Cookie className="size-4" />
  return <Utensils className="size-4" />
}

export function MenuFilters({ categories, active, onChange, counts, className }: MenuFiltersProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const [showHint, setShowHint] = useState(true)

  const items = useMemo(() => (categories?.length ? categories : ["Semua"]), [categories])

  // cek apakah scrollable
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth + 8)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // sembunyikan hint saat user interaksi
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const hide = () => setShowHint(false)
    el.addEventListener("scroll", hide, { passive: true })
    el.addEventListener("pointerdown", hide, { passive: true })
    const timer = setTimeout(hide, 3500)
    return () => {
      el.removeEventListener("scroll", hide)
      el.removeEventListener("pointerdown", hide)
      clearTimeout(timer)
    }
  }, [])

  // nudge kecil di awal biar jelas bisa digeser
  useEffect(() => {
    const el = trackRef.current
    if (!el || !canScroll || !showHint) return
    const nudge = async () => {
      try {
        el.scrollBy({ left: 36, behavior: "smooth" })
        await new Promise((r) => setTimeout(r, 350))
        el.scrollBy({ left: -36, behavior: "smooth" })
      } catch {}
    }
    nudge()
  }, [canScroll, showHint])

  const scrollBy = (dir: "left" | "right") => {
    const el = trackRef.current
    if (!el) return
    const amount = Math.min(280, el.clientWidth * 0.9)
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0",
        "bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className
      )}
    >
      <div className="relative">
        {/* gradient edges: lebih kuat saat bisa scroll */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 z-10 from-background to-transparent bg-gradient-to-r" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 z-10 from-transparent to-background bg-gradient-to-l" />

        {/* ARROWS: selalu tampil (mobile juga) */}
        <button
          type="button"
          aria-label="Scroll kiri"
          aria-disabled={!canScroll}
          onClick={() => scrollBy("left")}
          className={cn(
            "absolute left-1 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full p-1.5",
            "bg-background shadow ring-1 ring-border hover:bg-accent/10 active:scale-95 transition",
            !canScroll && "opacity-40"
          )}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll kanan"
          aria-disabled={!canScroll}
          onClick={() => scrollBy("right")}
          className={cn(
            "absolute right-1 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full p-1.5",
            "bg-background shadow ring-1 ring-border hover:bg-accent/10 active:scale-95 transition",
            !canScroll && "opacity-40"
          )}
        >
          <ChevronRight className="size-5" />
        </button>

        {/* TRACK */}
        <div
          ref={trackRef}
          role="tablist"
          aria-label="Kategori menu"
          className={cn(
            "relative z-20 flex gap-2 overflow-x-auto scrollbar-hide px-1 py-2",
            "snap-x snap-mandatory"
          )}
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
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(label)}
                className={cn(
                  "snap-start min-h-11 h-11 px-3.5 rounded-full inline-flex items-center gap-2",
                  "whitespace-nowrap text-sm font-medium transition-all ring-offset-background",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
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
                      isActive ? "bg-primary-foreground/20" : "bg-foreground/10 text-foreground/70"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* HINT "Geser →" (hilang saat interaksi) */}
        {showHint && (
          <div className="pointer-events-none absolute right-3 -bottom-2 translate-y-full z-30">
            <div className="flex items-center gap-1 rounded-full bg-foreground text-background text-[11px] px-2 py-1 shadow animate-pulse">
              <Hand className="size-3.5" />
              <span>Geser</span>
              <ChevronRight className="size-3.5" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
