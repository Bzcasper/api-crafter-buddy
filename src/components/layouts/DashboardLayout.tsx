import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-[#F4F7FE]">
          <div className="container mx-auto py-6 px-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}