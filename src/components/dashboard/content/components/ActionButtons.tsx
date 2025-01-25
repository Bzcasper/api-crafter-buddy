import { Button } from "@/components/ui/button"
import { Play, RefreshCw, XOctagon, Share2, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ActionButtonsProps {
  onGenerate: () => void
  onPreview: () => void
  onReset: () => void
}

export const ActionButtons = ({ onGenerate, onPreview, onReset }: ActionButtonsProps) => {
  const { toast } = useToast()

  const handleShare = () => {
    // In a real implementation, this would generate a shareable link
    toast({
      title: "Share link generated",
      description: "The shareable link has been copied to your clipboard.",
    })
  }

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
      <div className="grid grid-cols-2 gap-3">
        <Button variant="ghost" onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Draft
        </Button>
        <Button variant="ghost" className="gap-2">
          <History className="h-4 w-4" />
          Version History
        </Button>
      </div>
    </div>
  )
}