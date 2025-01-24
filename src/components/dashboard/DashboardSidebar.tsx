import { DashboardSidebarContent } from "./DashboardSidebarContent";

interface DashboardSidebarProps {
  collapsed?: boolean;
}

export function DashboardSidebar({ collapsed = false }: DashboardSidebarProps) {
  return (
    <div className="h-full flex flex-col bg-background border-r border-border">
      <DashboardSidebarContent collapsed={collapsed} />
    </div>
  );
}