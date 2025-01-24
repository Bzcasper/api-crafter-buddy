import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const realTimeData = [
  { label: "Active Users", value: "342" },
  { label: "Current Page Views", value: "856" },
  { label: "Live Conversions", value: "17" },
  { label: "Active Affiliates", value: "8" },
]

export const RealTimeMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {realTimeData.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}