import { Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface AIModelSelectorProps {
  selectedModel: string
  onModelChange: (value: string) => void
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
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Highly accurate and creative, best for detailed content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Faster and cost-efficient for short or less complex content</p>
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