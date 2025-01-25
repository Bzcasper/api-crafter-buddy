import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const WebsiteSection = () => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Website Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-base font-medium">mywebsite.com</h3>
            <p className="text-sm text-muted-foreground">Last update 2 hours ago</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-600">
            Active site
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}