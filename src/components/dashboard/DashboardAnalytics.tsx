import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const analyticsData = [
  { name: "Jan", value: 400, engagement: 240 },
  { name: "Feb", value: 300, engagement: 139 },
  { name: "Mar", value: 600, engagement: 980 },
  { name: "Apr", value: 800, engagement: 390 },
  { name: "May", value: 700, engagement: 480 },
]

export const DashboardAnalytics = () => {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Site-wide Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                fill="#D3E4FD"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#4F46E5"
                fill="#B2CCFA"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}