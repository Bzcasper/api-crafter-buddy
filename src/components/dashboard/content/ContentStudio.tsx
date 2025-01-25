import { Button } from "@/components/ui/button"
import { WebsiteSelection } from "./components/WebsiteSelection"
import { AIModelSelection } from "./components/AIModelSelection"
import { TopicSection } from "./components/sections/TopicSection"
import { PreviewSection } from "./components/sections/PreviewSection"
import { SchedulingSection } from "./components/sections/SchedulingSection"
import { AnalyticsSection } from "./components/sections/AnalyticsSection"
import { ContentAnalytics } from "./components/ContentAnalytics"
import { PlatformSettings } from "./components/settings/PlatformSettings"
import { ContentSettings } from "./components/settings/ContentSettings"
import { useState } from "react"

export const ContentStudio = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'analytics' | 'settings'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <>
            <WebsiteSelection />
            <AIModelSelection />
            <TopicSection />
            <PreviewSection />
            <SchedulingSection />
          </>
        );
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return (
          <div className="space-y-8">
            <PlatformSettings />
            <ContentSettings />
          </div>
        );
      default:
        return <ContentAnalytics />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Content Studio</h2>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === 'dashboard' ? 'text-pink-600' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === 'content' ? 'text-pink-600' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content Creation
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === 'analytics' ? 'text-pink-600' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === 'settings' ? 'text-pink-600' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {renderContent()}
      </div>
    </div>
  );
};