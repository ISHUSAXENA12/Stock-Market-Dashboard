import { NextResponse } from "next/server"

// GET /api/market/status - Get market status and statistics
export async function GET() {
  try {
    // Simulate market hours (9:15 AM to 3:30 PM IST)
    const now = new Date()
    const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000) // Convert to IST
    const hour = istTime.getHours()
    const minute = istTime.getMinutes()
    const currentTime = hour * 60 + minute

    const marketOpen = 9 * 60 + 15 // 9:15 AM
    const marketClose = 15 * 60 + 30 // 3:30 PM

    const isMarketOpen = currentTime >= marketOpen && currentTime <= marketClose
    const isWeekend = istTime.getDay() === 0 || istTime.getDay() === 6

    const marketStatus = {
      isOpen: isMarketOpen && !isWeekend,
      nextOpen: isMarketOpen ? null : "Next trading day 9:15 AM IST",
      nextClose: isMarketOpen ? "Today 3:30 PM IST" : null,
      timezone: "Asia/Kolkata",
      currentTime: istTime.toISOString(),
    }

    // Mock market statistics
    const marketStats = {
      totalStocks: 12,
      gainers: 7,
      losers: 4,
      unchanged: 1,
      totalVolume: "₹2,45,67,890 Cr",
      marketCap: "₹89,45,123 Cr",
      topGainer: { symbol: "ASIANPAINT", change: 2.0 },
      topLoser: { symbol: "ICICIBANK", change: -1.38 },
    }

    return NextResponse.json({
      success: true,
      data: {
        status: marketStatus,
        statistics: marketStats,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching market status:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch market status" }, { status: 500 })
  }
}
