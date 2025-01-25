import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

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
  const [creativity, setCreativity] = useState(50)
  const [length, setLength] = useState(50)
  const [tone, setTone] = useState(50)
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSliderChange = (type: string, value: number) => {
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

  const handleGenerateContent = async () => {
    if (!selectedModel || !selectedWebsite) {
      toast({
        title: "Missing Requirements",
        description: "Please select an AI model and website before generating content.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      console.log('Generating content with parameters:', {
        model: selectedModel,
        website: selectedWebsite,
        parameters: { creativity, length, tone }
      })

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          model: selectedModel,
          website: selectedWebsite,
          parameters: { creativity, length, tone }
        }
      })

      if (error) {
        console.error('Error from edge function:', error)
        throw error
      }

      console.log('Generated content:', data)
      
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

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Content Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Button 
          className="w-full gap-2 mt-4" 
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
      </CardContent>
    </Card>
  )
}