import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Percent } from "lucide-react"
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
} from "recharts"

const statsData = [
  {
    title: "Total Traffic",
    value: "245.8K",
    change: "+28.5%",
    icon: Users,
    description: "Organic: 45%, Paid: 55%",
  },
  {
    title: "Conversions",
    value: "3,892",
    change: "+12.3%",
    icon: TrendingUp,
    description: "CR: 4.2%, Prev Month: +15%",
  },
  {
    title: "Revenue",
    value: "$330.5K",
    change: "+8.7%",
    icon: DollarSign,
    description: "Rev: $2k+, MoM: +4%",
  },
  {
    title: "Affiliate Revenue",
    value: "$42.3K",
    change: "+15.2%",
    icon: Percent,
    description: "Partners: 25, Prev CPA: +5%",
  },
]

const trafficData = [
  { name: "Organic Search", value: 45 },
  { name: "Social Media", value: 25 },
  { name: "Direct", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const affiliateData = [
  { name: "Partner A", value: 12.2, revenue: "$12.3K" },
  { name: "Partner B", value: 8.8, revenue: "$8.8K" },
  { name: "Partner C", value: 6.2, revenue: "$6.2K" },
]

const realTimeData = [
  { label: "Active Users", value: "342" },
  { label: "Current Page Views", value: "856" },
  { label: "Live Conversions", value: "17" },
  { label: "Active Affiliates", value: "8" },
]

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header with Time Range */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SocialBoost AI Analytics</h1>
        <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
          Last 30 Days ▼
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <h2 className="text-3xl font-bold">{stat.value}</h2>
                    <span className="text-sm text-green-500">{stat.change}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Traffic Sources and User Behavior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Card>
          <CardHeader>
            <CardTitle>User Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg. Session Duration
                  </p>
                  <p className="text-2xl font-bold">8:32</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pages per Session
                  </p>
                  <p className="text-2xl font-bold">3.8</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-bold">32%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Return Rate</p>
                  <p className="text-2xl font-bold">45%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Performance and Campaign Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {affiliateData.map((affiliate, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{affiliate.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {affiliate.value}%
                    </p>
                  </div>
                  <p className="font-bold">{affiliate.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Click-through Rate
                  </p>
                  <p className="text-2xl font-bold">4.2%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">2.8%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Average Order Value
                  </p>
                  <p className="text-2xl font-bold">$92</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Analytics */}
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

      {/* AI Performance Insights */}
      <Card className="bg-blue-500 text-white">
        <CardHeader>
          <CardTitle className="text-white">AI Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span>•</span>
              <span>
                Increase affiliate commission rates by 2% to boost partner activity
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span>•</span>
              <span>
                Optimize landing pages for mobile (15% conversion improvement
                potential)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span>•</span>
              <span>
                Focus on email marketing (underperforming by 20% vs benchmark)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span>•</span>
              <span>
                Expand social media presence (high growth potential identified)
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}