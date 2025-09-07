import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { ProductsContent } from "@/components/products-content"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <Suspense fallback={<div className="text-center py-8">Cargando productos...</div>}>
          <ProductsContent />
        </Suspense>
      </main>
    </div>
  )
}
