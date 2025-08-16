// Simple in-memory database simulation for demo purposes
// In production, this would connect to PostgreSQL or SQLite
import { mockStockData, type StockData } from "./mock-data"

export interface DatabaseStock extends StockData {
  id: number
  createdAt: string
  updatedAt: string
}

// Simulate database with in-memory storage
class StockDatabase {
  private stocks: Map<string, DatabaseStock> = new Map()
  private nextId = 1

  constructor() {
    // Initialize with mock data
    this.seedDatabase()
  }

  private seedDatabase() {
    mockStockData.forEach((stock) => {
      const dbStock: DatabaseStock = {
        ...stock,
        id: this.nextId++,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.stocks.set(stock.symbol, dbStock)
    })
  }

  // Get all stocks
  getAllStocks(): DatabaseStock[] {
    return Array.from(this.stocks.values())
  }

  // Get stock by symbol
  getStockBySymbol(symbol: string): DatabaseStock | null {
    return this.stocks.get(symbol.toUpperCase()) || null
  }

  // Update stock price (simulate real-time updates)
  updateStockPrice(symbol: string, newPrice: number, change: number): boolean {
    const stock = this.stocks.get(symbol.toUpperCase())
    if (!stock) return false

    stock.price = newPrice
    stock.change = change
    stock.changePercent = (change / (newPrice - change)) * 100
    stock.updatedAt = new Date().toISOString()

    // Add new historical data point
    const today = new Date().toISOString().split("T")[0]
    const lastEntry = stock.historicalData[stock.historicalData.length - 1]

    if (lastEntry.date !== today) {
      stock.historicalData.push({
        date: today,
        open: lastEntry.close,
        high: Math.max(lastEntry.close, newPrice),
        low: Math.min(lastEntry.close, newPrice),
        close: newPrice,
        volume: Math.floor(Math.random() * 1000000) + 500000,
      })
    }

    return true
  }

  // Search stocks by name or symbol
  searchStocks(query: string): DatabaseStock[] {
    const searchTerm = query.toLowerCase()
    return Array.from(this.stocks.values()).filter(
      (stock) => stock.name.toLowerCase().includes(searchTerm) || stock.symbol.toLowerCase().includes(searchTerm),
    )
  }
}

// Singleton instance
export const stockDB = new StockDatabase()
