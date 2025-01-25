import { useState } from "react"
import { ContentControls } from "../ContentControls"
import { ContentEditor } from "./ContentEditor"
import { ContentSidebar } from "./ContentSidebar"
import { ContentHeader } from "./ContentHeader"
import { ContentCreationSection } from "./ContentCreationSection"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistorySection } from "./HistorySection"
import { TemplatesSection } from "./TemplatesSection"
import { ScraperSection } from "./ScraperSection"
import { useToast } from "@/hooks/use-toast"

export const ContentLayout = () => {
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const [selectedWebsite, setSelectedWebsite] = useState("")
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { toast } = useToast()

  const handleSave = async () => {
    setSaving(true)
    try {
      // Here you would implement the save functionality
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

  const handleControlChange = (type: string, value: number) => {
    console.log(`${type} control changed to ${value}`)
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
            <ContentCreationSection 
              onModelSelect={setSelectedModel}
              onWebsiteSelect={setSelectedWebsite}
            />
            <ContentControls 
              onControlChange={handleControlChange}
              selectedModel={selectedModel}
              selectedWebsite={selectedWebsite}
            />
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