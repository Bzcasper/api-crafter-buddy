import { DashboardStats } from "./DashboardStats"
import { DashboardAnalytics } from "./DashboardAnalytics"
import { DashboardCalendar } from "./DashboardCalendar"
import { DashboardPieChart } from "./analytics/DashboardPieChart"
import { CampaignsList } from "./campaigns/CampaignsList"
import { AIInsightsList } from "./insights/AIInsightsList"
import { WebsitesList } from "./websites/WebsitesList"
import { useState } from "react"

export const DashboardHome = () => {
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