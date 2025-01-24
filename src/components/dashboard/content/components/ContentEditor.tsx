import { useState } from "react"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { ContentControls } from "../ContentControls"

interface ContentEditorProps {
  content: string
  onChange: (content: string) => void
  onSave: () => void
  saving: boolean
}

export const ContentEditor = ({ 
  content, 
  onChange, 
  onSave, 
  saving 
}: ContentEditorProps) => {
  const handleControlChange = (type: string, value: number) => {
    console.log(`${type} changed to ${value}`)
  }

  return (
    <div className="space-y-6">
      <ContentControls onControlChange={handleControlChange} />
      
      <div className="border rounded-lg p-4 min-h-[300px] bg-background">
        <WebsiteEditor 
          content={content} 
          onChange={onChange}
        />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onSave}
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}