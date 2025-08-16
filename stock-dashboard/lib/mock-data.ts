export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  high52Week: number
  low52Week: number
  historicalData: {
    date: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
}

// Generate realistic historical data for the last 30 days
const generateHistoricalData = (basePrice: number, volatility = 0.02) => {
  const data = []
  let currentPrice = basePrice
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const change = (Math.random() - 0.5) * volatility * currentPrice
    const open = currentPrice
    const close = currentPrice + change
    const high = Math.max(open, close) + Math.random() * 0.01 * currentPrice
    const low = Math.min(open, close) - Math.random() * 0.01 * currentPrice
    const volume = Math.floor(Math.random() * 1000000) + 500000

    data.push({
      date: date.toISOString().split("T")[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume,
    })

    currentPrice = close
  }

  return data
}

export const mockStockData: StockData[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2456.75,
    change: 23.45,
    changePercent: 0.96,
    volume: 2456789,
    marketCap: "₹16.6L Cr",
    high52Week: 2856.15,
    low52Week: 2220.3,
    historicalData: generateHistoricalData(2456.75, 0.025),
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3789.2,
    change: -45.8,
    changePercent: -1.19,
    volume: 1234567,
    marketCap: "₹13.8L Cr",
    high52Week: 4259.75,
    low52Week: 3311.0,
    historicalData: generateHistoricalData(3789.2, 0.02),
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1567.45,
    change: 12.3,
    changePercent: 0.79,
    volume: 3456789,
    marketCap: "₹6.5L Cr",
    high52Week: 1953.9,
    low52Week: 1351.65,
    historicalData: generateHistoricalData(1567.45, 0.022),
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    price: 1678.9,
    change: 8.75,
    changePercent: 0.52,
    volume: 4567890,
    marketCap: "₹12.7L Cr",
    high52Week: 1794.25,
    low52Week: 1363.55,
    historicalData: generateHistoricalData(1678.9, 0.018),
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    price: 1089.65,
    change: -15.2,
    changePercent: -1.38,
    volume: 5678901,
    marketCap: "₹7.6L Cr",
    high52Week: 1257.8,
    low52Week: 951.1,
    historicalData: generateHistoricalData(1089.65, 0.021),
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd",
    price: 2345.8,
    change: 34.5,
    changePercent: 1.49,
    volume: 987654,
    marketCap: "₹5.5L Cr",
    high52Week: 2844.95,
    low52Week: 2172.0,
    historicalData: generateHistoricalData(2345.8, 0.019),
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    price: 456.75,
    change: -2.85,
    changePercent: -0.62,
    volume: 8765432,
    marketCap: "₹5.7L Cr",
    high52Week: 502.75,
    low52Week: 387.6,
    historicalData: generateHistoricalData(456.75, 0.024),
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 789.45,
    change: 18.9,
    changePercent: 2.45,
    volume: 12345678,
    marketCap: "₹7.0L Cr",
    high52Week: 912.75,
    low52Week: 543.2,
    historicalData: generateHistoricalData(789.45, 0.028),
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Limited",
    price: 1234.6,
    change: -8.4,
    changePercent: -0.68,
    volume: 3456789,
    marketCap: "₹6.8L Cr",
    high52Week: 1549.9,
    low52Week: 900.25,
    historicalData: generateHistoricalData(1234.6, 0.026),
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Limited",
    price: 3456.25,
    change: 67.8,
    changePercent: 2.0,
    volume: 654321,
    marketCap: "₹3.3L Cr",
    high52Week: 3750.05,
    low52Week: 2671.05,
    historicalData: generateHistoricalData(3456.25, 0.023),
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Ltd",
    price: 11234.5,
    change: -123.75,
    changePercent: -1.09,
    volume: 234567,
    marketCap: "₹3.4L Cr",
    high52Week: 13680.0,
    low52Week: 9737.65,
    historicalData: generateHistoricalData(11234.5, 0.027),
  },
  {
    symbol: "WIPRO",
    name: "Wipro Limited",
    price: 567.8,
    change: 4.25,
    changePercent: 0.75,
    volume: 4567890,
    marketCap: "₹3.1L Cr",
    high52Week: 659.85,
    low52Week: 385.05,
    historicalData: generateHistoricalData(567.8, 0.025),
  },
]

// AI Prediction mock function
export const generateAIPrediction = (symbol: string, currentPrice: number) => {
  const randomFactor = (Math.random() - 0.5) * 0.04 // ±2% prediction range
  const predictedPrice = currentPrice * (1 + randomFactor)
  const confidence = Math.random() * 0.3 + 0.7 // 70-100% confidence

  return {
    symbol,
    predictedPrice: Math.round(predictedPrice * 100) / 100,
    confidence: Math.round(confidence * 100),
    trend: randomFactor > 0 ? "bullish" : "bearish",
    factors: [
      "Technical indicators suggest momentum",
      "Market sentiment analysis",
      "Volume pattern recognition",
      "Historical price correlation",
    ],
  }
}
