"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface MenuFiltersProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function MenuFilters({ categories, activeCategory, onCategoryChange }: MenuFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full" role="group" aria-label="Filter kategori menu">
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm md:hidden"
          aria-label="Scroll kategori ke kiri"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm md:hidden"
          aria-label="Scroll kategori ke kanan"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory px-8 md:px-0"
        >
          <div className="flex gap-2 min-w-max px-1" role="tablist" aria-label="Kategori menu">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                style={
                  activeCategory === category
                    ? {
                        backgroundColor: "#d97706",
                        color: "#ffffff",
                        borderColor: "#d97706",
                      }
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
        </div>
      </div>
    </div>
  )
}
