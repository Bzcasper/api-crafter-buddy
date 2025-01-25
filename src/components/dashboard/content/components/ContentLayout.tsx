import { useState } from "react"
import { ContentControls } from "../ContentControls"
import { ContentEditor } from "./ContentEditor"
import { ContentSidebar } from "./ContentSidebar"
import { ContentHeader } from "./ContentHeader"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistorySection } from "./HistorySection"
import { TemplatesSection } from "./TemplatesSection"
import { ScraperSection } from "./ScraperSection"
import { useToast } from "@/hooks/use-toast"
import { WebsiteSelector } from "./website-controls/WebsiteSelector"
import { PlatformSelector } from "./PlatformSelector"
import { AIModelSelector } from "./ai-controls/AIModelSelector"
import { AIParameterControls } from "./ai-controls/AIParameterControls"
import { TopicSelector } from "./TopicSelector"
import type { Platform } from "@/types/content"

export const ContentLayout = () => {
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedWebsite, setSelectedWebsite] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [selectedTopic, setSelectedTopic] = useState("")
  const [creativity, setCreativity] = useState([50])
  const [length, setLength] = useState("medium")
  const [tone, setTone] = useState("professional")
  const [saveSettings, setSaveSettings] = useState(false)
  
  const isDesktop = useMediaQuery("(min-width: 1024px)")
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
    <div className="p-4 lg:p-6 max-w-[2000px] mx-auto">
      <ContentHeader />
      
      <div className="flex flex-col gap-6 mt-6">
        <Tabs defaultValue="create" className="w-full">
          <TabsList>
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="scraper">Scraper</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            {/* Website Selection */}
            <WebsiteSelector 
              selectedWebsite={selectedWebsite}
              onWebsiteChange={setSelectedWebsite}
            />

            {/* Platform Selection */}
            <PlatformSelector 
              onPlatformChange={setSelectedPlatforms}
            />

            {/* AI Model and Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AIModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              <AIParameterControls
                creativity={creativity}
                length={length}
                tone={tone}
                saveSettings={saveSettings}
                onCreativityChange={setCreativity}
                onLengthChange={setLength}
                onToneChange={setTone}
                onSaveSettingsChange={setSaveSettings}
              />
            </div>

            {/* Topic Selection */}
            <TopicSelector 
              onTopicSelect={(topic, suggestedContent) => {
                setSelectedTopic(topic)
                setContent(suggestedContent)
              }}
            />

            {/* Content Editor */}
            <ContentEditor 
              content={content}
              onChange={setContent}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesSection onUseTemplate={(templateContent) => setContent(templateContent)} />
          </TabsContent>

          <TabsContent value="history">
            <HistorySection onEdit={(contentId) => {
              console.log("Editing content:", contentId)
            }} />
          </TabsContent>

          <TabsContent value="scraper">
            <ScraperSection />
          </TabsContent>
        </Tabs>

        <div className="w-full">
          <ContentSidebar />
        </div>
      </div>
    </div>
  )
}