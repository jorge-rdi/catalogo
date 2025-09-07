import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import { ProductDetailView } from "@/components/product-detail-view"
import { Navbar } from "@/components/navbar"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <ProductDetailView product={product} />
    </>
  )
}
