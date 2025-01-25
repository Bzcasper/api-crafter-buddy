import { Button } from "@/components/ui/button"
import { Play, RefreshCw, XOctagon } from "lucide-react"

interface ActionButtonsProps {
  onGenerate: () => void
  onPreview: () => void
  onReset: () => void
}

export const ActionButtons = ({ onGenerate, onPreview, onReset }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Button onClick={onGenerate} className="w-full gap-2">
        <Play className="h-4 w-4" />
        Generate Content
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onPreview} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <XOctagon className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}