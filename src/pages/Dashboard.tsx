import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { Calendar } from "@/components/ui/calendar"
import { Brain, Globe, TrendingUp, Users, MousePointerClick, ArrowUpRight } from "lucide-react"
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

const analyticsData = [
  { name: "Jan", value: 400, engagement: 240 },
  { name: "Feb", value: 300, engagement: 139 },
  { name: "Mar", value: 600, engagement: 980 },
  { name: "Apr", value: 800, engagement: 390 },
  { name: "May", value: 700, engagement: 480 },
]

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

const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <DashboardLayout>
      <div className="space-y-3 p-3">
        {/* Top Stats */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">24.5k</div>
              <p className="text-xs text-success">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Traffic</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">89.2k</div>
              <p className="text-xs text-success">+8% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Users className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">452.1k</div>
              <p className="text-xs text-success">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">4.3%</div>
              <p className="text-xs text-success">+1.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Site-wide Analytics</CardTitle>
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

        {/* Three Column Layout */}
        <div className="grid gap-3 md:grid-cols-3">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
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
          <Card>
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
          <Card>
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