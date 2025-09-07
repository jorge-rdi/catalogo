import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  price?: number
  main_image: string
  min_price?: number
  max_price?: number
}

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const renderPrice = () => {
    if (product.min_price && product.max_price) {
      return (
        <p className="text-lg font-semibold text-card-foreground">
          {product.min_price} GS - {product.max_price} GS
        </p>
      )
    }
    return <p className="text-lg font-semibold text-card-foreground">{product.price || 0} GS</p>
  }

  return (
    <Link href={`/productos/${product._id}`}>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg bg-card border-border h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <Image
              src={product.main_image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              priority={priority} 
            />
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="font-medium text-card-foreground mb-2 line-clamp-2 text-balance">{product.name}</h3>
            {renderPrice()}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}