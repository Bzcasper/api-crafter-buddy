import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WebsiteStats } from "@/components/website/WebsiteStats"
import { WebsiteInsights } from "@/components/website/WebsiteInsights"
import { ActiveWebsites } from "@/components/website/ActiveWebsites"
import { WebsiteCreationForm } from "@/components/website/WebsiteCreationForm"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import { useState } from "react"
import { Download, ChevronDown, ExternalLink, Upload, BarChart } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileManager } from "@/components/website/FileManager"
import { DeploymentStatus } from "@/components/website/DeploymentStatus"

export default function WebsiteManagement() {
  const [showCreationForm, setShowCreationForm] = useState(false)

  return (
    <div className="container mx-auto p-4 lg:p-6 min-h-screen overflow-y-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">AI-Powered Website Manager</h1>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 w-full lg:w-auto">
              <ExternalLink className="h-4 w-4" />
              View Landing Page
            </Button>
          </Link>
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
            onClick={() => setShowCreationForm(true)}
          >
            + New Website
          </Button>
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700 w-full lg:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Upload Assets
          </Button>
          <Button variant="default" className="bg-cyan-600 hover:bg-cyan-700 w-full lg:w-auto">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-full lg:w-auto">
                <Download className="h-4 w-4" />
                Export Data
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Choose Data to Export</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Export Analytics
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export Content
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showCreationForm ? (
        <div className="mb-6">
          <WebsiteCreationForm />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
            <WebsiteInsights />
            <DeploymentStatus />
          </div>

          <div className="space-y-4 lg:space-y-6">
            <WebsiteStats />
            <ActiveWebsites />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>File Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileManager />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Deployments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Deployment history will be implemented here */}
                    <p className="text-muted-foreground">No recent deployments</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}