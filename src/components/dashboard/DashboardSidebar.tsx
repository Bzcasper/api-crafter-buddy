import { 
  BarChart3, 
  Brain, 
  Globe, 
  Link as LinkIcon, 
  List,
  FileText,
  Image,
  Settings,
  Spider
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
    icon: Spider,
  },
  {
    title: "Content Generator",
    path: "/dashboard/content",
    icon: FileText,
  },
  {
    title: "Media Library",
    path: "/dashboard/media",
    icon: Image,
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
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
    <Sidebar className="w-[280px] border-r border-slate-200">
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
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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