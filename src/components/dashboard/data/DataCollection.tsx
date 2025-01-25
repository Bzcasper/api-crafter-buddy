import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Database, Signal, Settings2 } from "lucide-react"

export const DataCollection = () => {
  const [logs, setLogs] = useState([
    { message: "SocialBoost AI Engine v2.4.1 initialized", type: "info" },
    { message: "Loading AI modules: sentiment analysis, trend detection", type: "info" },
    { message: "Setting up distributed proxy network (24/24 available)", type: "success" },
    { message: "AI modules loaded successfully", type: "success" },
    { message: "Competitor analysis module activated", type: "info" }
  ])

  const metrics = [
    { label: "Success Rate", value: "99.8", unit: "%", color: "text-pink-500" },
    { label: "Avg Response", value: "2.4", unit: "ms", color: "text-blue-500" },
    { label: "Data Quality", value: "97.5", unit: "%", color: "text-purple-500" }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h1 className="text-2xl font-bold">Advanced Content Collection</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm">AI Active</span>
          </div>
          <div className="text-sm">Premium Tier</div>
          <div className="text-sm">24 Sources Active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Source Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Source Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
              <div className="flex items-center gap-2">
                <span>Instagram Business</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">Posts</Button>
              <Button variant="secondary" size="sm" className="flex-1">Analytics</Button>
            </div>
            
            <div className="space-y-4 mt-8">
              <h3 className="font-medium">AI Enhancement</h3>
              <div className="space-y-2">
                <div className="p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer">
                  Sentiment Analysis (Premium)
                </div>
                <div className="p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer">
                  Trend Detection
                </div>
                <div className="p-2 bg-slate-50 rounded hover:bg-slate-100 cursor-pointer">
                  Content Classification
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="font-medium">Advanced Settings</h3>
              <div className="space-y-2">
                <div className="p-2 bg-slate-50 rounded">
                  60 req/min (Auto-optimized)
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  Premium Proxies (24)
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  Smart Retry (AI-powered)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Operations Console */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Live Operations Console</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border bg-slate-950 p-4">
              <div className="font-mono text-sm space-y-2">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`${
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      'text-blue-400'
                    }`}
                  >
                    → {log.message}
                  </div>
                ))}
                <div className="text-pink-400">
                  → Processing @competitor1
                </div>
                <div className="text-pink-400 pl-4">
                  ↳ Content Type: Carousel Post
                </div>
                <div className="text-pink-400 pl-4">
                  ↳ Engagement Rate: 4.2%
                </div>
                <div className="text-pink-400 pl-4">
                  ↳ Sentiment Score: 0.89
                </div>
                <div className="text-pink-400 pl-4">
                  ↳ Viral Potential: High (0.92)
                </div>
                <div className="text-cyan-400">
                  → AI Insight: Rising trend detected in niche
                </div>
                <div className="text-cyan-400">
                  → Recommendation: Adjust content strategy (87% confidence)
                </div>
              </div>
            </ScrollArea>

            {/* Real-time Analytics */}
            <div className="mt-6">
              <h3 className="font-medium mb-4">Real-time Analytics</h3>
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}