import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { Routes, Route } from "react-router-dom"
import WebsiteManagement from "./WebsiteManagement"
import { DashboardHome } from "@/components/dashboard/DashboardHome"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="website-management" element={<WebsiteManagement />} />
      </Routes>
    </DashboardLayout>
  )
}

export default Dashboard