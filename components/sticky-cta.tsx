"use client"

import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"

export function StickyCTA() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
      role="complementary"
      aria-label="Quick access to menu"
    >
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
  )
}
