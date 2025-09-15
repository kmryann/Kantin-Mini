"use client"

import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"

export function StickyCTA() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      role="complementary"
      aria-label="Quick access to menu"
    >
      <div className="pointer-events-none relative pb-[calc(env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto mx-4 mb-4 rounded-xl bg-gradient-to-t from-background/95 to-background/70 backdrop-blur">
          <Button
            onClick={scrollToMenu}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg focus:shadow-xl"
            size="lg"
            aria-label="Lihat menu makanan dan minuman kami"
          >
            <ChefHat className="mr-2 h-5 w-5" aria-hidden="true" />
            Lihat Menu
          </Button>
        </div>
      </div>
    </div>
  )
}
