import { Button } from "@/components/ui/button"
import { WebsiteSelection } from "./components/WebsiteSelection"
import { AIModelSelection } from "./components/AIModelSelection"
import { TopicSection } from "./components/ai-controls/sections/TopicSection"
import { PreviewSection } from "./components/ai-controls/sections/PreviewSection"
import { SchedulingSection } from "./components/ai-controls/sections/SchedulingSection"
import { AnalyticsSection } from "./components/ai-controls/sections/AnalyticsSection"

export const ContentStudio = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Advanced Settings</h2>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-pink-600">
            Content Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            AI Configuration
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Platform Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Schedule Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Analytics Settings
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
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