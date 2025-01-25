import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Clock } from "lucide-react"

interface ContentLengthControlProps {
  value: string
  onChange: (value: string) => void
}

export const ContentLengthControl = ({ value, onChange }: ContentLengthControlProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-blue-500" />
        <Label>Content Length</Label>
      </div>
      <RadioGroup value={value} onValueChange={onChange} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="short" id="short" />
          <Label htmlFor="short">Short</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="long" id="long" />
          <Label htmlFor="long">Long</Label>
        </div>
      </RadioGroup>
    </div>
  )
}