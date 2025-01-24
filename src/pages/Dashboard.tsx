import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Brain, Globe, TrendingUp, Users, MousePointerClick, ArrowUpRight, PieChart, Megaphone } from "lucide-react"
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
  PieChart as RechartsePieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const analyticsData = [
  { name: "Jan", value: 400, engagement: 240 },
  { name: "Feb", value: 300, engagement: 139 },
  { name: "Mar", value: 600, engagement: 980 },
  { name: "Apr", value: 800, engagement: 390 },
  { name: "May", value: 700, engagement: 480 },
]

const pieData = [
  { name: "Website A", value: 400 },
  { name: "Website B", value: 300 },
  { name: "Website C", value: 300 },
  { name: "Website D", value: 200 },
]

const COLORS = ['#D3E4FD', '#B2CCFA', '#91B4F7', '#708CF4']

const websiteData = [
  { 
    name: "corporate-site.com", 
    clicks: "1,234", 
    lastPost: "2024-03-20 14:30",
    tags: ["Business", "Corporate"]
  },
  { 
    name: "blog.example.com", 
    clicks: "856", 
    lastPost: "2024-03-19 16:45",
    tags: ["Blog", "Content"]
  },
]

const aiInsights = [
  {
    title: "Content Optimization",
    description: "Your posts with video content are performing 45% better than images.",
    type: "improvement"
  },
  {
    title: "Best Posting Time",
    description: "Engagement peaks between 6-8 PM EST. Consider scheduling posts during this window.",
    type: "insight"
  },
  {
    title: "Trending Topics",
    description: "AI and Machine Learning content is gaining traction in your industry.",
    type: "trend"
  }
]

const adCampaigns = [
  {
    title: "Summer Sale",
    status: "Active",
    reach: "45.2k",
    budget: "$1,200",
  },
  {
    title: "Product Launch",
    status: "Scheduled",
    reach: "0",
    budget: "$2,500",
  },
]

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [metricType, setMetricType] = useState("traffic")

  return (
    <DashboardLayout>
      <div className="space-y-3 p-3 bg-[#F8FAFF]">
        {/* Top Stats */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">24.5k</div>
              <p className="text-xs text-success">+12% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Traffic</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">89.2k</div>
              <p className="text-xs text-success">+8% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">452.1k</div>
              <p className="text-xs text-success">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">4.3%</div>
              <p className="text-xs text-success">+1.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics and Pie Chart Row */}
        <div className="grid gap-3 md:grid-cols-2">
          {/* Analytics Chart */}
          <Card className="bg-white shadow-sm">
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

          {/* Traffic Distribution & Ads */}
          <div className="space-y-3">
            {/* Pie Chart Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Traffic Distribution
                </CardTitle>
                <Select value={metricType} onValueChange={setMetricType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="clicks">Clicks</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsePieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Advertisement Campaigns */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adCampaigns.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{campaign.title}</h4>
                        <span className="text-sm text-muted-foreground">
                          Budget: {campaign.budget}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </span>
                        <div className="text-sm text-muted-foreground mt-1">
                          Reach: {campaign.reach}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid gap-3 md:grid-cols-3">
          {/* AI Insights */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3 bg-slate-50">
                    <Brain className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-muted">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Websites */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Websites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {websiteData.map((site, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3 cursor-pointer hover:bg-slate-50">
                    <Globe className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{site.name}</h4>
                      <div className="flex gap-2 text-sm text-muted">
                        <span>Clicks today: {site.clicks}</span>
                      </div>
                      <div className="text-xs text-muted mt-1">
                        Last post: {site.lastPost}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {site.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-slate-100 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Scheduled Posts</h4>
                <div className="space-y-2">
                  <div className="text-sm p-2 bg-slate-50 rounded">
                    <div className="font-medium">Product Launch Post</div>
                    <div className="text-xs text-muted">Today at 2:00 PM</div>
                  </div>
                  <div className="text-sm p-2 bg-slate-50 rounded">
                    <div className="font-medium">Weekly Newsletter</div>
                    <div className="text-xs text-muted">Tomorrow at 10:00 AM</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard