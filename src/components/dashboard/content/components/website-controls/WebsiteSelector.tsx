import { Globe, ExternalLink, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface Website {
  id: string
  name: string
  url: string
  status: "connected" | "not_connected"
  faviconUrl?: string
  lastSynced?: string
}

interface WebsiteSelectorProps {
  websites: Website[]
  selectedWebsite: string
  onWebsiteChange: (value: string) => void
}

export const WebsiteSelector = ({ websites, selectedWebsite, onWebsiteChange }: WebsiteSelectorProps) => {
  const navigate = useNavigate()

  const handleManageWebsites = () => {
    navigate("/dashboard/websites")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Website Selection
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handleManageWebsites}
          >
            Manage Websites
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {websites.length > 0 ? (
          <Select value={selectedWebsite} onValueChange={onWebsiteChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Website" />
            </SelectTrigger>
            <SelectContent>
              {websites.map((website) => (
                <SelectItem key={website.id} value={website.id}>
                  <div className="flex items-center gap-3">
                    {website.faviconUrl && (
                      <img 
                        src={website.faviconUrl} 
                        alt="" 
                        className="w-4 h-4"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between w-full">
                        <span>{website.name}</span>
                        <span className={`text-xs ${
                          website.status === "connected" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {website.status}
                        </span>
                      </div>
                      {website.lastSynced && (
                        <span className="text-xs text-muted-foreground">
                          Last synced: {website.lastSynced}
                        </span>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              No websites connected. Add one from the Website Management section.
            </p>
            <Button 
              variant="outline" 
              onClick={handleManageWebsites}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Website
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}