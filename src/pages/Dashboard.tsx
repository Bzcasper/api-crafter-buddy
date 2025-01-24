import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { Brain, Users, TrendingUp, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const data = [
  { name: "Jan", value: 400, engagement: 240 },
  { name: "Feb", value: 300, engagement: 139 },
  { name: "Mar", value: 600, engagement: 980 },
  { name: "Apr", value: 800, engagement: 390 },
  { name: "May", value: 700, engagement: 480 },
]

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate">452.1k</div>
            <p className="text-xs text-success">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate">4.3%</div>
            <p className="text-xs text-success">+1.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate">Growth Index</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate">89</div>
            <p className="text-xs text-success">+5 points from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate">AI Performance</CardTitle>
            <Brain className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate">94%</div>
            <p className="text-xs text-success">+2% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 bg-white">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <Brain className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold text-slate">Content Optimization</h4>
                  <p className="text-sm text-muted">Your posts with video content are performing 45% better than images.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <Zap className="h-5 w-5 text-warning" />
                <div>
                  <h4 className="font-semibold text-slate">Best Posting Time</h4>
                  <p className="text-sm text-muted">Engagement peaks between 6-8 PM EST. Consider scheduling posts during this window.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Upcoming Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-semibold text-slate">Post #{i}</h4>
                    <p className="text-sm text-muted">Scheduled for tomorrow at {6 + i}:00 PM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-xs text-muted">Ready</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard