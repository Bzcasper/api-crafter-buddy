import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const PerformanceInsights = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div>
            <div className="text-sm font-medium mb-2 text-muted-foreground">Predicted Engagement</div>
            <div className="text-4xl font-bold text-pink-500">87%</div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2 text-muted-foreground">Optimal Posting Times</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-pink-500">3:00 PM</Button>
              <Button variant="outline" size="sm" className="text-pink-500">7:30 PM</Button>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2 text-muted-foreground">Content Health</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">SEO Score</span>
              <span className="text-sm font-medium text-green-500">92/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Readability</span>
              <span className="text-sm font-medium text-yellow-500">85/100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}