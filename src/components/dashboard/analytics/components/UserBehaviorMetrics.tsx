import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const UserBehaviorMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Behavior</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Avg. Session Duration
              </p>
              <p className="text-2xl font-bold">8:32</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Pages per Session
              </p>
              <p className="text-2xl font-bold">3.8</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bounce Rate</p>
              <p className="text-2xl font-bold">32%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Return Rate</p>
              <p className="text-2xl font-bold">45%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}