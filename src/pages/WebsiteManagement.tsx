import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WebsiteStats } from "@/components/website/WebsiteStats"
import { WebsiteInsights } from "@/components/website/WebsiteInsights"
import { ActiveWebsites } from "@/components/website/ActiveWebsites"
import { ContentGenerator } from "@/components/website/ContentGenerator"
import { CampaignAnalytics } from "@/components/website/CampaignAnalytics"
import { IntegrationHub } from "@/components/website/IntegrationHub"
import { AdvancedSettings } from "@/components/website/AdvancedSettings"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Download } from "lucide-react"

export default function WebsiteManagement() {
  const { toast } = useToast()

  const handleExport = async (type: 'companies' | 'contacts' | 'deals') => {
    try {
      const { data, error } = await supabase.functions.invoke('export-to-sheets', {
        body: { type }
      })

      if (error) throw error

      toast({
        title: "Export Successful",
        description: `${type} data has been exported to Google Sheets`,
      })

      // Open the sheet in a new tab
      if (data.sheetId) {
        window.open(`https://docs.google.com/spreadsheets/d/${data.sheetId}`, '_blank')
      }
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export data to Google Sheets",
        variant: "destructive",
      })
    }
  }

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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleExport('companies')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Companies
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport('contacts')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Contacts
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport('deals')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Deals
            </Button>
          </div>
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