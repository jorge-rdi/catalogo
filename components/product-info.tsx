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

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const renderPrice = () => {
    if (product.min_price && product.max_price) {
      return (
        <p className="text-3xl font-bold text-foreground mb-4">
          {product.min_price} GS - {product.max_price} GS
        </p>
      )
    }
    return <p className="text-3xl font-bold text-foreground mb-4">{product.price || 0} GS</p>
  }

  return (
    <div className="space-y-6">
      <div>
        {product.category && <p className="text-sm text-muted-foreground mb-2">{product.category}</p>}
        <h1 className="hidden md:block text-4xl font-bold text-foreground mb-4 text-balance">{product.name}</h1>
        {renderPrice()}
        {product.description && <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>}
      </div>

      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">Catálogo de productos - Solo visualización</p>
      </div>
    </div>
  )
}