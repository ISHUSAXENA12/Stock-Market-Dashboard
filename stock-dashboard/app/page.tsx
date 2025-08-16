"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { mockStockData, generateAIPrediction, type StockData } from "@/lib/mock-data"
import { StockChart } from "@/components/stock-chart"
import { CompanyList } from "@/components/company-list"
import { StockDetails } from "@/components/stock-details"
import { AIPrediction } from "@/components/ai-prediction"
import { TrendingUp, TrendingDown, BarChart3, Brain, Menu, X } from "lucide-react"

export default function StockDashboard() {
  const [selectedStock, setSelectedStock] = useState<StockData>(mockStockData[0])
  const [showAIPrediction, setShowAIPrediction] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock)
    setShowAIPrediction(false)
    setIsMobileSidebarOpen(false)
  }

  const handleAIPrediction = () => {
    setShowAIPrediction(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Companies</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)} className="p-1">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CompanyList stocks={mockStockData} selectedStock={selectedStock} onStockSelect={handleStockSelect} />
              </SheetContent>
            </Sheet>

            <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <h1 className="text-lg md:text-2xl font-bold text-foreground">StockMarket Pro</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Badge variant="secondary" className="text-xs md:text-sm hidden sm:inline-flex">
              Live Market Data
            </Badge>
            <Button
              onClick={handleAIPrediction}
              variant="outline"
              size="sm"
              className="gap-1 md:gap-2 bg-transparent text-xs md:text-sm"
            >
              <Brain className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">AI Predict</span>
              <span className="sm:hidden">AI</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar - Company List */}
        <aside className="hidden md:block w-80 border-r bg-sidebar overflow-hidden">
          <div className="p-4 border-b bg-sidebar">
            <h2 className="text-lg font-semibold text-sidebar-foreground">Companies</h2>
            <p className="text-sm text-muted-foreground">Select a stock to view details</p>
          </div>
          <CompanyList stocks={mockStockData} selectedStock={selectedStock} onStockSelect={handleStockSelect} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 md:p-6 space-y-4 md:space-y-6">
            {/* Stock Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-3xl font-bold text-foreground truncate">{selectedStock.name}</h2>
                <p className="text-sm md:text-lg text-muted-foreground">{selectedStock.symbol}</p>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  ₹{selectedStock.price.toLocaleString()}
                </div>
                <div
                  className={`flex items-center gap-1 text-base md:text-lg ${
                    selectedStock.change >= 0 ? "text-chart-1" : "text-chart-2"
                  }`}
                >
                  {selectedStock.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <TrendingDown className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                  {selectedStock.change >= 0 ? "+" : ""}
                  {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* Chart and Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
              {/* Stock Chart */}
              <div className="xl:col-span-2 order-1">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base md:text-lg">Price Chart (30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <StockChart data={selectedStock.historicalData} />
                  </CardContent>
                </Card>
              </div>

              {/* Stock Details and AI Prediction */}
              <div className="space-y-4 md:space-y-6 order-2">
                <StockDetails stock={selectedStock} />

                {/* AI Prediction */}
                {showAIPrediction && (
                  <AIPrediction prediction={generateAIPrediction(selectedStock.symbol, selectedStock.price)} />
                )}
              </div>
            </div>

            {/* Mobile-specific quick stats */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              <Card className="p-4">
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-lg font-semibold">{(selectedStock.volume / 1000000).toFixed(1)}M</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground">Market Cap</div>
                <div className="text-lg font-semibold">{selectedStock.marketCap}</div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
