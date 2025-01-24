import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CloudOff, CheckCircle, RefreshCw } from "lucide-react"

export function DeploymentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-semibold">Production</h4>
                <p className="text-sm text-muted-foreground">Last deployed 2 hours ago</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">Live</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudOff className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-semibold">Staging</h4>
                <p className="text-sm text-muted-foreground">Changes pending</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}