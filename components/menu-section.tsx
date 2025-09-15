"use client"

import { useState, useEffect, useMemo } from "react"
import { MenuFilters } from "@/components/menu-filters"
import { MenuGrid } from "@/components/menu-grid"
import { SearchBar } from "@/components/search-bar"
import { Utensils } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
}

interface MenuData {
  categories: string[]
  items: MenuItem[]
}

export function MenuSection() {
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("Semua")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedQuery, setDebouncedQuery] = useState<string>("")
  const [loading, setLoading] = useState(true)

  // Ambil data menu dari /public/menu.json
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const response = await fetch("/menu.json")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data: MenuData = await response.json()
        setMenuData(data)
        setFilteredItems(data.items)
      } catch (error) {
        console.error("Failed to load menu data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadMenuData()
  }, [])

  // Debounce input pencarian
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 180)
    return () => clearTimeout(t)
  }, [searchQuery])

  // Normalisasi string
  const normalize = (str: string | undefined) =>
    (str ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const sameCat = (a?: string, b?: string) => normalize(a) === normalize(b)

  // Hitung jumlah per kategori (untuk badge count di filter)
  const counts = useMemo(() => {
    if (!menuData) return undefined
    const base = Object.fromEntries(menuData.categories.map((c) => [c, 0])) as Record<string, number>
    for (const it of menuData.items) {
      const k = menuData.categories.find((c) => sameCat(c, it.category))
      if (k) base[k] = (base[k] ?? 0) + 1
    }
    return { Semua: menuData.items.length, ...base }
  }, [menuData])

  // Filter kategori + pencarian (debounced)
  useEffect(() => {
    if (!menuData) return
    let filtered = menuData.items

    if (activeCategory !== "Semua") {
      filtered = filtered.filter((item) => sameCat(item.category, activeCategory))
    }

    if (debouncedQuery.trim()) {
      const q = normalize(debouncedQuery)
      filtered = filtered.filter(
        (item) =>
          normalize(item.name).includes(q) ||
          normalize(item.description).includes(q) ||
          normalize(item.category).includes(q),
      )
    }

    setFilteredItems(filtered)
  }, [menuData, activeCategory, debouncedQuery])

  if (loading) {
    return (
      <section id="menu" className="py-16 bg-background" aria-label="Menu makanan dan minuman">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" role="status" aria-live="polite">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" aria-hidden="true" />
            <p className="mt-4 text-muted-foreground">Memuat menu...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!menuData) {
    return (
      <section id="menu" className="py-16 bg-background" aria-label="Menu makanan dan minuman">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" role="alert">
            <p className="text-muted-foreground">Gagal memuat menu. Silakan coba lagi.</p>
          </div>
        </div>
      </section>
    )
  }

  const categories = ["Semua", ...menuData.categories]

  return (
    <section id="menu" className="py-16 bg-background animate-fade-in" aria-label="Menu makanan dan minuman">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Utensils className="h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Menu Kami</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Pilihan makanan dan minuman terbaik dengan cita rasa autentik Indonesia
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari makanan atau minuman..." />
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <MenuFilters
            categories={categories}
            active={activeCategory}                 // <-- ganti: activeCategory -> active
            onChange={(val) => setActiveCategory(val)} // <-- ganti: onCategoryChange -> onChange
            counts={counts}
          />
        </div>

        {/* Info Hasil */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {debouncedQuery
              ? `Menampilkan ${filteredItems.length} hasil untuk "${debouncedQuery}"`
              : `Menampilkan ${filteredItems.length} menu${
                  activeCategory !== "Semua" ? ` kategori ${activeCategory}` : ""
                }`}
          </p>
        </div>

        {/* Menu Grid */}
        <MenuGrid items={filteredItems} />

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12" role="status" aria-live="polite">
            <Utensils className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Tidak ada menu ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              {debouncedQuery
                ? `Tidak ada menu yang cocok dengan "${debouncedQuery}"`
                : `Tidak ada menu dalam kategori ${activeCategory}`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("Semua")
              }}
              className="text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1"
              aria-label="Reset pencarian dan tampilkan semua menu"
            >
              Lihat semua menu
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
