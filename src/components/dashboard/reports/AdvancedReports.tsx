import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ChartBar, ChartPie, ChartLine } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const analyticsData = [
  { name: "Jan", value: 245800, conversions: 3892 },
  { name: "Feb", value: 258400, conversions: 4102 },
  { name: "Mar", value: 267300, conversions: 4320 },
  { name: "Apr", value: 289600, conversions: 4589 },
  { name: "May", value: 312400, conversions: 4892 },
  { name: "Jun", value: 330500, conversions: 5102 },
]

const trafficSourceData = [
  { name: "Organic Search", value: 45 },
  { name: "Social Media", value: 25 },
  { name: "Direct", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
]

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"]

const performanceMetrics = [
  {
    label: "Engagement Score",
    value: "92.4",
    change: "+12.3%",
    trend: "up",
  },
  {
    label: "Content Quality",
    value: "88%",
    change: "+8.7%",
    trend: "up",
  },
  {
    label: "Audience Growth",
    value: "+2.8K",
    change: "+12.4%",
    trend: "up",
  },
  {
    label: "ROI",
    value: "342%",
    change: "+25.9%",
    trend: "up",
  },
]

export const AdvancedReports = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
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

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartLine className="h-5 w-5" />
              Traffic Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="h-5 w-5" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficSourceData.map((entry, index) => (
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
          </CardContent>
        </Card>
      </div>

      {/* AI Action Center */}
      <Card className="bg-[#1E1B4B] text-white">
        <CardHeader>
          <CardTitle>AI Action Center</CardTitle>
          <p className="text-sm text-gray-400">
            Powered by Perplexity AI + SocialBoost
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Strategic Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 rounded bg-opacity-20 bg-green-500">
                  <span className="text-green-400 font-medium">HIGH PRIORITY</span>
                  <p>Video Content Push</p>
                </div>
                <div className="p-3 rounded bg-opacity-20 bg-yellow-500">
                  <span className="text-yellow-400 font-medium">
                    MEDIUM PRIORITY
                  </span>
                  <p>Hashtag Strategy Update</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Growth Trajectory</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}