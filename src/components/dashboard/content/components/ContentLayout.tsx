import { useState } from "react"
import { ContentControls } from "../ContentControls"
import { ContentEditor } from "./ContentEditor"
import { ContentSidebar } from "./ContentSidebar"
import { ContentHeader } from "./ContentHeader"
import { ContentCreationSection } from "./ContentCreationSection"
import { useMediaQuery } from "@/hooks/use-media-query"

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
        <div className="w-full space-y-6">
          <ContentCreationSection />
          <ContentControls onControlChange={handleControlChange} />
          <ContentEditor 
            content={content}
            onChange={setContent}
            onSave={handleSave}
            saving={saving}
          />
        </div>
        <div className="w-full">
          <ContentSidebar />
        </div>
      </div>
    </div>
  )
}