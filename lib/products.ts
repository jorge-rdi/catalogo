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

    let products: any[]
    let total: number

    if (sortBy) {
      const pipeline: any[] = [
        { $match: query },
        {
          $addFields: {
            sortPrice: {
              $cond: {
                if: { $ne: ["$min_price", null] },
                then: sortBy === "price_asc" ? "$min_price" : { $ifNull: ["$max_price", "$min_price"] },
                else: { $ifNull: ["$price", 0] },
              },
            },
          },
        },
        { $sort: { sortPrice: sortBy === "price_asc" ? 1 : -1 } },
        { $skip: skip },
        { $limit: limit },
      ]

      const [productsResult, totalResult] = await Promise.all([
        collection.aggregate(pipeline).toArray(),
        collection.countDocuments(query),
      ])

      products = productsResult
      total = totalResult
    } else {
      // Sin ordenamiento, usar find normal
      const [productsResult, totalResult] = await Promise.all([
        collection.find(query).skip(skip).limit(limit).toArray(),
        collection.countDocuments(query),
      ])

      products = productsResult
      total = totalResult
    }

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
