import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Globe,
  Home,
  Settings,
  Users,
} from "lucide-react"

interface SidebarLink {
  icon: typeof Home
  label: string
  href: string
}

const links: SidebarLink[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Globe,
    label: "Website Management",
    href: "/dashboard/website-management",
  },
  {
    icon: Users,
    label: "Team",
    href: "/dashboard/team",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
]

export function DashboardSidebarContent({ collapsed }: { collapsed: boolean }) {
  const location = useLocation()

  return (
    <div className="flex h-full w-full flex-col gap-2">
      {links.map((link, index) => {
        const Icon = link.icon
        return (
          <Link key={index} to={link.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                location.pathname === link.href && "bg-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className="ml-2">{link.label}</span>}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}