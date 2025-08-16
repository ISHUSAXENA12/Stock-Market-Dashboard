"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StockChartProps {
  data: {
    date: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
}

export function StockChart({ data }: StockChartProps) {
  const chartConfig = {
    close: {
      label: "Close Price",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs"
            tickFormatter={(value) => {
              const date = new Date(value)
              return window.innerWidth < 640
                ? date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }).replace(" ", "\n")
                : date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })
            }}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis className="text-xs" tickFormatter={(value) => `₹${value}`} width={window.innerWidth < 640 ? 50 : 60} />
          <ChartTooltip
            content={<ChartTooltipContent />}
            labelFormatter={(value) => new Date(value).toLocaleDateString("en-IN")}
            formatter={(value: number) => [`₹${value.toFixed(2)}`, "Close Price"]}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-chart-1)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
