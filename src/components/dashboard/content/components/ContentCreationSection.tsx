import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { AIModelSelector } from "./ai-controls/AIModelSelector"
import { WebsiteSelector } from "./website-controls/WebsiteSelector"
import { AIParameterControls } from "./ai-controls/AIParameterControls"
import { ActionButtons } from "./ActionButtons"

const mockWebsites = [
  { 
    id: "1", 
    name: "Corporate Blog", 
    url: "blog.example.com", 
    status: "connected" as const,
    faviconUrl: "/favicon.ico",
    lastSynced: "2 hours ago"
  },
  { 
    id: "2", 
    name: "Product Site", 
    url: "products.example.com", 
    status: "connected" as const,
    faviconUrl: "/favicon.ico",
    lastSynced: "1 day ago"
  },
  { 
    id: "3", 
    name: "Landing Page", 
    url: "landing.example.com", 
    status: "not_connected" as const 
  },
]

export const ContentCreationSection = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedWebsite, setSelectedWebsite] = useState<string>("")
  const [creativity, setCreativity] = useState([50])
  const [length, setLength] = useState("medium")
  const [tone, setTone] = useState("professional")
  const [saveSettings, setSaveSettings] = useState(false)
  const { toast } = useToast()

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
    setSelectedModel("gpt-4")
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
        onModelChange={setSelectedModel}
      />
      <WebsiteSelector 
        websites={mockWebsites}
        selectedWebsite={selectedWebsite}
        onWebsiteChange={setSelectedWebsite}
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