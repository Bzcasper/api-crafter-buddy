import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2 } from "lucide-react"

interface ContentControlsProps {
  onControlChange: (type: string, value: number) => void
}

export const ContentControls = ({ onControlChange }: ContentControlsProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Content Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" className="bg-pink-500 hover:bg-pink-600 flex-1 min-w-[100px]">Professional</Button>
            <Button variant="outline" size="sm" className="flex-1 min-w-[100px]">Casual</Button>
            <Button variant="outline" size="sm" className="flex-1 min-w-[100px]">Fun</Button>
          </div>
        </div>

        <Button className="w-full gap-2 mt-4" size="lg">
          <Wand2 className="w-4 h-4" />
          Generate Content
        </Button>
      </CardContent>
    </Card>
  )
}