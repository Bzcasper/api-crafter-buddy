import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { Routes, Route } from "react-router-dom"
import { DashboardHome } from "@/components/dashboard/DashboardHome"
import WebsiteManagement from "./WebsiteManagement"
import { Analytics } from "@/components/dashboard/analytics/Analytics"
import { ContentStudio } from "@/components/dashboard/content/ContentStudio"
import { DataCollection } from "@/components/dashboard/data/DataCollection"
import { CampaignManager } from "@/components/dashboard/campaigns/CampaignManager"
import { AutomationCenter } from "@/components/dashboard/automation/AutomationCenter"
import { MediaLibrary } from "@/components/dashboard/media/MediaLibrary"
import { SeoOptimizer } from "@/components/dashboard/seo/SeoOptimizer"
import { CompetitionTracker } from "@/components/dashboard/competition/CompetitionTracker"
import { AdvancedReports } from "@/components/dashboard/reports/AdvancedReports"
import { SystemSettings } from "@/components/dashboard/settings/SystemSettings"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="website-management" element={<WebsiteManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="content" element={<ContentStudio />} />
        <Route path="data" element={<DataCollection />} />
        <Route path="campaigns" element={<CampaignManager />} />
        <Route path="automation" element={<AutomationCenter />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="seo" element={<SeoOptimizer />} />
        <Route path="competition" element={<CompetitionTracker />} />
        <Route path="reports" element={<AdvancedReports />} />
        <Route path="settings" element={<SystemSettings />} />
      </Routes>
    </DashboardLayout>
  )
}

export default Dashboard