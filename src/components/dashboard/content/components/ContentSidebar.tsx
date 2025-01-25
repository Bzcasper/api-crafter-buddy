import { ContentSchedule } from "../ContentSchedule"
import { PerformanceInsights } from "../PerformanceInsights"
import { Card } from "@/components/ui/card"

export const ContentSidebar = () => {
  return (
    <div className="space-y-6">
      <ContentSchedule />
      <PerformanceInsights />
    </div>
  )
}