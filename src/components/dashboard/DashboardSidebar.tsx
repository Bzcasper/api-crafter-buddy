import { 
  BarChart3, 
  Brain, 
  Bot,
  FileText,
  Image,
  Settings,
  Calendar,
  Activity
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "AI Hub",
    path: "/dashboard/ai-hub",
    icon: Brain,
  },
  {
    title: "Web Scraping",
    path: "/dashboard/scraping",
    icon: Bot,
  },
  {
    title: "Content Generator",
    path: "/dashboard/content",
    icon: FileText,
  },
  {
    title: "Post Manager",
    path: "/dashboard/posts",
    icon: Calendar,
  },
  {
    title: "Media Library",
    path: "/dashboard/media",
    icon: Image,
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: Activity,
  },
  {
    title: "Settings",
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
    <div className="h-full flex flex-col">
      <nav className="flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 h-10 text-sm font-medium transition-colors",
                "hover:bg-slate-100 hover:text-slate-900",
                location.pathname === item.path
                  ? "bg-slate-100 text-slate-900"
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