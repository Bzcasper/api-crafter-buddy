import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Settings2, Activity } from "lucide-react"

interface LogEntry {
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  timestamp: Date
}

interface AnalyticMetric {
  label: string
  value: string
  unit?: string
  color?: string
}

export const ScraperSection = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { message: "SocialBoost AI Engine v2.4.1 initialized", type: "info", timestamp: new Date() },
    { message: "Loading AI modules: sentiment analysis, trend detection", type: "info", timestamp: new Date() },
    { message: "Setting up distributed proxy network (24/24 available)", type: "success", timestamp: new Date() },
  ])

  const metrics: AnalyticMetric[] = [
    { label: "Success Rate", value: "99.8", unit: "%", color: "text-green-500" },
    { label: "Avg Response", value: "2.4", unit: "ms", color: "text-blue-500" },
    { label: "Data Quality", value: "97.5", unit: "%", color: "text-purple-500" },
  ]

  return (
    <div className="grid gap-6">
      {/* Source Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            Source Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input 
              placeholder="Enter URL to scrape"
              className="flex-1"
            />
            <Button>Start Scraping</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Posts</Button>
            <Button variant="outline" size="sm">Analytics</Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Operations Console */}
      <Card className="bg-slate-950">
        <CardHeader>
          <CardTitle className="text-slate-200">Live Operations Console</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] rounded-md border border-slate-800">
            <div className="p-4 font-mono text-sm">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}
                >
                  → {log.message}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Real-time Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-time Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}