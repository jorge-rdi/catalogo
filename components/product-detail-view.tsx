"use client"

import { useState } from "react"
import { ProductHeader } from "@/components/product-header"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { ImageModal } from "@/components/image-modal"

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

interface ProductDetailViewProps {
  product: Product
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  const openModal = (index: number) => {
    setModalImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <ProductHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="block md:hidden mb-6">
          <h1 className="text-2xl font-bold text-foreground text-balance">{product.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ProductImageGallery
            product={product}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
            onImageClick={openModal}
          />

          <ProductInfo product={product} />
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product.images}
        currentIndex={modalImageIndex}
        onIndexChange={setModalImageIndex}
        productName={product.name}
      />
    </div>
  )
}
