import { Database, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface AIModelSelectorProps {
  selectedModel: string
  onModelChange: (value: string) => void
}

const modelPerformance = {
  'gpt-4': {
    cost: '$0.03/1K tokens',
    speed: '~2-3s/response',
    recommended: true
  },
  'gpt-3.5': {
    cost: '$0.002/1K tokens',
    speed: '~1s/response',
    recommended: false
  },
  'custom': {
    cost: 'Varies',
    speed: 'Varies',
    recommended: false
  }
}

export const AIModelSelector = ({ selectedModel, onModelChange }: AIModelSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          AI Model Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SelectItem value="gpt-4" className="flex items-center justify-between">
                    <span>GPT-4</span>
                    {modelPerformance['gpt-4'].recommended && (
                      <Badge variant="secondary" className="ml-2">Recommended</Badge>
                    )}
                  </SelectItem>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Performance Metrics:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>Cost:</span>
                      <span>{modelPerformance['gpt-4'].cost}</span>
                      <span>Speed:</span>
                      <span>{modelPerformance['gpt-4'].speed}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Highly accurate and creative, best for detailed content
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Performance Metrics:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>Cost:</span>
                      <span>{modelPerformance['gpt-3.5'].cost}</span>
                      <span>Speed:</span>
                      <span>{modelPerformance['gpt-3.5'].speed}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Faster and cost-efficient for short or less complex content
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SelectItem value="custom">Custom Model</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}