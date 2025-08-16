import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Volume, DollarSign } from "lucide-react"
import type { StockData } from "@/lib/mock-data"

interface StockDetailsProps {
  stock: StockData
}

export function StockDetails({ stock }: StockDetailsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
          Stock Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Market Cap</p>
            <p className="text-base md:text-lg font-semibold">{stock.marketCap}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Volume</p>
            <p className="text-base md:text-lg font-semibold flex items-center gap-1">
              <Volume className="h-3 w-3 md:h-4 md:w-4" />
              {(stock.volume / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">52W High</span>
            <span className="font-semibold text-chart-1 flex items-center gap-1 text-sm md:text-base">
              <TrendingUp className="h-3 w-3" />₹{stock.high52Week.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">52W Low</span>
            <span className="font-semibold text-chart-2 flex items-center gap-1 text-sm md:text-base">
              <TrendingDown className="h-3 w-3" />₹{stock.low52Week.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <Badge
            variant={stock.change >= 0 ? "default" : "destructive"}
            className="w-full justify-center text-xs md:text-sm"
          >
            {stock.change >= 0 ? "Bullish Trend" : "Bearish Trend"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
