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
import { useToast } from "@/hooks/use-toast"

export const ContentLayout = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedWebsite, setSelectedWebsite] = useState("")
  const [creativity, setCreativity] = useState([50])
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

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
            <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-lg">
              <div className="font-medium text-pink-600 dark:text-pink-400">GPT-4</div>
              <div className="text-sm text-muted-foreground">Best for high-quality content</div>
              <div className="text-xs text-pink-500 mt-1">Recommended</div>
            </div>
            <CreativityControl
              value={creativity}
              onChange={setCreativity}
            />
          </div>
        </CardContent>
      </Card>

      {/* Topic Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            placeholder="Enter topic or get AI suggestions..."
            className="mb-4"
          />
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-muted/10">
              <CardHeader>
                <CardTitle className="text-sm">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                {/* Trending topics content */}
              </CardContent>
            </Card>
            <Card className="bg-muted/10">
              <CardHeader>
                <CardTitle className="text-sm">SEO Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                {/* SEO opportunities content */}
              </CardContent>
            </Card>
            <Card className="bg-muted/10">
              <CardHeader>
                <CardTitle className="text-sm">Content Ideas</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                {/* AI content ideas content */}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

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
            {/* Platform preview content */}
          </CardContent>
        </Card>
      </div>

      {/* Content Schedule */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ContentScheduler />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Optimal Posting Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
                <span>3:00 PM</span>
                <span className="text-green-500">87% engagement</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
                <span>7:30 PM</span>
                <span className="text-green-500">82% engagement</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-muted/10">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">Predicted Engagement</div>
                <div className="text-3xl font-bold text-green-500">87%</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/10">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">SEO Score</div>
                <div className="text-3xl font-bold text-blue-500">92/100</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/10">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">Content Health</div>
                <div className="text-3xl font-bold text-orange-500">95%</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

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
          <Button 
            className="bg-pink-500 hover:bg-pink-600"
            onClick={() => console.log("Generate")}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate
          </Button>
          <Button 
            variant="secondary"
            onClick={() => console.log("Schedule")}
          >
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>
    </div>
  )
}