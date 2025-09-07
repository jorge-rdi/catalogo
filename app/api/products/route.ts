import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/products"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "24")
    const search = searchParams.get("search") || undefined
    const sort = searchParams.get("sort") as "price_asc" | "price_desc" | undefined

    const result = await getProducts(page, limit, search, sort)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in products API:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
