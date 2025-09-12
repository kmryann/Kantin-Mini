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
    // 1 kolom default (mobile), naik jadi 3 kolom mulai sm (>=640px)
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
