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

export const ContentLayout = () => {
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const handleSave = async () => {
    setSaving(true)
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  const handleControlChange = (type: string, value: number) => {
    console.log(`${type} control changed to ${value}`)
    // Here you can implement the logic to adjust the content based on controls
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
            <ContentCreationSection />
            <ContentControls onControlChange={handleControlChange} />
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
              // Here you would implement loading the historical content
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