import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare } from "lucide-react"

interface ContentToneControlProps {
  value: string
  onChange: (value: string) => void
}

export const ContentToneControl = ({ value, onChange }: ContentToneControlProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-purple-500" />
        <Label>Content Tone</Label>
      </div>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="formal" id="formal" />
          <Label htmlFor="formal">Formal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="casual" id="casual" />
          <Label htmlFor="casual">Casual</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="professional" id="professional" />
          <Label htmlFor="professional">Professional</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="persuasive" id="persuasive" />
          <Label htmlFor="persuasive">Persuasive</Label>
        </div>
      </RadioGroup>
    </div>
  )
}