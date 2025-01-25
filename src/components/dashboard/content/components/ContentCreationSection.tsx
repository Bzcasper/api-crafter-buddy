import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { AIModelSelector } from "./ai-controls/AIModelSelector"
import { WebsiteSelector } from "./website-controls/WebsiteSelector"
import { AIParameterControls } from "./ai-controls/AIParameterControls"
import { ActionButtons } from "./ActionButtons"
import { supabase } from "@/integrations/supabase/client"

interface ContentCreationSectionProps {
  onModelSelect: (model: string) => void
  onWebsiteSelect: (websiteId: string) => void
}

export const ContentCreationSection = ({ 
  onModelSelect,
  onWebsiteSelect 
}: ContentCreationSectionProps) => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const [selectedWebsite, setSelectedWebsite] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [creativity, setCreativity] = useState([50])
  const [length, setLength] = useState("medium")
  const [tone, setTone] = useState("professional")
  const [saveSettings, setSaveSettings] = useState(false)
  const { toast } = useToast()

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    onModelSelect(model)
  }

  const handleWebsiteChange = (websiteId: string) => {
    setSelectedWebsite(websiteId)
    onWebsiteSelect(websiteId)
  }

  const handleGenerate = () => {
    toast({
      title: "Generating content",
      description: "Your content is being generated. This may take a few moments.",
    })
  }

  const handlePreview = () => {
    console.log("Preview content")
  }

  const handleReset = () => {
    setSelectedModel("gpt-4o-mini")
    setSelectedWebsite("")
    setCreativity([50])
    setLength("medium")
    setTone("professional")
    setSaveSettings(false)
    toast({
      title: "Settings reset",
      description: "All parameters have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <AIModelSelector 
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      <WebsiteSelector 
        selectedWebsite={selectedWebsite}
        onWebsiteChange={handleWebsiteChange}
        loading={loading}
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
      <ActionButtons 
        onGenerate={handleGenerate}
        onPreview={handlePreview}
        onReset={handleReset}
      />
    </div>
  )
}