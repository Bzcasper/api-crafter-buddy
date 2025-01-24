import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics"
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar"
import { Routes, Route } from "react-router-dom"
import WebsiteManagement from "./WebsiteManagement"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Globe, PieChart, Megaphone } from "lucide-react"
import {
  PieChart as RechartsePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

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

const DashboardHome = () => {
  const [metricType, setMetricType] = useState("traffic")

  return (
    <div className="space-y-4 p-4 max-w-[2000px] mx-auto">
      <DashboardStats />
      <DashboardAnalytics />
      
      {/* Pie Chart and Campaigns Row */}
      <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card">
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
              <div className="h-[300px]">
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
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Active Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <h4 className="font-semibold">{campaign.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        Budget: {campaign.budget}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        campaign.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
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

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3 bg-accent">
                    <Brain className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Websites */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Websites</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {websiteData.map((site, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                    <Globe className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{site.name}</h4>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>Clicks today: {site.clicks}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last post: {site.lastPost}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {site.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-accent px-2 py-1 rounded">
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

          <DashboardCalendar />
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/website-management" element={<WebsiteManagement />} />
      </Routes>
    </DashboardLayout>
  )
}

export default Dashboard
