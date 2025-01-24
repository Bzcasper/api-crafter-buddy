import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Target } from "lucide-react"

export function WebsiteStats() {
  return (
    <Card className="bg-white dark:bg-card">
      <CardHeader>
        <CardTitle>Website Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">45.2K</p>
              <p className="text-sm text-muted-foreground">Total Traffic</p>
              <p className="text-sm text-green-500">↑ 12.3%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Users className="h-6 w-6 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">8.7%</p>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
              <p className="text-sm text-green-500">↑ 2.1%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Target className="h-6 w-6 text-cyan-500" />
            <div>
              <p className="text-2xl font-bold">3.2%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-sm text-green-500">↑ 0.5%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}