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
  const [activeSettingsTab, setActiveSettingsTab] = useState<'platform' | 'content' | 'advanced'>('platform');

  const renderSettings = () => {
    switch (activeSettingsTab) {
      case 'platform':
        return <PlatformSettings />;
      case 'content':
        return <ContentSettings />;
      case 'advanced':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Configuration</h3>
                    <div className="space-y-2 text-sm">
                      <p>Model: GPT-4</p>
                      <p>Temperature: 0.7</p>
                      <p>Max Tokens: 2000</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">API Integration</h3>
                    <div className="space-y-2 text-sm">
                      <p>Rate Limiting: 100 req/min</p>
                      <p>Retry Strategy: Exponential</p>
                      <p>Timeout: 30s</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

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
            <div className="flex space-x-4 mb-6">
              <Button
                variant={activeSettingsTab === 'platform' ? 'default' : 'outline'}
                onClick={() => setActiveSettingsTab('platform')}
              >
                Platform Settings
              </Button>
              <Button
                variant={activeSettingsTab === 'content' ? 'default' : 'outline'}
                onClick={() => setActiveSettingsTab('content')}
              >
                Content Settings
              </Button>
              <Button
                variant={activeSettingsTab === 'advanced' ? 'default' : 'outline'}
                onClick={() => setActiveSettingsTab('advanced')}
              >
                Advanced Settings
              </Button>
            </div>
            {renderSettings()}
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