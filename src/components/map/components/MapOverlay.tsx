import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface MapOverlayProps {
  onClick: () => void;
}

export const MapOverlay = ({ onClick }: MapOverlayProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Button
        onClick={onClick}
        size="lg"
        className="flex items-center gap-2 text-lg"
      >
        Click here to see deals <ArrowDown className="animate-bounce" />
      </Button>
    </div>
  );
};