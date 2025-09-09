"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Cari..." }: SearchBarProps) {
  // untuk onChange (ChangeEvent)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  // untuk onInput (FormEvent) — aman di mobile
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    onChange((e.target as HTMLInputElement).value)
  }

  return (
    <div className="relative max-w-md mx-auto" role="search" aria-label="Pencarian menu">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />

        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onInput={handleInput}    
          className="pl-10 pr-10 bg-card border-border focus:ring-primary focus:border-primary"
          aria-label="Masukkan kata kunci untuk mencari menu"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
        />

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            aria-label="Hapus pencarian"
            title="Hapus pencarian"
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  )
}
