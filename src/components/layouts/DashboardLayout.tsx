import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Menu, RocketIcon, Search, Settings, User } from "lucide-react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200">
          <div className="flex h-full items-center px-4">
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Logo */}
            <div className="flex items-center gap-2 text-xl font-bold text-primary">
              <RocketIcon className="h-6 w-6" />
              <span className="hidden sm:inline">SocialBoost</span>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  className="w-full pl-10"
                />
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-2">
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

        {/* Main Layout with Resizable Sidebar */}
        <div className="flex-1 pt-16">
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-[calc(100vh-4rem)]"
          >
            {/* Sidebar Panel */}
            <ResizablePanel
              defaultSize={15}
              minSize={10}
              maxSize={30}
              collapsible={true}
              collapsedSize={4}
              onCollapse={() => setIsCollapsed(true)}
              onExpand={() => setIsCollapsed(false)}
              className={cn(
                "bg-white",
                isCollapsed ? "min-w-[50px]" : "min-w-[200px]",
                !isDesktop && "hidden md:block"
              )}
            >
              <DashboardSidebar collapsed={isCollapsed} />
            </ResizablePanel>
            
            {/* Resize Handle */}
            <ResizableHandle withHandle />
            
            {/* Main Content Panel */}
            <ResizablePanel defaultSize={85}>
              <main className="h-full overflow-y-auto bg-background">
                {children}
              </main>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Sidebar */}
        <div 
          className={cn(
            "fixed inset-0 z-50 bg-black/80 md:hidden transition-opacity",
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className={cn(
              "fixed inset-y-0 left-0 w-[280px] bg-white transition-transform",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={e => e.stopPropagation()}
          >
            <DashboardSidebar collapsed={false} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}