import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone } from "lucide-react"

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

export const CampaignsList = () => {
  return (
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
  )
}