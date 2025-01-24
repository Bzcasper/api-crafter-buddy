import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface ContentControlsProps {
  onControlChange: (type: string, value: number) => void;
}

export const ContentControls = ({ onControlChange }: ContentControlsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Creativity Level</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1} 
          onValueChange={(value) => onControlChange('creativity', value[0])}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Content Length</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          onValueChange={(value) => onControlChange('length', value[0])}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Tone Matching</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          onValueChange={(value) => onControlChange('tone', value[0])}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Style Presets</label>
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="bg-pink-500 hover:bg-pink-600">Professional</Button>
          <Button variant="outline" size="sm">Casual</Button>
          <Button variant="outline" size="sm">Fun</Button>
        </div>
      </div>
    </div>
  )
}