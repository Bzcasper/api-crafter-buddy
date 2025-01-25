import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const performanceData = [
  { platform: "Facebook", engagement: 87, reach: 1200 },
  { platform: "Twitter", engagement: 92, reach: 800 },
  { platform: "Instagram", engagement: 78, reach: 2200 },
  { platform: "LinkedIn", engagement: 95, reach: 600 },
]

export const AnalyticsSection = () => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Platform Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Performance by Platform</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
                  <Bar dataKey="reach" fill="#82ca9d" name="Reach" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Overall Engagement</h3>
              <p className="text-4xl font-bold text-green-500">88%</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Content Quality Score</h3>
              <p className="text-4xl font-bold text-blue-500">92/100</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}