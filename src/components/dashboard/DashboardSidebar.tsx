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
  Settings
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "AI Command Center",
    path: "/dashboard",
    icon: Command,
  },
  {
    title: "Website Management",
    path: "/dashboard/websites",
    icon: Globe,
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
]

interface DashboardSidebarProps {
  collapsed?: boolean
}

export function DashboardSidebar({ collapsed = false }: DashboardSidebarProps) {
  const location = useLocation()

  return (
    <div className="h-full flex flex-col bg-white">
      <nav className="flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 h-12 text-sm font-medium transition-colors",
                "hover:bg-slate-50 hover:text-slate-900",
                location.pathname === item.path
                  ? "bg-slate-50 text-slate-900"
                  : "text-slate-600",
                collapsed ? "justify-center px-2" : "px-4"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}