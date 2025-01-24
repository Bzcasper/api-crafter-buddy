import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const trafficData = [
  { name: "Organic Search", value: 45 },
  { name: "Social Media", value: 25 },
  { name: "Direct", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export const TrafficSourcesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {trafficData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {trafficData.map((source, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{source.name}</span>
              <span className="font-medium">{source.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}