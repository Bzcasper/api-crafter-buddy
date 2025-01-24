import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const AIInsights = () => {
  return (
    <Card className="bg-blue-500 text-white">
      <CardHeader>
        <CardTitle className="text-white">AI Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span>•</span>
            <span>
              Increase affiliate commission rates by 2% to boost partner activity
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span>•</span>
            <span>
              Optimize landing pages for mobile (15% conversion improvement
              potential)
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span>•</span>
            <span>
              Focus on email marketing (underperforming by 20% vs benchmark)
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span>•</span>
            <span>
              Expand social media presence (high growth potential identified)
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}