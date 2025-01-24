import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { TrafficSourcesChart } from "./components/TrafficSourcesChart"
import { UserBehaviorMetrics } from "./components/UserBehaviorMetrics"
import { RealTimeMetrics } from "./components/RealTimeMetrics"
import { AIInsights } from "./components/AIInsights"

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header with Time Range */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SocialBoost AI Analytics</h1>
        <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
          Last 30 Days ▼
        </div>
      </div>

      {/* Stats Grid */}
      <PerformanceMetrics />

      {/* Traffic Sources and User Behavior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrafficSourcesChart />
        <UserBehaviorMetrics />
      </div>

      {/* Real-time Analytics */}
      <RealTimeMetrics />

      {/* AI Performance Insights */}
      <AIInsights />
    </div>
  )
}