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
import { Download, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800">
              <DropdownMenuLabel>Choose Data to Export</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('companies')}>
                Export Companies
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('contacts')}>
                Export Contacts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('deals')}>
                Export Deals
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WebsiteInsights />
        <Card className="bg-purple-600 text-white">
          <CardHeader>
            <CardTitle>Affiliate Marketing Module</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Active Campaigns: 3</p>
              <p className="text-sm">Total Revenue: $2,450</p>
              <p className="text-sm">Top Performing: "Summer Sale 2024"</p>
            </div>
            <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30">
              Manage Campaigns
            </Button>
          </CardContent>
        </Card>
      </div>

      <WebsiteStats />
      <ActiveWebsites />
      <ContentGenerator />
      <CampaignAnalytics />
      <IntegrationHub />
      <AdvancedSettings />
    </div>
  )
}