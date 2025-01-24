import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Settings, User } from "lucide-react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 h-topnav bg-white border-b border-slate-200 z-50 flex items-center px-6">
          <div className="flex items-center gap-6 flex-1">
            {/* Logo */}
            <div className="text-2xl font-bold text-primary">
              SocialBoost
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  className="w-full pl-10"
                />
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <div className="fixed left-0 top-topnav bottom-0">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background ml-sidebar pt-topnav">
          <div className="container mx-auto py-6 px-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}