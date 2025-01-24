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
          <div className="text-sm font-medium mb-2">Predicted Engagement</div>
          <div className="text-4xl font-bold text-primary">87%</div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">Optimal Posting Times</div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">3:00 PM</Button>
            <Button variant="secondary" size="sm">7:30 PM</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}