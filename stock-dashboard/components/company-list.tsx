"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { StockData } from "@/lib/mock-data"

interface CompanyListProps {
  stocks: StockData[]
  selectedStock: StockData
  onStockSelect: (stock: StockData) => void
}

export function CompanyList({ stocks, selectedStock, onStockSelect }: CompanyListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1">
        {stocks.map((stock) => (
          <Button
            key={stock.symbol}
            variant={selectedStock.symbol === stock.symbol ? "default" : "ghost"}
            className="w-full justify-start p-3 md:p-4 h-auto min-h-[60px] md:min-h-[80px] touch-manipulation"
            onClick={() => onStockSelect(stock)}
          >
            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex items-center justify-between w-full">
                <div className="text-left min-w-0 flex-1">
                  <div className="font-semibold text-sm md:text-base">{stock.symbol}</div>
                  <div className="text-xs md:text-sm text-muted-foreground truncate max-w-[140px] md:max-w-[180px]">
                    {stock.name}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm md:text-base font-medium">₹{stock.price.toLocaleString()}</div>
                  <div
                    className={`flex items-center gap-1 text-xs md:text-sm ${stock.change >= 0 ? "text-chart-1" : "text-chart-2"}`}
                  >
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <Badge variant="outline" className="text-xs">
                  Vol: {(stock.volume / 1000000).toFixed(1)}M
                </Badge>
                <div className="text-xs text-muted-foreground hidden sm:block">{stock.marketCap}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
