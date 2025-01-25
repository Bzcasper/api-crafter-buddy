import { Button } from "@/components/ui/button"
import { WebsiteSection } from "./components/sections/WebsiteSection"
import { AIEngineSection } from "./components/sections/AIEngineSection"
import { TopicSection } from "./components/sections/TopicSection"
import { PreviewSection } from "./components/sections/PreviewSection"
import { SchedulingSection } from "./components/sections/SchedulingSection"
import { AnalyticsSection } from "./components/sections/AnalyticsSection"

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
      <div className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">AI Content Studio</h1>
          <div className="flex gap-4">
            <Button variant="outline">Preview</Button>
            <Button variant="default">Generate</Button>
            <Button variant="default" className="bg-pink-500 hover:bg-pink-600">
              Schedule
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <WebsiteSection />
          <AIEngineSection />
          <TopicSection />
          <PreviewSection />
          <SchedulingSection />
          <AnalyticsSection />
        </div>
      </div>
    </div>
  )
}