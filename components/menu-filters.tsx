"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface MenuFiltersProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function MenuFilters({ categories, activeCategory, onCategoryChange }: MenuFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanLeft(scrollLeft > 0)
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  const scrollLeftFn = () => scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" })
  const scrollRightFn = () => scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateArrows()
    el.addEventListener("scroll", updateArrows, { passive: true })
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", updateArrows)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="w-full" role="group" aria-label="Filter kategori menu">
      <div className="relative">
        {/* Fade kiri/kanan agar transisi halus */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 md:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 md:hidden" />

        {/* Panah */}
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollLeftFn}
          disabled={!canLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm shadow-sm md:hidden"
          aria-label="Scroll kategori ke kiri"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollRightFn}
          disabled={!canRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm shadow-sm md:hidden"
          aria-label="Scroll kategori ke kanan"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* List + SPACER di kiri/kanan supaya pill tidak pernah berada di bawah panah */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 md:px-0"
        >
          {/* spacer kiri = lebar area panah */}
          <span aria-hidden className="shrink-0 w-12 md:w-0" />
          <div className="flex gap-2 min-w-max" role="tablist" aria-label="Kategori menu">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                style={
                  activeCategory === category
                    ? { backgroundColor: "#d97706", color: "#ffffff", borderColor: "#d97706" }
                    : undefined
                }
                className={cn(
                  "whitespace-nowrap transition-all duration-200 snap-start flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  activeCategory === category
                    ? "shadow-md hover:opacity-90"
                    : "bg-card hover:bg-muted border-border text-foreground hover:text-foreground",
                )}
                role="tab"
                aria-selected={activeCategory === category}
                aria-controls={`menu-panel-${category}`}
                id={`tab-${category}`}
                aria-label={`Filter menu kategori ${category}`}
                tabIndex={activeCategory === category ? 0 : -1}
              >
                {category}
              </Button>
            ))}
          </div>
          {/* spacer kanan = lebar area panah */}
          <span aria-hidden className="shrink-0 w-12 md:w-0" />
        </div>
      </div>
    </div>
  )
}
