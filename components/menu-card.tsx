"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Image from "next/image"

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
}

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const [imageLoading, setImageLoading] = useState(true)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)
  }

  const getImageAlt = (item: MenuItem) => {
    return `${item.name} - ${item.description} dari kategori ${item.category}`
  }

  return (
    <Card
      className="group overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] focus-within:shadow-lg focus-within:scale-[1.02] animate-fade-in"
      role="article"
      aria-label={`Menu item: ${item.name}`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-muted-foreground/20 rounded-full animate-pulse" />
          </div>
        )}
        <Image
          src={item.image || "/placeholder.svg?height=300&width=400&query=indonesian food"}
          alt={getImageAlt(item)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-balance leading-tight">{item.name}</h3>
            <Badge variant="secondary" className="text-xs whitespace-nowrap" aria-label={`Kategori: ${item.category}`}>
              {item.category}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{item.description}</p>
        </div>

        <div className="flex justify-center pt-2">
          <div
            className="inline-flex items-center rounded-full text-lg font-bold px-4 py-2 border-0 shadow-sm"
            style={{
              backgroundColor: "#d97706",
              color: "#ffffff",
            }}
            aria-label={`Harga ${formatPrice(item.price).replace("Rp", "rupiah")}`}
          >
            {formatPrice(item.price)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
