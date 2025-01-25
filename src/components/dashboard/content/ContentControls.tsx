import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Loader2, Eye, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { contentService } from "@/services/contentService"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import type { Platform } from "@/types/content"

interface ContentControlsProps {
  onControlChange: (type: string, value: number) => void
  selectedModel: string
  selectedWebsite: string
}

export const ContentControls = ({ 
  onControlChange, 
  selectedModel, 
  selectedWebsite 
}: ContentControlsProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [creativity, setCreativity] = useState(50)
  const [length, setLength] = useState(50)
  const [tone, setTone] = useState(50)
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [generatedContent, setGeneratedContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([
    { id: "facebook", name: "Facebook", isActive: true },
    { id: "instagram", name: "Instagram", isActive: true },
    { id: "twitter", name: "Twitter", isActive: true },
    { id: "pinterest", name: "Pinterest", isActive: false },
    { id: "ebay", name: "eBay", isActive: false }
  ])
  const { toast } = useToast()

  const handleSliderChange = (type: string, value: number) => {
    console.log(`Adjusting ${type} to ${value}`)
    switch (type) {
      case 'creativity':
        setCreativity(value)
        break
      case 'length':
        setLength(value)
        break
      case 'tone':
        setTone(value)
        break
    }
    onControlChange(type, value)
  }

  const handlePresetClick = (preset: string) => {
    console.log('Applying preset:', preset)
    setActivePreset(preset)
    switch (preset) {
      case 'professional':
        setCreativity(30)
        setLength(70)
        setTone(80)
        break
      case 'casual':
        setCreativity(60)
        setLength(40)
        setTone(30)
        break
      case 'fun':
        setCreativity(90)
        setLength(50)
        setTone(20)
        break
    }
  }

  const validateInputs = () => {
    if (!selectedModel) {
      toast({
        title: "Model Required",
        description: "Please select an AI model before generating content.",
        variant: "destructive"
      })
      return false
    }
    if (!selectedWebsite) {
      toast({
        title: "Website Required",
        description: "Please select a website before generating content.",
        variant: "destructive"
      })
      return false
    }
    if (!selectedPlatforms.some(p => p.isActive)) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform for content generation.",
        variant: "destructive"
      })
      return false
    }
    return true
  }

  const handleGenerateContent = async () => {
    if (!validateInputs()) return

    setIsGenerating(true)
    try {
      const result = await contentService.generateContent({
        model: selectedModel,
        website: selectedWebsite,
        parameters: { creativity, length, tone },
        platforms: selectedPlatforms.filter(p => p.isActive)
      })

      setGeneratedContent(result.content)
      toast({
        title: "Content Generated",
        description: "Your content has been generated successfully."
      })
    } catch (error) {
      console.error('Error generating content:', error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(platforms => 
      platforms.map(p => 
        p.id === platformId ? { ...p, isActive: !p.isActive } : p
      )
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Content Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Selected Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedPlatforms.map((platform) => (
              <Button
                key={platform.id}
                variant={platform.isActive ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform(platform.id)}
                className={platform.isActive ? 'bg-pink-500 hover:bg-pink-600' : ''}
              >
                {platform.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Creativity Level
          </label>
          <Slider 
            value={[creativity]} 
            max={100} 
            step={1} 
            onValueChange={(value) => handleSliderChange('creativity', value[0])}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Content Length
          </label>
          <Slider 
            value={[length]} 
            max={100} 
            step={1}
            onValueChange={(value) => handleSliderChange('length', value[0])}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Tone Matching
          </label>
          <Slider 
            value={[tone]} 
            max={100} 
            step={1}
            onValueChange={(value) => handleSliderChange('tone', value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Style Presets
          </label>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activePreset === 'professional' ? "default" : "outline"} 
              size="sm" 
              className={`flex-1 min-w-[100px] ${activePreset === 'professional' ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
              onClick={() => handlePresetClick('professional')}
            >
              Professional
            </Button>
            <Button 
              variant={activePreset === 'casual' ? "default" : "outline"} 
              size="sm" 
              className={`flex-1 min-w-[100px] ${activePreset === 'casual' ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
              onClick={() => handlePresetClick('casual')}
            >
              Casual
            </Button>
            <Button 
              variant={activePreset === 'fun' ? "default" : "outline"} 
              size="sm" 
              className={`flex-1 min-w-[100px] ${activePreset === 'fun' ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
              onClick={() => handlePresetClick('fun')}
            >
              Fun
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 gap-2" 
            size="lg"
            onClick={handleGenerateContent}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            {isGenerating ? "Generating..." : "Generate Content"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsPreviewOpen(true)}
            disabled={!generatedContent}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardContent>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <WebsiteEditor 
              content={generatedContent}
              onChange={() => {}}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}