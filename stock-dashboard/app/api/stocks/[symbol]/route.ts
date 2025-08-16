import { type NextRequest, NextResponse } from "next/server"
import { stockDB } from "@/lib/database"

// GET /api/stocks/[symbol] - Get specific stock details
export async function GET(request: NextRequest, { params }: { params: { symbol: string } }) {
  try {
    const { symbol } = params
    const stock = stockDB.getStockBySymbol(symbol)

    if (!stock) {
      return NextResponse.json({ success: false, error: "Stock not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: stock,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching stock:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stock details" }, { status: 500 })
  }
}

// PUT /api/stocks/[symbol] - Update stock price
export async function PUT(request: NextRequest, { params }: { params: { symbol: string } }) {
  try {
    const { symbol } = params
    const body = await request.json()
    const { price, change } = body

    if (typeof price !== "number" || typeof change !== "number") {
      return NextResponse.json({ success: false, error: "Invalid price or change value" }, { status: 400 })
    }

    const updated = stockDB.updateStockPrice(symbol, price, change)

    if (!updated) {
      return NextResponse.json({ success: false, error: "Stock not found" }, { status: 404 })
    }

    const updatedStock = stockDB.getStockBySymbol(symbol)

    return NextResponse.json({
      success: true,
      data: updatedStock,
      message: "Stock price updated successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating stock:", error)
    return NextResponse.json({ success: false, error: "Failed to update stock price" }, { status: 500 })
  }
}
