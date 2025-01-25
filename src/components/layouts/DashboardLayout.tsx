// src/components/dashboard/DashboardLayout.tsx

import { useState, useCallback, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Menu,
  RocketIcon,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeProvider } from "next-themes";
import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { SearchInput } from "./SearchInput";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Memoize handlers to prevent unnecessary re-renders
  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider defaultOpen={false}>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          {/* Top Navigation */}
          <Header
            onMobileMenuClick={toggleMobileSidebar}
            onSearchToggle={toggleSearch}
            isSearchOpen={isSearchOpen}
          />

          {/* Main Layout with Resizable Sidebar */}
          <div className="flex-1 pt-16">
            <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-4rem)]">
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
                  "bg-card transition-all duration-300",
                  isCollapsed ? "min-w-[50px]" : "min-w-[200px]",
                  !isDesktop && "hidden md:block"
                )}
              >
                <DashboardSidebar collapsed={isCollapsed} />
              </ResizablePanel>

              {/* Resize Handle */}
              <ResizableHandle className="bg-border w-1 cursor-col-resize" />

              {/* Main Content Panel */}
              <ResizablePanel defaultSize={85}>
                <main className="h-full overflow-y-auto bg-background px-4 py-6">
                  {children}
                </main>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Mobile Sidebar */}
          <MobileSidebar isOpen={isMobileOpen} onClose={closeMobileSidebar} />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
