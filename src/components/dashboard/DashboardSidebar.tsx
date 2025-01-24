import { 
  BarChart3, 
  Brain, 
  Bot,
  FileText,
  Image,
  Settings,
  MessageSquare,
  Calendar,
  Activity
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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

export function DashboardSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="w-sidebar border-r border-slate-200 bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path} className="flex items-center gap-3 px-4 py-2">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}