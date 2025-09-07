"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { Pagination } from "@/components/ui/pagination"

interface Product {
  _id: string
  name: string
  price?: number
  main_image: string
  images: string[]
  min_price?: number
  max_price?: number
}

const PRODUCTS_PER_PAGE = 24

export function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const currentPage = Number.parseInt(searchParams.get("page") || "1")
  const searchQuery = searchParams.get("search") || ""
  const sortOrder = searchParams.get("sort") || "asc"

  const updateURL = (params: Record<string, string | number>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value.toString())
      } else {
        newSearchParams.delete(key)
      }
    })

    router.push(`/productos?${newSearchParams.toString()}`)
  }

  const handleSearch = (query: string) => {
    updateURL({ search: query, page: 1 })
  }

  const handleSort = (order: string) => {
    updateURL({ sort: order, page: 1 })
  }

  const handlePageChange = (page: number) => {
    updateURL({ page })
  }

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const sortBy = sortOrder === "asc" ? "price_asc" : "price_desc"
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: PRODUCTS_PER_PAGE.toString(),
          sort: sortBy,
        })

        if (searchQuery) {
          params.append("search", searchQuery)
        }

        const response = await fetch(`/api/products?${params}`)
        if (!response.ok) throw new Error("Failed to fetch products")

        const result = await response.json()
        setProducts(result.products)
        setTotal(result.total)
      } catch (error) {
        console.error("Error loading products:", error)
        setProducts([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [currentPage, searchQuery, sortOrder])

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE)

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>
  }

  return (
    <>
      <ProductFilters
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        onSearch={handleSearch}
        onSort={handleSort}
        totalProducts={total}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </>
  )
}
