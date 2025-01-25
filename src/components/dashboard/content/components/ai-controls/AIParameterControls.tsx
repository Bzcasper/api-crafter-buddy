import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CreativityControl } from "./CreativityControl"
import { ContentLengthControl } from "./ContentLengthControl"
import { ContentToneControl } from "./ContentToneControl"
import { PresetSelector } from "./PresetSelector"

interface AIParameterControlsProps {
  creativity: number[]
  length: string
  tone: string
  saveSettings: boolean
  onCreativityChange: (value: number[]) => void
  onLengthChange: (value: string) => void
  onToneChange: (value: string) => void
  onSaveSettingsChange: (value: boolean) => void
}

const presets = [
  { name: "Creative Blog Post", creativity: 80, length: "long", tone: "casual" },
  { name: "Short Marketing Copy", creativity: 60, length: "short", tone: "persuasive" },
  { name: "Formal Article", creativity: 40, length: "medium", tone: "formal" }
]

export const AIParameterControls = ({
  creativity,
  length,
  tone,
  saveSettings,
  onCreativityChange,
  onLengthChange,
  onToneChange,
  onSaveSettingsChange,
}: AIParameterControlsProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handlePresetSelect = (preset: typeof presets[0]) => {
    onCreativityChange([preset.creativity])
    onLengthChange(preset.length)
    onToneChange(preset.tone)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Parameters</span>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="hover:bg-accent p-1 rounded-md transition-colors">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <CreativityControl value={creativity} onChange={onCreativityChange} />
                <ContentLengthControl value={length} onChange={onLengthChange} />
                <ContentToneControl value={tone} onChange={onToneChange} />
                <PresetSelector presets={presets} onSelect={handlePresetSelect} />
                <div className="flex items-center justify-between">
                  <Label htmlFor="save-settings">Save as Default Settings</Label>
                  <Switch
                    id="save-settings"
                    checked={saveSettings}
                    onCheckedChange={onSaveSettingsChange}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}