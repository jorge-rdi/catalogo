"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"

interface Product {
  _id: string
  name: string
  price?: number
  main_image: string
  images: string[]
  description?: string
  category?: string
  min_price?: number
  max_price?: number
}

interface ProductImageGalleryProps {
  product: Product
  selectedImageIndex: number
  onImageSelect: (index: number) => void
  onImageClick: (index: number) => void
}

export function ProductImageGallery({
  product,
  selectedImageIndex,
  onImageSelect,
  onImageClick,
}: ProductImageGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const imagesPerPage = 24
  const totalPages = Math.ceil(product.images.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  const currentImages = product.images.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">



 
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Imágenes</h3>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {currentImages.map((image, index) => {
            const actualIndex = startIndex + index
            return (
              <Card
                key={actualIndex}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedImageIndex === actualIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => onImageClick(actualIndex)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - imagen ${actualIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Paginacion */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  )
}
