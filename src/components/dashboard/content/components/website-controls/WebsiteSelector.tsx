import { Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Website {
  id: string
  name: string
  url: string
  status: "connected" | "not_connected"
}

interface WebsiteSelectorProps {
  websites: Website[]
  selectedWebsite: string
  onWebsiteChange: (value: string) => void
}

export const WebsiteSelector = ({ websites, selectedWebsite, onWebsiteChange }: WebsiteSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Website Selection
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
                  <div className="flex items-center justify-between w-full">
                    <span>{website.name}</span>
                    <span className={`text-xs ${
                      website.status === "connected" ? "text-green-500" : "text-yellow-500"
                    }`}>
                      {website.status}
                    </span>
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
            <Button variant="outline">Go to Website Management</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}