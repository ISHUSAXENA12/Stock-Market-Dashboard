import { type NextRequest, NextResponse } from "next/server"
import { stockDB } from "@/lib/database"
import { generateAIPrediction } from "@/lib/mock-data"

// POST /api/predictions - Generate AI prediction for a stock
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { symbol } = body

    if (!symbol) {
      return NextResponse.json({ success: false, error: "Stock symbol is required" }, { status: 400 })
    }

    const stock = stockDB.getStockBySymbol(symbol)

    if (!stock) {
      return NextResponse.json({ success: false, error: "Stock not found" }, { status: 404 })
    }

    // Generate AI prediction using our mock function
    const prediction = generateAIPrediction(stock.symbol, stock.price)

    // In a real implementation, this would use actual ML models
    const enhancedPrediction = {
      ...prediction,
      currentPrice: stock.price,
      priceChange: prediction.predictedPrice - stock.price,
      priceChangePercent: ((prediction.predictedPrice - stock.price) / stock.price) * 100,
      timeframe: "24 hours",
      model: "LSTM Neural Network (Simulated)",
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: enhancedPrediction,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error generating prediction:", error)
    return NextResponse.json({ success: false, error: "Failed to generate prediction" }, { status: 500 })
  }
}

// GET /api/predictions - Get recent predictions (for admin/analytics)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // In a real implementation, this would fetch from a predictions database
    const mockRecentPredictions = stockDB
      .getAllStocks()
      .slice(0, limit)
      .map((stock) => ({
        ...generateAIPrediction(stock.symbol, stock.price),
        currentPrice: stock.price,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Random time in last 24h
      }))

    return NextResponse.json({
      success: true,
      data: mockRecentPredictions,
      total: mockRecentPredictions.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching predictions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch predictions" }, { status: 500 })
  }
}
