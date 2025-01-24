import { ContentSchedule } from "../ContentSchedule"
import { PerformanceInsights } from "../PerformanceInsights"

export const ContentSidebar = () => {
  return (
    <div className="space-y-6">
      <ContentSchedule />
      <PerformanceInsights />
    </div>
  )
}