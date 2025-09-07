"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  onIndexChange: (index: number) => void
  productName: string
}

export function ImageModal({ isOpen, onClose, images, currentIndex, onIndexChange, productName }: ImageModalProps) {
  const nextImage = () => {
    onIndexChange((currentIndex + 1) % images.length)
  }

  const prevImage = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, currentIndex])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Botón de cierre */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Botones de navegación */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Contenedor de la imagen */}
      <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full cursor-pointer" onClick={onClose}>
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${productName} - imagen ${currentIndex + 1}`}
          fill
          className="object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Contador de imágenes */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
