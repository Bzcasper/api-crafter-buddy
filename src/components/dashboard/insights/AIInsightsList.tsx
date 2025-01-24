import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"

const aiInsights = [
  {
    title: "Content Optimization",
    description: "Your posts with video content are performing 45% better than images.",
    type: "improvement"
  },
  {
    title: "Best Posting Time",
    description: "Engagement peaks between 6-8 PM EST. Consider scheduling posts during this window.",
    type: "insight"
  },
  {
    title: "Trending Topics",
    description: "AI and Machine Learning content is gaining traction in your industry.",
    type: "trend"
  }
]

export const AIInsightsList = () => {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-4 rounded-lg border p-3 bg-accent">
              <Brain className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-semibold">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}