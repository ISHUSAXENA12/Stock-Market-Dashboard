// API client for frontend to consume the REST API
const API_BASE_URL = process.env.NODE_ENV === "production" ? "https://your-domain.com/api" : "/api"

export class StockAPIClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Get all stocks
  async getAllStocks(params?: { search?: string; limit?: number; offset?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.set("search", params.search)
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.offset) searchParams.set("offset", params.offset.toString())

    const query = searchParams.toString()
    return this.request(`/stocks${query ? `?${query}` : ""}`)
  }

  // Get specific stock
  async getStock(symbol: string) {
    return this.request(`/stocks/${symbol}`)
  }

  // Get historical data
  async getHistoricalData(symbol: string, days = 30) {
    return this.request(`/stocks/${symbol}/historical?days=${days}`)
  }

  // Update stock price
  async updateStockPrice(symbol: string, price: number, change: number) {
    return this.request(`/stocks/${symbol}`, {
      method: "PUT",
      body: JSON.stringify({ price, change }),
    })
  }

  // Generate AI prediction
  async generatePrediction(symbol: string) {
    return this.request("/predictions", {
      method: "POST",
      body: JSON.stringify({ symbol }),
    })
  }

  // Get market status
  async getMarketStatus() {
    return this.request("/market/status")
  }

  // Get recent predictions
  async getRecentPredictions(limit = 10) {
    return this.request(`/predictions?limit=${limit}`)
  }
}

// Export singleton instance
export const stockAPI = new StockAPIClient()
