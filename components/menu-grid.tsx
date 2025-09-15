"use client"

import { MenuCard } from "@/components/menu-card"

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
}

interface MenuGridProps {
  items: MenuItem[]
}

export function MenuGrid({ items }: MenuGridProps) {
  return (
    // Grid responsif: 1 kolom (mobile), 2 kolom (sm), 3 kolom (md+)
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
