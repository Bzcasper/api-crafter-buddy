import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Preset {
  name: string
  creativity: number
  length: string
  tone: string
}

interface PresetSelectorProps {
  presets: Preset[]
  onSelect: (preset: Preset) => void
}

export const PresetSelector = ({ presets, onSelect }: PresetSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label>Quick Presets</Label>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => onSelect(preset)}
            className="flex-1 min-w-[100px]"
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  )
}