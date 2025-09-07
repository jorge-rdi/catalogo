"use client"

import { Search, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"

interface ProductFiltersProps {
  searchQuery: string
  sortOrder: string
  onSearch: (query: string) => void
  onSort: (order: string) => void
  totalProducts: number
}

export function ProductFilters({ searchQuery, sortOrder, onSearch, onSort, totalProducts }: ProductFiltersProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery !== searchQuery) {
        onSearch(localQuery)
      }
    }, 400)
    return () => clearTimeout(handler)
  }, [localQuery, onSearch, searchQuery])

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowUpDown className="h-4 w-4" />
              Ordenar por precio
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem
              onClick={() => onSort("asc")}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Menor a mayor
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSort("desc")}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Mayor a menor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground">{totalProducts} productos encontrados</p>
    </div>
  )
}
