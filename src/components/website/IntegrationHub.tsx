import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function IntegrationHub() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-card/50 rounded-lg">
            <span>Google Analytics</span>
            <Badge variant="default" className="bg-green-500">
              Connected
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-card/50 rounded-lg">
            <span>Social Media</span>
            <Badge variant="default" className="bg-green-500">
              Connected
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-card/50 rounded-lg">
            <span>Email Marketing</span>
            <Badge variant="default" className="bg-orange-500">
              Connect
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}