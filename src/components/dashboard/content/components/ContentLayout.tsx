import { useState } from "react"
import { ContentControls } from "../ContentControls"
import { ContentEditor } from "./ContentEditor"
import { ContentSidebar } from "./ContentSidebar"
import { ContentHeader } from "./ContentHeader"
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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 lg:mt-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <ContentControls onControlChange={handleControlChange} />
        </div>

        {/* Middle Column - Editor */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <ContentEditor 
            content={content}
            onChange={setContent}
            onSave={handleSave}
            saving={saving}
          />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-3 order-3">
          <ContentSidebar />
        </div>
      </div>
    </div>
  )
}