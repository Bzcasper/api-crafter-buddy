import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WebsiteStats } from "@/components/website/WebsiteStats"
import { WebsiteInsights } from "@/components/website/WebsiteInsights"
import { ActiveWebsites } from "@/components/website/ActiveWebsites"
import { ContentGenerator } from "@/components/website/ContentGenerator"
import { CampaignAnalytics } from "@/components/website/CampaignAnalytics"
import { IntegrationHub } from "@/components/website/IntegrationHub"
import { AdvancedSettings } from "@/components/website/AdvancedSettings"

export default function WebsiteManagement() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">AI-Powered Website Manager</h1>
        <div className="flex gap-4">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            + New Website
          </Button>
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
            Generate Content
          </Button>
          <Button variant="default" className="bg-cyan-600 hover:bg-cyan-700">
            Launch Campaign
          </Button>
        </div>
      </div>

      <WebsiteInsights />
      <WebsiteStats />
      <ActiveWebsites />
      <ContentGenerator />
      <CampaignAnalytics />
      <IntegrationHub />
      <AdvancedSettings />
    </div>
  )
}