import { Button } from "@/components/ui/button"
import { WebsiteSelection } from "./components/WebsiteSelection"
import { AIModelSelection } from "./components/AIModelSelection"
import { TopicSection } from "./components/sections/TopicSection"
import { PreviewSection } from "./components/sections/PreviewSection"
import { SchedulingSection } from "./components/sections/SchedulingSection"
import { AnalyticsSection } from "./components/sections/AnalyticsSection"
import { ContentAnalytics } from "./components/ContentAnalytics"

export const ContentStudio = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Content Studio</h2>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-pink-600">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Content Creation
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Schedule
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Analytics Overview */}
        <ContentAnalytics />
        
        {/* Content Creation Tools */}
        <WebsiteSelection />
        <AIModelSelection />
        <TopicSection />
        <PreviewSection />
        <SchedulingSection />
        <AnalyticsSection />
      </div>
    </div>
  )
}