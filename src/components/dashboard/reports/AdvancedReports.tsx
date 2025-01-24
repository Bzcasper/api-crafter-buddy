import { PerformanceMetricsCard } from "./components/PerformanceMetricsCard"
import { TrafficOverviewChart } from "./components/TrafficOverviewChart"
import { TrafficSourcesChart } from "./components/TrafficSourcesChart"
import { AIActionCenter } from "./components/AIActionCenter"

const analyticsData = [
  { name: "Jan", value: 245800, conversions: 3892 },
  { name: "Feb", value: 258400, conversions: 4102 },
  { name: "Mar", value: 267300, conversions: 4320 },
  { name: "Apr", value: 289600, conversions: 4589 },
  { name: "May", value: 312400, conversions: 4892 },
  { name: "Jun", value: 330500, conversions: 5102 },
]

const trafficSourceData = [
  { name: "Organic Search", value: 45 },
  { name: "Social Media", value: 25 },
  { name: "Direct", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
]

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"]

const performanceMetrics = [
  {
    label: "Engagement Score",
    value: "92.4",
    change: "+12.3%",
    trend: "up",
  },
  {
    label: "Content Quality",
    value: "88%",
    change: "+8.7%",
    trend: "up",
  },
  {
    label: "Audience Growth",
    value: "+2.8K",
    change: "+12.4%",
    trend: "up",
  },
  {
    label: "ROI",
    value: "342%",
    change: "+25.9%",
    trend: "up",
  },
]

export const AdvancedReports = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <PerformanceMetricsCard metrics={performanceMetrics} />

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficOverviewChart data={analyticsData} />
        <TrafficSourcesChart data={trafficSourceData} colors={COLORS} />
      </div>

      {/* AI Action Center */}
      <AIActionCenter data={analyticsData} />
    </div>
  )
}