import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import WebsiteManagement from "./pages/WebsiteManagement"
import { Analytics } from "@/components/dashboard/analytics/Analytics"
import { ContentStudio } from "@/components/dashboard/content/ContentStudio"
import { DataCollection } from "@/components/dashboard/data/DataCollection"
import { CampaignManager } from "@/components/dashboard/campaigns/CampaignManager"
import { AutomationCenter } from "@/components/dashboard/automation/AutomationCenter"
import { MediaLibrary } from "@/components/dashboard/media/MediaLibrary"
import { SeoOptimizer } from "@/components/dashboard/seo/SeoOptimizer"
import { CompetitionTracker } from "@/components/dashboard/competition/CompetitionTracker"
import { AdvancedReports } from "@/components/dashboard/reports/AdvancedReports"
import { SystemSettings } from "@/components/dashboard/settings/SystemSettings"
import { DashboardHome } from "@/components/dashboard/DashboardHome"
import { WebsiteCreationForm } from "@/components/website/WebsiteCreationForm"

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Checking authentication status...")
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session data:", session)
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    console.log("No session found, redirecting to auth...")
    return <Navigate to="/auth" />
  }

  return children
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="website-management" element={<WebsiteManagement />} />
            <Route path="websites" element={<WebsiteManagement />} />
            <Route path="websites/new" element={<WebsiteCreationForm />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="content" element={<ContentStudio />} />
            <Route path="data" element={<DataCollection />} />
            <Route path="campaigns" element={<CampaignManager />} />
            <Route path="automation" element={<AutomationCenter />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="seo" element={<SeoOptimizer />} />
            <Route path="competition" element={<CompetitionTracker />} />
            <Route path="reports" element={<AdvancedReports />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App