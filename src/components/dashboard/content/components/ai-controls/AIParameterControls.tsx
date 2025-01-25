import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Creativity Level</Label>
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
          <Label>Content Length</Label>
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
          <Label>Content Tone</Label>
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

        <div className="flex items-center justify-between">
          <Label htmlFor="save-settings">Save as Default Settings</Label>
          <Switch
            id="save-settings"
            checked={saveSettings}
            onCheckedChange={onSaveSettingsChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}