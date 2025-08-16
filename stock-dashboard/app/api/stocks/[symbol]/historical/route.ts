import { type NextRequest, NextResponse } from "next/server"
import { stockDB } from "@/lib/database"

// GET /api/stocks/[symbol]/historical - Get historical data for a stock
export async function GET(request: NextRequest, { params }: { params: { symbol: string } }) {
  try {
    const { symbol } = params
    const { searchParams } = new URL(request.url)
    const days = searchParams.get("days") || "30"
    const interval = searchParams.get("interval") || "1d"

    const stock = stockDB.getStockBySymbol(symbol)

    if (!stock) {
      return NextResponse.json({ success: false, error: "Stock not found" }, { status: 404 })
    }

    // Filter historical data based on days parameter
    const daysNum = Number.parseInt(days)
    const historicalData = stock.historicalData.slice(-daysNum)

    return NextResponse.json({
      success: true,
      data: {
        symbol: stock.symbol,
        name: stock.name,
        interval,
        historicalData,
        dataPoints: historicalData.length,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch historical data" }, { status: 500 })
  }
}
