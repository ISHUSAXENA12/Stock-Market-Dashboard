import { type NextRequest, NextResponse } from "next/server"
import { stockDB } from "@/lib/database"

// GET /api/stocks - Get all stocks or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let stocks = search ? stockDB.searchStocks(search) : stockDB.getAllStocks()

    // Apply pagination
    if (limit) {
      const limitNum = Number.parseInt(limit)
      const offsetNum = Number.parseInt(offset || "0")
      stocks = stocks.slice(offsetNum, offsetNum + limitNum)
    }

    return NextResponse.json({
      success: true,
      data: stocks,
      total: stocks.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching stocks:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stocks" }, { status: 500 })
  }
}

// POST /api/stocks - Add new stock (for admin purposes)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { symbol, name, price } = body

    if (!symbol || !name || !price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: symbol, name, price" },
        { status: 400 },
      )
    }

    // Check if stock already exists
    if (stockDB.getStockBySymbol(symbol)) {
      return NextResponse.json({ success: false, error: "Stock with this symbol already exists" }, { status: 409 })
    }

    // In a real implementation, you would add the stock to the database
    return NextResponse.json({
      success: true,
      message: "Stock creation endpoint - would be implemented with real database",
      data: { symbol, name, price },
    })
  } catch (error) {
    console.error("Error creating stock:", error)
    return NextResponse.json({ success: false, error: "Failed to create stock" }, { status: 500 })
  }
}
