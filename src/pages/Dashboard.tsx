import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics"
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar"
import { DashboardPieChart } from "@/components/dashboard/analytics/DashboardPieChart"
import { CampaignsList } from "@/components/dashboard/campaigns/CampaignsList"
import { AIInsightsList } from "@/components/dashboard/insights/AIInsightsList"
import { WebsitesList } from "@/components/dashboard/websites/WebsitesList"
import { Routes, Route } from "react-router-dom"
import WebsiteManagement from "./WebsiteManagement"
import { useState } from "react"

const DashboardHome = () => {
  const [metricType, setMetricType] = useState("traffic")

  return (
    <div className="space-y-4 p-4 max-w-[2000px] mx-auto">
      <DashboardStats />
      <DashboardAnalytics />
      
      {/* Pie Chart and Campaigns Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardPieChart 
          metricType={metricType} 
          onMetricTypeChange={setMetricType} 
        />
        <CampaignsList />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <AIInsightsList />
        <WebsitesList />
        <DashboardCalendar />
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="website-management" element={<WebsiteManagement />} />
      </Routes>
    </DashboardLayout>
  )
}

export default Dashboard