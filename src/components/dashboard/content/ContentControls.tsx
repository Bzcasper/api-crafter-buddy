import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface ContentControlsProps {
  onControlChange: (type: string, value: number) => void;
}

export const ContentControls = ({ onControlChange }: ContentControlsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Creativity Level</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1} 
          onValueChange={(value) => onControlChange('creativity', value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Content Length</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          onValueChange={(value) => onControlChange('length', value[0])}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Tone Matching</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          onValueChange={(value) => onControlChange('tone', value[0])}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Style Presets</label>
        <div className="flex gap-2">
          <Button variant="default" size="sm">Professional</Button>
          <Button variant="outline" size="sm">Casual</Button>
          <Button variant="outline" size="sm">Fun</Button>
        </div>
      </div>
    </div>
  )
}