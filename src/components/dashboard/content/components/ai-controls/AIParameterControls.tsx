import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Lightbulb, Clock, MessageSquare } from "lucide-react"
import { useState } from "react"

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

  const applyPreset = (preset: typeof presets[0]) => {
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
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <Label>Creativity Level</Label>
                  </div>
                  <Slider
                    value={creativity}
                    onValueChange={onCreativityChange}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <Label>Content Length</Label>
                  </div>
                  <RadioGroup value={length} onValueChange={onLengthChange} className="flex gap-4">
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

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-500" />
                    <Label>Content Tone</Label>
                  </div>
                  <RadioGroup value={tone} onValueChange={onToneChange} className="grid grid-cols-2 gap-4">
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

                <div className="space-y-4">
                  <Label>Quick Presets</Label>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(preset)}
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

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