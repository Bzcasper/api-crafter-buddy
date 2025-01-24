import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const PerformanceInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-sm font-medium mb-2 text-muted-foreground">Predicted Engagement</div>
          <div className="text-4xl font-bold text-pink-500">87%</div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2 text-muted-foreground">Optimal Posting Times</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-pink-500">3:00 PM</Button>
            <Button variant="outline" size="sm" className="text-pink-500">7:30 PM</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}