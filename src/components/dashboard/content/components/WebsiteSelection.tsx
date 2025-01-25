import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, Settings } from "lucide-react"

export const WebsiteSelection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Website Selection</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage Sites
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold">
              M
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">mywebsite.com</h3>
              <p className="text-sm text-gray-600">Last updated: 2 hours ago</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Optimized
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Monthly Traffic</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">45.2K</span>
                <span className="text-sm text-green-600">↑ 12.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Content Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">92</span>
                <span className="text-sm text-green-600">↑ 5 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">AI Readiness</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">98%</span>
                <span className="text-sm text-green-600">Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Site Health Overview</h3>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-medium">SEO Health</p>
              <Progress value={90} className="h-2" />
              <p className="text-right text-sm text-gray-600">90%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-medium">Content Freshness</p>
              <Progress value={85} className="h-2" />
              <p className="text-right text-sm text-gray-600">85%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-medium">Site Performance</p>
              <Progress value={95} className="h-2" />
              <p className="text-right text-sm text-gray-600">95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-medium">Mobile Optimization</p>
              <Progress value={98} className="h-2" />
              <p className="text-right text-sm text-gray-600">98%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}