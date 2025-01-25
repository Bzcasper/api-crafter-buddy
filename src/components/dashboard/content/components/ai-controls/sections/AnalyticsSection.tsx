import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const AnalyticsSection = () => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Advanced Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Engagement Prediction</h3>
            <p className="text-4xl font-bold text-green-500">87%</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">SEO Impact</h3>
            <p className="text-4xl font-bold text-blue-500">92/100</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Content Performance Trends</h3>
            {/* Chart will go here */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}