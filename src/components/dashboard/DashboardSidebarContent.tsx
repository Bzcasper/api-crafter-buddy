import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Command,
  Globe,
  BarChart3,
  Pencil,
  Database,
  Megaphone,
  Bot,
  Image,
  Search,
  Users,
  FileText,
  Settings,
  Plus,
} from "lucide-react";

const menuItems = [
  {
    title: "AI Command Center",
    path: "/dashboard",
    icon: Command,
  },
  {
    title: "Website Management",
    path: "/dashboard/website-management",
    icon: Globe,
  },
  {
    title: "Create Website",
    path: "/dashboard/websites/new",
    icon: Plus,
  },
  {
    title: "Advanced Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Content Studio",
    path: "/dashboard/content",
    icon: Pencil,
  },
  {
    title: "Data Collection",
    path: "/dashboard/data",
    icon: Database,
  },
  {
    title: "Campaign Manager",
    path: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    title: "Automation Center",
    path: "/dashboard/automation",
    icon: Bot,
  },
  {
    title: "Media Library",
    path: "/dashboard/media",
    icon: Image,
  },
  {
    title: "SEO Optimizer",
    path: "/dashboard/seo",
    icon: Search,
  },
  {
    title: "Competition Tracker",
    path: "/dashboard/competition",
    icon: Users,
  },
  {
    title: "Advanced Reports",
    path: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "System Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export const DashboardSidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => {
  const location = useLocation();

  return (
    <nav className="flex-1 space-y-1">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "sidebar-item",
            location.pathname === item.path && "active",
            collapsed ? "justify-center px-2" : "px-4"
          )}
        >
          <item.icon className="h-5 w-5 flex-shrink-0 text-primary" />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      ))}
    </nav>
  );
};