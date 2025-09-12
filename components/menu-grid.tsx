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
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
