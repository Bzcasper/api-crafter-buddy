import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface TopicSelectorProps {
  onTopicSelect: (topic: string, suggestedContent: string) => void
}

export const TopicSelector = ({ onTopicSelect }: TopicSelectorProps) => {
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateSuggestions = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic before generating suggestions.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('perplexity', {
        body: { 
          topic,
          content: `Generate engaging content ideas for the topic: ${topic}`
        }
      })

      if (error) throw error

      onTopicSelect(topic, data.content)
      toast({
        title: "Suggestions Generated",
        description: "Content suggestions have been generated successfully."
      })
    } catch (error) {
      console.error('Error generating suggestions:', error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button 
            onClick={generateSuggestions}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Wand2 className="h-4 w-4 mr-2" />
            )}
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}