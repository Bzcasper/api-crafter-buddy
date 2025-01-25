import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { WebsiteSelector } from "./website-controls/WebsiteSelector"
import { AIModelSelector } from "./ai-controls/AIModelSelector"
import { CreativityControl } from "./ai-controls/CreativityControl"
import { TopicGenerator } from "./TopicGenerator"
import { ContentPreview } from "./ContentPreview"
import { ContentScheduler } from "./ContentScheduler"
import { PerformanceMetrics } from "./PerformanceMetrics"
import { Save, Wand2, Clock } from "lucide-react"

export const ContentLayout = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [selectedWebsite, setSelectedWebsite] = useState("")
  const [creativity, setCreativity] = useState([50])
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Content Saved",
        description: "Your content has been saved successfully."
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold">Create Content</h1>

      {/* Website Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Website Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <WebsiteSelector
            selectedWebsite={selectedWebsite}
            onWebsiteChange={setSelectedWebsite}
          />
          <div className="flex gap-8 mt-4 text-sm text-muted-foreground">
            <div>Posts: 128</div>
            <div>Views: 45.2K</div>
          </div>
        </CardContent>
      </Card>

      {/* AI Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle>AI Model Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <AIModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            <CreativityControl
              value={creativity}
              onChange={setCreativity}
            />
          </div>
        </CardContent>
      </Card>

      {/* Topic Generation */}
      <TopicGenerator />

      {/* Content Preview and Platform Previews */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ContentPreview content={content} onChange={setContent} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Platform Previews</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] bg-muted/10 rounded-lg">
            {/* Platform preview content will go here */}
          </CardContent>
        </Card>
      </div>

      {/* Content Schedule */}
      <ContentScheduler />

      {/* Performance Insights */}
      <PerformanceMetrics />

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={saving}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <div className="space-x-4">
          <Button onClick={() => console.log("Generate")}>
            <Wand2 className="w-4 h-4 mr-2" />
            Generate
          </Button>
          <Button variant="secondary">
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>
    </div>
  )
}
