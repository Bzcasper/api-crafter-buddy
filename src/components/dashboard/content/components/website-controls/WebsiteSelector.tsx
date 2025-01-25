import { useEffect, useState } from "react"
import { Globe, ExternalLink, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { Website } from "@/types/content"

interface WebsiteSelectorProps {
  selectedWebsite: string
  onWebsiteChange: (value: string) => void
  loading?: boolean
}

export const WebsiteSelector = ({ 
  selectedWebsite, 
  onWebsiteChange,
  loading = false 
}: WebsiteSelectorProps) => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [websites, setWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWebsites()
  }, [])

  const fetchWebsites = async () => {
    try {
      const { data: websites, error } = await supabase
        .from('websites')
        .select('*')
        .eq('created_by', (await supabase.auth.getUser()).data.user?.id)

      if (error) throw error

      if (websites) {
        setWebsites(websites)
        // If there's only one website, select it automatically
        if (websites.length === 1 && !selectedWebsite) {
          onWebsiteChange(websites[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching websites:', error)
      toast({
        title: "Error",
        description: "Failed to fetch websites. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageWebsites = () => {
    navigate("/dashboard/website-management")
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
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            Loading websites...
          </div>
        ) : websites.length > 0 ? (
          <Select value={selectedWebsite} onValueChange={onWebsiteChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Website" />
            </SelectTrigger>
            <SelectContent>
              {websites.map((website) => (
                <SelectItem key={website.id} value={website.id}>
                  <div className="flex items-center gap-3">
                    {website.favicon_url && (
                      <img 
                        src={website.favicon_url} 
                        alt="" 
                        className="w-4 h-4"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between w-full">
                        <span>{website.title}</span>
                        <span className={`text-xs ${
                          website.status === "published" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {website.status}
                        </span>
                      </div>
                      {website.domain && (
                        <span className="text-xs text-muted-foreground">
                          {website.domain}
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
              onClick={() => navigate("/dashboard/websites/new")}
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