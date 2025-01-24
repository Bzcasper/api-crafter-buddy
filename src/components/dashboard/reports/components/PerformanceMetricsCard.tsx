import { Card, CardContent } from "@/components/ui/card"

interface PerformanceMetric {
  label: string
  value: string
  change: string
  trend: string
}

interface PerformanceMetricsCardProps {
  metrics: PerformanceMetric[]
}

export const PerformanceMetricsCard = ({ metrics }: PerformanceMetricsCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-bold">{metric.value}</h2>
                <span className="text-sm text-green-500">{metric.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}