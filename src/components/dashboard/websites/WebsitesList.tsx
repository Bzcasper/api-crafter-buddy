import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

const websiteData = [
  { 
    name: "corporate-site.com", 
    clicks: "1,234", 
    lastPost: "2024-03-20 14:30",
    tags: ["Business", "Corporate"]
  },
  { 
    name: "blog.example.com", 
    clicks: "856", 
    lastPost: "2024-03-19 16:45",
    tags: ["Blog", "Content"]
  },
]

export const WebsitesList = () => {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Websites</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {websiteData.map((site, index) => (
            <div key={index} className="flex items-start gap-4 rounded-lg border p-3 cursor-pointer hover:bg-accent">
              <Globe className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <h4 className="font-semibold">{site.name}</h4>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span>Clicks today: {site.clicks}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Last post: {site.lastPost}
                </div>
                <div className="flex gap-2 mt-2">
                  {site.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-accent px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}