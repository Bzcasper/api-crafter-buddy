import { AnalyticsDashboard } from "./AnalyticsDashboard"
import { AIActionCenter } from "./AIActionCenter"

export const Analytics = () => {
  return (
    <div className="space-y-6 p-6">
      <AnalyticsDashboard />
      <AIActionCenter />
    </div>
  )
}