import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DashboardSidebarContent } from "@/components/dashboard/DashboardSidebarContent";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0">
        <DashboardSidebarContent collapsed={false} />
      </SheetContent>
    </Sheet>
  );
}