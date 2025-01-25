import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Lightbulb } from "lucide-react"

interface CreativityControlProps {
  value: number[]
  onChange: (value: number[]) => void
}

export const CreativityControl = ({ value, onChange }: CreativityControlProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-yellow-500" />
        <Label>Creativity Level</Label>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        max={100}
        step={1}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Conservative</span>
        <span>Creative</span>
      </div>
    </div>
  )
}