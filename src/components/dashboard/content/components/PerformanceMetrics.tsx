import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const PerformanceMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-muted/10">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Predicted Engagement</div>
              <div className="text-3xl font-bold text-green-500">87%</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/10">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">SEO Score</div>
              <div className="text-3xl font-bold text-blue-500">92/100</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/10">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Content Health</div>
              <div className="text-3xl font-bold text-orange-500">95%</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}