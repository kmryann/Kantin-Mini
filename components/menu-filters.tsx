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

  const scrollBy = (dx: number) => scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" })

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
      {/* Row: Arrow - ScrollArea - Arrow */}
      <div className="flex items-center gap-2">
        {/* Left arrow (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 bg-background/80 shadow-sm"
          onClick={() => scrollBy(-240)}
          disabled={!canLeft}
          aria-label="Scroll kategori ke kiri"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {/* Gradient edges for nice fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent md:hidden" />

          {/* Pills */}
          <div className="flex min-w-max gap-2 px-1 py-1" role="tablist" aria-label="Kategori menu">
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
                  "whitespace-nowrap transition-all duration-200 snap-start flex-shrink-0",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
        </div>

        {/* Right arrow (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 bg-background/80 shadow-sm"
          onClick={() => scrollBy(240)}
          disabled={!canRight}
          aria-label="Scroll kategori ke kanan"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
