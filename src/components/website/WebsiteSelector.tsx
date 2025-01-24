import { Card, CardContent } from "@/components/ui/card"
import { Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const websites = [
  {
    id: 1,
    name: "Corporate Website",
    url: "corporate-site.com",
    status: "active",
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    name: "Blog Platform",
    url: "blog.example.com",
    status: "active",
    lastUpdated: "1 day ago"
  },
  {
    id: 3,
    name: "E-commerce Store",
    url: "store.example.com",
    status: "maintenance",
    lastUpdated: "3 hours ago"
  }
]

export function WebsiteSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {websites.map((website) => (
        <Card 
          key={website.id}
          className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">{website.name}</h3>
                  <p className="text-sm text-muted-foreground">{website.url}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  website.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {website.status}
                </span>
                <span className="text-muted-foreground">
                  Updated {website.lastUpdated}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}