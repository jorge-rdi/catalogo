import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export interface Product {
  _id: string
  name: string
  price?: number
  main_image: string
  images: string[]
  min_price?: number
  max_price?: number
}

export async function getProducts(
  page = 1,
  limit = 24,
  search?: string,
  sortBy?: "price_asc" | "price_desc",
): Promise<{ products: Product[]; total: number }> {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB_NAME!)
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME!)

    // Build query
    let query: any = {}
    if (search) {
      const searchRegex = new RegExp(`^${search}`, "i")
      query = {
        $or: [{ name: searchRegex }, { name: new RegExp(`\\b${search}`, "i") }],
      }
    }

    const skip = (page - 1) * limit

    // Get all products first, then sort in JavaScript
    const allProducts = await collection.find(query).toArray()
    const total = allProducts.length

    // Sort in JavaScript for more reliable results
    if (sortBy) {
      allProducts.sort((a, b) => {
        let priceA = 0
        let priceB = 0

        // Get price for product A
        if (a.min_price !== undefined && a.min_price !== null) {
          priceA = sortBy === "price_asc" ? a.min_price : (a.max_price || a.min_price)
        } else if (a.price !== undefined && a.price !== null) {
          priceA = a.price
        }

        // Get price for product B
        if (b.min_price !== undefined && b.min_price !== null) {
          priceB = sortBy === "price_asc" ? b.min_price : (b.max_price || b.min_price)
        } else if (b.price !== undefined && b.price !== null) {
          priceB = b.price
        }

        return sortBy === "price_asc" ? priceA - priceB : priceB - priceA
      })
    }

    // Apply pagination after sorting
    const products = allProducts.slice(skip, skip + limit)

    return {
      products: products.map((product) => ({
        ...product,
        _id: product._id.toString(),
      })) as Product[],
      total,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { products: [], total: 0 }
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB_NAME!)
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME!)

    const product = await collection.findOne({ _id: new ObjectId(id) })

    if (!product) return null

    return {
      ...product,
      _id: product._id.toString(),
    } as Product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}
