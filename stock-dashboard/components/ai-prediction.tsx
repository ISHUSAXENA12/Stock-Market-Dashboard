import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, TrendingDown } from "lucide-react"

interface AIPredictionProps {
  prediction: {
    symbol: string
    predictedPrice: number
    confidence: number
    trend: "bullish" | "bearish"
    factors: string[]
  }
}

export function AIPrediction({ prediction }: AIPredictionProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary text-base md:text-lg">
          <Brain className="h-4 w-4 md:h-5 md:w-5" />
          AI Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="text-center space-y-2">
          <div className="text-xl md:text-2xl font-bold">₹{prediction.predictedPrice.toLocaleString()}</div>
          <Badge
            variant={prediction.trend === "bullish" ? "default" : "destructive"}
            className="gap-1 text-xs md:text-sm"
          >
            {prediction.trend === "bullish" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {prediction.trend.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs md:text-sm">
            <span>Confidence Level</span>
            <span className="font-semibold">{prediction.confidence}%</span>
          </div>
          <Progress value={prediction.confidence} className="h-2" />
        </div>

        <div className="space-y-2">
          <p className="text-xs md:text-sm font-medium">Key Factors:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {prediction.factors.map((factor, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          *This is a simulated AI prediction for demonstration purposes
        </div>
      </CardContent>
    </Card>
  )
}
