import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ActiveWebsites() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Websites</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="bg-gray-50 dark:bg-card/50 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <h3 className="font-semibold">realestate.com</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="bg-blue-600">
                  Live
                </Badge>
                <Badge variant="default" className="bg-purple-600">
                  Optimize
                </Badge>
                <Badge variant="destructive">
                  Update
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                <span>Health Score: 92/100</span>
                <span>SEO: 85%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}