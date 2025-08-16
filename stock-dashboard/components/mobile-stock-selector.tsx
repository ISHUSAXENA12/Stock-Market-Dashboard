"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown } from "lucide-react"
import { CompanyList } from "./company-list"
import type { StockData } from "@/lib/mock-data"

interface MobileStockSelectorProps {
  stocks: StockData[]
  selectedStock: StockData
  onStockSelect: (stock: StockData) => void
}

export function MobileStockSelector({ stocks, selectedStock, onStockSelect }: MobileStockSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleStockSelect = (stock: StockData) => {
    onStockSelect(stock)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden mb-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-transparent">
            <div className="text-left">
              <div className="font-semibold">{selectedStock.symbol}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[200px]">{selectedStock.name}</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[60vh]">
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4">Select Stock</h3>
            <CompanyList stocks={stocks} selectedStock={selectedStock} onStockSelect={handleStockSelect} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
