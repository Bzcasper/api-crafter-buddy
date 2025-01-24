import { DashboardSidebarContent } from "./DashboardSidebarContent";

interface DashboardSidebarProps {
  collapsed?: boolean;
}

export function DashboardSidebar({ collapsed = false }: DashboardSidebarProps) {
  return (
    <div className="h-full flex flex-col bg-dracula-background border-r border-dracula-current/30">
      <DashboardSidebarContent collapsed={collapsed} />
    </div>
  );
}